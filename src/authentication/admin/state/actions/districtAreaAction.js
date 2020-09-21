import React from 'react'
import axios from 'axios'
import { ADMIN_API_URL } from '../../../../constants/constants'
import { STORE_AREA } from '../actionConstants/adminConstants'

const PATH = 'district_areas'
export const storeArea = (data)=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:STORE_AREA,
        payload:res
    }))
}