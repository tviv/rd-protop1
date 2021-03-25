import React from 'react';
import {Col, Row} from "reactstrap";


export default ({loading, text, children, height}) => {
    return loading ? (
        <div className="text-center" style={{ height: height || '300px' }}>
            <Col style={{ top: '50%' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"/>
                </div>
                <br/>
                <h6>{text || ''}</h6>
            </Col>
        </div>
    ) : (
        children
    )
}
