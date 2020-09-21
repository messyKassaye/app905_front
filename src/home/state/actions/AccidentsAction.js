import {SEND_ACCIDENT} from '../actionConstants/HomeConstants'
import axios from 'axios'
import { API_URL } from '../../../constants/constants'
import {SEND_ACCIDENTS} from '../actionConstants/HomeConstants'

const PATH = 'accidents'
export const sendAccident = (data)=>dispatch=>{
   axios.post(`${API_URL}${PATH}`,data)
   .then(response=>response.data)
   .then(res=>dispatch({
       type:SEND_ACCIDENTS,
       payload:res
   }))
}