import {ASSIGN_FAULT_TO_GROUP} from '../managerConstants/managerConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'

const PATH = 'manager/fault_group'
export const assignFaultToGroup = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:ASSIGN_FAULT_TO_GROUP,
        payload:res
    }))
}