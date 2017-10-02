import React from 'react';
import { connect } from 'react-redux';
import AmazonItems from './amazon_items';
import {getAmazonItems} from '../actions/item_actions';

const mapStateToProps = state => {
  return {
      keywords: state.items.labels[0].description + (state.items.labels[1] ? " "+state.items.labels[1].description : "")
  }
};

const mapDispatchToProps = dispatch => ({
  getAmazonItems: (keywords) => dispatch(getAmazonItems(keywords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmazonItems);
