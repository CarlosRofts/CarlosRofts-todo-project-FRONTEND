import React,{useContext,useState,useEffect} from 'react'
import projectContext from '../../context/proyectos/projectContext'
import TaskContext from '../../context/tareas/taskContext'
import springContext from '../../context/spring/springContex'   
import { animated } from 'react-spring';
import AlertVali from '../Alerts/AlertVali'


// import { css} from 'emotion'
import {Form,InputGroup,FormControl,Button,Col,Row} from 'react-bootstrap';


const FormTask = () => {   

    const springsContext = useContext(springContext)
    const { transalertask,
            setErrorTask
    } = springsContext

    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    const tasksContext = useContext(TaskContext)
    const { selectedtask ,addTask ,getTasks,updtTask,resetSelTask } = tasksContext


    useEffect(() => { //observa el ciclo de vida de la tarea seleccionada
        if (selectedtask !== null){ //cuando no hay tarea seleeccionada.
            setTask(selectedtask) //set value input
        } else{
            setTask({name:''})
        }        
    }, [selectedtask])

    // Local State -guarda el value del input
    const [task, setTask] = useState( { name:''} )
    const {name} = task
    if (!project) return null // Cuando no se han agregado projectos se oculta todo el componente
    const [currProject] = project //array destructuring | fn que retorna el proy. selecc..
    
    // Read Values Form
    const handleChange = (e) => {
        setTask({ ...task , [e.target.name] : e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        if(name.trim() === ''){ setErrorTask(true) ; return }// validar y mostrar alert
        // Analizar si es edición o adición
        if (selectedtask === null) { // es submit
            // crear y agregar tarea al state (context) 
            task.project = currProject._id //agrega un nuevo  attr al obj del state
            // task.status = false //definido en BDD ya no es necesario
            addTask(task)
        }else { // es modifiación
            updtTask(task) //actualizar la modificación
            resetSelTask() //reset selectedtask
        }

        // Obtener y filtrar las tareas del proyecto actual
        getTasks(currProject._id)

        // reset
        setTask({name:''}) //clean input
        setErrorTask(false) //close alert

    }

    return ( 
        <Form 
            className={`py-0`}
            onSubmit={onSubmit}
             >

            {/* <Col className="my-5" >
                <Form.Group className="mx-auto w-50">
                    <Form.Label >{selectedtask ? "Editar tu tarea" : "Agregar Nueva Tarea" }</Form.Label>
                    <Form.Control                         
                        type="text"
                        placeholder="Dale un Nombre a la Tarea..."
                        name="name"
                        id='name'
                        value={name}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Col>
            <Col className="d-flex align-content-center justify-content-center my-3" >
                <Button 
                    variant="primary" 
                    type="submit"
                >
                    {selectedtask  ? 'Editar Tarea' : 'Agregar Tarea'  }
                </Button>     
            </Col>     */}
            
            <Row className="justify-content-center w-100">
                <Col  className="col-10 col-md-6 my-5">
                    <InputGroup className="mx-auto ">
                        <FormControl
                            placeholder={selectedtask ? "Haz tus cambios" : "Dale un nombre" }
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                        <InputGroup.Append>
                                <Button
                                    variant="primary"
                                    type="submit"
                                >
                                    {selectedtask ? 'Editar Tarea' : 'Agregar Tarea'}
                                </Button>  
                            
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>

            <Form.Row>
                <Col className='d-flex justify-content-center'>
                    {transalertask.map(
                        ({ item, key, props }) =>
                            item && (
                                <animated.div key={key} style={{ ...props }}>
                                    <AlertVali
                                        message="Escribe el nombre de tu tarea"
                                        onclosefn={setErrorTask}
                                        variant="danger"
                                        margin="my-4"
                                    />   
                                </animated.div>
                            )
                    )}
                </Col>
                
            </Form.Row>
            <hr className='my-3'/>
        </Form>

     );
}
 
export default FormTask;