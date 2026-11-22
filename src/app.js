const express = require('express');
const path = require('path');
const calculator = require('./services/calculator');

const app = express();
const port = Number(process.env.PORT) || 3000;
const operations = {
  add: calculator.add,
  subtract: calculator.subtract,
  multiply: calculator.multiply,
  divide: calculator.divide,
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/calculate/:operation', (req, res) => {
  const operation = operations[req.params.operation];
  if (!operation) {
    return res.status(404).json({ error: 'Unsupported calculator operation.' });
  }

  const { a: rawA, b: rawB } = req.query;
  if (
    typeof rawA !== 'string' ||
    typeof rawB !== 'string' ||
    rawA.trim() === '' ||
    rawB.trim() === ''
  ) {
    return res.status(400).json({ error: 'Enter a value for both numbers.' });
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return res.status(400).json({ error: 'Enter valid finite numbers.' });
  }

  if (req.params.operation === 'divide' && b === 0) {
    return res.status(400).json({ error: 'Cannot divide by zero.' });
  }

  return res.json({ operation: req.params.operation, result: operation(a, b) });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${port}`);
});
