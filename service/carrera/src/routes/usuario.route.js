const { Router } = require('express');
const { usuarioController } = require('../controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/crear', usuarioController.crear);
router.get('/',validarJWT, usuarioController.traerTodos);
router.get('/:id',validarJWT, usuarioController.traerPorId);
router.put('/:id', validarJWT, usuarioController.editar);
router.delete('/', validarJWT, usuarioController.eliminar);
router.post('/login', usuarioController.login);
router.get('/token/renovarToken', validarJWT, usuarioController.revalidarToken)


module.exports = router; 