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
import model from "./salesConeModel";
import { AppSwitch } from '@coreui/react'

class SalesConeFilter extends Component {
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
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  toggleHide = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  wrappedFilterElement = WrappedComponent => {
    return props => <WrappedComponent  {...props} onChange={this.handleChange} getSelectedValues={hName=>this.props.defaultValues.get(hName)}/>;
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
                <Label htmlFor="date-input">Дата</Label>
                <Input required="required" className="no-spin-button" type="date" id="date-input" name="date-input" placeholder="date" value = {model.filters.periodFilter.date} onChange={this.handleDateChange}/>
              </FormGroup>
            </Col>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label htmlFor="shop-select">Магазины</Label>
                <WrappedSelect name="shop-select" hierarchyName = '[Подразделения].[Подразделение]' />
              </FormGroup>
            </Col>
            <Col xs="12" lg="6">
              <FormGroup>
                <Label htmlFor="good-select">Категории (обязательно)</Label>
                <WrappedSelect name="good-select" hierarchyName = '[Товары].[Товары]' maxLevel="3" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label htmlFor="feature-select">Признаки номеклатуры</Label>
                <WrappedSelect name="feature-select" hierarchyName = '[Категории].[Категории]' />
              </FormGroup>
            </Col>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label htmlFor="suppl-select">Поставщики</Label>
                <WrappedSelect name="suppl-select" hierarchyName = '[Товары].[Поставщик]' alwaysSearch />
              </FormGroup>
            </Col>
            <Col xs="12" lg="4">
              <FormGroup>
                <Label htmlFor="manaf-select">Производители</Label>
                <WrappedSelect name="manaf-select" hierarchyName = '[Товары].[Производитель]' alwaysSearch />
              </FormGroup>
            </Col>
            <Col xs="12" lg="2">
              <FormGroup>
                <div><Label htmlFor="act-select">Только активные</Label></div>
                <AppSwitch name="act-select" className={'mx-1'} color={'primary'} outline={'alt'} onChange={event=>{this.handleChange('[Товары].[Активный]', [event.target.checked ? '1': '0'])}}/>
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

SalesConeFilter.defaultProps = {
  defaultValues: new Map()
}

export default SalesConeFilter;
