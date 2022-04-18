import { createSelector } from 'reselect';

const selectUsersReducer = (state) => state.user;

export const selectUsers = createSelector(
  [selectUsersReducer],
  (user) => user.allUsers
);

export const selectIsLoading = createSelector(
  [selectUsersReducer],
  (user) => user.isLoading
);

export const selectError = createSelector(
  [selectUsersReducer],
  (user) => user.errorMessage
);