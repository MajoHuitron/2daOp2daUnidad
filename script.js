window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    alert("Tu navegador no soporta la API de Web Speech");
} else {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'es-ES';

    let isListening = false;
    let currentCommand = '';

    document.addEventListener('DOMContentLoaded', () => {
        startListening();
    });

    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            .trim()
            .toLowerCase();

        console.log(`Transcripción: ${transcript}`);

        if (!isListening && transcript.includes('inge')) {
            isListening = true;
            recognition.stop();
            startCommandRecognition();
        } else if (isListening) {
            currentCommand = transcript;
            recognition.stop();
        }
    });

    recognition.addEventListener('end', () => {
        if (!isListening) {
            recognition.start();
        } else {
            executeCommand(currentCommand);
            startListening();
        }
    });

    const startListening = () => {
        isListening = false;
        recognition.start();
    };

    const startCommandRecognition = () => {
        recognition.start();
    };

    const executeCommand = (command) => {
        if (command.includes('usuario')) {
            document.getElementById('username').value = 'Majo';
        } else if (command.includes('contraseña')) {
            document.getElementById('password').value = '0828';
        } else if (command.includes('login')) {
            login();
        } else {
            console.log(`Comando no reconocido: ${command}`);
        }
    };

    const login = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'Majo' && password === '0828') {
            alert('Login exitoso');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };
}
