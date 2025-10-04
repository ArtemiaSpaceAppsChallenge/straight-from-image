import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoCards from "@/components/InfoCards";
import FeaturesMVP from "@/components/FeaturesMVP";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <Hero />
      <InfoCards />
      <FeaturesMVP />
      <Footer />
    </div>
  );
};

export default Index;
