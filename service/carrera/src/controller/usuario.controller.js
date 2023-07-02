const { Usuario } = require("../models");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { calcularEdad } = require('../helpers/usuario-vali');

const crear = async (req, res) => {
    try {
        console.log(req.body)
        const usuarioDB = await Usuario.findOne({ email: req.body.email });

        if (usuarioDB) {
            return res.status(400).json({
                msg: `El usuario ${usuarioDB.email} ya existe`
            });
        }
        const data = {
            ...req.body
        }
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(data.password, salt);
        data.edad = calcularEdad(data.fechaNacimiento);

        const usuario = await new Usuario(data);
        await usuario.save();

        res.status(200).json({
            msg: 'Creado con exito',
            usuario
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error del servidor',
        });
    }

};

const traerTodos = async (req, res) => {
    try {
        const usuarios = await Usuario.find()

        res.status(200).json({
            msg: 'obtenidos con exito',
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
}

const editar = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await Usuario.findByIdAndUpdate(id, {...req.body})
        res.status(200).json({
            msg: 'Actualizado con exito',
            usuario
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
}

const eliminar = async (req, res) => {
    try {
        const id = req.params.id
        await Usuario.findByIdAndDelete(id)
        res.status(200).json({
            msg: 'Eliminado con exito',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
}

const login = async (req, res) => {

    const { email, password } = req.body
    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/contraseña incorrecta'
            });
        }
        
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });

        }
        //generar jwt
        const token = await generarJWT( usuario._id );

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error del servidor'
        });
    }

}

const revalidarToken = async (req, res ) => {

    const { id_usuario, nombres } = req;
    let usuario =  await Usuario.findById(id_usuario)
    
    // Generar JWT
    const token = await generarJWT( id_usuario );

    res.json({
        ok: true,
        token,
        usuario
    })
}

const traerPorId = async (req, res) => {
    try {
        const id = req.params.id
        let usuario = await Usuario.findById(id)
        res.status(200).json({
            msg: 'ok',
            usuario
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error del servidor'
        });
    }
}

module.exports = {
    crear,
    traerTodos,
    editar,
    eliminar,
    login,
    revalidarToken,
    traerPorId
}