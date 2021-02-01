export const fetchSetting = (url) => { 
    let dataURL  =   url + "/wp-json/wp-test/v1/wpinpsettingfetch";  
    return dispatch => {
        return fetch(dataURL)
            .then(res => res.json())
            .then(json => {                
                //After Data Loading Send to Get Data to display the data respectively
                dispatch(getData(json));
                return json;
            });
    };
};

export const insertSetting = (url,insertData) => { 
    let dataURL  =   url + "/wp-json/wp-test/v1/wpinpupdatesetting";  
    return dispatch => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(insertData)
        };

        return fetch(dataURL,requestOptions)
            .then(res => res.json())
            .then(json => {     
                dispatch(getData(json));           
                return json;
            });           
    };
};

export const getData = results => ({
    type: 'GET_SETTING',
    payload: results
});

export const updateData = (id,value) => ({
    type: 'UPDATE_SETTING',
    payload: {
        id: id,
        value : value,
    }
});


//Temporary draft update on immute
export const immutable = (id,internalId,value) => ({
    type: 'UPDATE_DRAFT',
    payload: {
        id: id,
        internalId : internalId,
        value : value,
    }
});