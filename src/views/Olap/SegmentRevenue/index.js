import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
import SegmentRevenueTableView from './SegmentRevenueTableView';

class RevenueForm extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Выручка по сегментам</strong>
                            </CardHeader>
                            <CardBody>
                                <SegmentRevenueTableView />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RevenueForm;
