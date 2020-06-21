import React,{useState,useContext,Fragment,useEffect} from 'react'
import projectContext from '../../context/proyectos/projectContext'
import TaskContext from '../../context/tareas/taskContext'
// LIBS
import {Button,Badge,Col,Row} from 'react-bootstrap';
import { css} from 'emotion'
import {useTransition , animated} from 'react-spring';       


const Task = ({tarea}) => {

    // Trae todos los proyectos.
    const projectsContext = useContext(projectContext)
    const {  project } = projectsContext
    const [ projectSelected ] = project //get the 1° pos and the only one    

    // Delete fn's
    const tasksContext = useContext(TaskContext)
    const { delTask , getTasks , updtTask, setCurrTask} = tasksContext

    // Eliminar la tarea seleccionada
    const deletask = (id) => {
        delTask(id , projectSelected._id)
        getTasks(projectSelected._id)
        // if (!fadetask){setFadeTask(true)}
        // if (fadetask){setFadeTask(false)}
        setFadeTask(false)
    }

    // Modifica Estado de la tarea
    const setStatus = (task) => {
        if (task.status) {
            task.status=false
        }else{
            task.status=true
        }
        updtTask(task) 
    }
    // Editar Tarea
    const selectTask = (task) => {
        setCurrTask(task)
    }


    // SPRING necesitamos un state local, un id de item  y un boleano por tarea
    const [fadetask, setFadeTask] = useState(false)
    useEffect(() => { //al inciar el componente pasa a true
        setFadeTask(true)
    }, [])


  

    const fade = {
        from: { transform: `translateY(0px)`, opacity: 0 }, //lo posicionamos en un punto.
        enter: { transform: `translateY(3px)`, opacity: 1 }, //entra desde ese punto hacia donde le indiquemos 
        leave: { transform: `translateY(-2px)`, opacity: 0 }, //y se va hacia otro punto 
        config : { duration : 200}
    }

    const transfadetask = useTransition( fadetask, tarea._id , fade )
    
    //> LOCAL inline-css    
    const styles = {
        Task : css`
                list-style:none;
                box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.151); 
                h4{cursor:pointer;}               
        `,  
    }

    return (

        <Fragment>

            {transfadetask.map(
                    ({ key, props }) =>
                        (
                            // Transition para cada tarea individual
                            <animated.div key={key} style={{ ...props }}>

                                <Row className={`${styles.Task} my-4 px-md-5 px-sm-1 py-3`}>
                                    <Col >
                                        <h5 className="text-sm-left text-secondary ">{tarea.name}</h5>
                                    </Col>
                                    <Col sm="12" className="d-flex justify-content-between align-baseline ">
                                        <span style={{fontSize:"1.3em"}}>
                                            {tarea.status
                                                ? <p
                                                    className="p-1 "
                                                    onClick={() => setStatus(tarea)}
                                                    style={{cursor:"pointer"}}
                                                ><Badge variant="success" >#Completo</Badge></p> //<Button>#Completo</Button>
                                                : <p
                                                    className="p-1"
                                                    onClick={() => setStatus(tarea)}
                                                    style={{cursor:"pointer"}}
                                                ><Badge variant="incomplete">#Incompleto</Badge></p> //<Button>#Incompleto</Button>
                                            }
                                        </span>
                                        <span>
                                            <Button
                                                variant="outline-secondary"
                                                className="m-1"
                                                onClick={() => { selectTask(tarea) }}

                                            >Editar
                                            </Button >
                                            <Button
                                                variant="warning"
                                                className="m-1"
                                                onClick={() => { deletask(tarea._id) }}
                                            >Eliminar
                                            </Button>
                                        </span>
                                    </Col>
                                </Row>


                            </animated.div>
                        )
                )
            }


        </Fragment>

    );
}

export default Task;