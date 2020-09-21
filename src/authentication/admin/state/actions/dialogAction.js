import {SHOW_MAIN_DIALOG} from "../actionConstants/adminConstants";

export const showMainDialog = (data)=>dispatch=>{
    dispatch({
        type:SHOW_MAIN_DIALOG,
        payload:data
    })
}
