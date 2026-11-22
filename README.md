# FixPilot Node.js Demo

A small browser-based calculator application used as the application under test for validating the FixPilot Autonomous AI QA Engineer workflow. This repository contains application code only; it does not include an automation framework or generated tests.

## Technology stack

- Node.js and JavaScript
- Express
- npm

## Install and start

Requires Node.js 18 or newer.

```sh
npm install
npm start
```

The server binds to `0.0.0.0` and listens on port `3000` by default. Set `PORT` to use a different port, for example `PORT=4000 npm start`.

Open the application at <http://localhost:3000> (or the configured port). The `/health` endpoint returns HTTP 200 with `{ "status": "ok" }` when the server is running.

## Calculator

The browser interface includes two number inputs, an operation selector, a Calculate button, a Clear button, a result display, and an error message area. It supports addition, subtraction, multiplication, and division, including positive, negative, and decimal numbers. Repeated calculations and changing operations are supported.

Empty values and non-finite numeric values are rejected with a visible validation message. Division by zero is also rejected with a visible error. The JSON API is available at `/calculate/add`, `/calculate/subtract`, `/calculate/multiply`, and `/calculate/divide`, using `a` and `b` query parameters. Invalid inputs return HTTP 400; unsupported operations return HTTP 404.

## FixPilot use

This repository is the application under test. FixPilot is expected to generate its own test cases and Playwright automation in its isolated execution workspace; no test framework, test cases, or automation scripts are included here.
