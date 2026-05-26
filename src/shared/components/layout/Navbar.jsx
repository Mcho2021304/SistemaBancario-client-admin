import imgLogo from "../../../assets/img/bancoLogo.png";
import { AvatarUser } from "../ui/AvatarUser.jsx";

export const Navbar = () => {
    return (
        /* Cambiamos bg-red-800 por el rojo vino profundo (#631616).
           Añadimos un borde inferior sutil en dorado (#A68542) para separar el header del contenido.
        */
        <nav className="bg-[#631616] border-b-2 border-[#A68542] shadow-lg sticky top-0 z-50">
            {/* 
                CAMBIO AQUÍ: 
                1. Quitamos 'max-w-7xl' para que use todo el ancho.
                2. Cambiamos 'px-6' por 'px-2' o 'pl-2' para pegarlo al borde.
            */}
            <div className="max-w-full mx-auto px-2 md:px-4 h-16 flex items-center justify-between">

                {/* Logo + título (Ahora se pegará a la izquierda por el cambio en el padre) */}
                <div className="flex items-center gap-3">
                    <div className="bg-white p-1 rounded-md shadow-inner">
                        <img
                            src={imgLogo}
                            alt="Sistema Bancario"
                            className="h-8 md:h-10 w-auto object-contain"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-bold text-white text-lg leading-tight tracking-tight">
                            BANCO KINALITOS
                        </h1>
                        <span className="text-[#A68542] text-[10px] font-semibold uppercase tracking-widest">
                            Panel Administrativo
                        </span>
                    </div>
                </div>

                {/* Avatar con un pequeño anillo de contraste */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right mr-2">
                        <p className="text-white text-xs font-medium">Administrador</p>
                        <p className="text-[#A68542] text-[10px]">Conectado</p>
                    </div>
                    <div className="hover:scale-105 transition-transform cursor-pointer ring-2 ring-[#A68542]/30 rounded-full p-0.5">
                        <AvatarUser />
                    </div>
                </div>
            </div>
        </nav>
    );
};