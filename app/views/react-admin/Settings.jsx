const { render, useState } = wp.element;
import React, { Component } from 'react';
import { withTranslation} from "react-i18next";
import { connect } from 'react-redux';

//Import Designs
import { Container,AppBar,Toolbar,Typography,Grid,FormControl,Tooltip,TextField,Link,Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

//Action to save and fetch data
import {fetchSetting,insertSetting,immutable} from '../actions';

class Settings extends Component{    
    constructor(props){
        super(props); 
        this.state = {language: "en"};
        this.state = {wait:0};
    }

    componentDidMount = () => {
        this.setState({wait : 0})
        this.props.fetchSetting(this.props.siteurl);
        this.setState({wait : 1})
    }

    handleClick = () => { 
        this.setState({wait : 0})
        this.props.insertSetting(this.props.siteurl,this.props.model.settings);   
        this.setState({wait : 1})
    }

    pointChange = (externalId,name) => (event,value) => {
        this.props.immutable(externalId,event.target.name,event.target.value);
    }

    render(){	
        const { t, i18n } = this.props;
        const values = this.props.model;
        if(values) {
            const {query_var,custom_point} = this.props.model.settings;
            return (
                <Container Fluid className="wpinp_admin_container">
                    <AppBar position="static" className="wpinp_app_bar">
                        <Toolbar>
                            <div className="wpinp_head"><Typography variant="h6">{this.props.PLUGIN_NAME} - {t("Version")} {this.props.PLUGIN_VERSION}</Typography></div>
                        </Toolbar>
                    </AppBar>
                    <Typography variant="h3" className="wpinp_admin_instc">{t("settings")}</Typography>
                    <div className="wpinp_setting_acc">
                        <Typography variant="h4">{t("common_settings")}</Typography>
                        <Grid container className="wpinp_form_grid">
                            <Grid item xs={2} className="wpinp_label"><Tooltip title={t("query_var")} arrow><Typography paragraph="true">{t("query_var")}</Typography></Tooltip></Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField className="wpinp_form_input" type="text" name="query_var" value={query_var} onChange={this.pointChange('settings')}/>
                                </FormControl>
                            </Grid>    
                        </Grid> 
                        <Grid container className="wpinp_form_grid">
                            <Grid item xs={2} className="wpinp_label"><Tooltip title={t("custom_end_point")} arrow><Typography paragraph="true">{t("custom_end_point")}</Typography></Tooltip></Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField className="wpinp_form_input" type="text" name="custom_point" value={custom_point} onChange={this.pointChange('settings')}/>
                                </FormControl>
                            </Grid>    
                        </Grid> 
                        <Grid container className="wpinp_form_grid">
                            <Grid item xs={2} className="wpinp_label"></Grid>
                            <Grid item xs={6}>
                                <Typography> <Link target="_blank" href={this.props.siteurl+'/index.php?'+query_var+'='+custom_point}>{this.props.siteurl+'/index.php?'+query_var+'='+custom_point}</Link></Typography>
                            </Grid>    
                        </Grid> 
                        <Grid container className="wpinp_form_grid">
                            <Grid item xs={2} className="wpinp_label"></Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" color="primary" onClick={this.handleClick} endIcon={<SaveIcon>send</SaveIcon>}>{t("save")}</Button>
                            </Grid>     
                        </Grid>  
                    </div>
                    
                </Container>
            )
        }else{
            return <Backdrop className="wpvc_back_loader" open="open">
                <CircularProgress color="inherit" />
            </Backdrop>
        }
    }
}

const settingstate = state =>{
   
    return {model:state.wpinpdata};
}

export default connect(settingstate,{immutable,insertSetting,fetchSetting})(withTranslation("translations")(Settings));
