import Usuario from '../models/usuarioSchema'
import { validatorResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import generarJWT from '../helpers/validar-jwt'

export const login = async (req, res) => {
  try {
    const errors = validatorResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { email, contrasena } = req.body

    let usuario = await Usuario.findOne({ email })

    if (!usuario) {
      return req.status(400).json({
        mensaje: 'Correo o contraseña invalido - correo',
      })
    }

    const contrasenaValido = bcrypt.compareSync(contrasena, usuario.contrasena)

    if (!contrasenaValido) {
      return res.status(400).json({
        mensaje: 'Correo o contraseña invalido - contraseña',
      })
    }

    const token = await generarJWT(usuario._id, usuario.nombre)

    res.status(200).json({
      mensaje: 'El usuario existe',
      uid: usuario._id,
      nombre: usuario.nombre,
      perfil: usuario.perfil,
      estado: usuario.estado,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: 'email o contraseña invalido',
    })
  }
}

export const crearUsuario = async (req, res) => {
  try {
    const errors = validatorResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { email, contrasena } = req.body

    let usuario = await Usuario.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        mensaje: 'ya existe un usuario con el correo enviado',
      })
    }

    usuario = new Usuario(req.body)

    const salt = bcrypt.genSaltSync()
    usuario.contrasena = bcrypt.hashSync(contrasena, salt)

    await usuario.save()

    res.status(201).json({
      mensaje: 'usuario creado',
      nombre: usuario.nombre,
      perfil: usuario.perfil,
      estado: usuario.estado,
      uid: usuario._id,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: 'El usuario no pudo ser creado',
    })
  }
}
