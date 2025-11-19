export const showSuccess = (message) => {
  const alertDiv = document.createElement('div');
  alertDiv.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 1000;
    background: #d4edda; color: #155724; border: 2px solid #28a745;
    padding: 15px 20px; border-radius: 5px; font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  `;
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
};

export const showError = (message) => {
  const alertDiv = document.createElement('div');
  alertDiv.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 1000;
    background: #f8d7da; color: #721c24; border: 2px solid #dc3545;
    padding: 15px 20px; border-radius: 5px; font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  `;
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 4000);
};