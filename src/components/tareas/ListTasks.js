import React,{ useContext, useEffect} from 'react'
import springContext from '../../context/spring/springContex'
import projectContext from '../../context/proyectos/projectContext'
// Components
import TaskContext from '../../context/tareas/taskContext'
import Task from './Task'
import AlertVali from '../Alerts/AlertVali'
// LIBS
// import { css} from 'emotion'
import {Col,Row,Button} from 'react-bootstrap';
import { animated  } from 'react-spring';


const ListTasks = () => {

     // alert error
    const springsContext = useContext(springContext)
    const { transalert, setErrorNP, setAlertProps } = springsContext

    const projectsContext = useContext(projectContext)
    const { message, project, delProj } = projectsContext

    const tasksContext = useContext(TaskContext)
    const { tasksproject } = tasksContext 

    
    useEffect(() => {
        if (message) {
            setAlertProps(message.msg , message.variant)
            setErrorNP(true)
        }
        // quitar warning de missing dep.
        // eslint-disable-next-line
    }, [message])


    // Cuando no se ha seleccionado ningun proy se muestra lo sig.
    if (!project) {//si viene vacio   
        return(
                <h3 className="text-center my-5 text-secondary font-weight-light ">Selecciona tu Proyecto</h3>
             )
    } 
    const [currProject] = project //array destructuring 

    return (
            <Col className="px-5">

            <div style={{ 
                    position:'absolute',
                    top:'0px',
                    right:"50%",
                    left:"50%",
                    transform: "translate(-50%, -50%)",
                    zIndex:"100",
                    width: "20vw",
                    minWidth:'200px'
                    }}>
                {transalert.map(
                    ({ item, key, props }) =>
                        item && (
                            <animated.div key={key} style={{ ...props }}>
                                <AlertVali
                                    onclosefn={setErrorNP}
                                    Variant="danger"
                                />
                            </animated.div>
                        )
                )}
            </div>
            <Row>
                <Col className="d-flex justify-content-center flex-md-row flex-column justify-content-md-between  align-content-center align-items-baseline">
                    <h4 className="font-weight-lighter" >Proyecto: {currProject.name}</h4>
                    <Button
                        variant="outline-danger"
                        onClick={() => delProj(currProject._id)}
                    > Eliminar Proyecto &times;
                                </Button>
                </Col>
            </Row>


                <Col as="ul">
                    { tasksproject.length === 0
                        ? <h3 className="text-center my-5 text-secondary font-weight-light " >No hay tareas</h3>
                        : tasksproject.map(tarea => (
                            <Task
                                // key={tarea.id}
                                tarea={tarea}
                            />
                        ))  }
                    
                </Col>
            </Col>

         );
}
 
export default ListTasks;