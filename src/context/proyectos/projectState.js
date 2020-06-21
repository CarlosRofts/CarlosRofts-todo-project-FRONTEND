import React, { useReducer } from 'react';
// COMPONENTS
import projectContext from'./projectContext'
import projectReducer from './projectReducer'
import {
    GET_PROJECTS,
    ADD_PROJECT,
    CURR_PROJ,
    DEL_PROJ,
    PROJ_ERROR

} from '../../types' //types (para Reducer)
import clientAxios from '../../config/axios'
// LIBS
// import {v4 as uuid} from "uuid"; 

// Crear Context
const ProjectState = props => {

    // const projects = [{ id: 1, name: 'Tienda Lorem' }, ] 
    const initialState = {
        projects : [],
        formulario : false,
        project: null,
        message: null
    }    

    // Dispatch para ejecutar las acciones (types) (para Reducer)
    const [state, dispatch] = useReducer(projectReducer, initialState )

    
        //Obtener los proyectos
    const getProjects = async () => {

        try {
            const res = await  clientAxios.get('/api/projects' ) //los datos del usuario se los pasamos al res desde auth al logearce o reg.
            dispatch({
                type: GET_PROJECTS, //ejecuta el type (para Reducer)
                payload: res.data.projects // upload state
            })
        } catch (error) {
            console.log(error) 
            const alert = {
                msg: 'Hubo un error al obtener el proyecto',
                variant: 'warning'
            }
            dispatch({
                type: PROJ_ERROR ,
                payload:alert
    
            })
        }
    }    

    const addProject = async (project) => {
        // project.id = uuid() 
        try {
            const res = await  clientAxios.post('/api/projects' , project)
            console.log(res.data)
            // set state
            dispatch({
                type :  ADD_PROJECT,
                payload: res.data
            })
            
        } catch (error) {
            console.log('',error.response)   
            const alert = {
                msg: 'Hubo un error al agregar el proyecto',
                variant: 'warning'
            }
            dispatch({
                type: PROJ_ERROR ,
                payload:alert
    
            })  
                   
        }
    }

    // Seleccionar proyecto por click
    const currProject = (projectId) => {
        dispatch({
            type :  CURR_PROJ,
            payload: projectId
        })
    }

    // Eliminar Proj
    const delProj = async (projectId) => {
    try {
        await clientAxios.delete(`/api/projects/${projectId}`) //delete BDD

        dispatch({ //delete front end
            type :  DEL_PROJ,
            payload: projectId
        })
        
    } catch (error) {
        console.log('',error.response)    
        const alert = {
            msg: 'Hubo un error al borrar el proyecto',
            variant: 'warning'
        }
        dispatch({
            type: PROJ_ERROR ,
            payload:alert

        })
    }
    }
   
    // UPDATE NAME OF CURR. PROJ (EXTENDER EL PROJ. despues...)

    return(
        <projectContext.Provider
            value={{
                // provide state to childrens
                projects: state.projects,
                formulario: state.formulario,
                project : state.project,
                message : state.message,

                getProjects,
                addProject,
                currProject,
                delProj   
            }}
        > {props.children}
        </projectContext.Provider>
    )
}
 
export default ProjectState;   