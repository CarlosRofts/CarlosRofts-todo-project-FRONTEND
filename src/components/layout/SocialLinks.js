import React from 'react'
// import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle  } from '@fortawesome/free-solid-svg-icons'
import { faGithub} from '@fortawesome/free-brands-svg-icons'  
import styled from '@emotion/styled' 


const portfolio = <FontAwesomeIcon icon={faUserCircle} className="social ml-2 mr-1 display-4"/>
const gitHub2 = <FontAwesomeIcon icon={faGithub} className="social mr-2 display-4" />

const SocialLinks = () => {
    return (
      <Row className="d-flex rounded-pill my-3 py-2" style={{ position:"fixed",right:30,bottom:0,zIndex:100}}>
          <a target="_blank" rel="noopener noreferrer" className="text-white my-auto" href="http://carlosfuentes.ns1.epizy.com/">{portfolio}</a>
          <a target="_blank" rel="noopener noreferrer" className="text-white my-auto" href="https://github.com/CarlosRofts/CarlosRofts-todo-project-FRONTEND">{gitHub2}</a>
      </Row>      
      );
}

const Row = styled.div`  
    display:flex; 
    border: 1px solid #ffffffd9;
    a{ color: white !important; margin: 0 5px  ;}
    background-color:hsl(239,10%,20%);
    border-radius:40px;
    font-size:3em;
    transform: translate(300px);
    animation: enter .4s cubic-bezier(.54,.95,.66,1.39) .3s forwards;
    @keyframes enter { to{transform: translate(0px); } }
    .social{
        border-radius: 50%;
        &:hover{
        border: 2.5px solid Aqua;
        transition: all .2s linear;
        color: hsl(167,98%,39%);
    }}
`;
   
export default SocialLinks;