import { Outlet } from "react-router-dom";
import Header from "@/components/guide/Header";
import Footer from "@/components/guide/Footer";

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
