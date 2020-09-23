import {FETCH_GROUPS, STORE_GROUPS,SHOW_GROUPS} from '../managerConstants/managerConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'
const PATH = 'groups'

export const fetchGroup = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_GROUPS,
        payload:res.data
    }))
}
export const storeGroup = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_GROUPS,
        payload:res
    }))
}

export const showGroup = (type)=>dispatch=>{
    axios.get(`${API_URL}${PATH}/${type}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:SHOW_GROUPS,
        payload:res
    }))
}