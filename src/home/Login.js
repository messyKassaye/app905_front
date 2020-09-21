import React from 'react'
import {translate} from "react-i18next";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import signup from './styles/signup_style'
import {Card, CardContent} from "@material-ui/core";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import LoadingButton from "../authentication/commons/LoadingButton";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { withRouter } from 'react-router-dom'
import {API_AUTH_URL} from "../constants/constants";
import {set, setRole} from "../TokenService";

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {
                "email": '',
                "password": ''
            },
            submitted: false,
            loading: false,
            finished: false,
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e) {
        const {formData} = this.state
        formData[e.target.name] = e.target.value
        this.setState(formData)
    }

    handleSubmit() {
        const {formData} = this.state
        this.setState({
            submitted: true,
            loading: true
        })
        axios.post(`${API_AUTH_URL}login`, formData, {
            headers: {
                'content-type': 'Application/json'
            },
            timeout:1000*5,
        })
            .then((res) => res.data)
            .then((response) => {
                set(response.token)
                setRole(JSON.stringify(response.role))
                this.props.history.push('/auth')
                window.location.reload()

            })
            .catch(onerror=>{
                if(!onerror.response){
                    this.setState({errorMessage:'networkError'})
                    this.setState({
                        loading: false,
                        finished: false,
                        submitted: false,
                    })
                }else {
                    let code = onerror.response.status
                    if(code===403){
                        this.setState({errorMessage:'Unauthorized user'})
                    }
                    this.setState({
                        loading: false,
                        finished: false,
                        submitted: false,
                    })
                }

            })
    }

    render() {
        const {classes} = this.props
        const {t} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.email.length > 0 && formData.password.length > 0
        return (
            <ValidatorForm
                 onSubmit={this.handleSubmit}
                 style={{padding:15}}
                            >
                                {
                                    <Typography component='p' className={classes.errors}>
                                    </Typography>
                                }
                                <TextValidator
                                    className={classes.text_input}
                                    label={'Email'}
                                    onChange={this.handleChange}
                                    name="email"
                                    type='email'
                                    value={this.state.formData.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['Please enter your email', 'is not valid email']}
                                />

                                <TextValidator
                                    className={classes.text_input}
                                    label={'Password'}
                                    onChange={this.handleChange}
                                    name="password"
                                    type='password'
                                    value={this.state.formData.password}
                                    validators={['required']}
                                    errorMessages={['Enter your password']}
                                />
                                <LoadingButton
                                        className={classes.signup_button}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={!isEnabled || this.state.submitted}
                                        loading={setLoading}
                                        text={'Login'}
                                        done={finished}
                                    >
                                        {
                                            'Login'
                                        }
                                    </LoadingButton>
                            </ValidatorForm>
        )
    }
}

export default withRouter(withStyles(signup)(Login))
