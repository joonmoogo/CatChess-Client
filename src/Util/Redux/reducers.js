import { CLICK_UNIT_CARD } from "./actionTypes";

const initialState = {
    clickedCardEvent:null,
};

const reducer = (state = initialState,action) => {
    switch(action.type){
        case CLICK_UNIT_CARD:
            return{
                ...state,
                clickedCardEvent:state.clickedCardEvent,
            };
            default:
                return state;
    }
}

export default reducer