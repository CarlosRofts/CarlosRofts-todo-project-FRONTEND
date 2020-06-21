import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from "react-router-dom";
import AuthContext from '../../context/auth/authContex'

// PROTEGER UN COMPONENTE CON HIGHER ORDER COMPONENT 
// componente que contiene a otro componente.

const PrivateRoute = ({ component: Component, ...props }) => {
    // datos de auth 
    const authContext = useContext(AuthContext)
    const { authenticated, authUser , loading} = authContext
    // Mantener token despues de act 
    useEffect(() => {
        authUser() //en app.js ya extraimos el token de ls y ahora lo validamos.
        // quitar warning de missing dep.
        // eslint-disable-next-line
    }, [])

    return (
        // disponemos de una copia de los props a los hijos
        // render en route reviza una condición antes de ejecutar
        <Route
            {...props} render={props => !authenticated && !loading ? (  //return
                <Redirect to="/" />
            ) : ( //return
                    <Component {...props} />
                )}
        />
    );
}

export default PrivateRoute;

