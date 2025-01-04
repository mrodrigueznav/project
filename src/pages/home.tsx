import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Taller de Desarrollo de APIs</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Formularios y Validación</CardTitle>
            <CardDescription>Aprende a manejar envíos de formularios y validación</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Manejo básico de formularios</li>
              <li>Validación de formularios</li>
              <li>Manejo de errores</li>
              <li>Retroalimentación de éxito</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tablas de Datos</CardTitle>
            <CardDescription>Muestra y gestiona datos con tablas y paginación</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Obtención de datos</li>
              <li>Controles de paginación</li>
              <li>Ordenamiento</li>
              <li>Acciones por fila</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subida de Archivos</CardTitle>
            <CardDescription>Maneja la subida de archivos y procesamiento de imágenes</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Subida de archivo único</li>
              <li>Subida de múltiples archivos</li>
              <li>Seguimiento de progreso</li>
              <li>Vista previa de imágenes</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Funciones en Tiempo Real</CardTitle>
            <CardDescription>Implementa funcionalidad en tiempo real con WebSocket</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              <li>Conexión WebSocket</li>
              <li>Chat en tiempo real</li>
              <li>Actualizaciones en vivo</li>
              <li>Estado de conexión</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}