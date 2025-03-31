
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-weedwise-primary" />
          <span className="text-xl font-bold text-weedwise-dark">WeedWise<span className="text-weedwise-primary">AI</span></span>
        </div>
        
        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 border-b border-gray-200 flex flex-col space-y-4 animate-fade-in">
                <Button variant="ghost" className="justify-start">Dashboard</Button>
                <Button variant="ghost" className="justify-start">Detection</Button>
                <Button variant="ghost" className="justify-start">Database</Button>
                <Button variant="ghost" className="justify-start">Help</Button>
              </div>
            )}
          </>
        ) : (
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Detection</Button>
            <Button variant="ghost">Database</Button>
            <Button variant="ghost">Help</Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
