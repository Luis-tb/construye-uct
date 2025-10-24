import React, { useState, useCallback, useMemo } from "react";
import type { FC } from "react";
import { Loader2, Send, RotateCcw, X } from 'lucide-react';
import { model } from "@/lib/geminiClient";

type ChatMessage = { id: string; content: string; role: 'user' | 'assistant'; timestamp: Date; };

interface ChatbotProps { isOpen: boolean; onClose: () => void; }

const Chatbot: FC<ChatbotProps> = ({ isOpen, onClose }) => {
    const initialMessage = useMemo((): ChatMessage => ({
        id: 'initial',
        content: "Hola! Soy tu asistente de IA. ¿Qué te gustaría saber?",
        role: 'assistant',
        timestamp: new Date(),
    }), []);

    const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);

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
            // Convertimos la conversación a un solo string para Gemini
            const conversationContext = messages
                .map(msg => `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}`)
                .join('\n');

            const prompt = `${conversationContext}\nUsuario: ${userMessage.content}\nResponde de manera breve, directa y sin formato especial. Solo texto plano. Eres un ingeniero civil con 20 años de experiencia`;

            // Llamada a Gemini
            const result = await model.generateContent(prompt);
            const text = result.response.text();

            const botMessage: ChatMessage = {
                id: Date.now().toString() + '-bot',
                content: text,
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, botMessage]);
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
    }, [input, isThinking, messages]);



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

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-5 right-5 w-80 h-[480px] flex flex-col overflow-hidden rounded-xl border bg-white shadow-2xl z-50">
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
                        <span className="ml-1 hidden sm:inline">Reiniciar Chat</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="flex items-center text-xs text-slate-500 hover:text-red-500 transition p-1 rounded"
                        title="Cerrar Chatbot"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {message.role === 'assistant' && (
                            <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-2">AI</div>
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
                            <div className="size-8 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold ml-2">Tú</div>
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

            <div className="border-t p-3">
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
                        className={`h-10 w-10 flex items-center justify-center rounded-lg text-white transition ${
                            !input.trim() || isThinking
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-[#0340a3]'
                        }`}
                    >
                        {isThinking ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;