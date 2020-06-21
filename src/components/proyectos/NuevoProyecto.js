import React,{useState,Fragment,useContext} from 'react';
import springContext from '../../context/spring/springContex'   
import projectContext from '../../context/proyectos/projectContext'
import AlertVali from '../Alerts/AlertVali'


// Libs
import { animated  } from 'react-spring';
import { Button , Form , Row,Col} from 'react-bootstrap';
// import { css } from 'emotion'

const NuevoProyecto = () => {

    const springsContext = useContext(springContext)
    const { 
        transnewproj ,transalert,
        setShowNProj, setErrorNP
        } = springsContext

    // State del form (context)
    const projectsContext = useContext(projectContext)
    const {  addProject } = projectsContext

    // Local State
    const [proj,saveProj] = useState({
        name: '',
    })
    const {name} = proj
    

    // Get inputs values n set state
    const onChangeProj = e => {
        saveProj({...proj,
        [e.target.name] : e.target.value})
    }
    
    const onSubmitProj = e => {
        e.preventDefault()
        // Validate
        if (name === ''){
            setErrorNP(true)
            return
        }
        // set state
        addProject(proj)

        // Reset Form
        saveProj({name:''})
        setErrorNP(false) //close alert
        setShowNProj(false) //close Form
    }


    return (  
        <Fragment>
                <Row>
                    <Col className="d-flex align-content-center justify-content-center my-3" >
                        <Button 
                            onClick={() => { setShowNProj(true)} }
                            // onClick={() => {setShowNProj( prevState => !prevState  );}}
                        >Nuevo Proyecto</Button>
                    </Col>
                </Row>
            <hr/>

            {transnewproj.map( 
                ({ item, key, props }) =>
                item && (
                    <animated.div key={key}  style={{ ...props }}>

                            
                            <Form
                            onSubmit={onSubmitProj}
                            >

                            <Row>
                                <Col className="d-flex justify-content-end ">
                                    <Button 
                                        variant="" 
                                        className="text-danger"
                                        // onClick={() => {setShowNProj({isDisplay:false})}}
                                        onClick={() => {setShowNProj(false); setErrorNP(false)}}
                                        >
                                        <p style={{ fontSize: "2em" }}> &times;</p>
                                    </Button>
                                </Col>
                            </Row>

                                <Form.Group as={Col} >
 
                                    <Form.Control
                                        placeholder="Nombre de tu proyecto"
                                        name="name"
                                        value={name}
                                        onChange={onChangeProj}
                                    />
                                </Form.Group>

                                <Col className="d-flex align-content-center justify-content-center my-3" >
                                    <Button variant="primary" type="submit">
                                        Agregar Proyecto
                                    </Button>
                                </Col>
                            </Form>

                            {transalert.map(
                                ({ item, key, props }) =>
                                    item && (
                                        
                                        <animated.div key={key} style={{ ...props }}>
                                            <AlertVali
                                                message="Escribe el nombre de tu proyecto"
                                                onclosefn={setErrorNP}
                                                Variant="danger"
                                                margin="my-4"
                                            />   
                                        </animated.div>
                                    )
                            )}

                    </animated.div>
                  )
            )}
        </Fragment>
    );
}
 
export default NuevoProyecto;