import {ADD_NEW_DISTRICT,FETCH_DISTRICT,
    SHOW_DISTRICT,UPDATE_DISTRICT} from '../actionConstants/adminConstants'
import axios from 'axios'
import { ADMIN_API_URL } from '../../../../constants/constants';
import { connect } from 'react-redux';
const PATH = 'districts';

export const indexDistrict = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_DISTRICT,
        payload:res.data
    }))
}
export const storeDistrict = (data)=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:ADD_NEW_DISTRICT,
        payload:res
    }))
}

export const showDistrict = (type)=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}/${type}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_DISTRICT,
        payload:res.data
    }))
}

export const updateDistrict = (data,id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:UPDATE_DISTRICT,
        payload:res
    }))
}