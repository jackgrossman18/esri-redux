import { combineReducers } from "redux";

import {
  toggleLocateModal,
  toggleShareModal,
  getItemInfo,
  viewCreated,
  updateLayerDefinition,
  removeLayerDefinition
} from "js/reducers/mapReducers";

// This is my state model and each reducer maps to each store property
export default combineReducers({
  locateModalVisible: toggleLocateModal,
  shareModalVisible: toggleShareModal,
  viewReady: viewCreated,
  itemInfo: getItemInfo,
  updateLayerDefinition: updateLayerDefinition
});
