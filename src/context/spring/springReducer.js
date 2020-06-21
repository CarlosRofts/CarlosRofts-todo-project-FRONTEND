import {
    ALERT_PROPS, 
    ALERT_FORMS,
    FORM_PROJ_TRANS,
    ALERT_FTASK,
    ALERT_NEW_USER,
    FTASK,
    TOGGLE_MENU,
   
} from '../../types' //type


// Encargado de cambiar el state de cada seccion  

export default (state, action) => { //los valores llegan mediante dispatch
    switch (action.type) { //filtra las acciones
    
        case ALERT_PROPS: //NuevoProyecto.js
            return {
                ...state,
                msg: action.payload.msg,
                variant: action.payload.variant
            }
            
        case FORM_PROJ_TRANS: //NuevoProyecto.js
            return {
                ...state,
                shownproj: action.payload
            }
        case ALERT_FORMS:
            return {
                ...state,
                errornp: action.payload
            }
        case ALERT_FTASK:
            return {
                ...state,
                errortask: action.payload
            }
        case ALERT_NEW_USER:
            return {
                ...state,
                newuser: action.payload
            }
            
        case FTASK:
            return {
                ...state,
                fadetask: action.payload
            }
        case TOGGLE_MENU:
            return{
                ...state,
                menu : action.payload
            }
           
       
        default: return state
    }
}