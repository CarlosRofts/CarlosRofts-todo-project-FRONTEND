import React , { useContext,useEffect } from 'react'

import  Sidebar  from "./../layout/Sidebar";
import  Bar  from "./../layout/Bar";
import FormTask from "./../tareas/FormTask"
import ListTask from "./../tareas/ListTasks";
import AuthContext from '../../context/auth/authContex'

import { css} from 'emotion'
import {Container, Row,Col} from 'react-bootstrap';

// CONTAINER
const Proyectos = () => {

     // datos de auth 
     const authContext = useContext(AuthContext)
     const { authUser , } = authContext

    // Mantener token despues de act 
     useEffect(() => {
        authUser() //en app.js ya extraimos el token de ls y ahora lo validamos.
        // eslint-disable-next-line
     }, [] )

    const styles = {
        Proyectos : css` 
                min-height:100vh;               
                padding-left:0px !important;
                padding-right:0px !important;
        `,
    }
    
    return (
        <Container fluid  className='bg-white'>
            <Row>
                <Sidebar/>
                <Col  as="main" className= {`${styles.Proyectos } bg-white w-75`} >
                    <Bar/>
                    <FormTask/>
                    <ListTask/>
                </Col>
            </Row>
        </Container>
    );
}
 
export default Proyectos;