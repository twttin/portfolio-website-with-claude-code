import { useState } from 'react';
import CTAButton from './CTAButton';

const UNSPLASH_ACCESS_KEY = 'H-pV2gRN6FS5O4hZZYQc25iHZvm8Ija021T1HkZXEPU';

interface ImageUploadProps {
  onImageUpload: (dataUrl: string) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageUpload(result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const fetchRandomImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://api.unsplash.com/photos/random?orientation=landscape',
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        }
      );
      const data = await response.json();
      const imageUrl = data.urls.regular;
      
      // Fetch the image and convert to base64
      const imgResponse = await fetch(imageUrl);
      const blob = await imgResponse.blob();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageUpload(result);
      };
      
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error fetching random image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="image-upload">
      <div className="upload-buttons">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
          id="image-input"
        />
        <CTAButton
          onClick={() => document.getElementById('image-input')?.click()}
          variant="primary"
        >
          Upload an image
        </CTAButton>
        <CTAButton
          onClick={fetchRandomImage}
          variant="secondary"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Random image'}
        </CTAButton>
      </div>
      
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Uploaded preview" />
        </div>
      )}
    </div>
  );
}