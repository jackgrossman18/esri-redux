export const INITIAL_STATE = {
  locateModalVisible: false,
  shareModalVisible: false,
  viewReady: false,
  layerDefinition: {},
  itemInfo: {}
};

export const TEXT = {
  title: "Bicycle Accidents Washington, D.C. 2012",
  subtitle: "Blue Raster Techincal Project"
};

export const MAP_OPTIONS = {
  basemap: "streets-navigation-vector"
};

export const VIEW_OPTIONS = {
  ui: { components: ["logo", "attribution"] },
  center: [-77.0369, 38.9072],
  zoom: 10
};

export const URLS = {
  itemInfo: appid => `//www.arcgis.com/sharing/rest/content/items/${appid}/data`
};
