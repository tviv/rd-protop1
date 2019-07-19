import React, { PureComponent } from 'react';
import DimensionSelect from '../../components/multiselect/DimensionSelect'
import {FormGroup,Label,Input,Col, Row, } from 'reactstrap';
import model from "./salesConeModel";
import { AppSwitch } from '@coreui/react'
import FilterContainer from "../OlapComponents/FilterContainer";
import FilterHandler from "../OlapComponents/FilterHandler";

class SalesConeFilter extends FilterHandler {

  //todo temp decision (redo to jeneral conception) - into array of filters
  handleDateChange = (event) => {
    model.filters.periodFilter.date = event.target.value;
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  render() {
    let WrappedSelect = this.WrappedSelect;
    return  (
        <FilterContainer>
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
                <Label htmlFor="good-select">Категории</Label>
                <WrappedSelect name="good-select" hierarchyName = '[Товары].[Товары]' maxLevel="3" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="3">
              <FormGroup>
                <Label htmlFor="feature-select">Признаки номеклатуры</Label>
                <WrappedSelect name="feature-select" hierarchyName = '[Признаки товара].[Категории]' />
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
        </FilterContainer>
    )
  }
}

SalesConeFilter.defaultProps = {
  defaultValues: new Map()
}

export default SalesConeFilter;
