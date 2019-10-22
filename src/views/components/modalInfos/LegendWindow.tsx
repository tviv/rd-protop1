import React, { ReactNode, SFC } from 'react';
import PropTypes from 'prop-types';
import { InfoWindow } from '.';
import { Row, Col } from 'reactstrap';
import { Fragment } from 'react';

export interface LegendDescriptionType {
    title: string;
    desc?: string;
    signsCaption?: string;
    termsCaption?: string;
    signs?: Array<{ color: string; desc: string }>;
    terms?: Array<{ term: string; desc: string }>;
}

interface Props {
    element?: ReactNode;
    legend: LegendDescriptionType;
    isLarge?: boolean;
    translation?: {
        cancel: string;
    };
}

const createBody = (legend: LegendDescriptionType): ReactNode => {
    const header = (
        <Fragment>
            {legend.desc && (
                <Row className="mb-2">
                    <Col>
                        <span className="mb-4">{legend.desc}</span>
                    </Col>
                </Row>
            )}
        </Fragment>
    );

    const signs = (
        <Fragment>
            {legend.signsCaption && (
                <Row>
                    <Col>
                        <strong>{legend.signsCaption}</strong>
                    </Col>
                </Row>
            )}
            {legend.signs &&
                legend.signs.map((x, index) => (
                    <Row key={`${index}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <Col xs="1">
                            <div
                                className="pr-4"
                                style={{
                                    height: '1rem',
                                    width: '2rem',
                                    background: x.color,
                                }}
                            />
                        </Col>
                        <Col xs="11" className="left pl-4">
                            {x.desc}
                        </Col>
                    </Row>
                ))}
        </Fragment>
    );

    const terms = (
        <Fragment>
            {legend.termsCaption && (
                <Row className={legend.signsCaption ? 'mt-3' : ''}>
                    <Col>
                        <strong>{legend.termsCaption}</strong>
                    </Col>
                </Row>
            )}
            {legend.terms &&
                legend.terms.map((x, index) => (
                    <Row key={`${index}`}>
                        <Col>
                            <strong>{x.term}</strong>
                            <span className="ml-1">
                                - {x.desc}
                            </span>
                        </Col>
                    </Row>
                ))}
        </Fragment>
    );

    return (
        <Fragment>
            {header}
            {signs}
            {terms}
        </Fragment>
    );
};

const LegendWindow: SFC<Props> = ({ legend, ...rest }) => {
    const body = createBody(legend);
    return <InfoWindow body={body} title={legend.title} {...rest} />;
};
/*
LegendWindow.propTypes = {
    legend: PropTypes.string,
};

 */

export default LegendWindow;
