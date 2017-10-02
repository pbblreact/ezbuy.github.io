import React from 'react';
import { connect } from 'react-redux';
import YoutubeItems from './youtube_items';
import {getYoutubeItems} from '../actions/item_actions';

const mapStateToProps = state => {
  let items;
  let totalResults;
  if (jQuery.isEmptyObject(state.items.youtubeItems)) {
    items = [];
  }
  else {
    items = state.items.youtubeItems.items;
    totalResults = state.items.youtubeItems.pageInfo.totalResults;
  }
    return {
      loading: state.loading.loadingYoutube,
      items,
      totalResults,
      keywords: state.items.labels[0].description + (state.items.labels[1] ? " "+state.items.labels[1].description : "")
    }
};

const mapDispatchToProps = dispatch => ({
  getYoutubeItems: (keywords) => dispatch(getYoutubeItems(keywords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YoutubeItems);
