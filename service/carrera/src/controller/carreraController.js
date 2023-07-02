const {   Carrera } = require("../models");


const traerTodos = async (req, res) => {
  try {
    const carrera = await Carrera.find();

    res.status(200).json({
      msg: "obtenidos con exito",
      carrera,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};
const actualizar = async (req, res) => {
  try {
    const id = req.params.id;
    const carrera = await Carrera.findByIdAndUpdate(id, { ...req.body });
    res.status(200).json({
      msg: "Actualizado con exito",
      carrera,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

const crear = async (req, res) => {
  try {
    const data = {
      ...req.body
    };    
    data.edad = Date.now() ;
    const detalle = await new Carrera(data);
    await detalle.save();

    res.status(200).json({
      ok: true,
      msg: "Creado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};
const traerPorIdCabecera = async (req, res) => {
  try {
      const idUsuario = req.params.id
      let carrera = await Carrera.find(idUsuario)
      res.status(200).json({
          msg: 'ok',
          carrera
      });
  } catch (error) {
      res.status(500).json({
          msg: 'Error del servidor'
      });
  }
};
// const traerPorIdCabecera = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const carrera = await Carrera.findOne({ _id: id, idUsuario: req.user.id }); // Obtener una carrera específica del usuario autenticado

//     if (!carrera) {
//       return res.status(404).json({
//         msg: "carrera no encontrada",
//       });
//     }

//     res.status(200).json({
//       msg: "carrera obtenida con éxito",
//       carrera,
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "Error del servidor",
//     });
//   }
// };

const traerTodosPorIdUsuario = async (req, res) => {
  try {
    let idUsuario = req.params.id
    let detalle = await Carrera.find(idUsuario).populate({
        path: 'idUsuario',
        select:
          'nombre edad nivelEquitacion nacionalidad'
      }).populate({
      path: 'idCaballo',
      select:
        'nombre numero raza pais'
    });
    console.log(detalle)
    res.status(200).json({
      msg: "obtenidos con exito",
      detalle    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};
const traerTodosDetalle = async (req, res) => {
  try {
    // let idUsuario = req.params.id
    let detalle = await Carrera.find().populate({
      path: 'idUsuario',
      select:
        'nombre edad nivelEquitacion nacionalidad'
    }).populate({
    path: 'idCaballo',
    select:
      'nombre numero raza pais'
  });
  console.log(detalle)
  res.status(200).json({
    msg: "obtenidos con exito",
    detalle    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

const eliminar = async (req, res) => {
  try {
    const id = req.params.id;
    await Carrera.findByIdAndDelete(id);
    res.status(200).json({
      msg: "Eliminado con exito",

    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};



module.exports = {
  crear,
  traerTodosPorIdUsuario,
  eliminar,
  traerTodos,
  traerTodosDetalle,
  traerPorIdCabecera,
  actualizar
};

