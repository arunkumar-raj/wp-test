import { combineReducers } from 'redux';
import produce from 'immer';

export const settingsReducer = (state = null, action) => {    
    switch (action.type) {
        case 'GET_SETTING' : 
            return {
                ...state,
                loading: false,
                ...action.payload
            }
        case 'UPDATE_SETTING' :
            return {
                ...state,
                loading: false,
                [action.payload.id] : action.payload.value
            }

        case 'UPDATE_DRAFT' :
            return produce(state, draft => {
                draft[`${action.payload.id}`][`${action.payload.internalId}`] = action.payload.value;
            });
        
        default:
            return state;

    }
}

export default combineReducers({
    wpinpdata:settingsReducer
});
