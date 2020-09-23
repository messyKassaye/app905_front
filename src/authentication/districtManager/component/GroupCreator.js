import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import LoadingButton from '../../commons/LoadingButton'
import {storeGroup} from '../state/action/groupsAction'
import withStyles from '@material-ui/core/styles/withStyles'
import signup from '../../../home/styles/signup_style'
import { Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import {showMainDialog} from '../../admin/state/actions/dialogAction'
class GroupCreator extends React.Component{
        constructor(props){
            super(props)
            this.state ={
                formData:{
                    name:'',
                    district_id:''
                }
            }
        }

    handleChange = (event)=>{
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
        this.props.storeGroup(formData)
    }

    componentDidMount(){
        const {formData} = this.state
        formData['district_id'] = this.props.districtId
        this.setState(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
            setTimeout(()=>{
                window.location.reload()
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
        return(
            <ValidatorForm 
            onSubmit={this.handleSubmit}
            style={{paddingLeft:25,paddingRight:25}}>
                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                    <TextValidator
                    className={classes.text_input}
                    label={'Group name'}
                    onChange={this.handleChange}
                    name="name"
                    value={this.state.formData.name}
                    validators={['required']}
                    errorMessages={['please enter group name']}
                />

                    <LoadingButton
                        style={{width:'100%',marginTop:15}}
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text={'Create group'}
                        disabled={!isEnabled ||this.state.submitted}
                    >
                        {
                            'Create group'
                        }
                    </LoadingButton>
            </ValidatorForm>
        )
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.districtManagersReducer.groupsReducer.response
})

export default withStyles(signup)
(connect(mapStateToProps,{storeGroup,showMainDialog})(GroupCreator))