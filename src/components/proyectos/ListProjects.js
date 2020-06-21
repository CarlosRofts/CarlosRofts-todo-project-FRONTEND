import React,{useEffect,useContext} from 'react';
import projectContext from '../../context/proyectos/projectContext'

import Proyecto from "./Proyecto";

const ListadoProj = () => {
   
    // Extraer proyectos de state inicial |  Llamada al archivo state de seccion proyectos (context)
    const projectsContext = useContext(projectContext)  
    const {projects, getProjects} = projectsContext

    //Obtener proyectos cuando se carga el componente 
    useEffect(() => {
        getProjects()  
        // eslint-disable-next-line      
    }, [])

    if(projects.length === 0) return <h4 className="text-center my-5 text-secondary font-weight-light ">Aún no has creado ningun proyecto</h4>

    return(  
            <ul style={{listStyle:"none"}}>
                {projects.map(proj => (
                    <Proyecto
                        key={proj._id}
                        proj={proj}
                    />
                ))}   
            </ul>
     );
}
 
export default ListadoProj;