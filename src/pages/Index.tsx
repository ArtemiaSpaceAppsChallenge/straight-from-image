import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Challenge from "@/components/Challenge";
import Solution from "@/components/Solution";
import FeaturesMVP from "@/components/FeaturesMVP";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] relative overflow-hidden">
      <BackgroundEffects />
      <Header />
      <main>
        <Hero />
        <Challenge />
        <Solution />
        <FeaturesMVP />
        <About />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
