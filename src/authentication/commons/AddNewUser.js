import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Skeleton from "@material-ui/lab/Skeleton";
import LoadingButton from "./LoadingButton";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import signup from '../../home/styles/signup_style'
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {showMainDialog} from "../../authentication/admin/state/actions/dialogAction";
import {green} from "@material-ui/core/colors";
import {storeManager,storeTechnician} from '../admin/state/actions/managersAction'

class AddNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                password: '',
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

    generatePassword = ()=>{
        const password = Math.floor(1000 + Math.random() * 9000);
        const {formData}=this.state
        formData['password'] = password.toString()
        this.setState(formData)
    }
    handleSubmit = event=>{
        event.preventDefault()
        if(this.props.role===null){
            this.setState({
                submitted:true,
                loading:true
            })
            const {formData} = this.state
            this.props.storeManager(formData)
        }else{
            this.setState({
                submitted:true,
                loading:true
            })
            const {formData} = this.state
            this.props.storeTechnician(formData)
        }
        

    }

    handleRadionButton = (e)=>{
        const role = this.props.roles.filter(item=>item.name===e.target.value)
        const {formData} = this.state
        formData[e.target.name]=role[0].id
        this.setState(formData)
        console.log(formData)
    }

    componentDidMount() {
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

    render() {
        const {classes,t} =this.props
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.first_name.length>0&&formData.last_name.length>0 && formData.phone.length>0&&
            formData.email.length>0&&formData.password.length>0

        return (
            <div>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >
                    <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                    <TextValidator
                        className={classes.text_input}
                        label={'First name'}
                        onChange={this.handleChange}
                        name="first_name"
                        value={this.state.formData.first_name}
                        validators={['required']}
                        errorMessages={['please enter first name']}
                    />

                    <TextValidator
                        className={classes.text_input}
                        label={'Last name'}
                        onChange={this.handleChange}
                        name="last_name"
                        value={this.state.formData.last_name}
                        validators={['required']}
                        errorMessages={['Please enter last name']}
                    />

                    <TextValidator
                        className={classes.text_input}
                        label={'Phone number'}
                        onChange={this.handleChange}
                        name="phone"
                        value={this.state.formData.phone}
                        validators={['required']}
                        errorMessages={['Please enter phone number']}
                    />

                    <TextValidator
                        className={classes.text_input}
                        label={'email address'}
                        onChange={this.handleChange}
                        name="email"
                        value={this.state.formData.email}
                        validators={['required','isEmail']}
                        errorMessages={['Please enter email addrees','Incorrect email address']}
                    />
                    

                    <Grid container spacing={2}>
                        <Grid item md={7} xs={5}>
                            <TextValidator
                                className={classes.text_input}
                                label={'Password'}
                                onChange={this.handleChange}
                                name="password"
                                type='text'
                                value={this.state.formData.password}
                                validators={['required']}
                                errorMessages={['Please enter password']}
                            />
                        </Grid>
                        <Grid item md={5} xs={5} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Button onClick={this.generatePassword} color='primary' variant='contained' style={{textTransform:'none'}}>
                                Generate password
                            </Button>
                        </Grid>
                    </Grid>

                    <LoadingButton
                        style={{width:'100%',marginTop:15}}
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text={'Register'}
                        disabled={!isEnabled ||this.state.submitted}
                    >
                        {
                            'Register'
                        }
                    </LoadingButton>
                </ValidatorForm>
            </div>
        );
    }
}

const mapSteteToProps = state=>({
    response:state.authReducer.adminReducer.managerReducers.response
})

export default connect(mapSteteToProps,{showMainDialog,storeManager,storeTechnician})(withStyles(signup)(AddNewUser));
