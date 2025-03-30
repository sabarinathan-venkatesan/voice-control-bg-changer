document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const statusDiv = document.getElementById('status');
    const resultDiv = document.getElementById('result');
    
    // Supported colors
    const colors = {
        'red': '#ff0000',
        'blue': '#0000ff',
        'green': '#008000',
        'yellow': '#ffff00',
        'orange': '#ffa500',
        'purple': '#800080',
        'pink': '#ffc0cb',
        'brown': '#a52a2a',
        'black': '#000000',
        'white': '#ffffff',
        'gray': '#808080'
    };
    
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        statusDiv.textContent = 'Status: Speech recognition not supported in this browser';
        startBtn.disabled = true;
        return;
    }
    
    // Create speech recognition object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    startBtn.addEventListener('click', function() {
        if (startBtn.textContent === 'Start Listening') {
            recognition.start();
            startBtn.textContent = 'Stop Listening';
            statusDiv.textContent = 'Status: Listening...';
        } else {
            recognition.stop();
            startBtn.textContent = 'Start Listening';
            statusDiv.textContent = 'Status: Not listening';
        }
    });
    
    recognition.onresult = function(event) {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.trim().toLowerCase();
        
        resultDiv.textContent = `Last command: ${command}`;
        
        // Check if the command is a color
        if (colors[command]) {
            document.body.style.backgroundColor = colors[command];
        } else {
            resultDiv.textContent += ' (not a recognized color)';
        }
    };
    
    recognition.onerror = function(event) {
        statusDiv.textContent = 'Status: Error occurred - ' + event.error;
        startBtn.textContent = 'Start Listening';
    };
    
    recognition.onend = function() {
        if (startBtn.textContent === 'Stop Listening') {
            recognition.start();
        }
    };
});