import {
    ME,
   
} from "../authConstants/authConstants";

const  initialState = {
    loading:true,
    user:{},
    update:{},
    showUser:{},
    showLoading:true,
}

export default function (state=initialState,action) {
    switch (action.type) {

        case ME:
            return {
                ...state,
                loading:false,
                user : action.payload
            }
        default:
            return  state
    }
}
