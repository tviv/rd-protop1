'use strict'

import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,

  Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Select from 'react-select';

import model from './salesConeModel';
import LoadingWrappedView from '../../components/LoadingWrappedView';
import DoubleScrollbar from 'react-double-scrollbar';
import Sticky from 'react-sticky-el';
import CellPropertyWindow from "./CellPropertyWindow";


class SalesConeTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fitlerLoading: true,
      error: '',
      data: {headerColumns:[], rows: []},
      shopOptions: [],
      popoverOpen: false,
      //shopFilter: model.filters.shopFilter.map((item)=>{return { value: item, label: 'ddd'}})
    }


  }

  toggle = () => {
    this.setState({
      popoverOpen: false
    });
  }


  getCellId = (row, col) => "cell_" + row + '_' + col;


  refreshData = () => {
    this.setState({
      loading: true,
      fitlerLoading: true,
      error: null
    });

    model.getFilterOption('[Подразделения].[Подразделение].[Подразделение]').then((options)=>{
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
      error: null,
      cellId: null,
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


  componentWillMount () {
    this.refreshData();
  }



  handleShopChange = (selectedOption) => {
    console.dir(selectedOption)
    model.filters.shopFilter = selectedOption.map((item)=>item.value);
    //this.setState({shopFilter: selectedOption})
    this.refreshOnlyData();

  }

  handleSegmentChange = (event) => {
    model.filters.segmentFilter = event.target.value;
    this.refreshOnlyData();
  }

  handleDateChange = (event) => {
    model.filters.periodFilter.date = event.target.value;
    this.refreshOnlyData();
  }

  onCellClick = (e) => {
    let cellId = e.target.id;
    //console.log(cellId);
//    let option = model.getDataCellPropertyById(cellId);

    //model.setSelectedCell(e.target.dataset.row, e.target.dataset.col);
    // let filter = {dateFilter: model.filters.dateFilter};
    // filter.shopFilter = this.state.data.headerColumns[e.target.dataset.col][0].UName;
    // filter.goodFilter = this.state.data.rows[e.target.dataset.row][0].UName;
    //this.props.config.showDynamicCUP(option);
    //let cellId = this.getCellId(e.target.dataset.row, e.target.dataset.col);
    this.setState({
      popoverOpen: this.state.cellId === cellId ? !this.state.popoverOpen : true,
      cellId: cellId
    });
  }

  onDynamicClick = (e) => {
    let option = model.getDataCellPropertyById(this.state.cellId);

    this.props.config.showDynamicCUP(option);
  }


  render() {

    //todo distinct component
    let filterBlock =
      <Row>
        <Col xs="12" lg="2">
        <FormGroup>
            <Label htmlFor="date-input">Дата</Label>
            <Input required="required" className="no-spin-button" type="date" id="date-input" name="date-input" placeholder="date" value = {model.filters.periodFilter.date} onChange={this.handleDateChange}/>
        </FormGroup>
        </Col>
        <Col xs="12" lg="3">
          <FormGroup>
            <Label htmlFor="shop">Подразделение</Label>
            <Select  classNamePrefix="react-select" name="shop" id="shop" isMulti = "true" value = {model.convertFilterArrayToOptions(this.state.shopOptions, model.filters.shopFilter, true)} options = {this.state.shopOptions} onChange={this.handleShopChange}/>

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
            {/*<Card>*/}
              {/*<CardHeader>*/}
                {/*<strong>Воронка продаж</strong>*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                <div>
                  <LoadingWrappedView
                    filterBlock = {filterBlock}
                    dataSize = {this.state.data.rows ? this.state.data.rows.length : 0}
                    dataLoading = {this.state.loading}
                    filterLoading = {this.state.fitlerLoading}
                    error = {this.state.error}
                  >
                    <Row>
                    <Col>
                      <CellPropertyWindow property={{cellId: this.state.cellId,...model.getDataCellPropertyById(this.state.cellId), onDynamicClick: this.onDynamicClick}} isOpen={this.state.popoverOpen} toggle={this.toggle}  />
                      <DoubleScrollbar>
                      <Table bordered className="table-bordered table-sm">
                        <thead>
                        <tr>
                          {/*<th>Код товара</th>*/}
                          {this.state.data.headerColumns.map((item, index) =>
                            <th key={index}>{item[0].Caption}</th>
                          )}
                        </tr>
                        </thead>

                        <tbody>
                        {this.state.data.rows.map((row, rowIndex) =>
                          <tr key={rowIndex}>
                            {/*<td style={styles.tableCell}>{item[0]['[Товары].[Товар].[Товар].[Код товара]']}</td>*/}
                            {row.map((col, index)=>
                              <td id={col.cellId} className={'cell-cone ' + (this.state.cellId === col.cellId ? 'focus' : '')} style={{...styles.tableCell,... index >= 1 ? styles.tableCellValue : {}}} key={index} onClick={this.onCellClick} >
                                {col.FmtValue ? col.FmtValue : col.Caption}
                                {/*{this.state.cellId == col.cellId && !this.state.loading && <div></div>*/}
                                  {/*}*/}
                                {/*<Popover placement="bottom" isOpen={this.state.popoverOpen}*/}
                                {/*target={"cell_" + rowIndex + ',' + index} toggle={this.onCellClick}>*/}
                                {/*<PopoverHeader>Popover Title</PopoverHeader>*/}
                                {/*<PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque*/}
                                {/*ornare sem lacinia quam venenatis vestibulum.</PopoverBody>*/}
                                {/*</Popover>*/}
                                </td>
                            )}
                          </tr>
                        )}
                        </tbody>
                      </Table>
                      </DoubleScrollbar>


                    </Col>
                    </Row>
                  </LoadingWrappedView>
                </div>
              {/*</CardBody>*/}
            {/*</Card>*/}
          </Col>

        </Row>
      </div>

    );
  }
}

const styles = {
  tableCell: {
    'whiteSpace': 'nowrap',
    //height: '10px',
    //padding: '0.25rem'
  },
  tableCellValue: {
    'textAlign': 'center'
  }

};

const customStyles = {
  control: (base, state) => {
    console.dir(base);
    console.dir(state);
    return {
      ...base,
      borderColor: state.isFocused ? 'red' : 'gray',

    }
  }

}



export default SalesConeTable;
