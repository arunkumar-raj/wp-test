const { render, useState } = wp.element;
import React, { Component } from 'react';
import { withTranslation} from "react-i18next";
import { connect } from 'react-redux';

//Import Designs
import {Grid} from '@material-ui/core';

import UserList from './UserList.jsx';
import SingleUser from './SingleUser.jsx';

class Users extends Component{    
    constructor(props){
        super(props); 
        this.state = {user_id:0};
    }

    handleClick = (userid) => {
        this.setState({user_id:userid});
    }

    clearState = () =>{
        this.setState({user_id:0});
    }

    nextPrev = (val) =>{
        let userid = this.state.user_id;
        if(val=='prev'){
            --userid;
            if(userid > 0)
                this.setState({user_id:userid});
        }else{
            ++userid;
            this.setState({user_id:userid});
        }
    }

    render(){	
        
        const { t, i18n } = this.props;  
        return (
            <Grid container>
                {this.state.user_id == 0 && <UserList valClick={this.handleClick} /> } 
                {this.state.user_id > 0 && <SingleUser clearUser={this.clearState} getNextprev={this.nextPrev} user_id={this.state.user_id} /> } 
            </Grid>
        )
    }
}

export default connect()(withTranslation("translations")(Users));
