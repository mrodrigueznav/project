import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
};

export function RealtimeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('http://localhost:3001'); // Match your server's URL
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    });

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socketRef.current) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'Tú',
      timestamp: new Date(),
    };

    // Emit the message to the server
    socketRef.current.emit('sendMessage', message);

    // Optimistically update the local state
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat en Tiempo Real</h1>
          <p className="text-muted-foreground">
            Ejemplo de comunicación en tiempo real usando WebSocket.
          </p>
        </div>
        <Badge variant={connected ? 'default' : 'secondary'}>
          {connected ? 'Conectado' : 'Conectando...'}
        </Badge>
      </div>

      <div className="border rounded-lg">
        <ScrollArea className="h-[500px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === 'Tú' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'Tú'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{message.sender}</p>
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <form
          onSubmit={handleSend}
          className="border-t p-4 flex items-center space-x-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={!connected}
          />
          <Button type="submit" disabled={!connected || !newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
