import { INITIAL_STATE } from "js/config";

import {
  FETCH_ITEM_INFO,
  TOGGLE_LOCATE,
  TOGGLE_SHARE,
  VIEW_READY
} from "js/constants/actionTypes";
import {
  UPDATE_LAYER_DEFINITION,
  REMOVE_LAYER_DEFINITION
} from "../constants/actionTypes";

export function viewCreated(state = INITIAL_STATE.viewReady, action) {
  return action.type !== VIEW_READY ? state : true;
}

export function toggleShareModal(
  state = INITIAL_STATE.shareModalVisible,
  action
) {
  const { type, data } = action;
  return type !== TOGGLE_SHARE ? state : data.visible;
}

export function toggleLocateModal(
  state = INITIAL_STATE.locateModalVisible,
  action
) {
  const { type, data } = action;
  return type !== TOGGLE_LOCATE ? state : data.visible;
}

export function updateLayerDefinition(
  state = INITIAL_STATE.layerDefinition,
  action
) {
  const { type, data } = action;
  return type !== UPDATE_LAYER_DEFINITION
    ? state
    : Object.assign(state, data.definition);
}

/**
 * Reducer for the async action
 */
export function getItemInfo(state = INITIAL_STATE.itemInfo, action) {
  const { type, data } = action;
  return type !== FETCH_ITEM_INFO ? state : data;
}
