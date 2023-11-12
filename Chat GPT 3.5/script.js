const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');

function sendMessage() {
  const userMessage = userInput.value;
  displayMessage('You: ' + userMessage);

  // Make request to the OpenAI API (replace 'YOUR_OPENAI_API_KEY' with your actual key)
  fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
    body: JSON.stringify({ prompt: userMessage, max_tokens: 150 }),
  })
  .then(response => response.json())
  .then(data => {
    const chatGPTResponse = data.choices[0].text.trim();
    displayMessage('ChatGPT: ' + chatGPTResponse);
  })
  .catch(error => console.error('Error:', error));

  // Clear user input
  userInput.value = '';
}

function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatDisplay.appendChild(messageElement);

  // Scroll to the bottom of the chat display
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}