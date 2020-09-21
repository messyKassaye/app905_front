import axios from 'axios'
import { ADMIN_API_URL } from '../../../../constants/constants'
import {FETCHFAULTTYPE,STOREFAULTTPE} from '../actionConstants/adminConstants'

const PATH = 'fault_types'
export const fetchFaultTypes = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCHFAULTTYPE,
        payload:res.data
    }))
}

export const storeAccident = (data)=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STOREFAULTTPE,
        payload:res
    }))
}