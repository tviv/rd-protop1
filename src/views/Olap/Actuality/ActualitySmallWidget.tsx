import React, { Component, ComponentType } from 'react';
import classNames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { withTranslate } from 'ra-core';

interface Props {
    header: string;
    color: string;
    link: string;
    visible: boolean;
    translate: (v: string) => string;
}

class ActualitySmallWidget extends Component<Props> {
    static defaultProps = {
        color: 'primary',
        header: '-',
    };
    componentDidMount(): void {}

    render() {
        const {
            header,
            color,
            visible,
            link,
            children,
            translate,
            ...attributes
        } = this.props;

        const padding = {
            card: 'p-0',
            icon: 'py-1 px-2',
            lead: 'pt-0',
        };

        const card = {
            style: 'clearfix',
            color: color,
            icon: 'fa fa-bolt fa-1x',
            classes: '',
        };
        card.classes = classNames(card.style, padding.card);

        const lead = { style: 'h6 mb-0', color: color, classes: '' };
        lead.classes = classNames(
            lead.style,
            'text-' + card.color,
            padding.lead
        );

        const blockIcon = function(icon) {
            const classes = classNames(
                icon,
                'bg-' + card.color,
                padding.icon,
                'font-sm mr-1 float-left'
            );
            return <i className={classes} />;
        };

        return (
            visible && (
                <div id="actualitySW">
                    <div className={card.classes} {...attributes}>
                        {blockIcon(card.icon)}
                        <span className={lead.classes}>{header}</span>
                    </div>
                    <UncontrolledTooltip
                        placement="bottom"
                        target="actualitySW"
                    >
                        {translate('rd.actuality')}
                    </UncontrolledTooltip>
                </div>
            )
        );
    }
}

const mapStateToProps = state => {
    return {
        header: state.native.actualDate,
        color: state.native.actualColor,
        visible: state.native.actualSmallVisible,
    };
};

//todo compose doesnt work
export default withTranslate(connect(mapStateToProps)(ActualitySmallWidget));
