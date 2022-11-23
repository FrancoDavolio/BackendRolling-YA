import { Router } from 'express'
import { check } from 'express-validator'
import { crearUsuario, login } from '../controllers/usuario'

const router = Router()

router
  .route('/')
  .post(
    [
      check('email', 'El email es obligatorio').isEmail(),
      check(
        'contraseña',
        'La contraseña debe tener como minimo 8 caracteres y maximo 15',
      ).isLength({ min: 8, max: 15 }),
    ],
    login,
  )
router.route('/nuevo').post(
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check(
      'contrasena',
      'La contraseña debe tener como minimo 8 caracteres y maximo 15',
    ).isLength({
      min: 8,
      max: 15,
    }),
  ],
  crearUsuario,
)

export default router
