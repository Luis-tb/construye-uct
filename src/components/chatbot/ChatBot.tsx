import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import type { FC } from "react";
import { Loader2, Send, RotateCcw, X } from 'lucide-react';
import { model } from "@/lib/geminiClient";
import ChatbotToggleButton from "@/components/chatbot/ChatbotToggleButton";
import { AnimatePresence, motion } from "framer-motion";

type ChatMessage = { id: string; content: string; role: 'user' | 'assistant'; timestamp: Date; };

/**
 * Widget de Chatbot autónomo que gestiona su propia visibilidad y estado.
 * Incluye el botón flotante y la ventana de chat.
 */
const Chatbot: FC = () => {
    const initialMessage = useMemo((): ChatMessage => ({
        id: 'initial',
        content: "Hola! Soy tu asistente de IA. ¿Qué te gustaría saber?",
        role: 'assistant',
        timestamp: new Date(),
    }), []);

    const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleSend = useCallback(async () => {
        if (!input.trim() || isThinking) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString() + '-user',
            content: input.trim(),
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsThinking(true);

        try {
            // 💡 MEJORA: Usamos el estado funcional en setMessages para obtener el historial más reciente
            // y lo construimos de forma más directa.
            const currentMessages = [...messages, userMessage];
            const conversationHistory = currentMessages
                .map(msg => `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}`)
                .join('\n');

            const prompt = `Historial de la conversación:\n${conversationHistory}\n\nPregunta del usuario: "${userMessage.content}"\n\nInstrucciones: Eres un asistente experto en construcción, actuando como un ingeniero civil con 20 años de experiencia. Responde de manera breve, directa y usando solo texto plano.`;

            // 💡 MEJORA: Implementación de Streaming para respuesta en tiempo real.
            // 1. Obtenemos el resultado del stream y accedemos a la propiedad `.stream` que es el iterador.
            const result = await model.generateContentStream(prompt);
            const stream = result.stream;

            // 2. Creamos un mensaje de bot inicial y vacío para que la UI lo renderice.
            const botMessageId = Date.now().toString() + '-bot';
            const initialBotMessage: ChatMessage = {
                id: botMessageId,
                content: "",
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, initialBotMessage]);

            // 3. Iteramos sobre el stream y actualizamos el mensaje del bot en cada fragmento.
            for await (const chunk of stream) {
                const chunkText = chunk.text();
                setMessages(currentMessages =>
                    currentMessages.map(msg =>
                        msg.id === botMessageId
                            ? { ...msg, content: msg.content + chunkText }
                            : msg
                    )
                );
            }

        } catch (error) {
            console.error("Error con Gemini:", error);
            const errorMessage: ChatMessage = {
                id: Date.now().toString() + '-error',
                content: "Error al conectar con Gemini 😞",
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsThinking(false);
        }
    }, [input, isThinking, messages]); // `messages` vuelve a ser dependencia para construir el historial.



    const handleReset = useCallback(() => {
        setMessages([initialMessage]);
        setInput("");
        setIsThinking(false);
    }, [initialMessage]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            void handleSend();
        }
    };

    // 💡 MEJORA: Auto-scroll al último mensaje.
    useEffect(() => {
        if (chatContainerRef.current) {
            const { scrollHeight } = chatContainerRef.current;
            chatContainerRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <>
            {/* AnimatePresence gestionará la entrada y salida de ambos elementos */}
            <AnimatePresence>
                {!isOpen && (
                    <ChatbotToggleButton
                        key="fab-toggle" // Key es importante para AnimatePresence
                        onClick={handleToggle}
                        isOpen={isOpen}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                )}

                {isOpen && (
                    <motion.div
                        key="chat-window" // Key es importante para AnimatePresence
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        // Ajustamos la posición para que aparezca sobre el botón flotante
                        // bottom-20 equivale a 5rem (80px), dejando espacio para el botón de 14 (56px) + margen
                        className="fixed bottom-5 right-5 w-80 h-[480px] flex flex-col overflow-hidden rounded-xl border bg-white shadow-2xl z-50"
                    >
                        {/* Header de la ventana de chat */}
                        <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-3 min-h-[50px]">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-green-500" />
                                <span className="font-medium text-sm">AI Assistant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleReset}
                                    className="flex items-center text-xs text-slate-500 hover:text-[#022867] transition p-1 rounded"
                                    disabled={isThinking}
                                >
                                    <RotateCcw className="size-4" />
                                </button>
                                <button
                                    onClick={handleToggle} // El botón de cerrar ahora usa el toggle interno
                                    className="flex items-center text-xs text-slate-500 hover:text-red-500 transition p-1 rounded"
                                    title="Cerrar Chatbot"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        </div>

                        {/* Cuerpo del chat (mensajes) */}
                        <div
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4"
                        >
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="size-8 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-2">AI</div>
                                    )}
                                    <div
                                        className={`max-w-[75%] p-3 rounded-xl shadow-sm text-sm whitespace-pre-wrap ${
                                            message.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-gray-100 text-slate-800 rounded-tl-none'
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                    {message.role === 'user' && (
                                        <div className="size-8 shrink-0 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold ml-2">Tú</div>
                                    )}
                                </div>
                            ))}
                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-2">AI</div>
                                    <div className="p-3 rounded-xl bg-gray-100 text-slate-800 rounded-tl-none shadow-sm flex items-center gap-2">
                                        <Loader2 className="animate-spin h-4 w-4 text-blue-600" />
                                        <span className="text-sm text-muted-foreground">Pensando...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input del chat */}
                        <div
                            className="border-t p-3">
                            <div className="flex items-end gap-2">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Pregúntame algo..."
                                    disabled={isThinking}
                                    className="flex-1 resize-none h-10 min-h-[40px] max-h-[100px] text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#022867] disabled:bg-gray-50 transition"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isThinking}
                                    className={`h-10 w-10 flex items-center justify-center rounded-lg text-white transition ${!input.trim() || isThinking ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-[#0340a3]'}`}
                                >
                                    {isThinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;