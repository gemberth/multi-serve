const { Router } = require('express');
const { carreraController } = require('../controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', carreraController.traerTodos); 
router.get('/id/:idUsuario', carreraController.traerPorIdCabecera); 
router.post('/crear', carreraController.crear); 
router.get('/:idUsuario', carreraController.traerTodosPorIdUsuario);    
router.get('/detalle', carreraController.traerTodosDetalle);    
router.delete('/:id', carreraController.eliminar);
router.put("/:id", carreraController.actualizar);


module.exports = router; 