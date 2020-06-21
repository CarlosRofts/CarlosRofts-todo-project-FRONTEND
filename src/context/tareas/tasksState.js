import React ,{useReducer}from 'react'
import TaskContext from './taskContext'
import TasksReducer from './tasksReducer'
// import {v4 as uuid} from "uuid"; 

import {
    TASK_PROJ,
    ADD_TASK,
    DEL_TASK,
    // TASK_STATUS,
    CURR_TASK,
    UPDT_TASK,
    CLEAN_TASK,


} from '../../types' //types (para Reducer)
import clientAxios from '../../config/axios'


const TaskState = props => {

    const initialState = {
        // tasks:[ { id:1, name: 'Elegir Plataforma', status: true, project: 1 } ],
        tasksproject:[],
        selectedtask:null //bdd + new proj.
    }
  
    // dispatch & state
    const [state,dispatch] = useReducer(TasksReducer,initialState)

    // fn's

    // Get/Update tareas de un proj. 
    const getTasks = async project => {

        try {
            const res = await clientAxios.get(`api/tasks`,{params: {project}})
            // console.log(res)
            dispatch({
                type: TASK_PROJ,
                payload : res.data.tasks
            })
            
        } catch (error) {
            console.log(error.response)
            
        }
    }

    // Agregar tarea de un proyecto seleccionado
    const addTask = async (task) => {
        // task.id = uuid()
        try {
            await  clientAxios.post('/api/tasks' , task)
            // console.log(res)
            dispatch({
                type: ADD_TASK,
                payload : task
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Eliminar tareas por id
    const delTask = async (id, project) => {
        try {
             await  clientAxios.delete(`/api/tasks/${id}`,{params: {project}})
            dispatch({
                type: DEL_TASK,
                payload : id
            })
            
        } catch (error) {
            console.log(error.response)
            
        }
    }
    // // Modifica Estado de la tarea (se paso a updtTaask)
    // const changeStatus = (task) => {
    //     dispatch({
    //         type: TASK_STATUS,
    //         payload : task
    //     })
    // }

    // Edita o Modifica una tarea
    const updtTask = async (task) => {
        try {
            const res = await clientAxios.put(`/api/tasks/${task._id}` ,task)
            console.log(res)
            dispatch({
                type: UPDT_TASK,
                payload: res.data.task
            })
        } catch (error) {
            console.log(error)
            
        }
    }

    // Editar Tarea Actual
    const setCurrTask = (task) => {
        dispatch({
            type:CURR_TASK,
            payload : task

        })
    }
  
    
    // Reset a selectedtask
    const resetSelTask = (args) => {
        dispatch({
            type :  CLEAN_TASK,

        })
    }


    return(
        <TaskContext.Provider
            value={{
                tasksproject: state.tasksproject,
                // errorTask: state.errorTask,
                selectedtask: state.selectedtask,
                getTasks,
                addTask,
                delTask,
                // changeStatus,
                setCurrTask,
                updtTask,
                resetSelTask

            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState