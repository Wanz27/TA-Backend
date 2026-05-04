// backend/index.js
import express from 'express';
import cors from 'cors';
import { supabase } from './lib/supabase.js';
import roomRoutes from './rooms/room.routes.js';

const app = express();
app.use(cors()); // Supaya React bisa akses backend
app.use(express.json());

// Contoh route untuk mengambil data dari tabel 'users'
app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Register routes
app.use('/api/rooms', roomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));