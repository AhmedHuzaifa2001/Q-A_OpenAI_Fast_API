
const tempSlider = document.getElementById('temperature');
const tempValue = document.getElementById('tempValue');
const tokensSlider = document.getElementById('maxTokens');
const tokensValue = document.getElementById('tokensValue');

tempSlider.addEventListener('input', (e) => {
    tempValue.textContent = parseFloat(e.target.value).toFixed(2);
});

tokensSlider.addEventListener('input', (e) => {
    tokensValue.textContent = e.target.value;
});

// Handle form submission
const submitBtn = document.getElementById('submitBtn');
const questionInput = document.getElementById('question');
const responseBox = document.getElementById('response');
const loading = document.getElementById('loading');

// Submit on button click
submitBtn.addEventListener('click', handleSubmit);

// Submit on Enter key
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});

// Format response text for better readability
function formatResponse(text) {
    // Replace numbered lists (1. 2. 3. etc) with better formatting
    text = text.replace(/(\d+\.\s)/g, '<br><br><strong>$1</strong>');
    
    // Add line breaks for **bold text** patterns
    text = text.replace(/\*\*(.*?)\*\*/g, '<br><strong>$1</strong>');
    
    // Add spacing after periods followed by capital letters (new sentences)
    text = text.replace(/\.\s+([A-Z])/g, '.<br><br>$1');
    
    // Remove leading line breaks
    text = text.replace(/^(<br>)+/, '');
    
    return text;
}

async function handleSubmit() {
    const question = questionInput.value.trim();
    const model = document.getElementById('model').value;
    const temperature = parseFloat(tempSlider.value);
    const maxTokens = parseInt(tokensSlider.value);

    // Validation
    if (!question) {
        responseBox.textContent = 'Please provide a Query!!!';
        responseBox.classList.add('show');
        return;
    }

    

    // Show loading
    loading.style.display = 'block';
    responseBox.classList.remove('show');
    submitBtn.disabled = true;

    try {
        // Make API call
        const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: question,
                model: model,
                temperature: temperature,
                max_tokens: maxTokens
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Format and display response
        const formattedResponse = formatResponse(data.response);
        responseBox.innerHTML = formattedResponse;
        responseBox.classList.add('show');
    } catch (error) {
        console.error('Error:', error);
        responseBox.textContent = `Error: ${error.message}. Make sure the FastAPI server is running!`;
        responseBox.classList.add('show');
    } finally {
        // Hide loading
        loading.style.display = 'none';
        submitBtn.disabled = false;
    }
}
