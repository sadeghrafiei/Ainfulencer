import {Reducer} from 'redux';

type StateType = {
  user: Reducer;
};

export const selectUser = (state: StateType) => state.user;
