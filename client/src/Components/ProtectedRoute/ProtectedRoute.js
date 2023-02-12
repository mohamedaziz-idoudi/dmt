import React from 'react';
import {Navigate} from 'react-router-dom';

function ProtectedRoute ({setAuth,isAuth, Component, ...props}) {
    return (
        isAuth ? <Component setAuth={setAuth} /> : <Navigate to={{
            pathname: "/admin",
            state: { from: props.location }
          }} />
        );
}
export default ProtectedRoute;