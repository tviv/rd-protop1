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
    TabContent,
    TabPane,
    Button,
} from 'reactstrap';
import ColorTable from '../../components/ColorTable/ColorTable';
import FrozenTable from '../../components/FrozenTable/FrozenTable';

import model from './dailyRevenueModel';
import DailyRevenueTableView from './DailyRevenueTableView';

class RevenueForm extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Ежедневная выручка</strong>
                            </CardHeader>
                            <CardBody>
                                <DailyRevenueTableView />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RevenueForm;
