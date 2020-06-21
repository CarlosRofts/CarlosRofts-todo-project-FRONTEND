import clientAxios from './axios'

// Añade al header x-auth-token mediante clientAxios (url base)
const tokenAuth = (token) => {
    if(token){ //agregar al header x-auth-token 
        clientAxios.defaults.headers.common['x-auth-token'] = token
    } else { //Elimina token en caso de logout o token expired
        delete clientAxios.defaults.headers.common['x-auth-token']
    }
}

export default tokenAuth