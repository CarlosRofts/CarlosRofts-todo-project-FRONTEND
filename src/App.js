import React from 'react';
import { BrowserRouter as Router, Switch , Route } from "react-router-dom";

import Login  from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import SocialLInks from './components/layout/SocialLinks'

import SpringState from './context/spring/springState'
import ProjectState from './context/proyectos/projectState'
import TaskState from './context/tareas/tasksState'
import AuthState from './context/auth/authState'
import tokenAuth from "./config/token";
import PrivateRoute from './components/routes/private'

// import './app.scss';
import './scss/style.scss'
import {css} from 'emotion'
// import './scss/customBS.scss'

// Mantener token despues de act (cont. proyectos.js)
const token = localStorage.getItem('token') //el token queda en ls aunque recarguemos 
if(token){ //Revisar si hay token
  tokenAuth(token)
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL)

  const styles = {
    wrapper : css`
            background-color: hsl(289, 19%, 28%);
            /* color: pink; */
            min-height:100vh;
            `,
}

  return (
    <ProjectState>
      <TaskState>
        <SpringState>
          <AuthState>
          <SocialLInks/>

            <Router>
              {/* todo fuera de switch se vera en todas las pag */}
              <div className={styles.App}>

                <Switch>
                  <div className={styles.wrapper}>
                    {/* Todo dentro de switch  sera cada una de las dif pag*/}
                    {/* Definir rutas */}
                    <Route exact path="/" component={Login} />
                    <Route exact path="/new-user" component={NuevaCuenta} />
                    <PrivateRoute exact path="/projects" component={Proyectos} /> {/* //! PROTEGER UN COMPONENTE CON HIGHER ORDER COMPONENT  */ }
                  </div>
                </Switch>

              </div>
            </Router>

          </AuthState>
        </SpringState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
