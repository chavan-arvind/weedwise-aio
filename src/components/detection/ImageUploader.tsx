
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  isProcessing: boolean;
}

const ImageUploader = ({ onImageSelected, isProcessing }: ImageUploaderProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image less than 10MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string);
        onImageSelected(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  return (
    <div className="w-full">
      {!previewImage ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center
            ${isDragging ? 'border-weedwise-primary bg-weedwise-light' : 'border-gray-300'}
            transition-all duration-200 cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Image</h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Drag & drop an image here, or click to select
          </p>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="image-upload">
            <Button variant="outline" className="cursor-pointer">
              <Image className="mr-2 h-4 w-4" /> Select Image
            </Button>
          </label>
        </div>
      ) : (
        <div className="relative border rounded-lg overflow-hidden">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="w-full h-auto max-h-[500px] object-contain bg-black/5" 
          />
          
          {isProcessing && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg flex items-center space-x-3">
                <Loader2 className="h-5 w-5 text-weedwise-primary animate-spin" />
                <span>Processing image...</span>
              </div>
            </div>
          )}
          
          {!isProcessing && (
            <Button 
              variant="destructive" 
              size="icon"
              className="absolute top-2 right-2 rounded-full" 
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
