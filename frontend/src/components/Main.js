import React from "react";
import { connect } from 'react-redux';
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


class Main extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            countyDropDownOpen: false,
            companyDropDownOpen: false,
            tableCompanyInfo: []
        };
    }


    async componentDidMount() {
        this.props.fetchAllWashingtonData();
        this.props.fetchAllWashingtonCounties();
    }


    toggleCountyDropDown = () => {
        this.setState(prevState => ({
            countyDropDownOpen: !prevState.countyDropDownOpen
        }));
    }

    toggleCompanyDropDown = () => {
        this.setState(prevState => ({
            companyDropDownOpen: !prevState.companyDropDownOpen
        }));
    }

    async onCountySelect(newCountyValue) {
        this.props.fetchSelectedCounty(newCountyValue.county);
    }

    async onCompanySelect(newCompanyValue) {
        this.props.fetchCompany(newCompanyValue.id);
    }



    render() {

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
                                        <Dropdown.Toggle caret isOpen={this.state.countyDropDownOpen} toggle={this.toggleCountyDropDown} id="county-dropdown" bg="dark" variant="dark">
                                            Select County
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu direction="down" bg="dark" variant="dark">

                                            {this.props.countyList.map((eachCounty, index) => 
                                                <div key={index}>
                                                    <Dropdown.Item onClick={() => this.onCountySelect(eachCounty)}>{eachCounty.county}</Dropdown.Item>
                                                </div>
                                            )}

                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </div>
                            <div className="company-dropdown">
                                <Col sm={12} md={3} lg={2}>
                                    <Dropdown direction="down" bg="dark" variant="dark">
                                        <Dropdown.Toggle caret isOpen={this.state.companyDropDownOpen} toggle={this.toggleCompanyDropDown} id="company-dropdown" bg="dark" variant="dark">
                                            Select Company
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu direction="down" bg="dark" variant="dark">
                                            {this.props.countyCompaniesData.map((eachCompany, index) => 
                                                <div key={index}>
                                                    <Dropdown.Item onClick={() => this.onCompanySelect(eachCompany)}>{eachCompany.name}</Dropdown.Item>
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
                            <Chart companyInfo={this.props.companyInfo} />
                        <br />
                    </div>
                    <div>
                        <Table allWAData={this.props.allWAData} />
                    </div>
                </div>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);


