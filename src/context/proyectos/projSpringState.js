import React, { useReducer} from 'react';
// COMPONENTS
import projectContext from'./projectContext'
import projectReducer from './projectReducer'
import {FORM_PROJ_TRANS } from '../../types' //types (para Reducer)

import {useTransition} from 'react-spring';


// Crear Context
const ProjSpringState = props => {    
    
    const initialState = {
        isDisplay : false
    }


    
    // Dispatch para ejecutar las acciones (types) (para Reducer)
    const [state, dispatch] = useReducer( projectReducer, initialState )
    
    

    

    // fn CRUD    
    return( 
        <projectContext.Provider
            value={{
                
                transNewProj: transNewProj,
                setIsDisplay,                
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}
 
export default ProjSpringState;   