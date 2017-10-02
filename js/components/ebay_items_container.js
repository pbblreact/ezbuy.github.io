import React from 'react';
import { connect } from 'react-redux';
import EbayItems from './ebay_items';
import {getEbayItems} from '../actions/item_actions';

const mapStateToProps = state => {
  let ebayUrl;
  let totalResults;
  let items;
  if (jQuery.isEmptyObject(state.items.ebayItems)) {
    ebayUrl = "";
    totalResults = 0;
    items = [];
  }
  else {
    ebayUrl = state.items.ebayItems.itemSearchURL[0];
    totalResults =  parseInt(state.items.ebayItems.paginationOutput[0].totalEntries[0]);
    items = state.items.ebayItems.searchResult[0].item;
  }
    return {
      loading: state.loading.loadingEbay,
      ebayUrl,
      totalResults,
      items,
      keywords: state.items.labels[0].description + (state.items.labels[1] ? " "+state.items.labels[1].description : "")
    }
};

const mapDispatchToProps = dispatch => ({
  getEbayItems: (keywords) => dispatch(getEbayItems(keywords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EbayItems);
