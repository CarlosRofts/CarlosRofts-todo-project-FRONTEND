import React , {useState,useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import springContext from '../../context/spring/springContex'   
import AuthContext from '../../context/auth/authContex'

import AlertVali from '../Alerts/AlertVali'
import { animated  } from 'react-spring';
import { css } from 'emotion'
import { Container, Button , Form ,Col , Row} from 'react-bootstrap';


const NuevaCuenta = (props) => {

    // alerts
    const springsContext = useContext(springContext)
    const { setAlertProps, transnewuser, setNewUser } = springsContext
    // auth y mensajes de alerts
    const authContext = useContext(AuthContext)
    const { message , authenticated ,
            regUser , } = authContext

    // en caso de que el usuario ya este autenticado ,reg o duplicado.
    useEffect(() => {
        //al terminar el reg. redirecciona a proy.
        if (authenticated) { props.history.push('/projects') }
        if (message) { //en caso de email duplicado
            setAlertProps(message.msg , message.variant)
            setNewUser(true) //show alert
        }           
        // quitar warning de missing dep.
        // eslint-disable-next-line
    }, [message, authenticated,message])

    // Local state Iniciar Sesión
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirmar:''
    })
    // Destructuring 
    const {name,email,password,confirmar}=user    
      
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })    
    }

    const onSubmit = e => {
        e.preventDefault()
        // validar Campos Vacios

        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
             setNewUser(true); //show alert
             setAlertProps( "Todos los campos son obligatorios", "danger" ) ; return 
        }
        if(password.length < 6) {
            setNewUser(true); //show alert
            setAlertProps("El password debe contener al menos 6 caracteres" , "danger"); return
        }

        if(password !== confirmar){
            setNewUser(true); //show alert
            setAlertProps("El password no coincide" , "danger"); return
        }

        // Pasar al action
        regUser({name , email ,password})

    }
    
    const styles = {
        newUser : css`
            color: white ;
               
        `,
    }   

    return (
        <Container className={`${styles.newUser} col-md-5`}>
                    <Row className=" align-content-center justify-content-center" style={{ minHeight: '100vh' }}>
                        <Form
                          onSubmit={onSubmit}
                          className="border  rounded p-5"
                        >
                            <Form.Row>
                                <Col>
                                    <h3 className="text-center  font-weight-light mb-5"> Obtener Nueva Cuenta </h3>
                                </Col>
                            </Form.Row>
                        
                            <Form.Row>
                                <Form.Group as={Col} >
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control 
                                            placeholder="Nombre"
                                            id="name"
                                            name="name"
                                            // value={name}
                                            onChange={onChange}
                                        />
                                </Form.Group>
                
                                <Form.Group as={Col} >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email"
                                         placeholder="Enter email"
                                         id="email"
                                         name="email"
                                         value={email}
                                         onChange={onChange}
                                    />
                                </Form.Group>
                                
                            </Form.Row>
                
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        name="password"
                                        id='password'
                                        value={password}
                                        onChange={onChange}
                                    />
                                </Form.Group>
                
                                <Form.Group as={Col} >
                                    <Form.Label>Confirmar Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirmar Password"
                                        name="confirmar"
                                        id="confirmar"
                                        value={confirmar}
                                        onChange={onChange}
                                    />
                                </Form.Group>

                         
                
                            </Form.Row>
                            <Col className='d-flex justify-content-center mt-3'>
                                <Button variant="primary" type="submit" className='px-5'>
                                    Registrar
                                </Button>
                            </Col>
                            
                            <Link to={'/'} >
                                <Col className=" mt-4  font-weight-lighter text-white text-left ">
                                    Volver a Iniciar Sesión
                                </Col>
                            </Link>

                            {transnewuser.map(
                                ({ item, key, props }) =>
                                    item && (
                                        <animated.div key={key} style={{ ...props }}>
                                            <AlertVali
                                                onclosefn={ setNewUser }
                                                margin="my-4"
                                            />
                                        </animated.div>
                                    )
                            )}
                        </Form>
        
                    </Row>
                  

            

            </Container>
    );
}
 
export default NuevaCuenta;