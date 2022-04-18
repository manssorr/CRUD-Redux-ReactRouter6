import USER_ACRION_TYPES from "./users.actionTypes";
import usersService from "../../../services/users.service";
import { createAction } from "../../../services/reducer.utils";

const usersFetchStart = () => createAction(USER_ACRION_TYPES.FETCH_USERS_START);

const usersFetchSuccess = (users) =>
  createAction(USER_ACRION_TYPES.FETCH_USERS_SUCCESS, users);

const usersFetchFailed = (errorMessage) =>
  createAction(USER_ACRION_TYPES.FETCH_USERS_FAILED, errorMessage);

export const loadUsersAsync = () => {
  return async (dispatch, getState) => {
    dispatch(usersFetchStart());
    try {
      const usersRes = await usersService.getAllUsers();
      dispatch(usersFetchSuccess(usersRes.data));
    } catch (error) {
      dispatch(usersFetchFailed(error.message));
    }
  };
};


export default  {
  loadUsersAsync,
  usersFetchStart,
  usersFetchSuccess,
  usersFetchFailed,
};

// export default {
// 	usersLoadStart,
// 	usersLoadSuccess,
// 	usersLoadError,
// };
