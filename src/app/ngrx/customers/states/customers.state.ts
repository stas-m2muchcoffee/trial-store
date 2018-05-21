import { Customer } from '../../../core/interfaces/customer';

export interface ICustomersState {
  entities: { [index: number]: Customer };
  collectionIds: number[];
}

export const initialState: ICustomersState = {
  entities: {},
  collectionIds: [],
};
