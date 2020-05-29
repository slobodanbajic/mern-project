import { CHAGNE_CURRENT_STATUS } from "./authTypes";
export default (state, action) => {
  switch (action.type) {
    case CHAGNE_CURRENT_STATUS:
      return {
        ...state,
        authStatus: action.payload,
      };
    default:
      return;
  }
};
