import { initState } from "./state";
import {
  SET_NOTIFICATION_COUNTS
} from "./actions";

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_COUNTS:
      return {
        ...state,
        global: {
          ...state.global,
          notificationCount: action.payload
        }
      } 
  }

  return state;
}