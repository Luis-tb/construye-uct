import HeroSection from "@/components/guide/HeroSection.tsx";
import CTA from "@/pages/Home/components/section/CTA.tsx";
import Stats from "@/pages/Home/components/section/Stats.tsx";
import Categorias from "@/pages/Home/components/section/Categorias.tsx";
import Works from "@/pages/Home/components/section/Works.tsx";
import Testimonials from "@/pages/Home/components/section/Testimonials.tsx";
import FAQ from "@/pages/Home/components/section/FAQ.tsx";
import Professionals from "@/pages/Home/components/section/Professionals.tsx";

export default function Index() {
    return (
        <div className="bg-background relative min-h-screen">
            <HeroSection/>

            {/* Stats Section */}
            <Stats/>

            {/* Categories Section */}
            <Categorias/>

            {/* How It Works Section */}
            <Works/>

            {/* Testimonials Section */}
            <Testimonials/>

            {/* Featured Professionals */}
            <Professionals/>

            {/* FAQ Section */}
            <FAQ/>

            {/* CTA Section */}
            <CTA/>
        </div>
    );
}