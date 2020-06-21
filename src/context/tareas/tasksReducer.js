import {
        TASK_PROJ,
        ADD_TASK,
        DEL_TASK,
        // TASK_STATUS,
        CURR_TASK,
        UPDT_TASK,
        CLEAN_TASK,
    } from '../../types' //type

// Encargado de cambiar el state de cada seccion  

export default (state,action ) => { //los valores llegan mediante dispatch
    switch(action.type){ //filtra las acciones

       case TASK_PROJ: //proyecto.js | llena el state 
           return{
               ...state,
               tasksproject : action.payload

            //tasksproject: state.tasksproject.filter(task => task.projId === action.payload) //front end test
               //tareas que contengan el id proveniente del payload el cual mandara la fn de proyecto.js 
           } 

        case ADD_TASK: //proyecto.js
        return{
            ...state, //! lo añade al final 
            tasksproject: [action.payload, ...state.tasksproject ] //agrega lo que ya estaba mas la nueva tarea al inicio del state
        }

        case DEL_TASK: //task.js
        return{
            ...state,
            tasksproject:  state.tasksproject.filter(task => task._id !== action.payload) 
        }

        case UPDT_TASK: //task.js
        return{
            ...state,
            tasksproject: state.tasksproject.map(task => task._id === action.payload._id  ?  action.payload : task),
            // itera en todas las tareas y cuando coincidan los ids , true:asigna el payload, false lo deja igual
            // selectedtask:null (otra forma de limpiar)
        }

        case CURR_TASK: //task.js
        return{
            ...state,
            selectedtask : action.payload
        }
        
        case CLEAN_TASK: //task.js
        return{
            ...state,
            selectedtask:null
        }

        default:return state
    }
}