import { deepOrange, green, red } from "@material-ui/core/colors"

export const findFaultColor = (id)=>{
    if(id===1){
        return green[500]
    }else if(id===2){
        return deepOrange[500]
    }else if(id===3){
        return red[500]
    }
}