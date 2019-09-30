import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classnames from 'classnames';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import {
    hideNotification,
    getNotification,
    translate,
    undo,
    complete,
} from 'ra-core';

class Notification extends React.Component {
    state = {
        open: false,
    };
    componentWillMount = () => {
        this.setOpenState(this.props);
    };
    componentWillReceiveProps = nextProps => {
        this.setOpenState(nextProps);
        const { notification, translate } = nextProps;
        let msg =
            notification &&
            notification.message &&
            translate(notification.message, notification.messageArgs);

        if (msg) {
            let dd = translate(notification.message, notification.messageArgs);

            NotificationManager.error(
                translate(notification.message, notification.messageArgs),
                ''
            );
        }
    };

    setOpenState = ({ notification }) => {
        this.setState({
            open: !!notification,
        });
    };
    componentDidUpdate() {
        if (this.state.open) this.handleExited();
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleExited = () => {
        const { notification, hideNotification, complete } = this.props;
        if (notification && notification.undoable) {
            complete();
        }
        hideNotification();
    };

    render() {
        const {
            undo,
            complete,
            classes,
            className,
            type,
            translate,
            notification,
            autoHideDuration,
            hideNotification,
            ...rest
        } = this.props;
        // const {
        //     warning,
        //     confirm,
        //     undo: undoClass, // Rename classes.undo to undoClass in this scope to avoid name conflicts
        //     ...snackbarClasses
        // } = classes;
        return <NotificationContainer />;
    }
}

Notification.propTypes = {
    complete: PropTypes.func,
    classes: PropTypes.object,
    className: PropTypes.string,
    notification: PropTypes.shape({
        message: PropTypes.string,
        type: PropTypes.string,
        autoHideDuration: PropTypes.number,
        messageArgs: PropTypes.object,
    }),
    type: PropTypes.string,
    hideNotification: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number,
    translate: PropTypes.func.isRequired,
    undo: PropTypes.func,
};

Notification.defaultProps = {
    type: 'info',
    autoHideDuration: 4000,
};

let i = 0;
const mapStateToProps = state => {
    return {
        notification: getNotification(state),
    };
};

export default compose(
    translate,
    connect(
        mapStateToProps,
        {
            complete,
            hideNotification,
            undo,
        }
    )
)(Notification);
