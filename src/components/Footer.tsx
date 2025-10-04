import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-16 h-16 border-2 border-foreground rounded flex items-center justify-center">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-foreground font-semibold mb-4">Link do video</h4>
            <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
              Github
            </a>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-foreground font-semibold mb-4">Seção 1</h4>
            <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
              Seção 1
            </a>
            <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
              Seção 1
            </a>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-foreground font-semibold mb-4">Seção 1</h4>
            <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
              Seção 1
            </a>
            <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
              Seção 1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
