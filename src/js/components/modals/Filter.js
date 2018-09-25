import { toggleLocateModal } from "js/actions/mapActions";
import Wrapper from "js/components/modals/Wrapper";
import React, { Component } from "react";
import appStore from "js/appStore";

export default class FilterModal extends Component {
  displayName: "FilterModal";

  close = () => {
    appStore.dispatch(toggleLocateModal({ visible: false }));
  };

  render() {
    let { visible } = this.props;

    return (
      <Wrapper theme="locate-modal" visible={visible} close={this.close}>
        <h3>Stuff</h3>
      </Wrapper>
    );
  }
}
