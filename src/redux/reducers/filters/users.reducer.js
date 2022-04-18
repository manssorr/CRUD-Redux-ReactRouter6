import FILTERS_ACRION_TYPES from "./users.actionTypes";

const FILTER_INITIAL_STATE = {
  allUsers: null,
  currentUser: null,
  isLoading: false,
  errorMessage: null,

  userName: "",
  userEmail: "",
};

const filtersReducer = (state = FILTER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FILTERS_ACRION_TYPES.SET_USERNAME_FILTER:
      return {
        ...state,
        userName: payload,
      };

    case FILTERS_ACRION_TYPES.SET_EMAIL_FILTER:
      return {
        ...state,
        userEmail: payload,
      };

    default:
      return state;
  }
};

export default filtersReducer;
