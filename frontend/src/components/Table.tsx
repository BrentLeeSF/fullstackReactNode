import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import styled from 'styled-components';
import { fetchCompany } from '../redux/actionCreators/WashingtonActionCreator';


const Styles = styled.div`
    .table {
        overflow: auto;
        table-layout: auto !important;
    },
    .react-bootstrap-table table {
        table-layout: auto;
    }
`;

const mapStateToProps = (state: any) => {
    return {
        companyInfo: state.washington.waCompanyInfo
    };
};

const mapDispatchToProps = {
    fetchCompany: (newCompanyValueId: any) => (fetchCompany(newCompanyValueId))
};


const Table = (props: any) => {

  const {allWAData} = props;

  const [columns] = useState([
      { dataField: "name", text: "Name  ", filter: textFilter()},
      { dataField: "license", text: "License "},
      { dataField: "county", text: "County"}
  ]);

  const dispatch = useDispatch();

    const rowEvents = {
      onClick: (e: any, row: any) => {
        dispatch(fetchCompany(row.id));
      }
    };

    return (
      <Styles>
        <div className="App">
          <div className="table">
            <BootstrapTable
              bootstrap4
              wrapperClasses="table-responsive"
              rowClasses="text-nowrap"
              hover
              keyField="id"
              data={allWAData}
              columns={columns}
              pagination={paginationFactory({})}
              filter={ filterFactory() }
              sort={ { dataField: ['sales'], order: 'asc' } }
              rowEvents={rowEvents}
            />
          </div>
        </div>
      </Styles>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);

