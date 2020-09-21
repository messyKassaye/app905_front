import { green, orange } from "@material-ui/core/colors"

const  homeStyle = theme=>({

    root:{
        display:'flex',
        flexDirection:'column',
        minHeight:'100vh'
    },
    appBar:{
        backgroundColor:'transparent'
    },
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:100,
        flex:1
    },
    card:{
        width:500,
        margin:10,
        [theme.breakpoints.down('xs')]:{
            width:'90%'
        }
    },
    grow:{
        display:'flex',
        flexGrow:'1'
    },
    button:{
        textTransform:'none',
        marginRight:150,
        [theme.breakpoints.down('xs')]:{
            marginRight:10
        }
    },
    footer:{
        backgroundColor:'#3C4252',
        color:'white',
        padding:10
    },
    accidentPageContainer:{
        paddingLeft:150,
        paddingRight:150,
        [theme.breakpoints.down('xs')]:{
            paddingLeft:10,
            paddingRight:10,  
        }
    },
    span:{
        marginRight:10,
        marginLeft:10,
        color:orange[500]
    },
    start_using:{
        color:green[500],
        marginTop:15,
        marginBottom:15
    },
    text_input:{
        width:'100%',
        marginBottom:30
    },

})

export default homeStyle