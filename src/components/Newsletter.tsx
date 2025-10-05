import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = useTranslations(language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement backend with Lovable Cloud to save to emails.jsonl
      // For now, just save to localStorage as demo
      const timestamp = new Date().toISOString();
      const emailEntry = { email, timestamp };
      
      const existingEmails = localStorage.getItem("newsletter_emails");
      const emails = existingEmails ? JSON.parse(existingEmails) : [];
      emails.push(emailEntry);
      localStorage.setItem("newsletter_emails", JSON.stringify(emails));

      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive updates on Artemis missions",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 lg:px-12 border-t border-white/15 backdrop-blur-[2px] relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="max-w-md mx-auto text-center">
          <h4 className="text-foreground text-lg md:text-xl font-bold mb-2">
            {t.stayUpdated}
          </h4>
          <p className="text-muted-foreground text-sm mb-4">
            Get the latest updates on habitat design innovations
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input 
              type="email" 
              placeholder={t.enterYourEmail || "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-white/5 border-white/15 text-foreground placeholder:text-muted-foreground"
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-[#00B6DA] to-[#5045BF] hover:opacity-90"
            >
              <Mail className="w-4 h-4 mr-2" />
              {t.subscribe}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
