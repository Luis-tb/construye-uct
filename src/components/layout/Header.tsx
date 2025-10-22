import {useState} from "react";
import {MapPin, Menu, X} from "lucide-react";
import {Link} from "react-router-dom";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 text-white shadow-lg bg-[#022867]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 text-white">
                            <img src="/logo.svg" alt="Logo" className="h-16 w-16"/>
                            <div>
                                <h1 className="text-xl font-bold">Aprende UCT</h1>
                                <p className="text-sm text-slate-300 uppercase">Facultad de ingenieria y
                                    arquitectura</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-8">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link to="/"
                                  className="text-sm font-medium text-slate-200 transition-colors hover:text-white">
                                Inicio
                            </Link>
                            <Link to="/guias"
                                  className="text-sm font-medium text-slate-200 transition-colors hover:text-white">
                                Guías
                            </Link>
                            <Link to="/calculadora"
                                  className="text-sm font-medium text-slate-200 transition-colors hover:text-white">
                                Calculadora
                            </Link>
                        </nav>
                        <div className="hidden md:flex items-center space-x-2">
                            <MapPin className="h-4 w-4"/>
                            <span className="text-sm">Perú</span>
                        </div>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                                {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#022867] pb-4">
                        <nav className="flex flex-col items-center space-y-4">
                            <Link to="/"
                                  className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
                                  onClick={() => setIsMenuOpen(false)}>
                                Inicio
                            </Link>
                            <Link to="/guias"
                                  className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
                                  onClick={() => setIsMenuOpen(false)}>
                                Guías
                            </Link>
                            <Link to="/calculadora"
                                  className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
                                  onClick={() => setIsMenuOpen(false)}>
                                Calculadora
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
