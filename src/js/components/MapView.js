import {
  viewCreated,
  getItemInfo,
  updateDefinitionExpression
} from "js/actions/mapActions";
import { MAP_OPTIONS, VIEW_OPTIONS } from "js/config";
import LocateModal from "js/components/modals/Locate";
import ShareModal from "js/components/modals/Share";
import Spinner from "js/components/shared/Spinner";
import Controls from "js/components/Controls";
import MapView from "esri/views/MapView";
import React, { Component } from "react";
import appStore from "js/appStore";
import EsriMap from "esri/Map";
import { toggleFilterModal } from "../actions/mapActions";

export default class Map extends Component {
  displayName: "Map";
  state = appStore.getState();
  view = {};

  componentDidMount() {
    var getThis = () => this;

    // Subscribe to the store for updates
    this.unsubscribe = appStore.subscribe(this.storeDidUpdate);

    const map = new EsriMap(MAP_OPTIONS);
    var layer;
    this._layer = layer;

    // Create our map view
    const promise = new MapView({
      container: this.refs.mapView,
      map: map,
      ...VIEW_OPTIONS
    });

    ["quad", "day"].forEach(field => {
      var filter = document.getElementById(`${field}Filter`);
      filter.addEventListener("change", event => {
        var newExpression = { [event.target.classList[0]]: event.target.value };
        appStore.dispatch(
          updateDefinitionExpression({ definition: newExpression })
        );
      });
    });

    promise.then(view => {
      this.view = view;
      appStore.dispatch(viewCreated());
      //- Webmap from https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
      // appStore.dispatch(getItemInfo('e691172598f04ea8881cd2a4adaa45ba'));
    });

    // add feature layer
    require([
      "esri/config",
      "esri/layers/FeatureLayer",
      "esri/PopupTemplate",
      "dojo/domReady!"
    ], function(esriConfig, FeatureLayer, PopupTemplate) {
      var popupTemplate = new PopupTemplate({
        title: "D.C. Bike Accidents 2012",
        // Fields
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "Time",
                label: "Time of Accident",
                visible: true
              },
              {
                fieldName: "Day",
                label: "Day of Week",
                visible: true
              },
              {
                fieldName: "Injured",
                label: "Number of Injured",
                visible: true
              },
              {
                fieldName: "Quadrant",
                label: "Area of City",
                visible: true
              }
            ]
          }
        ]
      });

      getThis()._layer = new FeatureLayer(
        "https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/v10_bike_accidents_2012/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
        {
          mode: FeatureLayer.MODE_ONDEMAND,
          outFields: ["*"],
          popupTemplate: popupTemplate
        }
      );

      map.add(getThis()._layer); // adds the layer to the map
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  storeDidUpdate = () => {
    const nextState = appStore.getState();
    this.updateLayerDefs(nextState.updateLayerDefinition);
    this.setState(nextState);
  };

  updateLayerDefs(newDef) {
    var newExpression = "";

    var filtered = Object.keys(newDef).reduce((filteredDef, k) => {
      // Use reduce to filter out empty strings
      if (newDef[k] !== "") filteredDef[k] = newDef[k];
      return filteredDef;
    }, {});

    Object.keys(filtered).forEach((k, i, self) => {
      var newDefVal = newDef[k];
      newExpression += `${k} = '${newDefVal}' `;
      if (i < self.length - 1) newExpression += "AND ";
    });

    this._layer.definitionExpression = newExpression;
  }

  render() {
    const { shareModalVisible, locateModalVisible } = this.state;

    return (
      <div ref="mapView" className="map-view">
        <Controls view={this.view} />
        <Spinner active={!this.view.ready} />
        <ShareModal visible={shareModalVisible} />
        <LocateModal visible={locateModalVisible} />
        <div id="infoDiv">
          Filter by Day of Week:
          <br />
          <select id="dayFilter" className="day">
            <option class="day" value="" />
            <option value="Mon">Monday</option>
            <option value="Tue">Tuesday</option>
            <option value="Wed">Wednesday</option>
            <option value="Thu">Thursday</option>
            <option value="Fri">Friday</option>
            <option value="Sat">Saturday</option>
            <option value="Sun">Sunday</option>
          </select>
          <br />
          Filter by Area of City:
          <br />
          <select id="quadFilter" className="quadrant">
            <option value="" />
            <option value="NW">Northwest</option>
            <option value="NE">Northeast</option>
            <option value="SW">Southwest</option>
            <option value="SE">Southeast</option>
          </select>
        </div>
      </div>
    );
  }
}
