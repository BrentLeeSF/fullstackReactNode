import React, { useState, useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import Table from './Table';
import Chart from './Chart';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { fetchAllWashingtonData, fetchAllWashingtonCounties, fetchSelectedCounty, fetchCompany } from '../redux/actionCreators/WashingtonActionCreator';


const mapStateToProps = state => {
    return {
        allWAData: state.washington.washingtonData,
        countyList: state.washington.washingtonCounties,
        countyCompaniesData: state.washington.countyCompaniesData,
        companyInfo: state.washington.waCompanyInfo
    };
};

const mapDispatchToProps = {
    fetchAllWashingtonData: () => (fetchAllWashingtonData()),
    fetchAllWashingtonCounties: () => (fetchAllWashingtonCounties()),
    fetchSelectedCounty: (newCountyValue) => (fetchSelectedCounty(newCountyValue)),
    fetchCompany: (newCompanyValueId) => (fetchCompany(newCompanyValueId))
};


const Main = (props) => {

    const { 
        fetchAllWashingtonData, 
        fetchAllWashingtonCounties, 
        allWAData, 
        countyList, 
        countyCompaniesData, 
        companyInfo } = props;

    const [countyDropDownOpen, setCountyDropDownOpen] = useState(false);
    const [companyDropDownOpen, setCompanyDropDownOpen] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {
        fetchAllWashingtonData();
        fetchAllWashingtonCounties();
    }, [fetchAllWashingtonData, fetchAllWashingtonCounties]);

    const onCountySelect = async (newCountyValue) => {
        dispatch(fetchSelectedCounty(newCountyValue.county));
    }

    const onCompanySelect = async (newCompanyValue) => {
        dispatch(fetchCompany(newCompanyValue.id));
    }


        return (
            <Container fluid="sm">
                <div className="App">
                    <div>
                        <p>Select County and Company to see sales data. Or, search or click table</p>
                    </div>
                    <div>
                        <Row>
                            <div className="county-dropdown">
                                <Col sm={12} md={3} lg={2}>
                                    <Dropdown direction="down" bg="dark" variant="dark">
                                        <Dropdown.Toggle onToggle={e => setCountyDropDownOpen(!countyDropDownOpen)} id="county-dropdown" bg="dark" variant="dark">
                                            Select County
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu direction="down" bg="dark" variant="dark">

                                            {countyList.map((eachCounty, index) => 
                                                <div key={index}>
                                                    <Dropdown.Item onClick={() => onCountySelect(eachCounty)}>{eachCounty.county}</Dropdown.Item>
                                                </div>
                                            )}

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </div>
                            <div className="company-dropdown">
                                <Col sm={12} md={3} lg={2}>
                                    <Dropdown direction="down" bg="dark" variant="dark">
                                        <Dropdown.Toggle onToggle={e => setCompanyDropDownOpen(!companyDropDownOpen)} id="company-dropdown" bg="dark" variant="dark">
                                            Select Company
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu direction="down" bg="dark" variant="dark">
                                            {countyCompaniesData.map((eachCompany, index) => 
                                                <div key={index}>
                                                    <Dropdown.Item onClick={() => onCompanySelect(eachCompany)}>{eachCompany.name}</Dropdown.Item>
                                                </div>
                                            )}
                                        </Dropdown.Menu>    
                                    </Dropdown>
                                </Col>
                            </div>
                        </Row>
                    </div>
                    <div>
                        <br />
                            <Chart companyInfo={companyInfo} />
                        <br />
                    </div>
                    <div>
                        <Table allWAData={allWAData} />
                    </div>
                </div>
            </Container>
        )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);


