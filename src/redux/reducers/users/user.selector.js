import { createSelector } from "reselect";

export const selectUsersReducer = (state) => state.user;

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

export const selectCurrentUser = createSelector(
  [selectUsersReducer],
  (user) => user.currentUser
);
export const selectCurrentUserId = createSelector(
  [selectUsersReducer],
  (user) => user.currentUserId
);
