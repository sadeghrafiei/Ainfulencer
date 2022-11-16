type StateType = {
  user: {loggedIn: boolean};
};

export const selectUser = (state: StateType) => state.user;
