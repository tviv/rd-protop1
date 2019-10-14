import React, { Component } from 'react';
import {
    Badge,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import LogoutElement from '../../views/LogoutElement';

import {
    AppAsideToggler,
    AppHeaderDropdown,
    AppNavbarBrand,
    AppSidebarToggler,
} from '@coreui/react';
import logo from '../../assets/img/brand/logo.png';
import sygnet from '../../assets/img/brand/sygnet.png';
import { Link, NavLink } from 'react-router-dom';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    render() {
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <Link to="./dashboard">
                    <AppNavbarBrand
                        tag="span"
                        full={{ src: logo, width: 95, height: 25, alt: 'Logo' }}
                        minimized={{
                            src: sygnet,
                            width: 30,
                            height: 30,
                            alt: 'Logo'
                        }}
                    />
                </Link>
                <AppSidebarToggler
                    className="d-md-down-none"
                    display="lg"
                    style={{ display: 'none' }}
                />
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/olap/sales-cone" className="nav-link">
                            Воронка продаж
                        </NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/olap/daily-revenue" className="nav-link">
                            Ежедневная выручка
                        </NavLink>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav direction="down">
                        <DropdownToggle nav>
                            <i className="fa fa-user" />
                        </DropdownToggle>

                        <DropdownMenu right>
                            <LogoutElement>
                                <DropdownItem>
                                    <i className="fa fa-lock" /> Выход
                                </DropdownItem>
                            </LogoutElement>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
