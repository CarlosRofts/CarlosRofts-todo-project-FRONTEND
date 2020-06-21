import React,{useContext} from 'react';
import springContext from '../../context/spring/springContex'   
import { Alert } from 'react-bootstrap';

const AlertVali = ( {margin, onclosefn , message,Variant } ) => {
    var classes = `w-100 fade ${margin}`

    const springsContext = useContext(springContext)
    const { msg, variant} = springsContext
    setTimeout(() => {
        onclosefn(false)
    }, 5000);
           
    return ( 
            <Alert className={classes} variant={variant ? variant : Variant } onClose={() => { onclosefn(false) }} dismissible >
                <Alert.Heading>Error</Alert.Heading>
                <p>{msg ? msg  : message}</p>
            </Alert>
     );
}
export default AlertVali;