import api from '../common/api';
// import axios from 'axios';
import {
  FETCH_MOBILE_SUCCESS,
  DELETE_MOBILE_SUCCESS,
  ADD_MOBILE_SUCCESS,
  UPDATE_MOBILE_SUCCESS,
  SEARCH_MOBILE_SUCCESS,
} from '../mobiles/mobileActionTypes';

export const fetchMobilesSuccess = (mobiles) => {
  return {
    type: FETCH_MOBILE_SUCCESS,
    payload: mobiles,
  }
};

export const fetchMobiles = () => async (dispatch) => {
try{
  const response = await api.get("/mobiles")
   dispatch(fetchMobilesSuccess(response.data))
  }
   catch(err){
    console.log(err.message)
  }
};

export const deleteMobileSuccess = (id) => {
  return {
  type: DELETE_MOBILE_SUCCESS,
  payload: id,
  }
};

export const deleteMobile = (id) => async (dispatch) => {
  try {
    await api.delete(`/mobiles/${id}`);
    dispatch(deleteMobileSuccess(id));
  } catch (error) {
    console.log(err.message)
  }
};

export const addMobileSuccess = (mobiles) => {
  return {
  type: ADD_MOBILE_SUCCESS,
  payload: mobiles,
  }
};

export const addMobile = (newMobile) => async (dispatch) => {
  try {
    const response = await api.post('/mobiles', newMobile);
  
    dispatch(addMobileSuccess(response.data));
  } catch (err) {
    console.log(err.message)
  }
};
export const updateMobileSuccess = (updatedMobile) => {
  return {
    type: UPDATE_MOBILE_SUCCESS,
    payload: updatedMobile,
  }
};

export const updateMobile = (id, updatedMobile) => async (dispatch) =>{
  try {
    const response = await api.patch(`/mobiles/${id}`,updatedMobile);
    dispatch(updateMobileSuccess(response.data));
  } catch (err) {
    console.log(err.message)
  }
};

export const searchMobileSuccess = (searchMobile) => {
   return {
    type:SEARCH_MOBILE_SUCCESS,
    payload:searchMobile
   }
};

export const searchMobile = (model, brand, price, spec) => (dispatch) => {
  console.log(model);
  dispatch(searchMobileSuccess({model, brand, price, spec}))
}





