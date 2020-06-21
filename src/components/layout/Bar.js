import React,{useContext,useEffect} from 'react'
import springContext from '../../context/spring/springContex'
import AuthContext from '../../context/auth/authContex'
import useCurrentWitdh from './onRisize'

import { css} from 'emotion'
import {Navbar , Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'

const Bar = () => {

    const springsContext = useContext(springContext)
    const { setMenu } = springsContext
    const authContext = useContext(AuthContext)
    const { user, authUser, logout } = authContext
    
    var x = useCurrentWitdh().menu
    // console.log(useCurrentWitdh().menu)
    
    useEffect(() => {
        authUser()// Mantener token despues de act en app.js ya extraimos el token de ls y ahora lo validamos.
        setMenu(x) //cerrar onresize
        // quitar warning de missing dep.
        // eslint-disable-next-line
     }, [x] )    

    const styles = {
        Navbar : css`
                z-index:100;
                box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.151);               
                `,
    }

    return ( 
        <Navbar variant="ligth" className={` ${styles.Navbar} bg-transparent border px-5`}>

            {useCurrentWitdh().width < 700 ? ( //Poner en el ternario el state de spring (falta crearlo) 
                <Button variant='' onClick={() => setMenu(true)}
                ><FontAwesomeIcon className="mr-3" icon={faAlignLeft} style={{ cursor: "pointer" }} /> </Button>
            ) : null}
            {/* <p>{useCurrentWitdh}</p> */}

            <Navbar.Text className=" font-weight-bold  text-secondary" >
                {user ? ` Hola, ${user.name}` : null}
            </Navbar.Text>

            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="mx-3  ">
                    <Button variant="" className="text-danger"
                        onClick={() => logout()}
                    >Cerar Sesión</Button>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
     );
}
 
export default Bar;