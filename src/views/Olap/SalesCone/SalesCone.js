'use strict'

import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,


  Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import model from './salesConeModel';
import LoadingWrappedView from '../../components/LoadingWrappedView';






class SalesCone extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fitlerLoading: true,
      error: '',
      data: {headerColumns:[], rows: []},
      shopOptions: []
    }


  }

  refreshData = () => {
    this.setState({
      loading: true,
      fitlerLoading: true,
      error: null
    });

    model.getFilterOption('[Подразделения].[Подразделение]').then((options)=>{
      this.setState({
          shopOptions: options
        }
      );

      model.getFilterOption('[Товары].[Товары].[Сегмент]').then((options)=>{
        this.setState({
            segmentOptions: options,
            fitlerLoading: false
          }
        );

      })

    })
      .then(this.refreshOnlyData)
    .catch((err) => {
      this.setState({
        //loading: false,
        //fitlerLoading: false,
        error: err
      });
    });
  }

  refreshOnlyData = () => {
    this.setState({
      loading: true,
      error: null
    });

    model.getData().then((data) => {
      this.setState({
        loading: false,
        data: data
      });

    })
      .catch((err) => {
        this.setState({
          error: err
        });
      });
  }


  componentDidMount () {
    this.refreshData();
  }

  handleShopChange = (event) => {
    model.filters.shopFilter = event.target.value;
    this.refreshOnlyData();

  }

  handleSegmentChange = (event) => {
    model.filters.segmentFilter = event.target.value;
    this.refreshOnlyData();
  }

  handleDateChange = (event) => {
    model.filters.dateFilter = event.target.value;
    this.refreshOnlyData();
  }

  render() {

    //todo distinct component
    let filterBlock =
      <Row>
        <Col xs="12" lg="2">
        <FormGroup>
            <Label htmlFor="date-input">Дата</Label>
            <Input required="required" className="no-spin-button" type="date" id="date-input" name="date-input" placeholder="date" value = {model.filters.dateFilter} onChange={this.handleDateChange}/>
        </FormGroup>
        </Col>
        <Col xs="12" lg="3">
          <FormGroup>
            <Label htmlFor="shop">Подразделение</Label>
            <Input type="select" name="shop" id="shop" value = {model.filters.shopFilter} onChange={this.handleShopChange}>
              {this.state.shopOptions.map((item)=>
                <option key={item.UName} value={item.UName}>{item.Caption}</option>

              )}
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" lg="6">
          <FormGroup>
            <Label htmlFor="segm">Сегмент</Label>
            <Input type="select" name="segm" id="segm" value = {model.filters.segmentFilter} onChange={this.handleSegmentChange}>
              {this.state.segmentOptions && this.state.segmentOptions.map((item)=>
                <option key={item.UName} value={item.UName}>{item.Caption}</option>
              )}
            </Input>
          </FormGroup>
        </Col>
      </Row>
    ;

    return (


      <div className="animated fadeIn">



        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Воронка продаж</strong>
              </CardHeader>
              <CardBody>
                    <div>
                      <LoadingWrappedView
                        filterBlock = {filterBlock}
                        dataSize = {this.state.data.rows ? this.state.data.rows.length : 0}
                        dataLoading = {this.state.loading}
                        filterLoading = {this.state.fitlerLoading}
                        error = {this.state.error}
                      >
                    <Row>

                  <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Код товара</th>
                    {this.state.data.headerColumns.map((item, index) =>
                        <th key={index}>{item[0].Caption}</th>
                    )}
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.data.rows.map((item, index) =>
                    <tr key={index}>
                      <td>{item[0]['[Товары].[Товар].[Товар].[Код товара]']}</td>
                      {item.map((col, index)=>
                        <td key={index}>{col.FmtValue ? col.FmtValue : col.Caption}</td>
                      )}
                    </tr>
                  )}
                  </tbody>
                  </Table>

                    </Row>
                      </LoadingWrappedView>
                    </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>

    );
  }
}

export default SalesCone;
