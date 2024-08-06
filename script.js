// Password Strength Checker
const passwordInput = document.getElementById('password-input');
const passwordStrength = document.getElementById('password-strength');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    switch(strength) {
        case 0:
        case 1:
            passwordStrength.textContent = 'Weak';
            passwordStrength.style.color = 'red';
            break;
        case 2:
        case 3:
            passwordStrength.textContent = 'Medium';
            passwordStrength.style.color = 'orange';
            break;
        case 4:
        case 5:
            passwordStrength.textContent = 'Strong';
            passwordStrength.style.color = 'green';
            break;
    }
});

// Email Breach Checker
const emailInput = document.getElementById('email-input');
const checkEmailButton = document.getElementById('check-email');
const emailResult = document.getElementById('email-result');

checkEmailButton.addEventListener('click', () => {
    const email = emailInput.value;
    // Note: This is a mock API call. In a real application, you would call the actual HaveIBeenPwned API.
    // However, for privacy and security reasons, we're not making actual API calls in this example.
    setTimeout(() => {
        const breached = Math.random() < 0.5; // Simulate a 50% chance of the email being in a breach
        if (breached) {
            emailResult.textContent = 'This email appears in known data breaches. Consider changing your password.';
            emailResult.style.color = 'red';
        } else {
            emailResult.textContent = 'Good news! This email does not appear in known data breaches.';
            emailResult.style.color = 'green';
        }
    }, 1000);
});

// Security Tips
const tipsList = document.getElementById('tips-list');
const securityTips = [
    'Use a unique password for each account.',
    'Enable two-factor authentication whenever possible.',
    'Keep your software and operating systems up to date.',
    'Be cautious about clicking links in emails or messages.',
    'Use a reputable antivirus program and keep it updated.',
    'Be careful about what information you share on social media.',
    'Use a VPN when connecting to public Wi-Fi.',
    'Regularly back up your important data.',
    'Be wary of phishing attempts asking for personal information.',
    'Use a password manager to generate and store complex passwords.'
];

securityTips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
});
