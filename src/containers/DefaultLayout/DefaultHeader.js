import React, { Component } from 'react';
import {
    Badge,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
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
                <AppNavbarBrand
                    full={{ src: logo, width: 95, height: 25, alt: 'Logo' }}
                    minimized={{
                        src: sygnet,
                        width: 30,
                        height: 30,
                        alt: 'Logo',
                    }}
                />
                <AppSidebarToggler className="d-md-down-none" display="lg" />

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
