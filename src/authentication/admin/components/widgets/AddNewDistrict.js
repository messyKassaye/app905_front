import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import withStyles from '@material-ui/core/styles/withStyles'
import signup from '../../../../home/styles/signup_style'
import {storeDistrict} from '../../state/actions/districtsAction'
import {connect} from 'react-redux'
import {Typography} from '@material-ui/core'
import {green} from '@material-ui/core/colors'
import LoadingButton from '../../../commons/LoadingButton'
import {showMainDialog} from '../../state/actions/dialogAction'
class AddNewDistrict extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            formData:{
                name:''
            },
            submitted:false,
            loading:false,
            finished:false
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        this.props.storeDistrict(formData)

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
            setTimeout(()=>{
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)

        }
    }

    render(){
        const {classes} = this.props
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.name.length
        return (
            <div style={{paddingLeft:50,paddingRight:50}}>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >

                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                <TextValidator
                    className={classes.text_input}
                    label={'District name'}
                    onChange={this.handleChange}
                    name="name"
                    value={this.state.formData.name}
                    validators={['required']}
                    errorMessages={['please enter district name']}
                />

                    <LoadingButton
                        style={{width:'100%',marginTop:15}}
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text={'Register distirct'}
                        disabled={!isEnabled ||this.state.submitted}
                    >
                        {
                            'Register distirct'
                        }
                    </LoadingButton>
            </ValidatorForm>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.adminReducer.districtReducers.response
})

export default connect(mapStateToProps,{storeDistrict,showMainDialog})
(withStyles(signup)(AddNewDistrict))