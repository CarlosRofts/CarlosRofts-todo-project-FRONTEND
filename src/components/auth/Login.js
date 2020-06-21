import React , {useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import springContext from '../../context/spring/springContex'   
import AuthContext from '../../context/auth/authContex'
import AlertVali from '../Alerts/AlertVali'

// import styled from '@emotion/styled'
// import { css, cx } from 'emotion'
import { Container, Button , Form ,Col,Row} from 'react-bootstrap';
import { animated  } from 'react-spring';


      

const Login = (props) => {  

    // alerts
    const springsContext = useContext(springContext)
    const { setAlertProps, transnewuser, setNewUser } = springsContext
    // auth y mensajes de alerts
    const authContext = useContext(AuthContext)
    const { message , authenticated , login , } = authContext


    useEffect(() => {
        if (authenticated) { props.history.push('/projects') }
        // en caso de usuario inexistente o password incorrecto
        if (message) { 
            setAlertProps(message.msg , message.variant)
            setNewUser(true) //show alert
        }   
        // quitar warning de missing dep.
        // eslint-disable-next-line
    }, [message, authenticated])



    // State Iniciar Sesión
    const [user, setUser] = useState({
        email:'',
        password:'',
    }); const {email, password}=user    
      
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })    
    }

    const onSubmit = e => {
        e.preventDefault()
        // validar Campos Vacios
        if (email.trim() === '' || password.trim() === '') {
            setNewUser(true); //show alert
            setAlertProps( "Todos los campos son obligatorios", "danger" ) ; return 
        }
        login({email,password})// Pasar al action

    }

    return (
        <Container className="text-white">
            <Row className="align-content-center justify-content-center"  style={{ height: '100vh' }}
>
                    <Form
                        onSubmit={onSubmit}
                        className="border  rounded  p-5"
                    >
                        <Col  className="my-auto">
                            <Form.Group >
                                <Form.Label >Email address</Form.Label>
                                <Form.Control 
                                    // type="email" 
                                    name='email'
                                    placeholder="Enter email"
                                    onChange={onChange}
                                    />

                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    valuee={password}
                                    placeholder="Password"
                                    onChange={onChange}
                                />
                            </Form.Group>
                            <Form.Group className="text-center">
                                <Button variant="primary" type="submit" className={"mx-auto w-50 "} >
                                    Submit
                                </Button>
                            </Form.Group>

                            <Link to={'/new-user'} className="text-info mt-1 col d-inline-block text-center" style={{ filter: "brightness(300%)" }}>
                                Obtener Una Nueva Cuenta
                            </Link>
                        </Col>


                        {transnewuser.map(
                        ({ item, key, props }) =>
                            item && (
                                <animated.div key={key} style={{ ...props }}>
                                    <AlertVali
                                        onclosefn={setNewUser}
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

 
 
export default Login;