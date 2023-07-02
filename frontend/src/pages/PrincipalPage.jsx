import { NavBar } from "../components";
import { SimpleLineChart } from "../chart";
import imagenBajatalla from "../assets/carrera.jpg";
import imagecambios from "../assets/jinete.jpg";
import './styleHome.css'

export const PrincipalPage = () => {
  return (
    <>
      <NavBar></NavBar>

      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Sistema de administracion de carrreras equinas</h1>
        <p className="text-lg text-center mb-16">
        "Bienvenido al Hipódromo de Competencia, el lugar donde la pasión por los caballos y las emocionantes carreras se unen en un espectáculo lleno de adrenalina. Sumérgete en el fascinante mundo de las carreras de caballos y descubre un lugar donde la velocidad, la elegancia y la destreza se encuentran en perfecta armonía.

En nuestro hipódromo, ofrecemos experiencias únicas para amantes de las carreras, jinetes y aficionados por igual. Con una pista de carreras de primer nivel, instalaciones modernas y un ambiente vibrante, nos enorgullece ser el destino elegido por los profesionales de la hípica y entusiastas de todo el país
          </p>
        <div>
          <img src={imagenBajatalla} class="img-talla" />
        </div>
        <br></br>
        <div className="flex justify-center items-center">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-4"> Nuestros   </h2>
            <ul className="list-disc list-inside">
              <li className="mb-2">Gestion de carreras</li>
              <li className="mb-2">Rejistro de jinetes y caballos</li>
              {/* <li className="mb-2">Seguimiento y monitoreo de la salud</li> */}
            </ul>
          </div>
        </div>
      </div>
      <br></br>

     
      <div >

        <img src={imagecambios} class="img-talla" />
      </div>
   


    </>
  )
}

