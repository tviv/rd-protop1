import React, {
    Children,
    Component,
    cloneElement,
    createElement,
    ComponentType,
    CSSProperties, ReactNode,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';

import { AUTH_GET_PERMISSIONS } from 'ra-core';
//import { isLoggedIn } from 'ra-core';
import { userLogout as userLogoutAction } from 'ra-core';
import RoutesWithLayout from '../../packages/ra-core/src/RoutesWithLayout';
import {
    Dispatch,
    AuthProvider,
    WithPermissions,
    AdminChildren,
    CustomRoutes,
    CatchAllComponent,
    LayoutComponent,
    LayoutProps,
    ResourceProps,
    RenderResourcesFunction,
    ResourceElement, CustomRoute,
} from 'ra-core';

const welcomeStyles: CSSProperties = {
    width: '50%',
    margin: '40vh',
    textAlign: 'center',
};

interface AdminRouterProps extends LayoutProps {
    children?: ReactNode;
}

interface EnhancedProps {
    authProvider?: AuthProvider;
    isLoggedIn?: boolean;
    userLogout: Dispatch<typeof userLogoutAction>;
}

interface State {
    children: Route[];
}

export class CoreRouter extends Component<
    any,
    State
> {
    state: State = { children: [] };

    componentWillMount() {
        console.log("adminrouter mounted");
        this.initializeResources(this.props);
    }

    initializeResources = (nextProps: any) => {
        //if (typeof nextProps.children === 'function') {
            this.initializeResourcesAsync(nextProps);
        //}
    };

    initializeResourcesAsync = async (
        props: any
    ) => {
        const { authProvider } = props;
        try {
            if (authProvider) {
                const permissions = await authProvider(AUTH_GET_PERMISSIONS);
                console.log('permissions', permissions);
            }
            // if (!permissions) {
            //     this.props.userLogout();
            // }
            // const resolveChildren = props.children as RenderResourcesFunction;
            //
            // const childrenFuncResult = resolveChildren(permissions);
        } catch (error) {
            this.props.userLogout();
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState(
                {
                    children: [],
                },
                () => this.initializeResources(nextProps)
            );
        }
    }

    render() {
        const {
            children,
        } = this.props;

        if (
            process.env.NODE_ENV !== 'production' &&
            typeof children !== 'function' &&
            !children
        ) {
            return (
                <div style={welcomeStyles}>
                    React-admin is properly configured.
                    <br />
                    Now you can add a first &lt;Resource&gt; as child of
                    &lt;Admin&gt;.
                </div>
            );
        }

        // if (
        //     typeof children === 'function' &&
        //     (!this.state.children || this.state.children.length === 0)
        // ) {
        //     return <Route path="/" key="loading" component={loading} />;
        // }
        //
        const childrenToRender =
            typeof children === 'function' ? this.state.children : children;

        return (
            <Route
                path="/"
                render={routeProps =>
                    <WithPermissions
                        {...routeProps}
                        render = {()=>this.props.children}
                    />
                }
            >
            </Route>
        );
    }
}

const mapStateToProps = state => {
    console.log('state', state);
    return {
        isLoggedIn: state.admin.auth.isLoggedIn,
    }
};

export default compose(
    getContext({
        authProvider: PropTypes.func,
    }),
    connect(
        mapStateToProps,
        { userLogout: userLogoutAction }
    )
)(CoreRouter);
