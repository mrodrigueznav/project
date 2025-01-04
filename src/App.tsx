import { ThemeProvider } from '@/components/theme-provider';
import { MainNav } from '@/components/main-nav';
import { Routes, Route } from 'react-router-dom';
import { BasicForms } from '@/pages/basic-forms';
import { DataTables } from '@/pages/data-tables';
import { ImageUpload } from '@/pages/image-upload';
import { RealtimeChat } from '@/pages/realtime-chat';
import { Home } from '@/pages/home';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <MainNav />
        <main className="container mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forms" element={<BasicForms />} />
            <Route path="/tables" element={<DataTables />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/realtime" element={<RealtimeChat />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}