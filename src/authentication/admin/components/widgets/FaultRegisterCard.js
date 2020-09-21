import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import LoadingButton from '../../../commons/LoadingButton'
import withStyles from '@material-ui/core/styles/withStyles'
import { green, red } from '@material-ui/core/colors'
import faultRegistrationStyle from '../style/faultRegistrationStyle'
import {storeAccident} from '../../state/actions/FaultTypeAction'
import {connect} from 'react-redux'
import priority from '../../data/priorities'
import {showMainDialog} from '../../state/actions/dialogAction'
class FaultRegisterCard extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            formData:{
                name:'',
                priority:0
            },
            submitted: false,
            loading: false,
            finished: false,
        }
    }

    handleChange = (e)=>{
        const {formData} = this.state
        formData[e.target.name] = e.target.value
        this.setState(formData)
    }

    handleBankSelect = () => {
        this.setState({
            isBankSelected: false
        })
    }

    handleBankSelectOpen = () => {
        this.setState({
            isBankSelected: true
        })
    }

    handleBankSelectChange = (event) => {
        this.setState({
            bankValue: event.target.value,
        })

        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)

    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({
            submitted: true,
            loading: true
        })
        const {formData} = this.state
        this.props.storeAccident(formData)
    }

    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.response.status){
            const {formData} = this.state
            formData['name'] = ''
            formData['priority'] = ''
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
                formData,
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
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.name.length > 0 && formData.priority > 0
        return(
            <ValidatorForm
                             onSubmit={this.handleSubmit}
                             className={classes.form}>
                            <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                            <TextValidator
                            className={classes.text_input}
                            label={'Fault name  E.g ሽቦ መበጠስ'}
                            onChange={this.handleChange}
                            name="name"
                            type='text'
                            value={this.state.formData.name}
                            validators={['required']}
                            errorMessages={['Please enter fault name']}
                        
                            />
                                <FormControl className={classes.text_input}>
                                                <InputLabel
                                                >{'Select priority level'}</InputLabel>
                                                <Select
                                                    name='priority'
                                                    value={this.state.priority}
                                                    open={this.state.priority}
                                                    onClose={this.handleBankSelect}
                                                    onOpen={this.handleBankSelectOpen}
                                                    onChange={this.handleBankSelectChange}
                                                >
                                                    {
                                                        priority.map(items => (
                                                            <MenuItem key={items.id} value={items.id}
                                                                      name={items.value}>{items.value}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                 </FormControl>

                                 <LoadingButton
                                        className={classes.text_input}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={!isEnabled || this.state.submitted}
                                        loading={setLoading}
                                        text={'Register priority'}
                                        done={finished}
                                    >
                                        {
                                            'Register priority'
                                        }
                                    </LoadingButton>
                        </ValidatorForm>
        )
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.adminReducer.faultTypeReducers.response
})
export default connect(mapStateToProps,{storeAccident,showMainDialog})
(withStyles(faultRegistrationStyle)(FaultRegisterCard))