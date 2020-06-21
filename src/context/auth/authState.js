import React, { useReducer} from 'react';
import AuthContext from './authContex'
import AuthReducer from './authReducer'
import {
    REG_SUCCESS,
    REG_ERROR,
    GET_USER,
    LOGING_SUCCESS,
    LOGING_ERROR,
    LOGOUT  
   
} from '../../types' //type
import clientAxios from '../../config/axios'
import tokenAuth from '../../config/token'



const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated : null,
        user:null, //toda los datos (campos/obj)
        message:null,     
        loading:true //soluciona error de ciclo de vida   

    }  

     // Dispatch para ejecutar las acciones (types) (para Reducer)
     const [state, dispatch] = useReducer(AuthReducer, initialState )
     

    // set State fns
    const regUser = async datos =>{
        try {
            const res = await  clientAxios.post('/api/users',datos) //enviando por post
            // console.log('from authState', res.data) //seleccionamos el token
            dispatch({
                type: REG_SUCCESS,
                payload: res.data //pasamos token para meterlo a ls ....
            })
            authUser()// Obtener al usuario aut.
            
        } catch (error) {
            console.log('regUSer() - authState',error.response)
            // console.log(error.response.data.msg)
            const alert = {  //Accedder al mensaje del error.
                msg : error.response.data.msg,
                variant : "danger"
            }

            dispatch({
                type: REG_ERROR,
                payload:alert
            })
        }
    }

    
    // Obtener al usuario aut. (despues de registrarce. y logearce)
    const authUser = async () => {
        const token = localStorage.getItem('token') //extraer token
        if(token){ tokenAuth(token)  } //Si hay Añade al header x-auth-token 
        try {
            const res = await clientAxios.get('/api/auth')//peticion get
            // console.log(res)
            dispatch({
                type: GET_USER, 
                payload: res.data.user //extraemos todos los campos/obj 
            })
        } catch (error) {
            dispatch({ type: LOGING_ERROR })            
        }
    }


    //login
    const login = async (datos) => {
        try {
            const res = await clientAxios.post('/api/auth',datos)//peticion get
            console.log(res)
            dispatch({
                type:LOGING_SUCCESS,
                payload: res.data //pasamos la data para acceder al token
            }) 
            authUser() //obtener el token (usuario aut.)
            
        } catch (error) {
            let alert = {}
            if (error.response.data.errors) { //accediendo a msg de express validator (check)
                // console.log(error.response.data.errors[0].msg)
                 alert = {  //Accedder al mensaje del error.
                    msg : error.response.data.errors[0].msg,
                    variant : "danger"
                }   
            } else { //si no hay msg de error de express validator, si los habra del controller
                // console.log(error.response.data.msg)
                alert = {  //Accedder al mensaje del error.
                    msg : error.response.data.msg,
                    variant : "danger"
                }  
            }
            dispatch({
                type: LOGING_ERROR,
                payload:alert
            })
        }
    }

    // Logout
    const logout = () => {
        dispatch({
            type:LOGOUT
        })
        
    }





    return(
        <AuthContext.Provider
            value={{
                token : state.token,
                authenticated : state.authenticated,
                user : state.user,
                message : state.message,
                loading : state.loading,

                regUser,
                login, 
                authUser,
                logout
                
            }} 
        >
            {props.children}
        </AuthContext.Provider> 


    )

}
export default AuthState