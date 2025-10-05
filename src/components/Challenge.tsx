import { AlertCircle, Clock, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

const Challenge = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white/5 border border-white/15 rounded-2xl lg:rounded-[21px] backdrop-blur-[2px] p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4 md:mb-6">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#00B6DA] to-[#5045BF] flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-foreground leading-tight lg:leading-[39px]">
              {t.theChallenge}
            </h3>
          </div>
          
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8">
            <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed lg:leading-6">
              Design and validate space habitat configurations that meet stringent life support requirements while optimizing crew efficiency, safety protocols, and resource allocation for extended duration missions in lunar and Martian environments.
            </p>
            
            <div className="flex lg:flex-col gap-4 lg:gap-6 border-l-2 border-primary/30 pl-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Mission Duration</span>
                </div>
                <p className="text-foreground text-sm">30-365 days</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Crew Size</span>
                </div>
                <p className="text-foreground text-sm">2-6 astronauts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
