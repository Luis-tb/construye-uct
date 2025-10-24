import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
      s-5.373-12-12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
      s12.955,20,24,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        ></path>
        <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
      C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        ></path>
        <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
      c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        ></path>
        <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
      c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        ></path>
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
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white/90 p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">Bienvenido</h2>
                    <p className="mb-6 text-gray-600">
                        Inicia sesión para acceder a todas las funcionalidades.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-[#022867] hover:bg-[#011C4F] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        <GoogleIcon />
                        <span className="ml-2">Iniciar sesión con Google</span>
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
