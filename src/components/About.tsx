import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

const teamMembersBase = [
  {
    name: "Roberto Braga",
    role: "Software Engineer",
    description: "Developer with 6+ years shaping ideas into code",
    image: "https://i.imgur.com/g47hhrQ.jpeg",
    easterEggImage: "https://i.imgur.com/QWYulvP.jpeg", // nova imagem
  },
  {
    name: "Lukas B. de Oliveira",
    role: "Software Engineer",
    description: "The cake is a lie",
    image: "https://i.imgur.com/qt9mGS0.jpeg",
  },
  {
    name: "Bruno Gaidargi",
    role: "Scientific Researcher",
    description: "Mitochondria is the powerhouse of the cell",
    image: "https://i.imgur.com/c4bY9ib.jpeg",
  },
  {
    name: "Márcio Machado",
    role: "Interactive Experience Engineer",
    description:
      "Develops interactive and immersive web experiences combining AI, visualization, and advanced frontend technologies.",
    image: "https://i.imgur.com/73YrIrv.jpeg",
  },
  {
    name: "Cauê Lima",
    role: "Junior Developer",
    description: "Most beautiful man of the world",
    image: "https://i.imgur.com/96sm8ja.jpeg",
  },
  {
    name: "Mariana Gimenez",
    role: "Software Developer",
    description:
      "Ex-lawyer turned developer specializing in React, JavaScript, and Python. Focused on LegalTech, automations, and making tech feel human.",
    image: "https://i.imgur.com/IieI7xv.jpeg",
  },
];

const About = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [robertoClicks, setRobertoClicks] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const handleEasterEggClick = () => {
    setRobertoClicks((prev) => {
      const newCount = prev + 1;
      if (newCount >= 23 && !easterEggActive) {
        setEasterEggActive(true);
      }
      return newCount;
    });
  };

  const teamMembers = teamMembersBase.map((member) => {
    if (member.name === "Roberto Braga" && easterEggActive) {
      return { ...member, image: member.easterEggImage };
    }
    return member;
  });

  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.ourTeam}
          </h2>
          <p className="text-foreground text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            A multidisciplinary team of aerospace engineers, system architects, and human factors
            specialists dedicated to advancing space habitat technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="bg-white/5 border-white/15 backdrop-blur-[2px]">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar
                    className="w-20 h-20 md:w-24 md:h-24 overflow-hidden cursor-pointer"
                    onClick={member.name === "Roberto Braga" ? handleEasterEggClick : undefined}
                  >
                    <AvatarImage
                      src={member.image}
                      alt={member.name}
                      className="object-cover object-center w-full h-full"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-[#00B6DA] to-[#5045BF] text-white text-xl font-bold">
                      {member.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-foreground text-xl md:text-2xl">{member.name}</CardTitle>
                <CardDescription className="text-primary text-sm md:text-base font-semibold">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-sm md:text-base text-center leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
