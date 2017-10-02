import React from 'react';
import LabelsContainer from './labels_container';
import EbayItemsContainer from './ebay_items_container';
import YoutubeItemsContainer from './youtube_container';
import AmazonItemsContainer from './amazon_container';
import { connect } from 'react-redux';

class Results extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      labels: true,
      ebay: false,
      youtube: false
    }
    this.openTab = this.openTab.bind(this);
  }

  openTab(field){
    this.setState({labels: false, ebay: false, youtube: false, amazon: false});
    this.setState({[field]: true});
  }

  render () {
    if (this.props.initialPage && this.props.error === "") {
      return <div className="initial-result">Select an image to show results.</div>;
    }
    if (this.props.error !== "") {
      return <div className="label-error-container"><div className="label-error">{this.props.error}</div></div>
    }
    let labelsTab = "tab-items", ebayTab = "tab-items", youtubeTab = "tab-items";
    if (this.state.labels) {
      labelsTab += " selected";
    } else if (this.state.ebay) {
      ebayTab += " selected";
    } else if (this.state.youtube) {
      youtubeTab += " selected";
    }
    return (
      <div>
        <div className="tabs">
          <div className={labelsTab}  onClick={()=>this.openTab("labels")}>labels</div>
          <div className={ebayTab}  onClick={()=>this.openTab("ebay")}>ebay</div>
          <div className={youtubeTab}  onClick={()=>this.openTab("youtube")}>Youtube</div>
        </div>
        {this.state.labels ? <LabelsContainer /> : ""}
        {this.state.ebay ? <EbayItemsContainer /> : ""}
        {this.state.youtube ? <YoutubeItemsContainer /> : ""}
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialPage: jQuery.isEmptyObject(state.items.labels),
  error: state.items.error
});

export default connect(
  mapStateToProps,
  null
)(Results);
