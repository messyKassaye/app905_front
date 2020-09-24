import { Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import {fetchAccidentTypes} from './state/actions/AccidentTypesAction'
import {sendAccident} from './state/actions/AccidentsAction'
import { Skeleton } from '@material-ui/lab'
import { green, grey } from '@material-ui/core/colors'
import homeStyle from './styles/homeStyle'
import withStyles from '@material-ui/core/styles/withStyles'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import {fetchRegions} from './state/actions/RegionSubcityZoneWoredaAction'
import LoadingButton from '../authentication/commons/LoadingButton'
import {translate} from "react-i18next";

class AccidentsPage extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            formData:{
                fault_type_id:'',
                region_id:'',
                sub_city_zone_id:'',
                woreda_city_id:'',
                specific_name:'',
                sender_phone:''
            },
            accidentSelected:false,
            regionSelected:false,
            selectedSubCity:[],
            subCitySelected:false,
            selectedWoreda:[],
            isWoredaSelected:false,
            submittedDone:false
        }
    }
    componentDidMount(){
        this.props.fetchAccidentTypes()
        this.props.fetchRegions()
    }

    handleAccidentSelect = () => {
        this.setState({
            isBankSelected: false
        })
    }

    handleAccidentSelectOpen = () => {
        this.setState({
            isBankSelected: true
        })
    }

    

    handleAccidentSelectChange = (event) => {
        this.setState({
            accidentSelected: true,
        })

        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
        

    }

    handleRegionSelect = () => {
        this.setState({
            isRegionSelected: false
        })
    }

    handleRegionSelectOpen = () => {
        this.setState({
            isRegionSelected: true
        })
    }

    handleRegionSelectChange = (event) => {
        this.setState({
            regionSelected:true
        })
        const {formData} = this.state
        formData[event.target.name] = event.target.value.id;
        this.setState(formData)

        this.setState({
            selectedSubCity:event.target.value.child
        })

    }

    handleSubcitySelect = () => {
        this.setState({
            isSubcitySelected: false
        })
    }

    handleSubcitySelectOpen = () => {
        this.setState({
            isSubcitySelected: true
        })
    }

    handleSubcitySelectChange = (event) => {
        
        const {formData} = this.state
        formData[event.target.name] = event.target.value.id;
        this.setState(formData)

        this.setState({
            subCitySelected:true,
            selectedWoreda:event.target.value.child
        })
    }

    handleWoredaSelect = () => {
        this.setState({
            isWoredaSelected: false
        })
    }

    handleWoredaSelectOpen = () => {
        this.setState({
            isWoredaSelected: true
        })
    }

    handleWoredaSelectChange = (event) => {
        
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)

        this.setState({
            isWoredaSelected:true,
        })
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
        this.props.sendAccident(formData)

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
                submittedDone:true
            })
        }
    }
    render(){
        const {classes,t} = this.props
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.specific_name.length>0&&formData.sender_phone.length>0
        return (
            <Container maxWidth={'md'}>
                <Card>
                    <CardContent className ={classes.accidentPageContainer}>
                        {
                            this.props.loading
                            ?
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} sm={12}>
                                            <Skeleton
                                             variant={'rect'}
                                             width={'90%'}
                                             height={30}
                                             style={{backgroundColor:grey[500]}}
                                            />
                                        </Grid>

                                        <Grid item md={12} xs={12} sm={12}>
                                            <Skeleton
                                             variant={'rect'}
                                             width={'90%'}
                                             height={30}
                                             style={{backgroundColor:grey[500]}}
                                            />
                                        </Grid>

                                        <Grid item md={12} xs={12} sm={12}>
                                            <Skeleton
                                             variant={'rect'}
                                             width={'90%'}
                                             height={30}
                                             style={{backgroundColor:grey[500]}}
                                            />
                                        </Grid>

                                        <Grid item md={12} xs={12} sm={12}>
                                            <Skeleton
                                             variant={'rect'}
                                             width={'90%'}
                                             height={30}
                                             style={{backgroundColor:grey[500]}}
                                            />
                                        </Grid>
                                    </Grid>
                                )
                            :
                                (
                                    <div>
                                        {
                                            this.state.submittedDone
                                            ?
                                                (
                                                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                                                )
                                            :
                                                (
                                                    <Grid container spacing={2}>
                                                    <Grid item md={12} xs={12} sm={12}>
                                                        <Typography>
                                                             {t('home.first_text')}
                                                             <span className={classes.span}>905</span> 
                                                             {t('home.second_text')}
                                                        </Typography>
                                                        <Typography className={classes.start_using}>
                                                            {t('home.start_using')}<span>App905</span>
                                                        </Typography>
            
                                                        <ValidatorForm
                                                         onSubmit={this.handleSubmit}
                                                        >
            
                                                            <FormControl className={classes.text_input}>
                                                                <InputLabel
                                                                >{t('home.accident_type')}</InputLabel>
                                                                <Select
                                                                    name='fault_type_id'
                                                                    value={this.state.priority}
                                                                    open={this.state.priority}
                                                                    onClose={this.handleAccidentSelect}
                                                                    onOpen={this.handleAccidentSelectOpen}
                                                                    onChange={this.handleAccidentSelectChange}
                                                                >
                                                                    {
                                                                        this.props.accidentTypes.map(items => (
                                                                            <MenuItem key={items.id} value={items.id}
                                                                                    name={items.name}>{items.name}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                        
                                                            {
                                                                this.state.accidentSelected
                                                                ?
                                                                    (
                                                                        <FormControl className={classes.text_input}>
                                                                        <InputLabel
                                                                        >{t('home.select_region')}</InputLabel>
                                                                        <Select
                                                                            name='region_id'
                                                                            value={this.state.region}
                                                                            open={this.state.region}
                                                                            onClose={this.handleRegionSelect}
                                                                            onOpen={this.handleRegionSelectOpen}
                                                                            onChange={this.handleRegionSelectChange}
                                                                        >
                                                                            {
                                                                                this.props.regions.map(items => (
                                                                                    <MenuItem key={items.id} value={items}
                                                                                            name={items.name}>{items.name}</MenuItem>
                                                                                ))
                                                                            }
                                                                        </Select>
                                                                    </FormControl>
                                                                    )
                                                                :
                                                                    (null)
                                                            }
            
                                                            {
                                                                this.state.regionSelected
                                                                ?
                                                                    (
                                                                        <FormControl className={classes.text_input}>
                                                                        <InputLabel
                                                                        >{t('home.select_sub_city')}</InputLabel>
                                                                        <Select
                                                                            name='sub_city_zone_id'
                                                                            value={this.state.subcity}
                                                                            open={this.state.subcity}
                                                                            onClose={this.handleSubcitySelect}
                                                                            onOpen={this.handleSubcitySelectOpen}
                                                                            onChange={this.handleSubcitySelectChange}
                                                                        >
                                                                            {
                                                                                this.state.selectedSubCity.map(items => (
                                                                                    <MenuItem key={items.id} value={items}
                                                                                            name={items.name}>{items.name}</MenuItem>
                                                                                ))
                                                                            }
                                                                        </Select>
                                                                    </FormControl>
                                                                    )
                                                                :
                                                                    (null)
                                                            }
            
                                                            {
                                                                this.state.subCitySelected
                                                                ?
                                                                    (
                                                                        <FormControl className={classes.text_input}>
                                                                        <InputLabel
                                                                        >{t('home.select_woreda')}</InputLabel>
                                                                        <Select
                                                                            name='woreda_city_id'
                                                                            value={this.state.woreda}
                                                                            open={this.state.woreda}
                                                                            onClose={this.handleWoredaSelect}
                                                                            onOpen={this.handleWoredaSelectOpen}
                                                                            onChange={this.handleWoredaSelectChange}
                                                                        >
                                                                            {
                                                                                this.state.selectedWoreda.map(items => (
                                                                                    <MenuItem key={items.id} value={items.id}
                                                                                            name={items.name}>{items.name}</MenuItem>
                                                                                ))
                                                                            }
                                                                        </Select>
                                                                    </FormControl>
                                                                    )
                                                                :
                                                                    (null)
                                                            }
            
                                                            {
                                                                this.state.isWoredaSelected
                                                                ?
                                                                    (
                                                                        <div>
                                                                            <TextValidator
                                                                            className={classes.text_input}
                                                                            label={t('home.specific_name')}
                                                                            onChange={this.handleChange}
                                                                            name="specific_name"
                                                                            value={this.state.formData.specific_name}
                                                                            validators={['required']}
                                                                            errorMessages={['please enter specific name']}
                                                                            />
            
                                                                         <TextValidator
                                                                            className={classes.text_input}
                                                                            label={t('home.phone_number')}
                                                                            onChange={this.handleChange}
                                                                            name="sender_phone"
                                                                            value={this.state.formData.sender_phone}
                                                                            validators={['required']}
                                                                            errorMessages={['please tell us your phone number. This will help us to contact with you']}
                                                                            />
            
                                                                            <LoadingButton
                                                                                style={{width:'100%',marginTop:15,textTransform:'none'}}
                                                                                color="primary"
                                                                                variant="contained"
                                                                                type="submit"
                                                                                loading={setLoading}
                                                                                done={finished}
                                                                                text={t('home.send_accident')}
                                                                                disabled={!isEnabled ||this.state.submitted}
                                                                            >
                                                                                {
                                                                                    t('home.send_accident')
                                                                                }
                                                                            </LoadingButton>
                                                                        </div>
                                                                    )
                                                                :
                                                                    (null)
                                                            }
                                                        </ValidatorForm>
                                                    </Grid>
                                                </Grid>
                                                )
                                        }
                                    </div>
                                    
                                )
                        }
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = state=>({
    loading:state.homeReducer.accidentTypeReducer.loading,
    accidentTypes:state.homeReducer.accidentTypeReducer.accidentTypes,
    regions:state.homeReducer.regionSubcityWoredaReducer.regions,
    response:state.homeReducer.accidentsReducer.response

})
export default translate('common')
(connect(mapStateToProps,{fetchAccidentTypes,fetchRegions,sendAccident})
(withStyles(homeStyle)(AccidentsPage)))