import React , {Fragment,useContext} from 'react'
import springContext from '../../context/spring/springContex'
// Components
import NuevoProyecto from "./../proyectos/NuevoProyecto";
import ListProjects from "./../proyectos/ListProjects";
import useCurrentWitdh from './onRisize'

// LIBS
import { animated  } from 'react-spring';
import { css } from 'emotion'
import {  Container,Button,Row,Col} from 'react-bootstrap';

const Sidebar = () => {

    const springsContext = useContext(springContext)
    const { setMenu,transmenu,fadeoverlay } = springsContext


    let x = useCurrentWitdh().width 

    //> LOCAL inline-css    
    const styles = {
        Sidebar : css`
                overflow-y: auto;
                
                background-color: hsl(239, 10%, 20%);
                color: white;
                height:100%;
                width:20vw;
                min-width:300px;
                max-width:20vw;
                position: -webkit-sticky; /* Safari */
                position: sticky;
                top: 0;
                z-index:101;
                box-shadow: 4px 0px 3px 0px rgba(0, 0, 0, 0.151);
                /* transition: transform .5s ease; */
                &::-webkit-scrollbar{
                    display:none;
                }

                hr{border-top: 1px solid rgba(100, 100, 100, .3);}

                @media screen and (max-width: 700px) { 
                    & { position:absolute;}
                }
        `,  

        overlay : css `
          @media screen and (max-width: 700px) { 
                    & { position:fixed;}
                }
        
        `
    }

    
    return (
        <Fragment>
            {transmenu.map(
                ({ item, key, props }) =>
                    item && (
                        <animated.div key={key} style={{ ...props }}>

                            <Row as="aside" className={`${styles.Sidebar} nav`}>
                                <Container>
                                    {x < 700 ?
                                        <Row className=' justify-content-end'>
                                            <Button variant="" className="text-danger "
                                                onClick={() => { setMenu(false); }}
                                            >
                                                <p style={{ fontSize: "2em" }}> &times;</p>
                                            </Button>
                                        </Row>
                                        : null}
                                    <span className="bg-primary " style={{ position:"absolute",top:0, height:"5px", width:"100px" }} />
                                    <Col className="my-3" >
                                        {/* <h3 >Mern <span>Task</span> </h3> <hr /> */}
                                        <h4>TODO MERN PROJECT</h4>
                                        <p className="font-italic font-weight-lighter">By Carlos Fuentes</p>
                                        <NuevoProyecto />
                                    </Col>

                                    <Col className="mb-5">
                                        <h5 className="font-weight-lighter text-center">Tus Proyectos</h5>
                                        <ListProjects />
                                    </Col>
                                </Container>

                                
                            </Row>

                        </animated.div>
                     
                    )
            )}


            {x < 700 ? fadeoverlay.map(
                ({ item, key, props }) =>
                    item && (<animated.div key={key} style={{ ...props }}>
                        <div className={`${styles.overlay} bg-dark`} 
                            style={{
                                width: "100%",
                                height: "100%",
                                opacity: .8,
                            }}
                            
                            onClick={() => setMenu(false)}
                        ></div>
                    </animated.div>
                    )
            ) : null}

            
       
            
        </Fragment>
    );
}
 
export default Sidebar;