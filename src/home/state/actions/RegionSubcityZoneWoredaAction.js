import {FETCH_REGION_SUBCITY_ZONE_WOREDA} from '../actionConstants/HomeConstants'
import axios from 'axios'
import { API_URL } from '../../../constants/constants'
const PATH = 'region_sub_city_woreda'

export const fetchRegions = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:FETCH_REGION_SUBCITY_ZONE_WOREDA,
        payload:res.data
    }))
}