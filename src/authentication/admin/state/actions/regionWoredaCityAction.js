import React from 'react'
import axios from 'axios'
import {FETCH_REGION_WOREDA} from '../actionConstants/adminConstants'
import { ADMIN_API_URL } from '../../../../constants/constants'

const PATH = 'region_woreda_city'
export const indexRegionWoreda = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_REGION_WOREDA,
        payload:res.data
    }))
}
