
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Leaf className="h-5 w-5 text-weedwise-primary" />
            <span className="text-sm font-semibold text-weedwise-dark">WeedWise<span className="text-weedwise-primary">AI</span></span>
          </div>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} WeedWiseAI. All rights reserved.
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-weedwise-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-weedwise-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-weedwise-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
