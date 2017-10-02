import {combineReducers} from 'redux';
import ItemsReducer from './items_reducer';
import LoadingReducer from './loading_reducer';


const RootReducer = combineReducers({
    items: ItemsReducer,
    loading: LoadingReducer
});

export default RootReducer;
