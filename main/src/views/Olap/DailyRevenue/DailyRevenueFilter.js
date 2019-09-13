import React, { Component } from 'react';
import {
    FormGroup,
    Label,
    Input,
    Popover,
    PopoverHeader,
    PopoverBody,
    Button,
    Collapse,
    Card,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
} from 'reactstrap';

import model from './dailyRevenueModel';
import { AppSwitch } from '@coreui/react';
import FilterHandler from '../OlapComponents/FilterHandler';
import FilterContainer from '../OlapComponents/FilterContainer';
import RangeDatePicker from '../../components/RangeDatePicker';
import moment from 'moment';

class DailyRevenueFilter extends FilterHandler {
    handleDateChange = (startDate, endDate) => {
        model.filters.periodFilter.date = startDate;
        model.filters.periodFilter.endDate = endDate;
        if (this.props.onChange) {
            this.props.onChange();
        }
    };

    render() {
        let WrappedSelect = this.WrappedSelect;

        console.dir(model.filters.periodFilter);
        return (
            <FilterContainer>
                <Row>
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label htmlFor="mounth-select">Период</Label>
                            <RangeDatePicker
                                startDate={moment(
                                    model.filters.periodFilter.date
                                )}
                                endtDate={moment(
                                    model.filters.periodFilter.endDate
                                )}
                                onChange={this.handleDateChange}
                            />
                        </FormGroup>
                    </Col>
                    {/*<Col xs="12" lg="3">*/}
                    {/*<FormGroup>*/}
                    {/*<Label htmlFor="mounth-select">Месяцы</Label>*/}
                    {/*<WrappedSelect*/}
                    {/*name="mounth-select"*/}
                    {/*hierarchyName="[Даты].[Месяцы]"*/}
                    {/*maxLevel="2"*/}
                    {/*disableToLevel={1}*/}
                    {/*simpleSelect={true}*/}
                    {/*reverse={true}*/}
                    {/*ungroupLevels={[0]}*/}
                    {/*/>*/}
                    {/*</FormGroup>*/}
                    {/*</Col>*/}
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label htmlFor="shop-select">Магазины</Label>
                            <WrappedSelect
                                name="shop-select"
                                hierarchyName="[Подразделения].[Подразделение]"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label htmlFor="org-select">Организации</Label>
                            <WrappedSelect
                                name="shop-select"
                                hierarchyName="[Подразделения].[Организации]"
                                maxLevel="1"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label>Дни недели</Label>
                            <WrappedSelect hierarchyName="[Даты].[День недели]" />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label>РУ</Label>
                            <WrappedSelect
                                hierarchyName="[Подразделения].[Районые управляющие]"
                                maxLevel="1"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label>Подформаты</Label>
                            <WrappedSelect
                                hierarchyName="[Подразделения].[Подформаты]"
                                maxLevel="1"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="2">
                        <FormGroup>
                            <div>
                                <Label htmlFor="act-select">LFL</Label>
                            </div>
                            <AppSwitch
                                name="act-select"
                                className={'mx-1'}
                                color={'primary'}
                                outline={'alt'}
                                onChange={event => {
                                    this.handleChange(
                                        '[Подразделения].[Like for like]',
                                        [event.target.checked ? 'Да' : '0']
                                    );
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </FilterContainer>
        );
    }
}

export default DailyRevenueFilter;
