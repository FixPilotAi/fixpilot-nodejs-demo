# FixPilot Node.js Demo

A small Express application with health and calculator endpoints for validating the FixPilot Autonomous AI QA Engineer workflow.

## Requirements

- Node.js 18 or newer
- npm

## Run

```sh
npm install
npm start
```

The server listens on port 3000 by default. Set `PORT` to use another port.

## Endpoints

- `GET /` — welcome message
- `GET /health` — service health status
- `GET /calculate/add?a=10&b=20` — add two finite numbers
- `GET /calculate/subtract?a=20&b=5` — subtract the second number from the first

Calculator endpoints return the operation and result as JSON. Missing or invalid `a` and `b` values return HTTP 400 with an error message.
