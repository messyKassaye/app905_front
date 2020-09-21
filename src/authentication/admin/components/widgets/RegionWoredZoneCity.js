import { FormControl, Grid, Input, InputLabel, ListItemText, MenuItem, Select, Typography } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import { CheckBox, Satellite } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import ChipInput from 'material-ui-chip-input'
import React from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import LoadingButton from '../../../commons/LoadingButton'
import {indexRegionWoreda} from '../../state/actions/regionWoredaCityAction'
import {storeArea} from '../../state/actions/districtAreaAction'
import {showMainDialog} from '../../state/actions/dialogAction'
class RegionWoredaZoneCity extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            formData:{
                'district_id':'',
                'region_id':'',
                'sub_city_zone_id':'',
                'woreda':'',
                'specific_name':''
            },
            isRegionSelected:false,
            selectedRegion:[]
        }
    }

    componentDidMount(){
        this.props.indexRegionWoreda();
        const {formData} =this.state
        formData['district_id']=this.props.districtId
        this.setState(formData)
        
    }

   

    handleMediaSelect = () => {
        this.setState({
            isMediaSelected: false
        })
    }

    handleMediaSelectOpen = () => {
        this.setState({
            isMediaSelected: true
        })
    }

    handleMediaSelectChange = (event) => {
        const {formData} = this.state
        formData[event.target.name] = event.target.value.id
        this.setState({
            formData,
            isRegionSelected:true,
            selectedRegion:event.target.value.child
        })
        console.log(event.target.value.id)
      
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

    handleSubCitySelectChange = (event) => {
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
        console.log(formData)
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        this.props.storeArea(formData)
        console.log(formData)
    }

    handleWoredaChange = (data)=>{
       const {formData} = this.state
       formData['woreda'] = data.toString();
       this.setState(formData)
    }

    handleSpecificNameChange = (data)=>{
        const {formData} = this.state
        formData['specific_name'] = data.toString()
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
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.region_id>0&&formData.sub_city_zone_id>0&&
        formData.woreda.length>0&&formData.specific_name.length>0

        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <Grid container spacing={2}>
                                    <Grid item md={12} xs={12} sm={12}>
                                        <Skeleton
                                        variant={'rect'}
                                        width={'90%'}
                                        height={100}
                                        style={{backgroundColor:grey[500]}}
                                        />
                                    </Grid>

                                    <Grid item md={12} xs={12} sm={12}>
                                        <Skeleton
                                        variant={'rect'}
                                        width={'90%'}
                                        height={100}
                                        style={{backgroundColor:grey[500]}}
                                        />
                                    </Grid>
                            </Grid>
                        )
                    :
                        (
                            <ValidatorForm 
                                onSubmit={this.handleSubmit}
                                style={{display:'flex',flexDirection:'column',
                                alignItems:'center',padding:10}}>
                                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                            <FormControl style={{width:'90%',marginBottom:15}}>
                                <InputLabel
                                    htmlFor="demo-controlled-open-select">{'Select region'}
                                </InputLabel>
                                <Select
                                    name='region_id'
                                    value={this.state.mediaTypeValue}
                                    open={this.state.isMediaSelected}
                                    onClose={this.handleMediaSelect}
                                    onOpen={this.handleMediaSelectOpen}
                                    onChange={this.handleMediaSelectChange}
                                    >
                                     {
                                         this.props.regionWoredaCities.map(items => (
                                           <MenuItem key={items.name} value={items}
                                                                                                                 name={items.name}>{items.name}</MenuItem>
                                            ))
                                      }                                                          
                                </Select>                                                
                            </FormControl>
                            {
                                this.state.isRegionSelected
                                ?
                                    (
                                        <div style={{width:'90%'}}>

                                    <FormControl style={{width:'100%',marginBottom:15}}>
                                        <InputLabel
                                            htmlFor="demo-controlled-select">
                                                Select sub city or zone
                                        </InputLabel>
                                        <Select
                                            name='sub_city_zone_id'
                                            value={this.state.subcityTypeValue}
                                            open={this.state.isSubcitySelected}
                                            onClose={this.handleSubcitySelect}
                                            onOpen={this.handleSubcitySelectOpen}
                                            onChange={this.handleSubCitySelectChange}
                                            >
                                            {
                                                this.state.selectedRegion.map(items => (
                                                <MenuItem key={items.name} value={items.id}
                                                                                                                        name={items.name}>{items.name}</MenuItem>
                                                    ))
                                            }                                                          
                                        </Select>                                                
                                    </FormControl>
                                                <ChipInput
                                                     style={{width:'100%',marginBottom:25}}
                                                     placeholder={'Add woreda or city E.g woreda 4, Woreda 4'}
                                                    onChange={(chips) => this.handleWoredaChange(chips)}
                                                 />

                                                <ChipInput
                                                  style={{width:'100%'}}
                                                   placeholder={'Add Specific names E.g 4 killo,Menilik hospital'}
                                                   onChange={(chips) => this.handleSpecificNameChange(chips)}
                                                />
                                        </div>
                                    )
                                :
                                    (null)
                            }
                            <LoadingButton
                                style={{textTransform:'none',width:'90%',marginTop:10}}
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={!isEnabled || this.state.submitted}
                                loading={setLoading}
                                text={'Add area'}
                                done={finished}
                            >
                                Add area
                            </LoadingButton>
                        </ValidatorForm>
                        )
                }
            </div>
            
        )
    }
}

const mapStateToProps = state=>({
    regionWoredaCities:state.authReducer.adminReducer.regionWoredaCityReducer.regionWoredaCities,
    loading:state.authReducer.adminReducer.regionWoredaCityReducer.loading,
    response:state.authReducer.adminReducer.districtsAreaReducer.response
})
export default connect(mapStateToProps,{indexRegionWoreda,storeArea,showMainDialog})(RegionWoredaZoneCity)