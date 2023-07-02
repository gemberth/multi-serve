//require('dotenv').config();
const { dbConnection } = require('./src/config/db');
const app = require('./app');

const main = async () => {
    try {
        console.log(process.env.MONGO_CNN)
        await dbConnection();
        app.listen(3000, () =>{
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
        })
        
    } catch (error) {
        console.log("Error al conectar con las base de datos")
    }
    
}

main();
