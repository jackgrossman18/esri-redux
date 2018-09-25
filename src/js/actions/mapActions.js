import api from "js/utils/api";
import {
  FETCH_ITEM_INFO,
  TOGGLE_LOCATE,
  TOGGLE_SHARE,
  VIEW_READY,
  UPDATE_LAYER_DEFINITION,
  UPDATE_CURRENT_LAYER
} from "js/constants/actionTypes";
import { REMOVE_LAYER_DEFINITION } from "../constants/actionTypes";

export function viewCreated() {
  return { type: VIEW_READY };
}

export function toggleShareModal(data) {
  return { type: TOGGLE_SHARE, data };
}

export function toggleFilterModal(data) {
  return { type: TOGGLE_FILTER, data };
}

export function toggleLocateModal(data) {
  return { type: TOGGLE_LOCATE, data };
}

export function updateDefinitionExpression(data) {
  return { type: UPDATE_LAYER_DEFINITION, data };
}

/**
 * Example Async Action
 */
export function getItemInfo(appid) {
  return dispatch => {
    api.getItemInfo(appid).then(response => {
      dispatch({ type: FETCH_ITEM_INFO, data: response.data });
    });
  };
}
