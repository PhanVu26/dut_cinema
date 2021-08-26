import * as Types from "../constants/ActionType";

const stateDefault = {
    foodCombo: []
}

function reducerFoods(state = stateDefault, action) {
  switch (action.type) {
    case Types.FETCH_DATA_FOOD: {
      return {
          ...state,
          foodCombo: action.data
      }
    }
    default: {
      return state;
    }
  }
}

export default reducerFoods;