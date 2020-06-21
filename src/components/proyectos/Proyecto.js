import React,{useContext} from 'react';
import projectContext from '../../context/proyectos/projectContext'
import TaskContext from '../../context/tareas/taskContext'


import {  Button ,Col} from 'react-bootstrap';

const Proyecto = ({proj}) => {

    const projectsContext = useContext(projectContext)
    const { currProject } = projectsContext;

    const tasksContext = useContext(TaskContext)
    const { getTasks } = tasksContext

    // fn add current sel. proj.
    const selectProj = id => {
        currProject(id)
        getTasks(id)
    }

    return ( 
        <li>
            <Col className="d-flex justify-content-center">
                <Button  
                    className="my-2 text-white"
                    variant="outline-primary"
                    onClick={() => selectProj(proj._id)}
                    >
                    {proj.name}
                </Button>
            </Col>
        </li>
    );
}
 
export default Proyecto;