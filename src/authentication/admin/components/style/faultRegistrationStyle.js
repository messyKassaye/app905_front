const  faultRegistrationStyle = theme=>({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    card:{
        width:600,
        margin:10,
        [theme.breakpoints.down('xs')]:{
            width:'90%'
        }
    },
    form:{
        zIndex:12,
        paddingLeft: 20,
        paddingRight: 20,
        [theme.breakpoints.down('xs')]:{
            paddingLeft: 0,
            paddingRight: 0,
        }
    },
    text_input:{
        width:'100%',
        marginBottom:30
    },

})

export default faultRegistrationStyle