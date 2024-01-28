import jwt from 'jsonwebtoken'
import { Usuario } from '../models/index.js'
const protegerRuta = async (req, res, next ) =>{
    
    // Verificar si hay un token
    const { _token } = req.cookies
    
    if(!_token){
        console.log('Usuario No logeado, redireccion al login')
        return res.redirect('/auth/login')
    }

    // Comprobar token
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)
        // console.log('Usuario logueado:>', usuario.dataValues)

        // Almacenar el usuario al Req
        if(usuario){
            req.usuario = usuario
        }else{
            return res.redirect('/auth/login')
        }
        return  next();
    } catch (error) {
        console.log('Usuario No logueado, redireccion al login')
        return res.clearCookie('_token').redirect('/auth/login')
    }
}

export default protegerRuta