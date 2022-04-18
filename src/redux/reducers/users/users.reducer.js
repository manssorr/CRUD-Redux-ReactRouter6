import USER_ACRION_TYPES from "./users.actionTypes";

const USER_INITIAL_STATE = {
  allUsers: null,
  currentUser: null,
  currentUserId: null,
  isLoading: false,
  errorMessage: null,
};

const usersReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACRION_TYPES.FETCH_USERS_START:
      return {
        ...state,
        isLoading: true,
      };

    case USER_ACRION_TYPES.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allUsers: payload,
      };

    case USER_ACRION_TYPES.FETCH_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case USER_ACRION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: state.allUsers && state.allUsers[payload - 1],
       
      };

    case USER_ACRION_TYPES.SET_CURRENT_USER_ID:
      return {
        ...state,
        currentUserId: payload,
      };

    case USER_ACRION_TYPES.DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== payload),
      };

    case USER_ACRION_TYPES.EDIT_USER:
      return {
        ...state,
        allUsers: state.allUsers.map((user) => {
          // console.log("user", user);
          console.log("user.id", user.id);
          console.log("payload.id", payload);
          console.log(user.id === payload.id);
          if (user.id === payload.id) {
            return payload.data;
          }
          return user;
        }),
      };

    case USER_ACRION_TYPES.ADD_NEW_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, payload],
      };

    default:
      return state;
  }
};

export default usersReducer;
