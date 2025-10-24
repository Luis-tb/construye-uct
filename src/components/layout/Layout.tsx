import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header.tsx";
import Footer from "@/components/layout/Footer.tsx";
import Chatbot from "@/components/chatbot/ChatBot.tsx";


export default function Layout() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="bg-background">
      <Header onChatbotToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
}
