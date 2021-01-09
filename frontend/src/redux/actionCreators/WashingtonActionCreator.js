
import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../../shared/urls';


export const fetchAllWashingtonData = () => dispatch => {

    dispatch(washingtonAllDataLoading());

    return fetch(baseUrl + 'store/findall')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(washingtonAllData => dispatch(addAllWashingtonData(washingtonAllData)))
        .catch(error => dispatch(washingtonAllDataFailed(error.message)));
};


export const washingtonAllDataLoading = () => ({
    type: ActionTypes.WASHINGTON_ALL_DATA_LOADING
});

export const washingtonAllDataFailed = errMess => ({
    type: ActionTypes.WASHINGTON_ALL_DATA_FAILED,
    payload: errMess
});

export const addAllWashingtonData = washingtonAllData => ({
    type: ActionTypes.WASHINGTON_ALL_DATA_ADD,
    payload: washingtonAllData
});



export const fetchAllWashingtonCounties = () => dispatch => {
    dispatch(washingtonAllCountiesLoading());

    return fetch(baseUrl + 'store/findallcounties')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(washingtonAllCounties => dispatch(findAllWashingtonCounties(washingtonAllCounties)))
        .catch(error => dispatch(washingtonAllCountiesFailed(error.message)));
};


export const washingtonAllCountiesLoading = () => ({
    type: ActionTypes.WASHINGTON_ALL_COUNTIES_LOADING
});

export const washingtonAllCountiesFailed = errMess => ({
    type: ActionTypes.WASHINGTON_ALL_COUNTIES_FAILED,
    payload: errMess
});

export const findAllWashingtonCounties = washingtonAllCounties => ({
    type: ActionTypes.WASHINGTON_ALL_COUNTIES,
    payload: washingtonAllCounties
});



export const fetchSelectedCounty = (newCountyValue) => dispatch => {

    dispatch(washingtonSelectCountyLoading());

    return fetch(baseUrl + `store/findbycounty/${newCountyValue}`)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addSelectedCounty(response)))
        .catch(error => dispatch(washingtonSelectCountyFailed(error.message)));
};

export const addSelectedCounty = selectedCounty => ({
    type: ActionTypes.WASHINGTON_ADD_SELECT_COUNTY,
    payload: selectedCounty
});

export const washingtonSelectCountyLoading = () => ({
    type: ActionTypes.WASHINGTON_SELECT_COUNTY_LOADING
});

export const washingtonSelectCountyFailed = errMess => ({
    type: ActionTypes.WASHINGTON_SELECT_COUNTY_FAILED,
    payload: errMess
});


export const fetchCompany = (newCompanyValueId) => dispatch => {

    dispatch(washingtonSelectCompanyLoading());

    return fetch(baseUrl + `store/findbycompanyid/${newCompanyValueId}`)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addSelectedCompany(response)))
        .catch(error => dispatch(washingtonSelectCompanyFailed(error.message)));
};

export const addSelectedCompany = selectedCompany => ({
    type: ActionTypes.WASHINGTON_ADD_SELECT_COMPANY,
    payload: selectedCompany
});

export const washingtonSelectCompanyLoading = () => ({
    type: ActionTypes.WASHINGTON_SELECT_COMPANY_LOADING
});

export const washingtonSelectCompanyFailed = errMess => ({
    type: ActionTypes.WASHINGTON_SELECT_COMPANY_FAILED,
    payload: errMess
});



