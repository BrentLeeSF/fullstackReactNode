import React from "react";
import { connect } from 'react-redux';
import Table from './Table';
import Chart from './Chart';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Container, Row, Col } from 'react-bootstrap';
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
                         <title>Budding Trends: Cannabis Data Analytics Tools</title>
                    </div>
                    <div>
                        <p>Note: Retail store is only listed if it has reported sales</p>
                    </div>
                    <div>
                        <Row>
                            <div className="county-dropdown">
                                <Col sm={12} md={3} lg={2}>
                                    <Dropdown isOpen={this.state.countyDropDownOpen} toggle={this.toggleCountyDropDown} bg="dark" variant="dark">
                                        <DropdownToggle caret id="county-dropdown" bg="dark" variant="dark">
                                            Select County
                                        </DropdownToggle>
                                        <DropdownMenu bg="dark" variant="dark">
                                            {this.props.countyList.map((eachCounty, index) => 
                                                <div key={index}>
                                                    <DropdownItem onClick={() => this.onCountySelect(eachCounty)}>{eachCounty.county}</DropdownItem>
                                                </div>
                                             )}
                                        </DropdownMenu>
                                        
                                    </Dropdown>
                                </Col>
                            </div>
                            <div className="company-dropdown">
                                <Col sm={12} md={3} lg={2}>
                                    <Dropdown isOpen={this.state.companyDropDownOpen} toggle={this.toggleCompanyDropDown} bg="dark" variant="dark">
                                        <DropdownToggle caret id="company-dropdown" bg="dark" variant="dark">
                                            Select Company
                                        </DropdownToggle>
                                        <DropdownMenu bg="dark" variant="dark">
                                            {this.props.countyCompaniesData.map((eachCompany, index) => 
                                                <div key={index}>
                                                    <DropdownItem onClick={() => this.onCompanySelect(eachCompany)}>{eachCompany.name}</DropdownItem>
                                                </div>
                                            )}
                                        </DropdownMenu>    
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
