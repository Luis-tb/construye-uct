import { useState } from "react";
import { problemas, categorias } from "@/lib/data";
import Header from "@/components/guide/Header";
import HeroSection from "@/components/guide/HeroSection";
import Categories from "@/components/guide/Categories";
import ProblemList from "@/components/guide/ProblemList";
import EmergencyContact from "@/components/guide/EmergencyContact";
import Footer from "@/components/guide/Footer";

export default function Guide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const problemasFiltrados = problemas.filter((problema) => {
    const matchesSearch =
      problema.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problema.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "todos" || problema.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background">
      <Header />
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Categories
        categorias={categorias}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProblemList problemas={problemasFiltrados} />
      <EmergencyContact />
      <Footer />
    </div>
  );
}
