import * as types from "../../constants/ActionType";
var initialState = {
    movieAnalysis: [],
    serviceAnalysis: [],
    saleAnalysis: []
}

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.MOVIE_ANALYSIS:
            return {
                ...state,
                movieAnalysis: action.data
            }
        case types.SERVICE_ANALYSIS:
            return {
                ...state,
                serviceAnalysis: action.data,
            }

        case types.SALE_ANALYSIS:
            return {
                ...state,
                saleAnalysis: action.data,
            }    
                     
        default: return {...state};     
    }
}


export default myReducer;