import {
    REG_SUCCESS,
    REG_ERROR,
    GET_USER,
    LOGING_SUCCESS,
    LOGING_ERROR,
    LOGOUT,
   
   
} from '../../types' //type


// Encargado de cambiar el state de cada seccion  

export default (state, action) => { //los valores llegan mediante dispatch
    switch (action.type) { //filtra las acciones
    
        case LOGING_SUCCESS:
        case REG_SUCCESS: //NuevoProyecto.js
                localStorage.setItem('token' , action.payload.token)
                return{
                    ...state,
                    authenticated:true,
                    message:null,
                    loading:false
                }
        case GET_USER:
            return{
                ...state,
                user:action.payload,
                authenticated:true,
                loading:false

            }

        case LOGOUT:
        case LOGING_ERROR:             
        case REG_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                message:action.payload,
                user:null,
                token:null,
                authenticated:false,
                loading:false

            }

            
       
       
        default: return state
    }
}