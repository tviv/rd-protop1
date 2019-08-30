import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import ProtectedRoute from '../../auth/ProtectedRoute';

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {};
    }
    componentDidMount() {
        //let { clientHeight, clientWidth } = this.refs.myImgContainer;
        //console.log(this.refs);
    }

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader />
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display={'lg'}>
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <AppSidebarNav navConfig={navigation} {...this.props} />
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main" ref="myImgContainer">
                        <AppBreadcrumb appRoutes={routes} />
                        <Container fluid>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <ProtectedRoute
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} />
                                            )}
                                        />
                                    ) : null;
                                })}
                                <Redirect from="/" to="/olap/daily-revenue" />
                            </Switch>
                        </Container>
                    </main>
                    <AppAside fixed hidden>
                        <DefaultAside />
                    </AppAside>
                </div>
                <AppFooter>
                    <DefaultFooter />
                </AppFooter>
            </div>
        );
    }
}

export default DefaultLayout;
