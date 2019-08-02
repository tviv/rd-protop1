import React, { createElement, Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { WithPermissions } from 'ra-core';

interface EnhancedProps {
    path: string;
    render: any;
}
class ProtectedRoute extends Component<EnhancedProps> {
    render() {
        const { children, render } = this.props;
        return (
            <Route
                render={routeProps => (
                    <WithPermissions
                        {...routeProps}
                        render={children ? () => children : render}
                    />
                )}
            />
        );
    }
}

export default ProtectedRoute;
