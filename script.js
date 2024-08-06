const codeInput = document.getElementById('codeInput');
const toggleButton = document.getElementById('toggleButton');
const status = document.getElementById('status');
const threatInfo = document.getElementById('threatInfo');
const threatDescription = document.getElementById('threatDescription');
const recommendations = document.getElementById('recommendations');
const recommendationList = document.getElementById('recommendationList');

const ACTIVATION_CODE = 'AI1532';
let isProtectionActive = false;
let analysisInterval;

codeInput.addEventListener('input', () => {
    toggleButton.disabled = codeInput.value !== ACTIVATION_CODE;
});

toggleButton.addEventListener('click', () => {
    if (!isProtectionActive && codeInput.value === ACTIVATION_CODE) {
        startProtection();
    } else if (isProtectionActive) {
        stopProtection();
    }
});

function startProtection() {
    isProtectionActive = true;
    status.textContent = 'Protection active. Monitoring for threats...';
    toggleButton.textContent = 'Stop Protection';
    codeInput.disabled = true;
    startThreatDetection();
}

function stopProtection() {
    isProtectionActive = false;
    status.textContent = 'Protection stopped.';
    toggleButton.textContent = 'Start Protection';
    codeInput.disabled = false;
    stopThreatDetection();
    hideThreatInfo();
    hideRecommendations();
}

function startThreatDetection() {
    analysisInterval = setInterval(() => {
        if (isProtectionActive) {
            analyzeForThreats();
        }
    }, 5000); // Analyze every 5 seconds
}

function stopThreatDetection() {
    clearInterval(analysisInterval);
}

function analyzeForThreats() {
    const threats = [
        { 
            name: 'Potential phishing attempt',
            description: 'A suspicious link attempting to steal your credentials has been detected.',
            recommendations: [
                'Do not click on any suspicious links',
                'Verify the authenticity of the website',
                'Use two-factor authentication when possible'
            ]
        },
        {
            name: 'Suspicious script execution',
            description: 'A potentially harmful script was blocked from running on the page.',
            recommendations: [
                'Keep your browser and extensions up to date',
                'Use a reputable ad-blocker',
                'Be cautious when allowing scripts to run on websites'
            ]
        },
        {
            name: 'Unsecured connection',
            description: 'You are connected to a website without proper encryption (HTTP instead of HTTPS).',
            recommendations: [
                'Avoid entering sensitive information on this site',
                'Look for the padlock icon in the address bar',
                'Use a VPN for an extra layer of security'
            ]
        }
    ];

    if (Math.random() < 0.2) { // 20% chance of detecting a threat
        const detectedThreat = threats[Math.floor(Math.random() * threats.length)];
        showThreatInfo(detectedThreat);
        showRecommendations(detectedThreat.recommendations);
    }
}

function showThreatInfo(threat) {
    threatDescription.textContent = `${threat.name}: ${threat.description}`;
    threatInfo.classList.remove('hidden');
}

function hideThreatInfo() {
    threatInfo.classList.add('hidden');
}

function showRecommendations(recommendationItems) {
    recommendationList.innerHTML = '';
    recommendationItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        recommendationList.appendChild(li);
    });
    recommendations.classList.remove('hidden');
}

function hideRecommendations() {
    recommendations.classList.add('hidden');
}
