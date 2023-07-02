import { useDispatch, useSelector } from "react-redux"
import { hipodromoApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore= () => {

    const { status,user,errorMsg, } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async({email, password}) =>{
        dispatch(onChecking())
        try {
            const {data} = await hipodromoApi.post('/usuario/login', {
                email,
                password
            })

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({nombres: data.usuario.nombre, id: data.usuario._id}))
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token')
        if (!token || token == null) return dispatch(onLogout());

        try {
            const {data} = await hipodromoApi.get('/usuario/token/renovarToken')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({nombres: data.usuario.nombre, id: data.usuario._id}))
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startRegister = async(newData) =>{
        dispatch(onChecking())
        try {
            const {data} = await hipodromoApi.post('/usuario/crear', {...newData})
            dispatch(onLogout())
        } catch (error) {
            dispatch(onLogout('Error en el registro'));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //Propiedades
        status,
        user,
        errorMsg,
        //Metodos
        startLogin,
        checkAuthToken,
        startLogout,
        startRegister
    }
}