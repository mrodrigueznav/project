import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { BookOpen, Table, Upload, Radio } from 'lucide-react';

export function MainNav() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-lg font-bold">
            Taller de APIs
          </Link>
          <Link to="/forms">
            <Button variant="ghost" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Formularios
            </Button>
          </Link>
          <Link to="/tables">
            <Button variant="ghost" size="sm">
              <Table className="w-4 h-4 mr-2" />
              Tablas
            </Button>
          </Link>
          <Link to="/upload">
            <Button variant="ghost" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Subir Archivos
            </Button>
          </Link>
          <Link to="/realtime">
            <Button variant="ghost" size="sm">
              <Radio className="w-4 h-4 mr-2" />
              Tiempo Real
            </Button>
          </Link>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}