import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 533.5 544.3">
        <path fill="#4285F4" d="M533.5 278.4c0-17.9-1.6-35.2-4.7-52H272v98.9h146.9c-6.4 34.9-25.7 64.6-54.9 84.3v69h88.7c51.8-47.8 81.8-118.1 81.8-200.2z"/>
        <path fill="#34A853" d="M272 544.3c72.9 0 134-24.2 178.7-65.8l-88.7-69c-24.6 16.5-56.1 26-89.9 26-69 0-127.5-46.5-148.5-109.1H32v68.7C76.9 484 168.7 544.3 272 544.3z"/>
        <path fill="#FBBC05" d="M123.5 332.1c-5.8-16.5-9.2-34.1-9.2-52s3.4-35.5 9.2-52v-68.7H32c-18.8 37.5-29.5 79.9-29.5 120s10.7 82.5 29.5 120l91.5-68.7z"/>
        <path fill="#EA4335" d="M272 107.7c37.3 0 70.8 12.9 97.2 34.9l72.9-72.9C406 24.2 344.9 0 272 0 168.7 0 76.9 60.3 32 143.2l91.5 68.7c21-62.6 79.5-109.1 148.5-109.1z"/>
    </svg>
)

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                console.log('✅ Usuario logueado:', session.user)
                onClose()
            }
        })

        return () => subscription.unsubscribe()
    }, [onClose])

    if (!isOpen) return null

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })

        if (error) {
            console.error('❌ Error al iniciar sesión con Google:', error.message)
            return
        }

        console.log('✅ Redirigiendo a Google...')
    }

    return (
        // Overlay
        <div
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center backdrop-blur-sm"
            onClick={onClose} // 👈 clic fuera del modal cierra
        >
            {/* Contenido del modal */}
            <div
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4"
                onClick={(e) => e.stopPropagation()} // 👈 evita que clic dentro cierre el modal
            >
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold mb-2 text-gray-800">Bienvenido</h2>
                    <p className="mb-6 text-gray-600">
                        Inicia sesión para acceder a todas las funcionalidades.
                    </p>
                </div>

                {/* Botones */}
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-70 flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-gray-700 text-white cursor-pointer font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <GoogleIcon />
                        <span>Iniciar sesión con Google</span>
                    </button>

                    <button
                        onClick={onClose}
                        className="w-36 bg-gray-200 hover:bg-gray-400 text-black font-semibold cursor-pointer py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}


export default LoginModal
