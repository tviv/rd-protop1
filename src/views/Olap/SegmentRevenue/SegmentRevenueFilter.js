import React, { Component } from 'react';
import { FormGroup, Label, Col, Row } from 'reactstrap';

import model from './segmentRevenueModel';
import { AppSwitch } from '@coreui/react';
import FilterHandler from '../OlapComponents/FilterHandler';
import FilterContainer from '../OlapComponents/FilterContainer';
import RangeDatePicker from '../../components/RangeDatePicker';
import moment from 'moment';

class SegmentRevenueFilter extends FilterHandler {
    handleDateChange = (startDate, endDate) => {
        model.filters.periodFilter.date = startDate;
        model.filters.periodFilter.endDate = endDate;
        if (this.props.onChange) {
            this.props.onChange();
        }
    };

    handleSegment310Change = value => {
        model.filters.withoutSegment310 = value;
        if (this.props.onChange) {
            this.props.onChange();
        }
    };

    render() {
        const { defaultValues } = this.props;

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
                                endDate={moment(
                                    model.filters.periodFilter.endDate
                                )}
                                onChange={this.handleDateChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label htmlFor="shop-select">Магазины</Label>
                            <WrappedSelect
                                name="shop-select"
                                hierarchyName="[Подразделения].[Подразделение]"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="2">
                        <FormGroup>
                            <div>
                                <Label htmlFor="act-select1">Только открытые</Label>
                            </div>
                            <AppSwitch
                                name="act-select1"
                                className={'mx-1'}
                                color={'primary'}
                                outline={'alt'}
                                checked={
                                    defaultValues.get('[Подразделения].[Действующий]') &&
                                    defaultValues.get(
                                        '[Подразделения].[Действующий]'
                                    )[0] === '1'
                                }
                                onChange={event => {
                                    this.handleChange(
                                        '[Подразделения].[Действующий]',
                                        [event.target.checked ? '1' : '0']
                                    );
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="2">
                        <FormGroup>
                            <div>
                                <Label htmlFor="act-select2">LFL</Label>
                            </div>
                            <AppSwitch
                                name="act-select2"
                                className={'mx-1'}
                                color={'primary'}
                                outline={'alt'}
                                checked={
                                    defaultValues.get('[Подразделения].[Like for like]') &&
                                    defaultValues.get(
                                        '[Подразделения].[Like for like]'
                                    )[0] === 'Да'
                                }
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
                <Row>
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label htmlFor="segment-select">Сегменты</Label>
                            <WrappedSelect
                                name="segment-select"
                                hierarchyName="[Сегменты].[Сегмент]"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="3">
                        <FormGroup>
                            <Label htmlFor="segment-select">Направления</Label>
                            <WrappedSelect
                                name="segment-select"
                                hierarchyName="[Сегменты].[Направление менеджера]"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="12" lg="2">
                        <FormGroup>
                            <div>
                                <Label htmlFor="act-select3">Без сегмента 310</Label>
                            </div>
                            <AppSwitch
                                name="act-select3"
                                className={'mx-1'}
                                color={'primary'}
                                outline={'alt'}
                                checked={
                                    model.filters.withoutSegment310
                                }
                                onChange={event => {
                                    this.handleSegment310Change(event.target.checked);
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </FilterContainer>
        );
    }
}

export default SegmentRevenueFilter;
