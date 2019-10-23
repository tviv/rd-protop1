import React, { Children } from 'react';
import { connect } from 'react-redux';
import { userLogout } from 'ra-core';

//todo remake to hoc
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
    { userLogout: () => userLogout('/login') }
)(LogoutElement);
