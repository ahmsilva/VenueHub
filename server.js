const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

function readDB() {
  const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
  return JSON.parse(data);
}

function writeDB(db) {
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2));
}

app.get('/usuarios', (req, res) => {
  const db = readDB();
  res.json(db.usuarios);
});

app.post('/usuarios', (req, res) => {
  const db = readDB();
  const novo = { id: Date.now().toString(), ...req.body };
  db.usuarios.push(novo);
  writeDB(db);
  res.json(novo);
});

app.get('/locais', (req, res) => {
  const db = readDB();
  res.json(db.locais);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
