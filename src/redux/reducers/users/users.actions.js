import USER_ACRION_TYPES from "./users.actionTypes";
import usersService from "../../../services/users.service";
import { createAction } from "../../../services/reducer.utils";

export const usersFetchStart = () =>
  createAction(USER_ACRION_TYPES.FETCH_USERS_START);

export const usersFetchSuccess = (users) =>
  createAction(USER_ACRION_TYPES.FETCH_USERS_SUCCESS, users);

export const usersFetchFailed = (errorMessage) =>
  createAction(USER_ACRION_TYPES.FETCH_USERS_FAILED, errorMessage);

export const setCurrentUser = (userId) =>
  createAction(USER_ACRION_TYPES.SET_CURRENT_USER, userId);

export const setCurrentUserId = (userId) =>
  createAction(USER_ACRION_TYPES.SET_CURRENT_USER_ID, userId);

export const deleteUser = (userId) =>
  createAction(USER_ACRION_TYPES.DELETE_USER, userId);

export const editUser = (newUserId, newUserData) =>
  createAction(USER_ACRION_TYPES.EDIT_USER, {
    id: newUserId,
    data: newUserData,
  });

export const addNewUser = (newUserData) =>
  createAction(USER_ACRION_TYPES.ADD_NEW_USER, newUserData);

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
