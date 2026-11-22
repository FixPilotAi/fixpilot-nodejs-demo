const form = document.getElementById('calculatorForm');
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const operation = document.getElementById('operation');
const result = document.getElementById('result');
const errorMessage = document.getElementById('errorMessage');
const clearButton = document.getElementById('clearButton');

function showError(message) {
  errorMessage.textContent = message;
  result.textContent = '';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorMessage.textContent = '';
  result.textContent = '';

  const rawA = firstNumber.value.trim();
  const rawB = secondNumber.value.trim();
  if (!rawA || !rawB) {
    showError('Enter a value for both numbers.');
    return;
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    showError('Enter valid finite numbers.');
    return;
  }

  if (operation.value === 'divide' && b === 0) {
    showError('Cannot divide by zero.');
    return;
  }

  try {
    const params = new URLSearchParams({ a: rawA, b: rawB });
    const response = await fetch(`/calculate/${operation.value}?${params}`);
    const payload = await response.json();
    if (!response.ok) {
      showError(payload.error || 'The calculation could not be completed.');
      return;
    }
    result.textContent = String(payload.result);
  } catch (_error) {
    showError('Unable to reach the calculator. Please try again.');
  }
});

clearButton.addEventListener('click', () => {
  form.reset();
  errorMessage.textContent = '';
  result.textContent = '';
  firstNumber.focus();
});
