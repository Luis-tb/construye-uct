import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header.tsx";
import Footer from "@/components/layout/Footer.tsx";

export default function Layout() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
