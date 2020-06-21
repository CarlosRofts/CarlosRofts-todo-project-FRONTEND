import {
        FORM_PROJ,
        GET_PROJECTS,
        ADD_PROJECT,
        ALERT_FORMS,
        FORM_PROJ_TRANS,
        CURR_PROJ,
        DEL_PROJ,
        PROJ_ERROR
        } from '../../types' //type

// Encargado de cambiar el state de cada seccion

export default ( state,action ) => { //los valores llegan mediante dispatch
    switch(action.type){ //filtra las acciones
        case FORM_PROJ: //NuevoProyecto.js
            return{
                ...state,
                formulario: true
            }

        case FORM_PROJ_TRANS: //NuevoProyecto.js
        return{
            ...state,
            isDisplay: action.payload
        }
        case ALERT_FORMS:
        return{
            ...state,
            alert: action.payload
        }

        case GET_PROJECTS://ListProjects.js
            // console.log(action.payload)
        return{
            ...state,
            projects: action.payload //al ejecutar la fn el valor que lepasemos lo asigna al state 
        }
        case ADD_PROJECT://ListProjects.js
        return{
            ...state,
            projects: [...state.projects , action.payload ],//al ejecutar la fn el valor que lepasemos lo asigna al state 
            isDisplay:false
        }   
        case CURR_PROJ ://ListTasks.js
            return{
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DEL_PROJ: //listTasks.js
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null //delete curr. proj.
            }
        case PROJ_ERROR:
            return{
                ...state,
                message : action.payload
            }
        
        default:return state
    }
}