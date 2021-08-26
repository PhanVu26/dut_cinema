import * as types from "../../constants/ActionType";
import callApi from "../../utils/ApiCallerServer";

export const actFetchDataMovieAnalysisRequest = (query) => {
    return (dispatch) => {
      return callApi(`transactions/movie-analysis${query}`, "GET", null).then((res) => {
        dispatch(actFetchDataMovieAnalysis(res.data));
      });
    };
};

export const actFetchDataMovieAnalysis = (data) => {
    return {
        type: types.MOVIE_ANALYSIS,
        data
    }
}

export const actFetchDataServiceAnalysisRequest = (query) => {
    return (dispatch) => {
      return callApi(`transactions/service-analysis${query}`, "GET", null).then((res) => {
        dispatch(actFetchDataServiceAnalysis(res.data));
      });
    };
};

export const actFetchDataServiceAnalysis = (data) => {
    return {
        type: types.SERVICE_ANALYSIS,
        data
    }
}

export const actFetchDataSaleAnalysisRequest = (query) => {
    return (dispatch) => {
      return callApi(`transactions/sale-analysis${query}`, "GET", null).then((res) => {
        dispatch(actFetchDataSaleAnalysis(res.data));
      });
    };
};

export const actFetchDataSaleAnalysis = (data) => {
    return {
        type: types.SALE_ANALYSIS,
        data
    }
}