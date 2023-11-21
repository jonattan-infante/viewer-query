import Identification from "@/components/identification";
import Register from "@/components/register";

export default function Home() {
  return (
    <main className="flex flex-col justify-center w-1/2 mx-auto items-center h-screen">
      <h1 className="text-center font-bold text-3xl">
        Bienvenido a Viewer Query
      </h1>
      <p className="mt-5 text-center">
        Aplicación que permite realizar consultas SQL sin tener que escribir las
        sentencias manualmente. En lugar de eso, la aplicación proporciona una
        interfaz gráfica de usuario que permite a los usuarios seleccionar las
        tablas y columnas que desean consultar, y luego genera automáticamente
        la sentencia SQL correspondiente.
      </p>

      <Identification />

      <h3 className="mt-5 text-center text-xl">
        Si es la primera vez que la usas por favor registra un usuario para
        disfrutar de todas las funcionalidades
      </h3>

      <Register />
      
    </main>
  );
}
