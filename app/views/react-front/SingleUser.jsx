const { render, useState } = wp.element;
import React, { Component } from 'react';
import { withTranslation} from "react-i18next";
import { connect } from 'react-redux';

//Import Designs
import {Typography,Button, Grid} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class SingleUser extends Component{    
    constructor(props){
        super(props); 
        this.state = {user: [],isLoading: true,isError: false,userid:0};
    }

    async componentDidMount() {
        this.setState({ isLoading: true, userid:this.props.user_id})
        const response = await fetch('https://jsonplaceholder.typicode.com/users/'+this.props.user_id)
        if (response.ok) {
          const user = await response.json()
          this.setState({ user, isLoading: false })
        } else {
          this.setState({ isError: true, isLoading: false })
        }
    }

    async componentDidUpdate (){
        let userid=this.state.userid;
        if(userid != this.props.user_id){
            this.setState({ isLoading: true, userid:this.props.user_id})
            const response = await fetch('https://jsonplaceholder.typicode.com/users/'+this.props.user_id)
            if (response.ok) {
              const user = await response.json()
              this.setState({ user, isLoading: false })
            } else {
              this.setState({ isError: true, isLoading: false })
            }
        }
    }

    render(){	
        const { t, i18n } = this.props;
        const {user,isLoading,isError} = this.state;

        if (isLoading) {
            return <Backdrop className="wpvc_back_loader" open="open">
                        <CircularProgress color="inherit" />
                    </Backdrop>
        }
    
        if (isError) {
            return <Alert className="wpinp_alert" severity="error">{t('error_users')}</Alert>
        }
        
        return (
            <div className="wpinp_user_grid">
               <Grid container>
                    <Grid item xs="12">
                        <Typography variant="h3" className="user_header">{t("user_header")}</Typography>                      
                    </Grid>

                    <Grid item xs={6} sm={6} className="wpinp_user_grid_item">
                        <Typography variant="h5">{t("name")+user.name}</Typography>
                        <Typography variant="h5">{t("user_name")+user.username}</Typography>
                        <Typography variant="h5">{t("email")+user.email}</Typography>
                        <Typography variant="h5">{t("phone")+user.phone}</Typography>
                        <Typography variant="h5">{t("website")+user.website}</Typography>
                        <Typography variant="h5">{t("company")+user.company.name}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} className="wpinp_user_grid_item">
                        <Typography variant="h5">{t("address")}</Typography>
                        <Typography>{t("suite")+user.address.suite}</Typography>
                        <Typography>{t("street")+user.address.street}</Typography>
                        <Typography>{t("city")+user.address.city}</Typography>
                        <Typography>{t("zip")+user.address.zipcode}</Typography>
                    </Grid>

                    {this.props.user_id > 1 &&           
                    <Grid item xs="4" className="wpinp_previous">
                        <Button variant="contained" onClick={() => this.props.getNextprev('prev')}>{t("previous")}</Button>
                    </Grid>
                    }{this.props.user_id == 1 &&
                        <Grid item xs="4" className="wpinp_previous"></Grid>
                    }
                    <Grid item xs="4" className="wpinp_back">
                        <Button variant="contained" color="primary" onClick={this.props.clearUser} >{t("back")}</Button>
                    </Grid>
                    <Grid item xs="4" className="wpinp_next">
                        <Button variant="contained" onClick={() => this.props.getNextprev('next')}>{t("next")}</Button>
                    </Grid>

               </Grid>
            </div>
        )
    }
}

export default connect()(withTranslation("translations")(SingleUser));
