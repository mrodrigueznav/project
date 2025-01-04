import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';
import { createDropdownMenuScope } from '@radix-ui/react-dropdown-menu';

export function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Por favor selecciona archivos para subir');
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:3001/api/usuarios/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir archivos');
      }

      const data = await response.json();
      console.log(data);

      setSelectedFiles([])
      setPreviews([])

    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      setProgress(100);
      toast.success('¡Archivos subidos con éxito!');
    }

    // const interval = setInterval(() => {
    //   setProgress((prev) => {
    //     if (prev >= 100) {
    //       clearInterval(interval);
    //       setUploading(false);
    //       toast.success('¡Archivos subidos con éxito!');
    //       setSelectedFiles([]);
    //       setPreviews([]);
    //       return 0;
    //     }
    //     return prev + 10;
    //   });
    // }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subida de Imágenes</h1>
        <p className="text-muted-foreground">
          Ejemplo de manejo de subida de archivos con vista previa y progreso.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="cursor-pointer"
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Vista previa ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {uploading && (
          <Progress value={progress} className="w-full" />
        )}

        <Button
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Subiendo...' : 'Subir Archivos'}
        </Button>
      </div>
    </div>
  );
}