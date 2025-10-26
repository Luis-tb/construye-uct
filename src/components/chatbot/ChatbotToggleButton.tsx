import type { FC } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, type MotionProps } from 'framer-motion';

interface ChatbotToggleButtonProps extends MotionProps {
    onClick: () => void;
    isOpen: boolean;
}

/**
 * Botón flotante para abrir y cerrar el chatbot.
 */
const ChatbotToggleButton: FC<ChatbotToggleButtonProps> = ({ onClick, isOpen, ...props }) => {
    return (
        <motion.button
            onClick={onClick}
            className={`fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110 ${
                isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            aria-label={isOpen ? 'Cerrar chatbot' : 'Abrir chatbot'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            {...props} // <-- Aplicamos las propiedades de animación adicionales aquí
        >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>
    );
};

export default ChatbotToggleButton;