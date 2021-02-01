const { render, useState } = wp.element;
import React, { Component } from 'react';
import { withTranslation} from "react-i18next";
import { connect } from 'react-redux';

//Import Designs
import {Link} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MUIDataTable from "mui-datatables";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserList extends Component{    
    constructor(props){
        super(props); 
        this.state = {users: [],isLoading: true,isError: false};
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (response.ok) {
          const users = await response.json()
          this.setState({ users, isLoading: false })
        } else {
          this.setState({ isError: true, isLoading: false })
        }
    }

    render(){	
        const { t, i18n } = this.props;
        const {users,isLoading,isError} = this.state;

        if (isLoading) {
            return <Backdrop className="wpvc_back_loader" open="open">
                        <CircularProgress color="inherit" />
                    </Backdrop>
        }
    
        if (isError) {
            return <Alert className="wpinp_alert" severity="error">{t('error_users')}</Alert>
        }

        const columns = [
            {name: "id",label: "ID",options: {sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Link href="javascript:void(0)" onClick={() => this.props.valClick(value)}>{value}</Link>
                  
                )}
            },
            {name: "name",label: "Name",options: {filter: false,sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Link href="javascript:void(0)" onClick={() => this.props.valClick(tableMeta.rowData[0])}>{value}</Link>
                )}
            },
            {name: "username",label: "User Name",options: {filter: true,sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Link href="javascript:void(0)" onClick={() => this.props.valClick(tableMeta.rowData[0])}>{value}</Link>
                )}
            },
            {name: "email",label: "Email",options: {filter: true,sort: true,}},
            {name: "phone",label: "Phone",options: {filter: true,sort: true,}},
            {name: "website",label: "website",options: {filter: false,sort: false}},
        ];

        const options = {
            filter: true,
            filterType: "dropdown",
            selectableRowsHeader:false,
            selectableRows: false,
            selectableRowsHideCheckboxes:true,
            selectableRowsOnClick:false
        };
                
        return (
            <div className="wpinp_datagrid">
                <MUIDataTable className="wpinp_data_table"
                    title={"Users List"}
                    data={users}
                    columns={columns}
                    options={options}
                />
            </div>
        )
    }
}

export default connect()(withTranslation("translations")(UserList));
