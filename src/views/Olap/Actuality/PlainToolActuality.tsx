import React, { SFC } from 'react';
import Widget02 from '../../../Widgets/Widget02';
import { connect } from 'react-redux';
import { withTranslate } from 'ra-core';

interface Props {
    header: string;
    color: string;
    link: string;
    translate: (v: string) => string;
}

const ActualityWidget: SFC<Props> = props => {
    return (
        <p>11.20.2020</p>
    );
};

const mapStateToProps = state => {
    return {
        header: state.native.actualDate,
        color: state.native.actualColor,
    };
};

//todo compose doesnt work
export default withTranslate(connect(mapStateToProps)(ActualityWidget));
