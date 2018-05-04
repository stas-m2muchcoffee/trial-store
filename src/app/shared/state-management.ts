import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';

import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';

export enum StateRequests {
  Get,
  GetList,
  Add,
  Remove,
  Update
}

export class StateManagement<T> {
  add$: Subject<Observable<T>> = new Subject();
  remove$: Subject<Observable<T>> = new Subject();
  get$: Subject<Observable<T>> = new Subject();
  getList$: Subject<Observable<T[]>> = new Subject();
  update$: Subject<Observable<T>> = new Subject();

  responseData$: ConnectableObservable<any>;

  entities$: Observable<{ [index: number]: T }>;
  collectionIds$: Observable<number[]>;
  entityId$: Observable<number>;
  addEntityId$: Observable<number>;
  updateEntityId$: Observable<number>;

  constructor() {

    this.responseData$ = Observable.merge(
      this.add$.mergeAll().map((value) => ({type: StateRequests.Add, value: [value]})),
      this.remove$.mergeAll().map((value) => ({type: StateRequests.Remove, value: [value]})),
      this.get$.mergeAll().map((value) => ({type: StateRequests.Get, value: [value]})),
      this.getList$.mergeAll().map((value) => ({type: StateRequests.GetList, value: value})),
      this.update$.mergeAll().map((value) => ({type: StateRequests.Update, value: [value]})),
    )
    .publishReplay(1);
    this.responseData$.connect();

    this.entities$ = this.responseData$
    .scan((acc, data: { type: StateRequests, value: any[] }) => {
      switch (data.type) {
        case StateRequests.Get:
        case StateRequests.Add:
        case StateRequests.GetList: {
          const newEnteties = data.value.reduce((accValue, entity) => {
            return {...accValue, [entity.id]: entity};
          }, {});
          return {...acc, ...newEnteties};
        }
        case StateRequests.Update: {
          data.value.forEach((entity) => {
            acc[entity.id] = entity;
          });
          return acc;
        }
        case StateRequests.Remove: {
          data.value.forEach((entity) => {
            delete acc[entity.id];
          });
          return acc;
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
        case StateRequests.Add: {
          return [...acc, ...data.ids];
        }
        case StateRequests.Remove: {
          return acc.filter((accId) => !data.ids.find((id) => id === accId));
        }
        default: {
          return acc;
        }
      }
    }, []);

    this.entityId$ = this.responseData$.let(this.getId(StateRequests.Get));
    this.addEntityId$ = this.responseData$.let(this.getId(StateRequests.Add));
    this.updateEntityId$ = this.responseData$.let(this.getId(StateRequests.Update));
  }

  getId(requestType) {
    return (observable) => {
      return observable.map(({type, value}: { type: StateRequests, value: T[] }) => {
        const ids = value.map((entity: any) => entity.id);
        return {type, ids};
      })
      .scan((acc: number, data: { type: StateRequests, ids: number[] }) => {
        switch (data.type) {
          case requestType: {
            return data.ids[0];
          }
          default: {
            return acc;
          }
        }
      }, null)
      .filter(id => id !== null);
    };
  }
}
