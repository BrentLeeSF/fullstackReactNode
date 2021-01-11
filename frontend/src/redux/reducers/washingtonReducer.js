import * as ActionTypes from '../ActionTypes';

export const Washington = (state = {
        isLoading: true,
        errMess: null,
        washingtonData: [],
        washingtonCounties: [],
        countyCompaniesData: [],
        waCompanyInfo: [],
    }, action) => {

    switch (action.type) {

        case ActionTypes.WASHINGTON_ALL_COUNTIES:
            return {...state, isLoading: false, errMess: null, washingtonCounties: action.payload};
        case ActionTypes.WASHINGTON_ALL_COUNTIES_LOADING:
            return {...state, isLoading: true, errMess: null, washingtonCounties: []};
        case ActionTypes.WASHINGTON_ALL_COUNTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload };
        

        case ActionTypes.WASHINGTON_ALL_DATA_ADD:
            return {...state, isLoading: false, errMess: null, washingtonData: action.payload};
        case ActionTypes.WASHINGTON_ALL_DATA_LOADING:
            return {...state, isLoading: true, errMess: null,  washingtonData: []};
        case ActionTypes.WASHINGTON_ALL_DATA_FAILED:
            return {...state, isLoading: false, errMess: action.payload};


        case ActionTypes.WASHINGTON_ADD_SELECT_COUNTY:
            return {...state, isLoading: false, errMess: null, countyCompaniesData: action.payload};
        case ActionTypes.WASHINGTON_SELECT_COUNTY_LOADING:
            return {...state, isLoading: true, errMess: null, countyCompaniesData: []};
        case ActionTypes.WASHINGTON_SELECT_COUNTY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        

        case ActionTypes.WASHINGTON_ADD_SELECT_COMPANY:
            return {...state, isLoading: false, errMess: null, waCompanyInfo: action.payload};
        case ActionTypes.WASHINGTON_SELECT_COMPANY_LOADING:
            return {...state, isLoading: true, errMess: null, waCompanyInfo: []};
        case ActionTypes.WASHINGTON_SELECT_COMPANY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
            
        default:
            return state;
    }
};

