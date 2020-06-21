import React, { useReducer ,useContext} from 'react';
import TaskContext from '../tareas/taskContext'
import springContext from './springContex'
import springReducer from './springReducer'
import { 
    ALERT_PROPS, 
    ALERT_FORMS,
    FORM_PROJ_TRANS,  
    ALERT_FTASK,
    ALERT_NEW_USER,
    FTASK,
    TOGGLE_MENU

} from '../../types' //types (para Reducer)
import {useTransition} from 'react-spring';      

const initialState = {
    msg : "", variant : "danger",
    shownproj : false,
    errornp : false, 
    errortask:false,
    newuser:false,  
    fadetask:true,
    menu:true,    
}    

//>──── Set States fns ─────
const SpringState = props => {
     // Dispatch para ejecutar las acciones (types) (para Reducer)
     const [state, dispatch] = useReducer(springReducer, initialState )
    // Extraerr state de tareas
     const tasksContext = useContext(TaskContext)
     const { tasks } = tasksContext
 

    const setAlertProps = (  msg , variant ) => {
        let properties = {msg : msg , variant : variant}
        dispatch({
            type: ALERT_PROPS, //ejecuta el type (para Reducer)
            payload: properties
        })
    }

     const setShowNProj = ( shownproj ) => {
        dispatch({
            type: FORM_PROJ_TRANS, //ejecuta el type (para Reducer)
            payload: shownproj
            
        })
    }
       // Validar form Alerts 
    const setErrorNP = (errornp) => {
        dispatch({
            type :  ALERT_FORMS,
            payload: errornp

        })
    }

    const setErrorTask = (errortask) => {
        dispatch({
            type: ALERT_FTASK,
            payload: errortask
        })
    }

    const setNewUser = (newuser) => {
        dispatch({
            type: ALERT_NEW_USER,
            payload: newuser
        })
    }
    
    const setFadeTask = (errortask) => {
        dispatch({
            type: FTASK,
            payload: errortask
        })
    }
    
    const setMenu = (toggle) => {
        dispatch({
            type: TOGGLE_MENU,
            payload: toggle
        })
        
    }
   
     //>──── spring Conf ─────

    //slide new proj. form  
     const transnewproj = useTransition( state.shownproj, null, { //en null debe ir un key , en algunos casos el obj. mismo es la key entonces debe ir null , source;https://github.com/react-spring/react-spring/issues/606#issuecomment-476311041
        from: { transform: `translate(350px , 0px)`, opacity: 0 }, //lo posicionamos en un punto.
        enter: { transform: `translate(0px, 0px)`, opacity: 1 }, //entra desde ese punto hacia donde le indiquemos 
        leave: { transform: `translate(100px, 0px)`, opacity: 0 }, //y se va hacia otro punto 
    })

   
    // opacity only
    const fade = {
        from: { transform: ``, opacity: 0 }, //lo posicionamos en un punto.
        enter: { transform: ``, opacity: 1 }, //entra desde ese punto hacia donde le indiquemos 
        leave: { transform: ``, opacity: 0 }, //y se va hacia otro punto 
    }
    const transalert = useTransition( state.errornp , null, fade )
    const transalertask = useTransition( state.errortask , null, fade )
    const transnewuser = useTransition( state.newuser , null, fade)
    const transfadetask = useTransition( state.fadetask , null, fade) //task id
    const transmenu = useTransition( state.menu , null , {
        from: {  zIndex:102 ,transform: `translateX(-500px)` , opacity: 0 , }, //lo posicionamos en un punto.
        enter: { transform: `translateX(0px)`,  opacity: 1 }, //entra desde ese punto hacia donde le indiquemos 
        leave: { transform: `translateX(-500px)`, opacity: 1 }, //y se va hacia otro punto 
        // position:`${state.menu ? "absolute" : "sticky" }`
    })
    const fadeoverlay = useTransition( state.menu , null , {
        from: {  zIndex:101 , opacity: 0 , }, //lo posicionamos en un punto.
        enter: {  opacity: 1 }, //entra desde ese punto hacia donde le indiquemos 
        leave: {  opacity: 0 }, //y se va hacia otro punto 
    })



  

    return(
        <springContext.Provider
        value={{
            // provide state to childrens
            msg: state.msg, variant: state.variant,


            shownproj : state.shownproj,
            errornp : state.errornp,
            transalert : transalert,
            errortask : state.errortask,
            newuser : state.newuser,
            fadetask : state.fadetask,
            menu : state.menu,

            transnewproj : transnewproj,  
            transalertask : transalertask,
            transnewuser : transnewuser,
            transfadetask : transfadetask,
            transmenu : transmenu,
            fadeoverlay : fadeoverlay,

            setAlertProps,
            setShowNProj,
            setErrorNP,
            setErrorTask,
            setNewUser,
            setFadeTask,
            setMenu
        }} 
        >
            {props.children}
        </springContext.Provider>
    )

}

export default SpringState