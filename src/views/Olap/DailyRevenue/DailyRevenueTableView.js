'use strict';

import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    FormGroup,
    TabPane,
    Button,
} from 'reactstrap';
import ColorTable from '../../components/ColorTable/ColorTable';
import FrozenTable from '../../components/FrozenTable/FrozenTable';

import model from './dailyRevenueModel';
import DailyRevenueTableContainer from './DailyRevenueTableContainer';
import DailyRevenueFilter from './DailyRevenueFilter';

class DailyRevenueTableView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: model.filters,
            cellId: null,
        };
    }

    defaultValues = new Map(model.filters.filterArray);

    handleChangeFilter = filterMap => {
        if (filterMap) {
            model.filters.filterArray =
                filterMap instanceof Map
                    ? Array.from(filterMap.entries())
                    : filterMap;
        }
        this.setState({
            filters: Object.assign({}, model.filters), //to recognise that child component table must be update
            stopFilterSelection: false,
        });
    };

    handleRefreshTable = () => {
        this.setState({ stopFilterSelection: true });
    };

    render() {
        return (
            <div>
                <DailyRevenueFilter
                    onChange={this.handleChangeFilter}
                    defaultValues={this.defaultValues}
                    style={{ position: 'relative', zIndex: 300 }}
                    stopFilterSelection={this.state.stopFilterSelection}
                />
                <DailyRevenueTableContainer
                    filters={this.state.filters}
                    onCellClick={this.handleCellClick}
                    cellId={this.state.cellId}
                    onRefresh={this.handleRefreshTable}
                />
            </div>
        );
    }
}

export default DailyRevenueTableView;
