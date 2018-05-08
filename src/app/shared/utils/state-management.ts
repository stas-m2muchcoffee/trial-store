import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/share';


export enum StateRequests {
  Get,
  GetList,
  Add,
  Update,
  Remove,
}


export class StateManagement<T> {
  add$: Subject<Observable<T>> = new Subject();
  update$: Subject<Observable<T>> = new Subject();
  remove$: Subject<Observable<T>> = new Subject();
  get$: Subject<Observable<T>> = new Subject();
  getList$: Subject<Observable<T[]>> = new Subject();

  responseDataRequests$: Observable<{type: StateRequests, value: T[]}>;
  responseData$: ConnectableObservable<{type: StateRequests, value: T[]}>;

  addResponse$: Observable<T>;
  updateResponse$: Observable<T>;
  removeResponse$: Observable<T>;
  getResponse$: Observable<T>;
  getListResponse$: Observable<T[]>;

  entities$: Observable<{ [index: number]: T }>;
  collectionIds$: Observable<number[]>;
  entityId$: Observable<number>;
  addEntityId$: Observable<number>;
  updateEntityId$: Observable<number>;

  constructor() {

    this.addResponse$ = this.add$.mergeAll().share();
    this.updateResponse$ = this.update$.mergeAll().share();
    this.removeResponse$ = this.remove$.mergeAll().share();
    this.getResponse$ = this.get$.mergeAll().share();
    this.getListResponse$ = this.getList$.mergeAll().share();

    this.responseDataRequests$ = Observable.merge(
      this.addResponse$.map((value) => ({type: StateRequests.Add, value: [value]})),
      this.updateResponse$.map((value) => ({type: StateRequests.Update, value: [value]})),
      this.removeResponse$.map((value) => ({type: StateRequests.Remove, value: [value]})),
      this.getResponse$.map((value) => ({type: StateRequests.Get, value: [value]})),
      this.getListResponse$.map((value) => ({type: StateRequests.GetList, value: value})),
    )
    .share();

    this.responseData$ = this.responseDataRequests$
    .publishReplay(1);
    this.responseData$.connect();

    this.entities$ = this.responseData$
    .scan((acc, data: { type: StateRequests, value: any[] }) => {
      switch (data.type) {
        case StateRequests.Get:
        case StateRequests.Add:
        case StateRequests.Update:
        case StateRequests.GetList: {
          const newEntities = data.value.reduce((accValue, entity) => {
            return {...accValue, [entity.id]: entity};
          }, {});
          return {...acc, ...newEntities};
        }
        case StateRequests.Remove: {
          const clonedAcc = {...acc};
          data.value.forEach((entity) => {
            delete clonedAcc[entity.id];
          });
          return clonedAcc;
        }
        default: {
          return acc;
        }
      }
    }, {});


    this.collectionIds$ = this.responseData$
    .map(({type, value}: { type: StateRequests, value: T[] }) => {
      const ids = value.map((entity: any) => entity.id);
      return {type, ids};
    })
    .scan((acc: number[], data: { type: StateRequests, ids: number[] }) => {
      switch (data.type) {
        case StateRequests.GetList: {
          return data.ids;
        }
        case StateRequests.Update:
        case StateRequests.Add: {
          const ids = [...acc, ...data.ids];
          // union ids
          return ids.filter((item, pos) => ids.indexOf(item) === pos);
        }
        case StateRequests.Remove: {
          return acc.filter((accId) => !data.ids.find((id) => id === accId));
        }
        default: {
          return acc;
        }
      }
    }, []);

    this.entityId$ = this.responseDataRequests$.let(this.getId(StateRequests.Get));
    this.addEntityId$ = this.responseDataRequests$.let(this.getId(StateRequests.Add));
    this.updateEntityId$ = this.responseDataRequests$.let(this.getId(StateRequests.Update));
  }

  getId(requestType) {
    return (observable) => {
      return observable
      .filter(({type}: { type: StateRequests }) => type === requestType)
      .map(({type, value}: { type: StateRequests, value: T[] }) => {
        const ids = value.map((entity: any) => entity.id);
        return ids[0];
      });
    };
  }
}
