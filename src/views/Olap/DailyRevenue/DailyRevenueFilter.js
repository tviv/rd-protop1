import React, { Component } from 'react';
import DimensionSelect from '../../components/multiselect/DimensionSelect'
import {
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
  Collapse,
   Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import model from "./dailyRevenueModel";
import { AppSwitch } from '@coreui/react'

class DailyRevenueFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };
  }

  filters = this.props.defaultValues;

  handleChange = (hierarchyName, selectedValues) => {
    this.filters.set(hierarchyName, selectedValues)
    if (this.props.onChange) {
      this.props.onChange(this.filters);
    }
  }

  //todo temp decision (redo to jeneral conception) - into array of filters
  handleDateChange = (event) => {
    model.filters.periodFilter.date = event.target.value;
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  toggleHide = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  wrappedFilterElement = WrappedComponent => {
    return props => <WrappedComponent  {...props} onChange={this.handleChange} getSelectedValues={hName=>this.props.defaultValues.get(hName)} forceCloseDropDown = {this.props.stopFilterSelection}/>;
  };

  WrappedSelect = this.wrappedFilterElement(DimensionSelect);

  render() {
    let WrappedSelect = this.WrappedSelect;
    return  (
      <div style={this.props.style}>
        <div>
          <div className="card-header-actions">
            <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={this.toggleHide}><i className={!this.state.collapse ? "icon-arrow-up" : "icon-arrow-down"}></i></a>
          </div>
        </div>
        <Row>
          <Col>
        <Collapse isOpen={!this.state.collapse} id="collapseExample">

          <Row>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label htmlFor="mounth-select">Месяцы</Label>
                <WrappedSelect name="mounth-select" hierarchyName = '[Даты].[Месяцы]'  maxLevel = '2' />
              </FormGroup>
            </Col>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label htmlFor="shop-select">Магазины</Label>
                <WrappedSelect name="shop-select" hierarchyName = '[Подразделения].[Подразделение]' />
              </FormGroup>
            </Col>
            <Col xs="12" lg="2">
              <FormGroup>
                <div><Label htmlFor="act-select">LKL</Label></div>
                <AppSwitch name="act-select" className={'mx-1'} color={'primary'} outline={'alt'} onChange={event=>{this.handleChange('[Подразделения].[Like for like]', [event.target.checked ? 'Да': '0'])}}/>
              </FormGroup>
            </Col>

          </Row>
          <Row>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label htmlFor="org-select">Организации</Label>
                <WrappedSelect name="shop-select" hierarchyName = '[Подразделения].[Организации]' maxLevel = '1'  />
              </FormGroup>
            </Col>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label >РУ</Label>
                <WrappedSelect hierarchyName = '[Подразделения].[Районые управляющие]' maxLevel = '1'  />
              </FormGroup>
            </Col>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label >Подформаты</Label>
                <WrappedSelect hierarchyName = '[Подразделения].[Подформаты]' maxLevel = '1'  />
              </FormGroup>
            </Col>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label >Направления</Label>
                <WrappedSelect hierarchyName = '[Товары].[Направление менеджера]' />
              </FormGroup>
            </Col>

          </Row>
        </Collapse>
          </Col>
        </Row>
      </div>
    )
  }


}

DailyRevenueFilter.defaultProps = {
  defaultValues: new Map()
}

export default DailyRevenueFilter;
