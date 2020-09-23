import {STORE_MANAGER,SHOW_NOT_ASSIGNED_MANAGERS,UPDATE_MANAGER, FETCH_MANAGERS,
    FETCH_TECHNICIANS}
 from '../actionConstants/adminConstants'
import axios from 'axios'
import { ADMIN_API_URL, API_URL } from '../../../../constants/constants';

const PATH = 'managers';

export const fetchManagers = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_MANAGERS,
        payload:res.data
    }))
}
export const storeManager = (data)=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_MANAGER,
        payload:res
    }))
}

export const storeTechnician = (data)=>dispatch=>{
    axios.post(`${API_URL}manager/technicians`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_MANAGER,
        payload:res
    }))
}

export const fetchTechnician =()=>dispatch=>{
    axios.get(`${API_URL}manager/technicians`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_TECHNICIANS,
        payload:res.data
    }))
}


export const showManagers = (type)=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}/${type}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_NOT_ASSIGNED_MANAGERS,
        payload:res
    }))
}

export const updateManager = (id,data)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:UPDATE_MANAGER,
        payload:res
    }))
}