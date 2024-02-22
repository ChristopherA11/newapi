import { ADD_MOBILE_SUCCESS, DELETE_MOBILE_SUCCESS, FETCH_MOBILE_SUCCESS, SEARCH_MOBILE_SUCCESS, UPDATE_MOBILE_SUCCESS } from "../mobiles/mobileActionTypes";
import _ from "lodash";

const initialState = {
  mobiles: [],
  filterLists:{},
  searchResult: false
};

const mobilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOBILE_SUCCESS:
      return {
        mobiles: action.payload,
      };
    case DELETE_MOBILE_SUCCESS:
      return {
        // filter lodash use
        mobiles: _.filter(state.mobiles,(mobile) => mobile.id !== action.payload),
      };
    case ADD_MOBILE_SUCCESS:
      return {
        mobiles: [...state.mobiles, action.payload],

      };
    case UPDATE_MOBILE_SUCCESS:
      return {
        // map use lodash
        mobiles: _.map(state.mobiles,(mobile) =>
          mobile.id === action.payload.id ? action.payload : mobile)
      };
    case SEARCH_MOBILE_SUCCESS:
      const { model, brand, price, spec } = action.payload;
      const filterLists = model || brand || spec || price ?

        // filter used in lodaash 
        _.filter(state.mobiles, (mobile) => (
          (model ? mobile.model.toLowerCase().includes(model.toLowerCase()) : true) &&
          (brand ? mobile.brand.toLowerCase().includes(brand.toLowerCase()) : true) &&
          (spec ? mobile.spec.toLowerCase().includes(spec.toLowerCase()) : true) &&
          (price ? mobile.price === parseFloat(price) : true))
        )
        : state.mobiles;
      console.log(filterLists)
      return {
        ...state,
        filterLists,
        searchResult: true
      };
    default:
      return state;
  }
};

export default mobilesReducer;
