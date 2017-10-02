import { RECEIVE_EBAY_ITEMS,
  RECEIVE_IMAGE_ERROR,
  RECEIVE_IMAGE_LABELS,
  RECEIVE_YOUTUBE_ITEMS,
  RECEIVE_AMAZON_ITEMS } from '../actions/item_actions';
import merge from 'lodash/merge';

const initialState ={
  labels: {},
  ebayItems: {},
  youtubeItems: {},
  error: ""
}

const ItemsReducer = (oldState = initialState, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_IMAGE_LABELS:
      newState.labels = action.labels;
      return Object.assign({}, newState);
    case RECEIVE_IMAGE_ERROR:
      newState.error = action.error;
      return Object.assign({}, newState);
    case RECEIVE_EBAY_ITEMS:
      newState.ebayItems = action.items.findItemsByKeywordsResponse[0];
      return Object.assign({}, newState);
    case RECEIVE_AMAZON_ITEMS:
      debugger
      return Object.assign({}, newState);
    case RECEIVE_YOUTUBE_ITEMS:
      newState.youtubeItems = action.items;
      return Object.assign({}, newState);
    default:
      return oldState;
  }
};

export default ItemsReducer;
