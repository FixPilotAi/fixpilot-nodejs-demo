const express = require('express');
const calculator = require('./services/calculator');

const app = express();
const port = process.env.PORT || 3000;

function readOperands(req, res) {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (
    req.query.a === undefined ||
    req.query.b === undefined ||
    req.query.a.trim() === '' ||
    req.query.b.trim() === '' ||
    !Number.isFinite(a) ||
    !Number.isFinite(b)
  ) {
    res.status(400).json({ error: 'Query parameters a and b must be finite numbers.' });
    return null;
  }

  return { a, b };
}

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the FixPilot Node.js demo.' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/calculate/add', (req, res) => {
  const operands = readOperands(req, res);
  if (!operands) return;
  res.json({ operation: 'add', result: calculator.add(operands.a, operands.b) });
});

app.get('/calculate/subtract', (req, res) => {
  const operands = readOperands(req, res);
  if (!operands) return;
  res.json({ operation: 'subtract', result: calculator.subtract(operands.a, operands.b) });
});

app.get('/calculate/multiply', (req, res) => {
  const operands = readOperands(req, res);
  if (!operands) return;
  res.json({ operation: 'multiply', result: calculator.multiply(operands.a, operands.b) });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
