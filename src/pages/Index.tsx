import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCards from "@/components/InfoCards";
import FeaturesMVP from "@/components/FeaturesMVP";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] relative overflow-hidden">
      <BackgroundEffects />
      <Header />
      <main>
        <Hero />
        <InfoCards />
        <FeaturesMVP />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
