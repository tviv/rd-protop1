import React, { Children } from 'react';
import { connect } from 'react-redux';
import { userLogout as UserLogoutAction } from 'ra-core';
import { DropdownItem } from 'reactstrap';

//todo remake to hop
const LogoutElement = ({ userLogout, children, ...rest }) => (
    <React.Fragment>
        {React.cloneElement(Children.only(children), {
            onClick: userLogout,
            ...rest,
        })}
    </React.Fragment>
);

export default connect(
    undefined,
    { userLogout: () => UserLogoutAction('/login') }
)(LogoutElement);
