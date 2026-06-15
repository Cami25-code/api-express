const express = require('express');
const app = express();
const PORT = 8083;

// Middleware — lit le JSON automatiquement
app.use(express.json());

// Nos données (on utilisera MySQL plus tard)
let users = [];

// GET /users → liste tous les users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST /users → crée un user
app.post('/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// GET /users/:id → un seul user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User non trouvé' });
  res.json(user);
});

// PUT /users/:id → modifie un user
app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User non trouvé' });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// DELETE /users/:id → supprime un user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'User supprimé' });
});

app.listen(PORT, () => {
  console.log(`🚀 API Express démarrée sur http://localhost:${PORT}`);
});