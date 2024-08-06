const codeInput = document.getElementById('codeInput');
const startButton = document.getElementById('startButton');
const status = document.getElementById('status');
const recommendations = document.getElementById('recommendations');
const recommendationList = document.getElementById('recommendationList');

const ACTIVATION_CODE = 'AI1532';
let isProtectionActive = false;

codeInput.addEventListener('input', () => {
    startButton.disabled = codeInput.value !== ACTIVATION_CODE;
});

startButton.addEventListener('click', () => {
    if (codeInput.value === ACTIVATION_CODE) {
        isProtectionActive = true;
        status.textContent = 'Protection active. Monitoring for threats...';
        startButton.textContent = 'Stop Protection';
        codeInput.disabled = true;
        startThreatDetection();
    } else if (isProtectionActive) {
        isProtectionActive = false;
        status.textContent = 'Protection stopped.';
        startButton.textContent = 'Start Protection';
        codeInput.disabled = false;
        stopThreatDetection();
    }
});

function startThreatDetection() {
    // Simulating threat detection with random intervals
    setInterval(() => {
        if (isProtectionActive && Math.random() < 0.1) { // 10% chance of detecting a threat
            detectThreat();
        }
    }, 5000); // Check every 5 seconds
}

function stopThreatDetection() {
    clearInterval();
    recommendations.classList.add('hidden');
}

function detectThreat() {
    const threats = [
        'Potential phishing attempt detected',
        'Suspicious script execution blocked',
        'Unsecured connection warning',
        'Potential malware download prevented'
    ];
    const detectedThreat = threats[Math.floor(Math.random() * threats.length)];
    
    // Show notification
    if (!document.hidden) {
        alert(`Threat detected: ${detectedThreat}`);
    } else {
        showNotification('Cybersecurity Alert', detectedThreat);
    }
    
    // Update recommendations
    updateRecommendations(detectedThreat);
}

function showNotification(title, body) {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(title, { body });
            }
        });
    }
}

function updateRecommendations(threat) {
    recommendationList.innerHTML = '';
    const recommendationItems = [
        'Update your browser to the latest version',
        'Enable two-factor authentication on your accounts',
        'Avoid clicking on suspicious links or downloading unknown files',
        'Use a reputable antivirus software'
    ];
    
    recommendationItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        recommendationList.appendChild(li);
    });
    
    recommendations.classList.remove('hidden');
}

// Simulating closing the tab where the threat was found
window.addEventListener('blur', () => {
    if (isProtectionActive && !document.hidden) {
        setTimeout(() => {
            alert('The tab with the potential threat has been closed for your safety.');
        }, 1000);
    }
});
