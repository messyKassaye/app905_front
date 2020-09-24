import {ASSIGN_GROUP} from '../managerConstants/managerConstants'
import axios from 'axios'
import { API_URL } from '../../../../constants/constants'

const PATH = 'manager/group_user'

export const assginGroup = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
    .then(response=>response.data)
    .then(res=>dispatch(
        {
            type:ASSIGN_GROUP,
            payload:res
        }
    ))
}