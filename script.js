// User progress data with Shield Score
let userData = {
    lessonsCompleted: 0,
    completedLessonIds: [], // Track which specific lessons are completed
    shieldScore: 850,
    level: 1,
    streak: 0,
    correctAnswers: 0,
    totalAttempts: 0,
    dailyChallengeComplete: false
};

// Load saved progress
function loadProgress() {
    const saved = localStorage.getItem('shieldAIData');
    if (saved) {
        userData = JSON.parse(saved);
        // Ensure completedLessonIds array exists (for backwards compatibility)
        if (!userData.completedLessonIds) {
            userData.completedLessonIds = [];
        }
        updateStats();
        checkDailyChallenge();
    }
}

// Save progress
function saveProgress() {
    localStorage.setItem('shieldAIData', JSON.stringify(userData));
}

// Update displayed stats
function updateStats() {
    document.getElementById('lessonsCompleted').textContent = userData.lessonsCompleted;
    document.getElementById('shieldScore').textContent = userData.shieldScore;
    document.getElementById('userLevel').textContent = userData.level;
    document.getElementById('streakDays').textContent = userData.streak;
    
    // Update level based on shield score
    const newLevel = Math.floor(userData.shieldScore / 100) + 1;
    if (newLevel !== userData.level) {
        userData.level = newLevel;
        showAchievement('Level Up! 🎉', `You've reached Guardian Level ${newLevel}!`);
        saveProgress();
    }
}

// Update Shield Score
function updateShieldScore(change, reason) {
    userData.shieldScore += change;
    userData.shieldScore = Math.max(0, Math.min(999, userData.shieldScore));
    updateStats();
    saveProgress();
    
    if (change > 0) {
        showNotification(`+${change} Shield Score: ${reason}`, 'success');
    }
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)'};
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Educational content library - EXPANDED WITH MORE LESSONS
const lessons = {
    passwords: {
        title: "Password Security 101",
        icon: "🔑",
        content: `
            <div class="lesson-section">
                <h2>Why Password Security Matters</h2>
                <p>Your passwords are the keys to your digital life. Every day, hackers attempt billions of login attempts to gain unauthorized access to accounts. According to the Verizon Data Breach Investigations Report, 81% of hacking-related breaches occur because of weak, stolen, or reused passwords.</p>
                
                <p>Think about everything protected by passwords: your bank accounts, email, social media, work files, medical records, and shopping accounts. If a hacker gains access to just one account, they can often access many others through password resets sent to your email or by exploiting password reuse.</p>

                <div class="lesson-tip">
                    <strong>💡 Real-World Impact:</strong> The average cost of a data breach is $4.45 million, and individuals whose passwords are compromised often face identity theft, financial loss, and months of recovery time.
                </div>
            </div>

            <div class="lesson-section">
                <h2>How Hackers Crack Passwords</h2>
                
                <h3>1. Brute Force Attacks</h3>
                <p>Hackers use automated tools to try millions of password combinations per second. A simple 8-character password with only lowercase letters can be cracked in under 5 minutes. But a 16-character password with mixed characters would take 34,000 years!</p>

                <h3>2. Dictionary Attacks</h3>
                <p>Hackers use lists of common passwords, words from dictionaries, and known password patterns. Passwords like "password123", "qwerty", "iloveyou", and "123456" are tried first because they're incredibly common.</p>

                <h3>3. Credential Stuffing</h3>
                <p>When one website gets hacked, criminals take those usernames and passwords and try them on thousands of other sites. If you reuse passwords, a breach at a small forum could compromise your bank account.</p>

                <div class="lesson-warning">
                    <strong>⚠️ The Top 10 Most Hacked Passwords:</strong>
                    <ol style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                        <li>123456</li>
                        <li>password</li>
                        <li>12345678</li>
                        <li>qwerty</li>
                        <li>123456789</li>
                    </ol>
                    <p style="margin-top: 8px;">If your password is on this list or similar, change it immediately!</p>
                </div>
            </div>

            <div class="lesson-section">
                <h2>What Makes a Strong Password?</h2>
                
                <p><strong>1. Length (Most Important)</strong></p>
                <p>Length is your best defense. Each additional character exponentially increases cracking time:</p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>8 characters: Can be cracked in hours to days</li>
                    <li>12 characters: Takes years with mixed characters</li>
                    <li>16+ characters: Takes centuries to millennia</li>
                </ul>
                <p><strong>Recommendation:</strong> Minimum 12 characters, aim for 16+</p>

                <p style="margin-top: 20px;"><strong>2. Use Password Managers</strong></p>
                <p>Password managers are applications that generate, store, and auto-fill your passwords securely.</p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Bitwarden:</strong> Free, open source</li>
                    <li><strong>1Password:</strong> $3-5/month, excellent UI</li>
                    <li><strong>LastPass:</strong> Free version available</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Pro Tip:</strong> Use a passphrase instead of a password. "Purple!Elephant7Dancing@Moonlight3" is 37 characters long, easy to remember, and would take trillions of years to crack!
                </div>
            </div>

            <div class="lesson-section">
                <h2>Action Plan: Get Started Today</h2>

                <h3>Week 1: Foundation</h3>
                <ol style="line-height: 2; margin-left: 20px;">
                    <li>Choose and install a password manager</li>
                    <li>Create a strong master password</li>
                    <li>Import your existing passwords</li>
                    <li>Change your email account passwords to strong, unique ones</li>
                </ol>

                <h3 style="margin-top: 20px;">Week 2: Critical Accounts</h3>
                <ol style="line-height: 2; margin-left: 20px;">
                    <li>Update all financial account passwords</li>
                    <li>Update social media account passwords</li>
                    <li>Update work/school account passwords</li>
                    <li>Enable 2FA on all these accounts</li>
                </ol>
            </div>
        `
    },
    
    phishing: {
        title: "Recognizing Phishing Attacks",
        icon: "🎣",
        content: `
            <div class="lesson-section">
                <h2>What is Phishing?</h2>
                <p>Phishing is a form of social engineering where cybercriminals impersonate legitimate organizations to steal your sensitive information. 90% of data breaches start with phishing!</p>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>90% of data breaches start with phishing</li>
                    <li>1 in 99 emails is a phishing attempt</li>
                    <li>Phishing attacks increased 150% in 2023</li>
                    <li>32% of people click on phishing links</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Types of Phishing Attacks</h2>

                <h3>1. Email Phishing (Most Common)</h3>
                <p>Mass emails sent to thousands of people pretending to be from trusted companies.</p>
                
                <div class="lesson-example">
                    <strong>Example Email:</strong><br>
                    From: security@paypaI.com (note the capital I instead of lowercase l)<br>
                    Subject: URGENT: Your Account Will Be Suspended<br><br>
                    "Dear Customer, We've detected suspicious activity. Click here immediately to verify your information or your account will be permanently suspended within 24 hours."<br><br>
                    <strong>Red Flags:</strong> Urgency, threats, suspicious email address, generic greeting
                </div>

                <h3 style="margin-top: 20px;">2. Smishing (SMS/Text Phishing)</h3>
                <p>Phishing via text messages.</p>
                
                <div class="lesson-example">
                    <strong>Example Text:</strong><br>
                    "USPS: Your package is awaiting delivery. Confirm your address: bit.ly/usps-delivery"<br><br>
                    "Bank Alert: Unusual activity detected. Verify now: secure-bank-login.com"
                </div>

                <h3 style="margin-top: 20px;">3. Vishing (Voice Phishing)</h3>
                <p>Phone calls from scammers pretending to be from legitimate organizations.</p>
                
                <div class="lesson-example">
                    <strong>Example Call:</strong><br>
                    "Hello, this is Microsoft Tech Support. We've detected a virus on your computer. We need remote access immediately to fix this critical security issue."<br><br>
                    <strong>The Truth:</strong> Microsoft never makes unsolicited calls. This is 100% a scam.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Red Flags to Watch For</h2>

                <ol style="line-height: 2; margin-left: 20px;">
                    <li><strong>Urgency:</strong> "Act now or lose your account!"</li>
                    <li><strong>Threats:</strong> "Legal action if you don't respond"</li>
                    <li><strong>Too Good to Be True:</strong> "You won $1,000,000!"</li>
                    <li><strong>Requests for Info:</strong> Asking for passwords or SSN</li>
                    <li><strong>Suspicious Links:</strong> Hover to see real URL</li>
                    <li><strong>Poor Grammar:</strong> Spelling mistakes</li>
                    <li><strong>Wrong Email:</strong> Domain doesn't match company</li>
                    <li><strong>Generic Greetings:</strong> "Dear Customer" instead of your name</li>
                </ol>
            </div>

            <div class="lesson-section">
                <h2>The S.T.O.P. Method</h2>

                <div class="lesson-tip">
                    <strong>S - SENDER</strong><br>
                    ✓ Do I know this sender?<br>
                    ✓ Is the email address exactly correct?<br><br>
                    
                    <strong>T - THINK</strong><br>
                    ✓ Does this make sense?<br>
                    ✓ Is it urgent or threatening?<br><br>
                    
                    <strong>O - OBSERVE</strong><br>
                    ✓ Are there spelling errors?<br>
                    ✓ Hover over links - where do they really go?<br><br>
                    
                    <strong>P - PROTECT</strong><br>
                    ✓ Don't click suspicious links<br>
                    ✓ Go directly to the website to verify
                </div>
            </div>

            <div class="lesson-section">
                <h2>What to Do If You Click a Phishing Link</h2>

                <h3>Immediate Actions (Next 5 Minutes):</h3>
                <ol style="line-height: 2; margin-left: 20px;">
                    <li>Disconnect from the internet</li>
                    <li>Don't enter any information</li>
                    <li>Run a full antivirus scan</li>
                </ol>

                <h3 style="margin-top: 20px;">If You Entered Credentials:</h3>
                <ol style="line-height: 2; margin-left: 20px;">
                    <li>Change your password immediately</li>
                    <li>Enable two-factor authentication</li>
                    <li>Check your account activity</li>
                    <li>Alert the legitimate company</li>
                </ol>
            </div>
        `
    },
    
    '2fa': {
        title: "Two-Factor Authentication",
        icon: "📱",
        content: `
            <div class="lesson-section">
                <h2>What is Two-Factor Authentication?</h2>
                <p>Two-Factor Authentication (2FA) adds a critical second layer of security. Even if someone steals your password, they still can't access your account without the second factor.</p>

                <div class="lesson-tip">
                    <strong>💡 Real Impact:</strong> According to Microsoft, enabling 2FA blocks 99.9% of automated attacks on your accounts!
                </div>
            </div>

            <div class="lesson-section">
                <h2>Types of 2FA</h2>

                <h3>1. SMS/Text Message Codes (Security: ⭐⭐⭐)</h3>
                <p><strong>How it works:</strong> You receive a 6-digit code via text message.</p>
                <p><strong>Pros:</strong> Easy to use, works on any phone</p>
                <p><strong>Cons:</strong> Vulnerable to SIM swapping</p>

                <h3 style="margin-top: 20px;">2. Authenticator Apps (Security: ⭐⭐⭐⭐)</h3>
                <p><strong>How it works:</strong> Apps generate time-based codes every 30 seconds.</p>
                <p><strong>Popular Apps:</strong> Google Authenticator, Microsoft Authenticator, Authy</p>
                <p><strong>Pros:</strong> Works offline, not vulnerable to SIM swapping</p>
                <p><strong>Recommendation:</strong> This is the best option for most people!</p>

                <h3 style="margin-top: 20px;">3. Hardware Security Keys (Security: ⭐⭐⭐⭐⭐)</h3>
                <p><strong>How it works:</strong> Physical USB/NFC devices you plug in or tap.</p>
                <p><strong>Popular Keys:</strong> YubiKey ($25-85), Google Titan ($30)</p>
                <p><strong>Pros:</strong> Strongest protection, impossible to phish</p>
                <p><strong>Best for:</strong> High-value accounts (email, banking, crypto)</p>
            </div>

            <div class="lesson-section">
                <h2>How to Set Up 2FA</h2>

                <h3>Step 1: Download an Authenticator App</h3>
                <p>Install Microsoft Authenticator or Authy on your phone</p>

                <h3>Step 2: Enable 2FA on Your Account</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Go to Security Settings</li>
                    <li>Look for "Two-Factor Authentication"</li>
                    <li>Choose "Authenticator App" option</li>
                </ol>

                <h3>Step 3: Scan the QR Code</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Website shows a QR code</li>
                    <li>Open your authenticator app</li>
                    <li>Tap "Add Account" and scan</li>
                </ol>

                <h3>Step 4: Save Backup Codes</h3>
                <div class="lesson-warning">
                    <strong>⚠️ CRITICAL:</strong> Always save backup codes!
                    <ul style="margin-left: 20px; margin-top: 8px;">
                        <li>Store in password manager</li>
                        <li>Print and keep in safe place</li>
                        <li>NEVER skip this step!</li>
                    </ul>
                </div>
            </div>

            <div class="lesson-section">
                <h2>Priority List</h2>

                <h3>Set up 2FA TODAY on:</h3>
                <ol style="line-height: 2; margin-left: 20px;">
                    <li><strong>Email accounts</strong> - Can reset all other passwords!</li>
                    <li><strong>Banking</strong> - Direct access to your money</li>
                    <li><strong>Password manager</strong> - Keys to your kingdom</li>
                    <li><strong>Work accounts</strong> - Protect your job</li>
                    <li><strong>Social media</strong> - Prevent account takeover</li>
                </ol>

                <div class="lesson-tip">
                    <strong>💡 Goal:</strong> Enable 2FA on your top 10 accounts within one week!
                </div>
            </div>
        `
    },
    
    'social-engineering': {
        title: "Social Engineering Defense",
        icon: "🎭",
        content: `
            <div class="lesson-section">
                <h2>What is Social Engineering?</h2>
                <p>Social engineering is the art of manipulating people into giving up confidential information. It's often more effective than technical hacking because it exploits human psychology.</p>
                
                <p>98% of cyberattacks involve some form of social engineering!</p>
            </div>

            <div class="lesson-section">
                <h2>Common Tactics</h2>

                <h3>1. Pretexting</h3>
                <p>The attacker creates a fabricated scenario to gain your trust.</p>
                <div class="lesson-example">
                    <strong>Example:</strong> Someone calls claiming to be from your bank's fraud department, already knowing some details about you, and asks you to "verify" your full card number.
                </div>

                <h3 style="margin-top: 20px;">2. Baiting</h3>
                <p>Offering something enticing to lure you into a trap.</p>
                <div class="lesson-example">
                    <strong>Example:</strong> A USB drive labeled "Executive Salaries 2024" left in your parking lot. Plugging it in infects your computer with malware.
                </div>

                <h3 style="margin-top: 20px;">3. Quid Pro Quo</h3>
                <p>Offering a service in exchange for information.</p>
                <div class="lesson-example">
                    <strong>Example:</strong> "IT support" calling to help with a reported issue, convincing you to download remote access software.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Psychological Triggers</h2>

                <h3>Authority</h3>
                <p>People comply with authority figures. Attackers impersonate bosses, IT staff, or government officials.</p>

                <h3>Urgency/Fear</h3>
                <p>Creating panic makes people act without thinking.</p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>"Your account will be closed in 24 hours!"</li>
                    <li>"Legal action will be taken immediately!"</li>
                    <li>"Your computer is infected - call NOW!"</li>
                </ul>

                <h3>Scarcity</h3>
                <p>"Only 2 left!" or "Offer expires in 10 minutes!" creates artificial pressure.</p>

                <h3>Social Proof</h3>
                <p>"10,000 people have already signed up!" makes you think it must be legitimate.</p>
            </div>

            <div class="lesson-section">
                <h2>How to Defend</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Verify, verify, verify:</strong> Always confirm through independent channels</li>
                    <li><strong>Slow down:</strong> Attackers use urgency - take time to think</li>
                    <li><strong>Be skeptical:</strong> If something seems off, it probably is</li>
                    <li><strong>Question authority:</strong> Real authorities won't mind verification</li>
                    <li><strong>Trust your gut:</strong> If it feels wrong, say no</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Golden Rule:</strong> When in doubt, verify through a different channel. If your "boss" emails asking for a wire transfer, call them using a number you already have.
                </div>
            </div>
        `
    },
    
    'data-breaches': {
        title: "Data Breach Response",
        icon: "🚨",
        content: `
            <div class="lesson-section">
                <h2>Understanding Data Breaches</h2>
                <p>A data breach occurs when unauthorized individuals gain access to sensitive information. Even major companies like Facebook, LinkedIn, and Equifax have been breached, exposing billions of accounts.</p>
            </div>

            <div class="lesson-section">
                <h2>Immediate Actions (First Hour)</h2>
                
                <ol style="line-height: 2; margin-left: 20px;">
                    <li><strong>Change your password immediately</strong> on the breached service</li>
                    <li><strong>Change passwords on other accounts</strong> where you used the same password</li>
                    <li><strong>Enable 2FA</strong> if not already active</li>
                    <li><strong>Check account activity</strong> for suspicious logins</li>
                </ol>
            </div>

            <div class="lesson-section">
                <h2>Within 24 Hours</h2>
                
                <ol style="line-height: 2; margin-left: 20px;">
                    <li><strong>Check haveibeenpwned.com</strong> to see what data was exposed</li>
                    <li><strong>Monitor financial accounts</strong> if credit cards involved</li>
                    <li><strong>Set up fraud alerts</strong> with credit bureaus if SSN exposed</li>
                    <li><strong>Review credit reports</strong> for unauthorized accounts</li>
                </ol>

                <div class="lesson-warning">
                    <strong>⚠️ Important:</strong> Never ignore breach notifications! Taking action quickly can prevent identity theft and financial loss.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Preventing Future Impact</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Use unique passwords:</strong> Breaches on one site won't affect others</li>
                    <li><strong>Use a password manager:</strong> Makes unique passwords manageable</li>
                    <li><strong>Enable 2FA everywhere:</strong> Even if password breached, account stays secure</li>
                    <li><strong>Minimize data sharing:</strong> Only provide necessary information</li>
                    <li><strong>Delete unused accounts:</strong> Can't breach what doesn't exist</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Pro Tip:</strong> Set a quarterly reminder to check haveibeenpwned.com with your email addresses. Early detection is key!
                </div>
            </div>

            <div class="lesson-section">
                <h2>Ongoing Monitoring</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Watch for phishing emails using breach data</li>
                    <li>Monitor credit reports quarterly for next year</li>
                    <li>Consider credit monitoring service if SSN exposed</li>
                    <li>Be alert for identity theft attempts</li>
                </ul>
            </div>
        `
    },

    'safe-browsing': {
        title: "Safe Browsing Practices",
        icon: "🌐",
        content: `
            <div class="lesson-section">
                <h2>Why Safe Browsing Matters</h2>
                <p>Your web browser is your gateway to the internet. Unsafe browsing practices can expose you to malware, phishing, tracking, and data theft. Learning to browse safely protects your privacy, security, and personal information.</p>
            </div>

            <div class="lesson-section">
                <h2>Essential Browser Security Settings</h2>
                
                <h3>1. Keep Your Browser Updated</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Enable automatic updates</li>
                    <li>Use the latest version of Chrome, Firefox, Safari, or Edge</li>
                    <li>Security patches fix vulnerabilities hackers exploit</li>
                </ul>

                <h3>2. Use HTTPS Everywhere</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Look for the padlock icon in address bar</li>
                    <li>Install HTTPS Everywhere browser extension</li>
                    <li>Never enter passwords on HTTP sites</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ Warning:</strong> HTTPS encrypts your connection but doesn't guarantee a site is legitimate. Phishing sites can also use HTTPS!
                </div>
            </div>

            <div class="lesson-section">
                <h2>Dangerous Downloads to Avoid</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Pirated software:</strong> Often contains malware</li>
                    <li><strong>Browser toolbars:</strong> Usually spyware or adware</li>
                    <li><strong>Fake download buttons:</strong> Ads disguised as downloads</li>
                    <li><strong>Email attachments from strangers:</strong> High risk of viruses</li>
                    <li><strong>"Codec" or "player" updates:</strong> Usually malware</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Safe Download Rule:</strong> Only download from official sources. For software, go directly to the company's website, not third-party download sites.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Recommended Browser Extensions</h2>
                
                <h3>Privacy & Security Extensions:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>uBlock Origin:</strong> Blocks ads and malicious scripts</li>
                    <li><strong>Privacy Badger:</strong> Stops invisible trackers</li>
                    <li><strong>HTTPS Everywhere:</strong> Forces encrypted connections</li>
                    <li><strong>Bitwarden/1Password:</strong> Password manager integration</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ Extension Warning:</strong> Only install extensions from official stores. Too many extensions slow down your browser and can be security risks themselves.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Recognizing Suspicious Websites</h2>
                
                <h3>Red Flags:</h3>
                <ol style="line-height: 2; margin-left: 20px;">
                    <li><strong>Misspelled URLs:</strong> "amaz0n.com" instead of "amazon.com"</li>
                    <li><strong>Excessive pop-ups:</strong> Legitimate sites don't bombard you</li>
                    <li><strong>Too many ads:</strong> Especially fake "download" buttons</li>
                    <li><strong>Requests for unnecessary info:</strong> Why does a recipe site need your SSN?</li>
                    <li><strong>Poor design:</strong> Broken images, bad grammar, unprofessional look</li>
                    <li><strong>Urgent warnings:</strong> "Your computer is infected!" pop-ups are scams</li>
                </ol>
            </div>

            <div class="lesson-section">
                <h2>Safe Browsing Habits</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Use private/incognito mode for sensitive browsing</li>
                    <li>Clear cookies and cache regularly</li>
                    <li>Use different browsers for different activities (work vs personal)</li>
                    <li>Never save passwords in browser if others use your device</li>
                    <li>Log out of accounts when finished, especially on shared computers</li>
                    <li>Avoid clicking on ads - type URLs directly instead</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Pro Tip:</strong> Use DuckDuckGo instead of Google for searches. It doesn't track you or create a search history profile.
                </div>
            </div>
        `
    },
    
    // Include all other lessons from the original file (vpn, secure-devices, malware, privacy, kids-safety, parental-controls, elderly-safety, business-security, employee-training, incident-response)
    // [Previous lesson definitions continue here - I'll include a few more key ones]
    
    'safe-browsing': {
        title: "Safe Browsing Practices",
        icon: "🌐",
        content: `
            <div class="lesson-section">
                <h2>Why Safe Browsing Matters</h2>
                <p>Your web browser is your gateway to the internet. Unsafe browsing practices can expose you to malware, phishing, tracking, and data theft. Learning to browse safely protects your privacy, security, and personal information.</p>
            </div>

            <div class="lesson-section">
                <h2>Essential Browser Security Settings</h2>
                
                <h3>1. Keep Your Browser Updated</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Enable automatic updates</li>
                    <li>Use the latest version of Chrome, Firefox, Safari, or Edge</li>
                    <li>Security patches fix vulnerabilities hackers exploit</li>
                </ul>

                <h3>2. Use HTTPS Everywhere</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Look for the padlock icon in address bar</li>
                    <li>Install HTTPS Everywhere browser extension</li>
                    <li>Never enter passwords on HTTP sites</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ Warning:</strong> HTTPS encrypts your connection but doesn't guarantee a site is legitimate. Phishing sites can also use HTTPS!
                </div>
            </div>

            <div class="lesson-section">
                <h2>Dangerous Downloads to Avoid</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Pirated software:</strong> Often contains malware</li>
                    <li><strong>Browser toolbars:</strong> Usually spyware or adware</li>
                    <li><strong>Fake download buttons:</strong> Ads disguised as downloads</li>
                    <li><strong>Email attachments from strangers:</strong> High risk of viruses</li>
                    <li><strong>"Codec" or "player" updates:</strong> Usually malware</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Safe Download Rule:</strong> Only download from official sources. For software, go directly to the company's website, not third-party download sites.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Recommended Browser Extensions</h2>
                
                <h3>Privacy & Security Extensions:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>uBlock Origin:</strong> Blocks ads and malicious scripts</li>
                    <li><strong>Privacy Badger:</strong> Stops invisible trackers</li>
                    <li><strong>HTTPS Everywhere:</strong> Forces encrypted connections</li>
                    <li><strong>Bitwarden/1Password:</strong> Password manager integration</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ Extension Warning:</strong> Only install extensions from official stores. Too many extensions slow down your browser and can be security risks themselves.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Recognizing Suspicious Websites</h2>
                
                <h3>Red Flags:</h3>
                <ol style="line-height: 2; margin-left: 20px;">
                    <li><strong>Misspelled URLs:</strong> "amaz0n.com" instead of "amazon.com"</li>
                    <li><strong>Excessive pop-ups:</strong> Legitimate sites don't bombard you</li>
                    <li><strong>Too many ads:</strong> Especially fake "download" buttons</li>
                    <li><strong>Requests for unnecessary info:</strong> Why does a recipe site need your SSN?</li>
                    <li><strong>Poor design:</strong> Broken images, bad grammar, unprofessional look</li>
                    <li><strong>Urgent warnings:</strong> "Your computer is infected!" pop-ups are scams</li>
                </ol>
            </div>

            <div class="lesson-section">
                <h2>Safe Browsing Habits</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Use private/incognito mode for sensitive browsing</li>
                    <li>Clear cookies and cache regularly</li>
                    <li>Use different browsers for different activities (work vs personal)</li>
                    <li>Never save passwords in browser if others use your device</li>
                    <li>Log out of accounts when finished, especially on shared computers</li>
                    <li>Avoid clicking on ads - type URLs directly instead</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Pro Tip:</strong> Use DuckDuckGo instead of Google for searches. It doesn't track you or create a search history profile.
                </div>
            </div>
        `
    },
    
    'secure-devices': {
        title: "Securing Your Devices",
        icon: "💻",
        content: `
            <div class="lesson-section">
                <h2>Device Security Fundamentals</h2>
                <p>Your devices contain your entire digital life. Securing them properly is essential for protecting your data, privacy, and identity.</p>
            </div>

            <div class="lesson-section">
                <h2>Computer Security (Windows/Mac)</h2>
                
                <h3>Essential Security Measures:</h3>
                
                <p><strong>1. Operating System Updates</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Enable automatic updates</li>
                    <li>Install security patches immediately</li>
                    <li>Keep Windows/macOS current</li>
                </ul>

                <p><strong>2. Antivirus Protection</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Windows Defender (built-in) is excellent</li>
                    <li>Malwarebytes for additional scanning</li>
                    <li>Run weekly scans</li>
                </ul>

                <p><strong>3. Firewall</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Enable built-in firewall</li>
                    <li>Block incoming connections by default</li>
                    <li>Review allowed apps periodically</li>
                </ul>

                <p><strong>4. Disk Encryption</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Windows: BitLocker</li>
                    <li>Mac: FileVault</li>
                    <li>Protects data if device is stolen</li>
                </ul>

                <p><strong>5. User Accounts</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Use standard account for daily use</li>
                    <li>Only use admin account when needed</li>
                    <li>Separate accounts for family members</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Mobile Device Security (iPhone/Android)</h2>
                
                <h3>Smartphone Security Checklist:</h3>
                
                <p><strong>1. Lock Screen</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Use biometric (Face ID/fingerprint) + PIN</li>
                    <li>Minimum 6-digit PIN</li>
                    <li>Auto-lock after 30 seconds</li>
                </ul>

                <p><strong>2. App Permissions</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Review all app permissions monthly</li>
                    <li>Location: "While Using" not "Always"</li>
                    <li>Deny camera/mic to apps that don't need it</li>
                    <li>Limit contacts access</li>
                </ul>

                <p><strong>3. App Sources</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Only install from official stores</li>
                    <li>iPhone: App Store only</li>
                    <li>Android: Google Play only</li>
                    <li>Check app permissions before installing</li>
                </ul>

                <p><strong>4. Find My Device</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Enable Find My iPhone/Android</li>
                    <li>Test remote wipe capability</li>
                    <li>Note: Can erase data if stolen</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Physical Security</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Never leave devices unattended</strong> in public</li>
                    <li><strong>Lock screen</strong> when stepping away</li>
                    <li><strong>Use privacy screens</strong> in public places</li>
                    <li><strong>Cover webcam</strong> when not in use</li>
                    <li><strong>Secure home WiFi</strong> with WPA3 encryption</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Pro Tip:</strong> Before selling or donating a device, perform a factory reset AND encrypt it first. This makes data recovery impossible.
                </div>
            </div>
        `
    },
    
    malware: {
        title: "Understanding Malware",
        icon: "🦠",
        content: `
            <div class="lesson-section">
                <h2>What is Malware?</h2>
                <p>Malware (malicious software) is any program designed to harm your computer, steal data, or take control of your system. It's one of the biggest cybersecurity threats.</p>
            </div>

            <div class="lesson-section">
                <h2>Types of Malware</h2>
                
                <h3>1. Ransomware</h3>
                <p>Encrypts all your files and demands payment (usually Bitcoin) to decrypt them.</p>
                <div class="lesson-warning">
                    <strong>⚠️ Impact:</strong> Businesses have paid millions. Individuals often lose all photos, documents forever. NEVER pay - no guarantee you'll get files back.
                </div>

                <h3 style="margin-top: 20px;">2. Viruses</h3>
                <p>Attach to legitimate files and spread when you share those files. Can corrupt data, delete files, or steal information.</p>

                <h3 style="margin-top: 20px;">3. Trojans</h3>
                <p>Disguised as legitimate software but contain malicious code. Named after the Greek Trojan Horse.</p>
                <div class="lesson-example">
                    <strong>Example:</strong> "Free Adobe Photoshop download" that actually installs spyware
                </div>

                <h3 style="margin-top: 20px;">4. Spyware/Keyloggers</h3>
                <p>Secretly monitors your activity, records keystrokes, captures screenshots, steals passwords and credit card numbers.</p>

                <h3 style="margin-top: 20px;">5. Adware</h3>
                <p>Bombards you with unwanted ads, slows computer, tracks browsing to sell data to advertisers.</p>

                <h3 style="margin-top: 20px;">6. Rootkits</h3>
                <p>Hides deep in system, gives attackers admin access, very difficult to detect and remove.</p>
            </div>

            <div class="lesson-section">
                <h2>How Malware Spreads</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Email attachments:</strong> "Invoice.pdf.exe" or Word docs with macros</li>
                    <li><strong>Fake downloads:</strong> "Download" buttons that are actually ads</li>
                    <li><strong>Software cracks:</strong> Pirated software bundled with malware</li>
                    <li><strong>USB drives:</strong> Infected drives from unknown sources</li>
                    <li><strong>Malicious websites:</strong> Drive-by downloads</li>
                    <li><strong>Fake updates:</strong> "Your Flash Player is out of date"</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Protection Strategies</h2>
                
                <h3>Prevention (Best Defense):</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li><strong>Keep software updated</strong> - patches fix vulnerabilities</li>
                    <li><strong>Use antivirus</strong> - Windows Defender is good</li>
                    <li><strong>Don't open suspicious attachments</strong> - when in doubt, don't</li>
                    <li><strong>Only download from official sources</strong> - never use "cracked" software</li>
                    <li><strong>Use ad-blockers</strong> - uBlock Origin prevents malicious ads</li>
                    <li><strong>Regular backups</strong> - 3-2-1 rule protects against ransomware</li>
                </ol>

                <div class="lesson-tip">
                    <strong>💡 3-2-1 Backup Rule:</strong> 3 copies of data, 2 different storage types, 1 offsite backup
                </div>
            </div>
        `
    },
    
    privacy: {
        title: "Online Privacy Protection",
        icon: "🔒",
        content: `
            <div class="lesson-section">
                <h2>Understanding Digital Privacy</h2>
                <p>Every time you go online, you leave digital footprints. Companies, advertisers, hackers, and governments can track what you do, where you go, and what you buy.</p>
                
                <p><strong>You're being tracked more than you think:</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Google knows your search history, location, YouTube habits</li>
                    <li>Facebook tracks you even on other websites</li>
                    <li>Your ISP sees every website you visit</li>
                    <li>Apps access contacts, location, camera, microphone</li>
                    <li>Data brokers collect and sell your information</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Social Media Privacy</h2>
                
                <h3>Facebook/Meta Settings:</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Settings → Privacy → Set all to "Friends" not "Public"</li>
                    <li>Turn off facial recognition</li>
                    <li>Review app permissions → Remove old apps</li>
                    <li>Limit ad tracking: Settings → Ads → Less personalization</li>
                    <li>Download your data to see what Facebook knows</li>
                </ol>

                <h3 style="margin-top: 20px;">Instagram Settings:</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Make account private</li>
                    <li>Disable activity status</li>
                    <li>Turn off location services</li>
                    <li>Review who can tag you</li>
                </ol>

                <h3 style="margin-top: 20px;">Twitter/X Settings:</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Protect your tweets (if desired)</li>
                    <li>Disable location tagging</li>
                    <li>Turn off personalized ads</li>
                    <li>Review connected apps</li>
                </ol>
            </div>

            <div class="lesson-section">
                <h2>Browser Privacy</h2>
                
                <h3>Essential Browser Extensions:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>uBlock Origin:</strong> Blocks ads and trackers</li>
                    <li><strong>Privacy Badger:</strong> Blocks invisible trackers</li>
                    <li><strong>HTTPS Everywhere:</strong> Forces encrypted connections</li>
                </ul>

                <h3 style="margin-top: 20px;">Browser Settings:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Use private/incognito mode for sensitive browsing</li>
                    <li>Disable third-party cookies</li>
                    <li>Clear cookies and cache regularly</li>
                    <li>Use DuckDuckGo instead of Google for searches</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Privacy-Focused Browsers:</strong> Brave (built-in ad blocking), Firefox (strong privacy settings), Tor (maximum anonymity)
                </div>
            </div>
        `
    },
    
    'kids-safety': {
        title: "Teaching Kids Internet Safety",
        icon: "👶",
        content: `
            <div class="lesson-section">
                <h2>Age-Appropriate Internet Safety</h2>
                <p>Children face unique online risks: cyberbullying, predators, inappropriate content, and privacy violations. Teaching them safe online behavior is as important as teaching them to look both ways before crossing the street.</p>
            </div>

            <div class="lesson-section">
                <h2>Safety by Age Group</h2>
                
                <h3>Ages 5-8: Foundations</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Never share personal information (name, address, school, phone)</li>
                    <li>Tell parent immediately if something makes them uncomfortable</li>
                    <li>Don't click on ads or pop-ups</li>
                    <li>Only use kid-approved websites with supervision</li>
                    <li>Understand not everything online is true</li>
                </ul>

                <h3 style="margin-top: 20px;">Ages 9-12: Building Skills</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Create strong passwords (with parent's help)</li>
                    <li>Recognize suspicious emails and messages</li>
                    <li>Understand people online may not be who they claim</li>
                    <li>Think before posting - it's permanent</li>
                    <li>Report cyberbullying to parents/teachers</li>
                    <li>Limit screen time and take breaks</li>
                </ul>

                <h3 style="margin-top: 20px;">Ages 13-17: Independence with Oversight</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Manage privacy settings on social media</li>
                    <li>Recognize and avoid online scams</li>
                    <li>Understand digital footprint affects college/jobs</li>
                    <li>Practice healthy social media habits</li>
                    <li>Know how to block and report inappropriate content</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Warning Signs for Parents</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Quickly switching screens when you enter room</li>
                    <li>Being secretive about online activities</li>
                    <li>Receiving gifts from unknown sources</li>
                    <li>Changes in behavior after online time</li>
                    <li>Withdrawal from family activities</li>
                    <li>Using internet at unusual hours</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ If you see these signs:</strong> Have a calm, non-judgmental conversation. Children need to feel safe telling you about online problems.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Family Safety Rules</h2>
                
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li><strong>Devices in common areas</strong> - No internet in bedrooms</li>
                    <li><strong>Screen time limits</strong> - Use parental control apps</li>
                    <li><strong>Parents know passwords</strong> - You should have access to kids' accounts</li>
                    <li><strong>Friend/follow your kids</strong> - Stay aware of social media</li>
                    <li><strong>No messaging strangers</strong> - Period</li>
                    <li><strong>Regular check-ins</strong> - Discuss online experiences openly</li>
                    <li><strong>Model good behavior</strong> - Parents practice safe habits too</li>
                </ol>
            </div>
        `
    },
    
    'parental-controls': {
        title: "Setting Up Parental Controls",
        icon: "🔧",
        content: `
            <div class="lesson-section">
                <h2>Comprehensive Parental Control Setup</h2>
                <p>Parental controls help manage what children access online, limit screen time, and monitor digital activities.</p>
            </div>

            <div class="lesson-section">
                <h2>Built-In Platform Controls</h2>
                
                <h3>Windows Family Safety:</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Create child account: Settings → Family</li>
                    <li>Set screen time limits and schedules</li>
                    <li>Filter websites (allow or block specific sites)</li>
                    <li>Monitor app usage and block apps</li>
                    <li>Receive weekly activity reports via email</li>
                </ol>

                <h3 style="margin-top: 20px;">Apple Screen Time (iOS/macOS):</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Settings → Screen Time → Turn On</li>
                    <li>Set Downtime (hours when device locked)</li>
                    <li>App Limits (time per category)</li>
                    <li>Content & Privacy Restrictions</li>
                    <li>Block explicit content, in-app purchases, location sharing</li>
                </ol>

                <h3 style="margin-top: 20px;">Google Family Link (Android):</h3>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Download Family Link app on your phone</li>
                    <li>Set up child's Google account</li>
                    <li>Approve or block apps before download</li>
                    <li>Set screen time limits and bedtime</li>
                    <li>See location of child's device</li>
                    <li>Remotely lock device</li>
                </ol>
            </div>

            <div class="lesson-section">
                <h2>Third-Party Software</h2>
                
                <p><strong>Qustodio (Recommended):</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Works on all platforms</li>
                    <li>Real-time location tracking</li>
                    <li>Social media monitoring</li>
                    <li>Detailed activity reports</li>
                    <li>Free version available</li>
                </ul>

                <p><strong>Bark:</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Monitors texts, social media, emails</li>
                    <li>AI detects cyberbullying, predators, depression</li>
                    <li>Alerts parents to dangers</li>
                    <li>$99/year unlimited children</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Router-Level Controls</h2>
                
                <p>Control internet for ALL devices on home network:</p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>OpenDNS FamilyShield:</strong> Free, blocks adult content network-wide</li>
                    <li><strong>Router settings:</strong> Most have built-in parental controls</li>
                    <li>Set internet schedules (no internet after 9pm)</li>
                    <li>Block specific websites</li>
                    <li>Pause internet for specific devices</li>
                </ul>
            </div>
        `
    },
    
    'elderly-safety': {
        title: "Protecting Seniors from Scams",
        icon: "👴",
        content: `
            <div class="lesson-section">
                <h2>Why Seniors Are Targeted</h2>
                <p>Seniors lose an estimated $3 billion per year to scams.</p>
                
                <p><strong>Why they're targeted:</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Often have substantial savings and good credit</li>
                    <li>Less familiar with modern technology</li>
                    <li>More trusting and polite</li>
                    <li>May be isolated and eager for interaction</li>
                    <li>Sometimes experiencing cognitive decline</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Common Scams Targeting Seniors</h2>
                
                <h3>1. Grandparent Scam</h3>
                <div class="lesson-example">
                    <strong>The Scam:</strong> "Grandma, it's me! I'm in trouble - arrested/accident/stranded. I need money wired immediately. Don't tell Mom and Dad!"<br><br>
                    <strong>Defense:</strong> ALWAYS verify by calling grandchild directly. Ask questions only real grandchild would know. Never wire money without confirmation.
                </div>

                <h3 style="margin-top: 20px;">2. Tech Support Scam</h3>
                <div class="lesson-example">
                    <strong>The Scam:</strong> Pop-up or call claiming computer has virus. "Microsoft" wants to fix it remotely for a fee.<br><br>
                    <strong>Defense:</strong> Microsoft/Apple NEVER call unsolicited. Hang up immediately. Never give remote access.
                </div>

                <h3 style="margin-top: 20px;">3. Medicare/Social Security Scam</h3>
                <div class="lesson-example">
                    <strong>The Scam:</strong> "Your Medicare card needs updating" or "Benefits will be suspended unless you verify information."<br><br>
                    <strong>Defense:</strong> Government agencies don't call asking for personal info. They send official mail.
                </div>

                <h3 style="margin-top: 20px;">4. IRS Scam</h3>
                <div class="lesson-example">
                    <strong>The Scam:</strong> Threatening call about unpaid taxes, arrest warrant, lawsuit unless immediate payment via gift cards.<br><br>
                    <strong>Defense:</strong> IRS contacts by mail first, never demands gift cards, never threatens arrest over phone.
                </div>

                <h3 style="margin-top: 20px;">5. Romance Scam</h3>
                <div class="lesson-example">
                    <strong>The Scam:</strong> Develops online relationship over weeks/months, then has "emergency" needing money.<br><br>
                    <strong>Defense:</strong> Never send money to someone only met online. Video chat to verify identity.
                </div>
            </div>

            <div class="lesson-section">
                <h2>How Family Members Can Help</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Have regular conversations about scams (not condescending)</li>
                    <li>Offer to help with technology</li>
                    <li>Set up call screening - block unknown numbers</li>
                    <li>Monitor financial accounts (with permission)</li>
                    <li>Establish family code word for emergency money requests</li>
                    <li>Be their tech support - they won't need strangers</li>
                    <li>Sign up for Do Not Call Registry</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Simple Rules for Seniors</h2>
                
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li><strong>Never give personal info over phone</strong> unless YOU initiated call</li>
                    <li><strong>Hang up on pressure tactics</strong> - legitimate business waits</li>
                    <li><strong>No wire transfers or gift cards</strong> for unexpected requests</li>
                    <li><strong>When in doubt, ask family first</strong> - verify "emergencies"</li>
                    <li><strong>Don't click email links</strong> - type website addresses yourself</li>
                    <li><strong>If too good to be true, it is</strong></li>
                </ol>
            </div>
        `
    },
    
    'business-security': {
        title: "Small Business Cybersecurity",
        icon: "🏢",
        content: `
            <div class="lesson-section">
                <h2>Why Small Businesses Are Targeted</h2>
                <p>43% of cyberattacks target small businesses, but only 14% are prepared.</p>
                
                <p><strong>Why you're a target:</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Weaker security than large enterprises</li>
                    <li>Valuable customer data and financial info</li>
                    <li>Often lack dedicated IT security staff</li>
                    <li>More likely to pay ransoms</li>
                    <li>Gateway to larger companies you work with</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ Critical Stat:</strong> 60% of small businesses that experience a cyberattack go out of business within 6 months.
                </div>
            </div>

            <div class="lesson-section">
                <h2>Essential Security Measures</h2>
                
                <h3>1. Employee Training (Most Important!):</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Regular cybersecurity awareness training</li>
                    <li>Phishing simulation tests</li>
                    <li>Written security policies</li>
                    <li>Incident reporting procedures</li>
                    <li>Make it easy to ask questions</li>
                </ul>

                <h3 style="margin-top: 20px;">2. Access Control:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Principle of least privilege (minimum access needed)</li>
                    <li>Immediate revocation when employees leave</li>
                    <li>Regular access audits</li>
                    <li>Separate admin and user accounts</li>
                    <li>2FA required for all business accounts</li>
                </ul>

                <h3 style="margin-top: 20px;">3. Data Protection:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Regular backups (3-2-1 rule)</li>
                    <li>Encrypt sensitive data</li>
                    <li>Classify data by sensitivity</li>
                    <li>Secure disposal of old hardware</li>
                    <li>Data retention policies</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 3-2-1 Backup Rule:</strong> 3 copies, 2 different media types, 1 offsite
                </div>
            </div>

            <div class="lesson-section">
                <h2>Technical Security Measures</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Business-grade firewall</li>
                    <li>Antivirus on all devices</li>
                    <li>Automatic security updates</li>
                    <li>Email filtering and spam protection</li>
                    <li>VPN for remote workers</li>
                    <li>Mobile device management (MDM)</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Cyber Insurance</h2>
                <p>Consider cyber liability insurance: $1,000-$7,500/year depending on size.</p>
                
                <p><strong>Coverage includes:</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Data breach response costs</li>
                    <li>Legal fees and customer notification</li>
                    <li>Business interruption</li>
                    <li>Ransomware payments (if necessary)</li>
                </ul>
            </div>
        `
    },
    
    'employee-training': {
        title: "Employee Security Training",
        icon: "👥",
        content: `
            <div class="lesson-section">
                <h2>Why Employee Training Matters</h2>
                <p>95% of cybersecurity breaches are caused by human error. Your employees are either your strongest defense or weakest link.</p>
                
                <p>Investing in training is far cheaper than recovering from a breach!</p>
            </div>

            <div class="lesson-section">
                <h2>Building a Security Culture</h2>
                
                <h3>Make Security Everyone's Job:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Include security in job descriptions and reviews</li>
                    <li>Reward employees who report suspicious activity</li>
                    <li>Never punish someone for admitting they clicked phishing link</li>
                    <li>Leadership must model good security behavior</li>
                    <li>Make reporting easy and anonymous if needed</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Training Program Structure</h2>
                
                <h3>Onboarding (Day 1):</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Review security policies</li>
                    <li>Set up 2FA on all accounts</li>
                    <li>Password manager training</li>
                    <li>Device security basics</li>
                </ul>

                <h3 style="margin-top: 20px;">Quarterly Training:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>30-minute sessions on rotating topics</li>
                    <li>Phishing, social engineering, password security</li>
                    <li>Real-world examples from recent news</li>
                    <li>Interactive exercises</li>
                </ul>

                <h3 style="margin-top: 20px;">Phishing Simulations:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Send fake phishing emails monthly</li>
                    <li>Track who clicks (for training, not punishment)</li>
                    <li>Immediate training for those who fail</li>
                    <li>Gradually increase difficulty</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Key Topics to Cover</h2>
                
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Password security and password managers</li>
                    <li>Two-factor authentication</li>
                    <li>Recognizing phishing emails</li>
                    <li>Social engineering tactics</li>
                    <li>Physical security (locking screens, securing devices)</li>
                    <li>Safe browsing and downloading</li>
                    <li>Mobile device security</li>
                    <li>Public WiFi dangers</li>
                    <li>Data classification and handling</li>
                    <li>Incident reporting procedures</li>
                    <li>BYOD policies</li>
                    <li>Remote work security</li>
                </ol>
            </div>

            <div class="lesson-section">
                <h2>Measuring Success</h2>
                
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Phishing click rates:</strong> Should decrease over time</li>
                    <li><strong>Security incident reports:</strong> Should increase (more awareness)</li>
                    <li><strong>Password strength:</strong> Monitor for reused/weak passwords</li>
                    <li><strong>2FA adoption:</strong> Track percentage using 2FA</li>
                    <li><strong>Training completion:</strong> Ensure 100% participation</li>
                </ul>

                <div class="lesson-tip">
                    <strong>💡 Make It Engaging:</strong> Use gamification, prizes, real case studies, interactive scenarios. Engaged employees retain more!
                </div>
            </div>
        `
    },
    
    'incident-response': {
        title: "Incident Response Planning",
        icon: "🚨",
        content: `
            <div class="lesson-section">
                <h2>Why You Need an Incident Response Plan</h2>
                <p>When a security incident occurs, every minute counts. Having a written plan BEFORE an incident saves time, money, and reputation.</p>
                
                <p><strong>Without a plan:</strong> Panic, confusion, poor decisions, delays, greater damage</p>
                <p><strong>With a plan:</strong> Swift action, clear roles, minimal damage, faster recovery</p>
            </div>

            <div class="lesson-section">
                <h2>Incident Response Steps</h2>
                
                <h3>1. Preparation (Before Incident):</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Create response team with clear roles</li>
                    <li>Document all systems and assets</li>
                    <li>Maintain current backups</li>
                    <li>Establish communication channels</li>
                    <li>Have legal counsel contact info ready</li>
                </ul>

                <h3 style="margin-top: 20px;">2. Detection & Analysis:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>How will you know if breach occurred?</li>
                    <li>Monitor logs and alerts</li>
                    <li>Investigate suspicious activity</li>
                    <li>Determine scope of incident</li>
                    <li>Document everything</li>
                </ul>

                <h3 style="margin-top: 20px;">3. Containment:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Isolate affected systems immediately</li>
                    <li>Don't destroy evidence</li>
                    <li>Change compromised passwords</li>
                    <li>Block attacker access</li>
                    <li>Preserve forensic data</li>
                </ul>

                <h3 style="margin-top: 20px;">4. Eradication:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Remove malware/backdoors</li>
                    <li>Patch vulnerabilities</li>
                    <li>Strengthen security controls</li>
                    <li>Verify systems are clean</li>
                </ul>

                <h3 style="margin-top: 20px;">5. Recovery:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Restore from clean backups</li>
                    <li>Monitor for reinfection</li>
                    <li>Gradually bring systems online</li>
                    <li>Verify normal operations</li>
                </ul>

                <h3 style="margin-top: 20px;">6. Lessons Learned:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>What happened and why?</li>
                    <li>What worked? What didn't?</li>
                    <li>How to prevent future incidents?</li>
                    <li>Update response plan</li>
                    <li>Additional training needed?</li>
                </ul>
            </div>

            <div class="lesson-section">
                <h2>Communication Plan</h2>
                
                <h3>Who to notify:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>Management and executives</li>
                    <li>Legal counsel</li>
                    <li>Law enforcement (if criminal)</li>
                    <li>Affected customers (legally required in many cases)</li>
                    <li>Media (if public incident)</li>
                    <li>Cyber insurance provider</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ Legal Requirements:</strong> Many jurisdictions require customer notification within 72 hours of data breach. Know your obligations!
                </div>
            </div>

            <div class="lesson-section">
                <h2>Building Your Plan</h2>
                
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Download incident response template</li>
                    <li>Customize for your business</li>
                    <li>Assign roles and responsibilities</li>
                    <li>Create contact lists (updated quarterly)</li>
                    <li>Document all systems and data</li>
                    <li>Practice with tabletop exercises</li>
                    <li>Review and update annually</li>
                </ol>

                <div class="lesson-tip">
                    <strong>💡 Test Your Plan:</strong> Run a simulated incident once a year. You'll find gaps and areas for improvement.
                </div>
            </div>
        `
    },
    
    vpn: {
        title: "VPNs and Encryption",
        icon: "🛡️",
        content: `
            <div class="lesson-section">
                <h2>What is a VPN?</h2>
                <p>A Virtual Private Network (VPN) creates an encrypted tunnel between your device and the internet. It hides your IP address, encrypts your data, and protects your privacy from ISPs, hackers, and trackers.</p>
                
                <p><strong>How VPNs Work:</strong></p>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Your device connects to a VPN server</li>
                    <li>All internet traffic is encrypted</li>
                    <li>Traffic goes through the VPN server</li>
                    <li>Websites see the VPN's IP, not yours</li>
                </ol>
            </div>

            <div class="lesson-section">
                <h2>When You NEED a VPN</h2>
                
                <h3>Critical Use Cases:</h3>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li><strong>Public WiFi:</strong> Coffee shops, airports, hotels - NEVER trust public networks without VPN</li>
                    <li><strong>Privacy from ISP:</strong> Your internet provider can see everything without VPN</li>
                    <li><strong>Traveling abroad:</strong> Protect yourself on foreign networks</li>
                    <li><strong>Accessing geo-blocked content:</strong> Content restricted in your region</li>
                    <li><strong>Remote work:</strong> Secure connection to company resources</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ When NOT to Use VPN:</strong> Banking (may trigger fraud alerts), gaming (adds latency), streaming with DRM issues
                </div>
            </div>

            <div class="lesson-section">
                <h2>Choosing a VPN Service</h2>
                
                <h3>Trusted VPN Providers:</h3>
                
                <p><strong>Mullvad ($5.50/month)</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>✅ No logs policy (verified)</li>
                    <li>✅ Anonymous - accepts cash</li>
                    <li>✅ Open source apps</li>
                    <li>✅ Based in Sweden (privacy-friendly)</li>
                </ul>

                <p><strong>ProtonVPN (Free & Paid)</strong></p>
                <ul style="margin-left: 20px; line-height: 1.8; color: #475569;">
                    <li>✅ Free tier available</li>
                    <li>✅ Swiss privacy laws</li>
                    <li>✅ Strong encryption</li>
                    <li>✅ Tor over VPN option</li>
                </ul>

                <div class="lesson-warning">
                    <strong>⚠️ AVOID Free VPNs:</strong> Many sell your data, inject ads, or contain malware. If you're not paying for the product, YOU are the product!
                </div>
            </div>

            <div class="lesson-section">
                <h2>Setting Up Your VPN</h2>
                
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Choose a reputable VPN provider</li>
                    <li>Download their app for your device</li>
                    <li>Create account and log in</li>
                    <li>Connect to nearest server (or choose specific location)</li>
                    <li>Verify connection at ipleak.net</li>
                    <li>Enable kill switch in settings</li>
                    <li>Set to auto-connect on untrusted networks</li>
                </ol>

                <div class="lesson-tip">
                    <strong>💡 Pro Tip:</strong> Test your VPN at ipleak.net to ensure no DNS leaks or IP leaks. Your real IP should be completely hidden.
                </div>
            </div>
        `
    }
};

// Open lesson
function openLesson(lessonId) {
    const lesson = lessons[lessonId];
    if (!lesson) {
        showNotification('This lesson is coming soon!', 'info');
        return;
    }

    const modal = document.getElementById('lessonModal');
    const content = document.getElementById('lessonContent');
    
    // Check if already completed
    const isCompleted = userData.completedLessonIds && userData.completedLessonIds.includes(lessonId);
    
    content.innerHTML = `
        <div style="text-align: center; font-size: 4em; margin-bottom: 16px;">${lesson.icon}</div>
        <h1 id="lessonTitle" style="color: #1e293b; font-size: 2.5em; margin-bottom: 32px; text-align: center;">${lesson.title}</h1>
        ${isCompleted ? '<div style="background: #dcfce7; border: 2px solid #22c55e; color: #166534; padding: 16px; border-radius: 10px; text-align: center; margin-bottom: 24px; font-weight: 600;"><strong>✅ You\'ve completed this lesson!</strong></div>' : ''}
        ${lesson.content}
        <button class="btn" onclick="completeLesson('${lessonId}')" style="width: 100%; margin-top: 24px;" ${isCompleted ? 'disabled' : ''}>
            ${isCompleted ? '✅ Lesson Completed' : '📝 Mark as Complete'}
        </button>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    modal.querySelector('button').focus();
    
    if (!isCompleted) {
        updateShieldScore(20, 'Lesson Started');
    }
}

// Close lesson
function closeLesson() {
    document.getElementById('lessonModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Complete lesson
function completeLesson(lessonId) {
    // Check if this lesson was already completed
    if (!userData.completedLessonIds.includes(lessonId)) {
        userData.completedLessonIds.push(lessonId);
        userData.lessonsCompleted++;
        updateShieldScore(50, 'Lesson Completed');
        showAchievement('Lesson Complete! 🎓', 'You completed the ' + lessons[lessonId].title + ' lesson!');
        saveProgress();
        updateStats();
    } else {
        showNotification('You already completed this lesson!', 'info');
    }
    closeLesson();
}

// Show achievement
function showAchievement(title, desc) {
    const popup = document.getElementById('achievementPopup');
    document.getElementById('achievementTitle').textContent = title;
    document.getElementById('achievementDesc').textContent = desc;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 4000);
}

// Switch learning tabs
function switchLearningTab(tab, event) {
    const tabs = document.querySelectorAll('.tabs .tab');
    const contents = document.querySelectorAll('[id^="learning-"]');
    
    tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
    contents.forEach(c => c.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
        event.target.setAttribute('aria-selected', 'true');
    }
    document.getElementById('learning-' + tab).classList.add('active');
}

// Daily Challenge System with rotating challenges
function checkDailyChallenge() {
    const challengeDiv = document.getElementById('dailyChallenge');
    
    const challenges = [
        {
            icon: "🔑",
            title: "Password Audit Challenge",
            desc: "Review your top 5 most important accounts and ensure they have unique, strong passwords. Use a password manager to store them securely.",
            tasks: [
                "Check if you're reusing passwords",
                "Verify each password is at least 12 characters",
                "Make sure passwords contain uppercase, lowercase, numbers, and symbols",
                "Save passwords in a password manager"
            ],
            points: 100
        },
        {
            icon: "📱",
            title: "2FA Setup Challenge",
            desc: "Enable two-factor authentication on at least one new account today. This single step blocks 99.9% of automated attacks!",
            tasks: [
                "Choose an important account (email, banking, social media)",
                "Go to Security Settings",
                "Enable 2FA using an authenticator app",
                "Save backup codes in a secure location"
            ],
            points: 150
        },
        {
            icon: "🎭",
            title: "Social Engineering Test",
            desc: "Complete the Social Engineering Simulator below with 100% accuracy. Learn to recognize manipulation tactics.",
            tasks: [
                "Read each scenario carefully",
                "Identify the red flags",
                "Choose the safest response",
                "Get all scenarios correct"
            ],
            points: 75
        },
        {
            icon: "🎣",
            title: "Phishing Awareness",
            desc: "Check your email inbox and identify any suspicious messages. Practice the S.T.O.P. method (Sender, Think, Observe, Protect).",
            tasks: [
                "Review emails from the last 24 hours",
                "Check sender addresses carefully",
                "Look for urgency or threats",
                "Report any suspicious emails"
            ],
            points: 80
        },
        {
            icon: "🌐",
            title: "Browser Security Check",
            desc: "Audit your browser extensions and settings. Remove unnecessary extensions and enable privacy features.",
            tasks: [
                "Review all installed browser extensions",
                "Remove extensions you don't use",
                "Install uBlock Origin if not already installed",
                "Enable 'Do Not Track' in browser settings"
            ],
            points: 90
        },
        {
            icon: "🛡️",
            title: "Account Security Review",
            desc: "Check haveibeenpwned.com with all your email addresses to see if you've been in any data breaches.",
            tasks: [
                "Visit haveibeenpwned.com",
                "Enter each of your email addresses",
                "Review any breach notifications",
                "Change passwords for compromised accounts"
            ],
            points: 120
        },
        {
            icon: "📚",
            title: "Complete a Security Lesson",
            desc: "Choose any lesson from the Education Hub and complete it. Knowledge is your best defense!",
            tasks: [
                "Select a lesson from the tabs above",
                "Read through the entire lesson",
                "Take notes on key points",
                "Click 'Mark Complete' when finished"
            ],
            points: 100
        }
    ];
    
    // Get today's date and use it to select a consistent challenge for the day
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const todayChallenge = challenges[dayOfYear % challenges.length];
    
    // Check if already completed today
    const lastCompleted = localStorage.getItem('lastChallengeDate');
    const todayString = today.toDateString();
    const alreadyCompleted = lastCompleted === todayString;
    
    challengeDiv.innerHTML = `
        <div style="display: flex; align-items: start; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
            <div style="font-size: 4em; line-height: 1;">${todayChallenge.icon}</div>
            <div style="flex: 1; min-width: 250px;">
                <h3 style="color: #1e293b; font-size: 1.3em; margin-bottom: 8px; font-weight: 700;">${todayChallenge.title}</h3>
                <p style="color: #64748b; margin-bottom: 16px; line-height: 1.6;">${todayChallenge.desc}</p>
                
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <strong style="color: #1e293b; display: block; margin-bottom: 10px;">✓ Steps to Complete:</strong>
                    <ul style="color: #475569; line-height: 1.8; margin-left: 20px;">
                        ${todayChallenge.tasks.map(task => `<li>${task}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div style="text-align: center; min-width: 120px;">
                <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 12px 20px; border-radius: 10px; font-weight: 700; font-size: 1.1em; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">
                    +${todayChallenge.points}<br><span style="font-size: 0.8em; opacity: 0.9;">Points</span>
                </div>
                ${alreadyCompleted ? 
                    '<div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 0.9em;">✅ Completed!</div>' : 
                    ''
                }
            </div>
        </div>
        
        <button class="btn" onclick="completeDailyChallenge(${todayChallenge.points})" style="width: 100%;" ${alreadyCompleted ? 'disabled' : ''}>
            ${alreadyCompleted ? '✅ Challenge Completed Today' : '🎯 Mark Challenge as Complete'}
        </button>
        
        ${!alreadyCompleted ? `
            <p style="color: #64748b; font-size: 0.85em; margin-top: 12px; text-align: center;">
                💡 New challenge available in ${24 - today.getHours()} hours
            </p>
        ` : `
            <p style="color: #10b981; font-size: 0.85em; margin-top: 12px; text-align: center; font-weight: 600;">
                🔥 Great job! Come back tomorrow for a new challenge
            </p>
        `}
    `;
}

function completeDailyChallenge(points) {
    const today = new Date().toDateString();
    const lastCompleted = localStorage.getItem('lastChallengeDate');
    
    if (lastCompleted === today) {
        showNotification('You\'ve already completed today\'s challenge!', 'info');
        return;
    }
    
    // Mark as completed
    localStorage.setItem('lastChallengeDate', today);
    
    // Update user data
    userData.dailyChallengeComplete = true;
    updateShieldScore(points, 'Daily Challenge Complete');
    userData.streak++;
    saveProgress();
    
    showAchievement('Challenge Complete! 🎯', `You earned ${points} Shield Score points!`);
    
    // Refresh the challenge display
    checkDailyChallenge();
}

// Populate threat feed
function populateThreatFeed() {
    const feed = document.getElementById('communityFeed');
    const threats = [
        { title: 'Amazon Phishing Wave', desc: 'Fake account suspension emails targeting Prime members', level: 'critical', time: '12 min ago' },
        { title: 'IRS Tax Scam', desc: 'SMS messages about fake refunds and account verification', level: 'high', time: '1 hour ago' },
        { title: 'LinkedIn Job Scams', desc: 'Fake recruiters requesting personal information', level: 'medium', time: '3 hours ago' },
        { title: 'Crypto Wallet Phishing', desc: 'Emails impersonating popular crypto exchanges', level: 'high', time: '5 hours ago' },
        { title: 'Netflix Account Scam', desc: 'Billing update requests via text message', level: 'medium', time: '8 hours ago' }
    ];

    feed.innerHTML = threats.map(t => `
        <div class="threat-alert ${t.level}">
            <div class="alert-header">
                <div class="alert-title">${t.title}</div>
                <span class="alert-badge ${t.level}">${t.level.toUpperCase()}</span>
            </div>
            <p>${t.desc}</p>
            <div class="alert-time">${t.time}</div>
        </div>
    `).join('');
}

// Social Engineering Simulator
const socialEngScenarios = [
    {
        name: "IT Support Impersonator",
        role: "Claims to be from IT Support",
        message: "Hi, this is John from IT. We've detected suspicious activity on your account. I need you to verify your username and password immediately to secure your account.",
        correctResponse: "suspicious"
    },
    {
        name: "CEO Urgent Request",
        role: "Appears to be from your CEO",
        message: "I'm in an important meeting and need you to wire $50,000 to this vendor immediately for a time-sensitive deal. I'll explain later. Handle this discretely.",
        correctResponse: "suspicious"
    },
    {
        name: "HR Benefits Update",
        role: "Claims to be from HR Department",
        message: "We're updating our payroll system. Please click this link to verify your bank account and social security number by end of day to avoid paycheck delays.",
        correctResponse: "suspicious"
    },
    {
        name: "Amazon Prize Winner",
        role: "Amazon Customer Service",
        message: "Congratulations! You've been selected as our random winner for a FREE iPhone 15! Click here to claim your prize within 24 hours before it expires!",
        correctResponse: "suspicious"
    },
    {
        name: "Bank Security Alert",
        role: "Security Team - First National Bank",
        message: "We've detected fraudulent charges on your account. Please call this number immediately: 555-0142 and provide your card details to cancel the unauthorized transactions.",
        correctResponse: "suspicious"
    }
];

let currentSocialEngIndex = 0;

function loadNewSocialEngScenario() {
    currentSocialEngIndex = (currentSocialEngIndex + 1) % socialEngScenarios.length;
    
    const scenario = socialEngScenarios[currentSocialEngIndex];
    document.getElementById('attackerName').textContent = scenario.name;
    document.getElementById('attackerRole').textContent = scenario.role;
    document.getElementById('attackerMessage').textContent = scenario.message;
    document.getElementById('socialEngResult').style.display = 'none';
}

function respondToSocialEng(response) {
    const scenario = socialEngScenarios[currentSocialEngIndex];
    const resultDiv = document.getElementById('socialEngResult');
    const isCorrect = response === scenario.correctResponse;
    
    userData.totalAttempts++;
    if (isCorrect) {
        userData.correctAnswers++;
        updateShieldScore(50, 'Social Engineering Defended');
        resultDiv.innerHTML = `
            <div style="background: #dcfce7; padding: 20px; border-radius: 12px; border: 2px solid #22c55e;">
                <strong style="color: #166534; font-size: 1.2em;">✅ Perfect Response!</strong>
                <p style="color: #166534; margin-top: 8px;">You correctly identified this as a social engineering attack. +50 Shield Score!</p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div style="background: #fee2e2; padding: 20px; border-radius: 12px; border: 2px solid #ef4444;">
                <strong style="color: #991b1b; font-size: 1.2em;">❌ Attack Successful</strong>
                <p style="color: #991b1b; margin-top: 8px;">This was a social engineering attack. Always verify requests through official channels before providing information.</p>
            </div>
        `;
    }
    
    resultDiv.style.display = 'block';
    saveProgress();
}

// Password strength analyzer
function togglePassword() {
    const input = document.getElementById('passwordInput');
    input.type = input.type === 'password' ? 'text' : 'password';
}

function analyzePassword() {
    const password = document.getElementById('passwordInput').value;
    const resultDiv = document.getElementById('passwordStrengthResult');

    if (!password) {
        resultDiv.style.display = 'none';
        return;
    }

    resultDiv.style.display = 'block';
    let score = 0;
    const feedback = [];

    // Length scoring
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 15;
    if (password.length >= 16) score += 10;
    
    if (password.length < 8) {
        feedback.push('❌ Password should be at least 8 characters');
    } else if (password.length < 12) {
        feedback.push('⚠️ Consider making it at least 12 characters');
    } else {
        feedback.push('✅ Good length');
    }

    // Character variety
    if (/[a-z]/.test(password)) {
        score += 10;
        feedback.push('✅ Contains lowercase letters');
    } else {
        feedback.push('❌ Add lowercase letters');
    }
    
    if (/[A-Z]/.test(password)) {
        score += 10;
        feedback.push('✅ Contains uppercase letters');
    } else {
        feedback.push('❌ Add uppercase letters');
    }
    
    if (/[0-9]/.test(password)) {
        score += 10;
        feedback.push('✅ Contains numbers');
    } else {
        feedback.push('❌ Add numbers');
    }
    
    if (/[^a-zA-Z0-9]/.test(password)) {
        score += 15;
        feedback.push('✅ Contains special characters');
    } else {
        feedback.push('❌ Add special characters (!@#$%^&*)');
    }

    // Common patterns penalty
    if (/^(123|abc|password|qwerty)/i.test(password)) {
        score -= 20;
        feedback.push('❌ Avoid common patterns');
    }

    score = Math.max(0, Math.min(100, score));

    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthPercentage = document.getElementById('strengthPercentage');
    const feedbackDiv = document.getElementById('passwordFeedback');

    strengthBar.style.width = score + '%';
    strengthBar.parentElement.setAttribute('aria-valuenow', score);
    strengthPercentage.textContent = score + '%';

    let color, label;
    if (score < 40) {
        color = '#ef4444';
        label = 'WEAK';
    } else if (score < 60) {
        color = '#f59e0b';
        label = 'FAIR';
    } else if (score < 80) {
        color = '#3b82f6';
        label = 'GOOD';
    } else {
        color = '#10b981';
        label = 'STRONG';
    }

    strengthBar.style.background = `linear-gradient(90deg, ${color}, ${color})`;
    strengthLabel.textContent = label;
    strengthLabel.style.color = color;
    
    feedbackDiv.innerHTML = `
        <div style="background: #f8fafc; padding: 16px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <strong style="color: #1e293b; display: block; margin-bottom: 12px;">Recommendations:</strong>
            <ul style="list-style: none; line-height: 1.8;">
                ${feedback.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Breach checker with educational information
function checkBreach() {
    const email = document.getElementById('breachEmail').value;
    const resultDiv = document.getElementById('breachResult');

    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address', 'info');
        return;
    }

    resultDiv.innerHTML = `
        <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border: 2px solid #0ea5e9; text-align: center;">
            <div style="font-size: 2em; margin-bottom: 12px;">🔍</div>
            <strong style="color: #0c4a6e;">Simulating breach check...</strong>
            <p style="color: #075985; margin-top: 8px; font-size: 0.9em;">In a real check, your email is hashed and compared against breach databases</p>
        </div>
    `;
    resultDiv.style.display = 'block';

    // Common breach names for educational purposes
    const commonBreaches = [
        { name: "LinkedIn (2021)", records: "700M users", date: "June 2021" },
        { name: "Facebook (2019)", records: "533M users", date: "April 2019" },
        { name: "Yahoo (2013)", records: "3B accounts", date: "August 2013" },
        { name: "Adobe (2013)", records: "153M accounts", date: "October 2013" },
        { name: "Dropbox (2012)", records: "68M users", date: "July 2012" },
        { name: "MySpace (2008)", records: "360M accounts", date: "June 2008" }
    ];

    // Simulate checking (educational simulation)
    setTimeout(() => {
        // Randomly determine if email is "found" for educational purposes
        const hasBreaches = Math.random() > 0.4; // 60% chance of finding breaches for demonstration
        
        if (hasBreaches) {
            const breachCount = Math.floor(Math.random() * 3) + 1;
            const selectedBreaches = [];
            const breachesCopy = [...commonBreaches];
            
            for (let i = 0; i < breachCount && breachesCopy.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * breachesCopy.length);
                selectedBreaches.push(breachesCopy.splice(randomIndex, 1)[0]);
            }
            
            resultDiv.innerHTML = `
                <div style="background: #fef2f2; padding: 24px; border-radius: 12px; border: 2px solid #fca5a5;">
                    <div style="font-size: 2em; text-align: center; margin-bottom: 12px;">⚠️</div>
                    <strong style="color: #991b1b; font-size: 1.2em; display: block; margin-bottom: 12px;">Potential Breaches Found (Simulated)</strong>
                    <p style="color: #991b1b; margin-bottom: 16px;">This email pattern appears in <strong>${breachCount}</strong> known data breach${breachCount > 1 ? 'es' : ''} in this simulation:</p>
                    
                    <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                        <strong style="color: #1e293b; display: block; margin-bottom: 12px;">📊 Example Breaches:</strong>
                        ${selectedBreaches.map(breach => `
                            <div style="padding: 12px; background: #f8fafc; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid #ef4444;">
                                <div style="font-weight: 600; color: #1e293b;">${breach.name}</div>
                                <div style="font-size: 0.85em; color: #64748b; margin-top: 4px;">
                                    ${breach.records} affected • ${breach.date}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                        <strong style="color: #1e293b; display: block; margin-bottom: 8px;">🚨 Immediate Actions Required:</strong>
                        <ol style="color: #475569; margin-left: 20px; line-height: 1.8;">
                            <li><strong>Change passwords immediately</strong> on all accounts using this email</li>
                            <li><strong>Enable two-factor authentication (2FA)</strong> on all important accounts</li>
                            <li><strong>Use unique passwords</strong> for each account - consider a password manager</li>
                            <li><strong>Monitor your accounts</strong> for suspicious activity</li>
                            <li><strong>Check haveibeenpwned.com</strong> for real breach information</li>
                        </ol>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
                        <strong style="color: #78350f; font-size: 0.9em;">💡 Prevention Tips:</strong>
                        <ul style="color: #92400e; margin-left: 20px; line-height: 1.6; font-size: 0.9em; margin-top: 8px;">
                            <li>Never reuse passwords across sites</li>
                            <li>Use a password manager (Bitwarden, 1Password, LastPass)</li>
                            <li>Enable 2FA everywhere possible</li>
                            <li>Monitor your accounts regularly</li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div style="background: #dcfce7; padding: 24px; border-radius: 12px; border: 2px solid #86efac;">
                    <div style="font-size: 2em; text-align: center; margin-bottom: 12px;">✅</div>
                    <strong style="color: #166534; font-size: 1.2em; display: block; margin-bottom: 12px;">Good News! (Simulation)</strong>
                    <p style="color: #166534; margin-bottom: 16px;">This email pattern was not found in known data breaches in this simulation.</p>
                    
                    <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                        <strong style="color: #1e293b; display: block; margin-bottom: 8px;">🛡️ Stay Protected:</strong>
                        <ul style="color: #475569; margin-left: 20px; line-height: 1.8;">
                            <li>Continue using unique, strong passwords</li>
                            <li>Keep 2FA enabled on all accounts</li>
                            <li>Check periodically at haveibeenpwned.com</li>
                            <li>Be vigilant for phishing attempts</li>
                            <li>Monitor your financial accounts</li>
                        </ul>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 12px; border-radius: 8px;">
                        <strong style="color: #0c4a6e; font-size: 0.9em;">📚 Note:</strong>
                        <p style="color: #075985; font-size: 0.9em; margin-top: 8px;">
                            This is a simulation for educational purposes. For real breach checking, always use <strong>haveibeenpwned.com</strong>, a trusted and free service.
                        </p>
                    </div>
                </div>
            `;
        }
        
        updateShieldScore(25, 'Security Awareness Check');
    }, 2000);
}

// Keyboard navigation for lesson cards
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    populateThreatFeed();
    checkDailyChallenge();
    loadNewSocialEngScenario();
    populateNews(); // Load news articles
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const lessonModal = document.getElementById('lessonModal');
            const newsModal = document.getElementById('newsModal');
            if (lessonModal.style.display === 'block') {
                closeLesson();
            }
            if (newsModal && newsModal.style.display === 'block') {
                closeNews();
            }
        }
    });
});

// News Articles Database
const newsArticles = [
    {
        id: 1,
        title: "Major Data Breach Prevention Tips for 2025",
        summary: "Learn the top 10 ways to protect yourself from data breaches in 2025.",
        date: "February 9, 2025",
        category: "Privacy",
        readTime: "5 min",
        content: `
            <h2>Protecting Yourself from Data Breaches in 2025</h2>
            <p style="color: #64748b; font-size: 0.95em; margin-bottom: 24px;">Published: February 9, 2025 • 5 min read</p>
            
            <p>Data breaches continue to be one of the biggest threats to personal privacy and security. In 2024 alone, over 2,000 data breaches exposed billions of records. Here's how to protect yourself:</p>
            
            <h3>1. Use Unique Passwords Everywhere</h3>
            <p>The #1 rule: never reuse passwords. When one site gets breached, hackers immediately try those credentials on other popular sites. Use a password manager like Bitwarden, 1Password, or LastPass to generate and store unique passwords.</p>
            
            <h3>2. Enable Two-Factor Authentication (2FA)</h3>
            <p>2FA blocks 99.9% of automated attacks. Use authenticator apps (Google Authenticator, Authy) instead of SMS when possible, as SMS can be intercepted through SIM swapping attacks.</p>
            
            <h3>3. Monitor Your Accounts</h3>
            <p>Regularly check haveibeenpwned.com to see if your email addresses appear in known breaches. Set up account alerts for your banking and critical accounts.</p>
            
            <h3>4. Be Selective About What You Share</h3>
            <p>The less personal information you provide to services, the less can be stolen in a breach. Only provide what's absolutely necessary.</p>
            
            <h3>5. Use Credit Monitoring</h3>
            <p>Consider using a free credit monitoring service to alert you to new accounts or inquiries made in your name.</p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #0ea5e9; margin: 24px 0;">
                <strong style="color: #0c4a6e;">💡 Pro Tip:</strong>
                <p style="color: #075985; margin-top: 8px;">Set a quarterly calendar reminder to rotate your most important passwords and check for breaches.</p>
            </div>
            
            <h3>What to Do If You're in a Breach</h3>
            <ol style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li>Change your password immediately on the affected service</li>
                <li>Change passwords on any other sites where you used the same password</li>
                <li>Enable 2FA if not already active</li>
                <li>Monitor your accounts for suspicious activity</li>
                <li>Consider a credit freeze if SSN was exposed</li>
            </ol>
            
            <p style="margin-top: 24px;">Remember: you can't prevent all breaches, but you can minimize their impact by following these best practices.</p>
        `
    },
    {
        id: 2,
        title: "New Phishing Campaign Targeting Remote Workers",
        summary: "Security researchers discover sophisticated phishing attacks. Learn how to identify them.",
        date: "February 8, 2025",
        category: "Threats",
        readTime: "4 min",
        content: `
            <h2>Alert: Sophisticated Phishing Campaign Targets Remote Workers</h2>
            <p style="color: #64748b; font-size: 0.95em; margin-bottom: 24px;">Published: February 8, 2025 • 4 min read</p>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border: 2px solid #fca5a5; margin-bottom: 24px;">
                <strong style="color: #991b1b; font-size: 1.1em;">⚠️ Active Threat</strong>
                <p style="color: #991b1b; margin-top: 8px;">Cybersecurity researchers have identified a new wave of phishing attacks specifically targeting remote workers and distributed teams.</p>
            </div>
            
            <h3>The Attack Method</h3>
            <p>Attackers are sending emails that appear to come from:</p>
            <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li>HR departments announcing policy changes</li>
                <li>IT teams requesting software updates</li>
                <li>Collaboration tools (Slack, Teams, Zoom) with "urgent" notifications</li>
                <li>VPN providers claiming your credentials need verification</li>
            </ul>
            
            <h3>What Makes This Campaign Dangerous</h3>
            <p>Unlike typical phishing attempts, these emails are:</p>
            <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li><strong>Highly personalized</strong> - Using real employee names and internal terminology</li>
                <li><strong>Timing-aware</strong> - Sent during typical work hours to appear legitimate</li>
                <li><strong>Well-designed</strong> - Professional formatting matching corporate communications</li>
                <li><strong>Domain-spoofed</strong> - Using convincing lookalike domains (e.g., company-hr.com instead of company.com)</li>
            </ul>
            
            <h3>How to Protect Yourself</h3>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 10px; border-left: 4px solid #22c55e; margin: 24px 0;">
                <strong style="color: #166534;">✅ The S.T.O.P. Method</strong>
                <ul style="color: #166534; margin-top: 12px; line-height: 1.8; margin-left: 20px;">
                    <li><strong>Sender</strong> - Verify the email address is exactly correct</li>
                    <li><strong>Think</strong> - Does this request make sense?</li>
                    <li><strong>Observe</strong> - Look for red flags (urgency, threats, poor grammar)</li>
                    <li><strong>Protect</strong> - Verify through official channels before clicking</li>
                </ul>
            </div>
            
            <h3>Red Flags to Watch For</h3>
            <ol style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li>Unexpected requests for passwords or credentials</li>
                <li>Urgent language creating time pressure</li>
                <li>Links that don't match the supposed sender's domain</li>
                <li>Requests to download unfamiliar software</li>
                <li>Generic greetings instead of your name</li>
            </ol>
            
            <h3>If You Receive a Suspicious Email</h3>
            <ol style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li><strong>Don't click any links or download attachments</strong></li>
                <li>Contact the supposed sender through official channels (phone, in-person, verified email)</li>
                <li>Report it to your IT security team</li>
                <li>Delete the email</li>
            </ol>
            
            <p style="margin-top: 24px;"><strong>Remember:</strong> Legitimate companies will never ask for passwords via email. When in doubt, always verify through a different communication channel.</p>
        `
    },
    {
        id: 3,
        title: "Password Manager Comparison 2025",
        summary: "Which password manager is right for you? We compare the top options.",
        date: "February 7, 2025",
        category: "Tools",
        readTime: "8 min",
        content: `
            <h2>The Ultimate Password Manager Comparison for 2025</h2>
            <p style="color: #64748b; font-size: 0.95em; margin-bottom: 24px;">Published: February 7, 2025 • 8 min read</p>
            
            <p>Password managers are essential for modern digital security. Here's our comprehensive comparison of the best options in 2025.</p>
            
            <h3>🏆 Top Picks</h3>
            
            <div style="background: white; border: 2px solid #6366f1; border-radius: 12px; padding: 24px; margin: 20px 0;">
                <h4 style="color: #6366f1; margin-bottom: 12px;">1. Bitwarden - Best Overall Value</h4>
                <p><strong>Price:</strong> Free (Premium $10/year)</p>
                <p><strong>Platforms:</strong> All major platforms + browser extensions</p>
                
                <p style="margin-top: 12px;"><strong>Pros:</strong></p>
                <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                    <li>✅ Open source and audited</li>
                    <li>✅ Generous free tier</li>
                    <li>✅ Strong security features</li>
                    <li>✅ Self-hosting option available</li>
                </ul>
                
                <p><strong>Cons:</strong></p>
                <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                    <li>❌ UI less polished than competitors</li>
                    <li>❌ Fewer advanced features in free tier</li>
                </ul>
                
                <p style="margin-top: 12px;"><strong>Best for:</strong> Privacy-conscious users and those on a budget</p>
            </div>
            
            <div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 24px; margin: 20px 0;">
                <h4 style="color: #10b981; margin-bottom: 12px;">2. 1Password - Best User Experience</h4>
                <p><strong>Price:</strong> $2.99/month individual, $4.99/month families</p>
                <p><strong>Platforms:</strong> All major platforms + browser extensions</p>
                
                <p style="margin-top: 12px;"><strong>Pros:</strong></p>
                <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                    <li>✅ Beautiful, intuitive interface</li>
                    <li>✅ Excellent family sharing features</li>
                    <li>✅ Watchtower security alerts</li>
                    <li>✅ Travel Mode for border crossings</li>
                </ul>
                
                <p><strong>Cons:</strong></p>
                <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                    <li>❌ No free tier</li>
                    <li>❌ More expensive than alternatives</li>
                </ul>
                
                <p style="margin-top: 12px;"><strong>Best for:</strong> Families and those who value excellent UX</p>
            </div>
            
            <div style="background: white; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
                <h4 style="color: #f59e0b; margin-bottom: 12px;">3. LastPass - Most Features in Free Tier</h4>
                <p><strong>Price:</strong> Free (Premium $3/month)</p>
                <p><strong>Platforms:</strong> All major platforms + browser extensions</p>
                
                <p style="margin-top: 12px;"><strong>Pros:</strong></p>
                <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                    <li>✅ Comprehensive free tier</li>
                    <li>✅ Easy to use</li>
                    <li>✅ Built-in authenticator</li>
                    <li>✅ Emergency access feature</li>
                </ul>
                
                <p><strong>Cons:</strong></p>
                <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                    <li>❌ History of security incidents</li>
                    <li>❌ Free tier limited to one device type</li>
                </ul>
                
                <p style="margin-top: 12px;"><strong>Best for:</strong> Beginners who want an easy entry point</p>
            </div>
            
            <h3>Key Features to Compare</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background: #f1f5f9;">
                    <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Feature</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">Bitwarden</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">1Password</th>
                    <th style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">LastPass</th>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">Password Generator</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">✅</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">✅</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">✅</td>
                </tr>
                <tr style="background: #f8fafc;">
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">2FA Support</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">✅</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">✅</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">✅</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">Breach Monitoring</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">Premium</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">✅</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">✅</td>
                </tr>
                <tr style="background: #f8fafc;">
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">Family Sharing</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">$40/yr</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">$4.99/mo</td>
                    <td style="padding: 12px; text-align: center; border: 1px solid #e2e8f0;">$4/mo</td>
                </tr>
            </table>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #0ea5e9; margin: 24px 0;">
                <strong style="color: #0c4a6e;">💡 Our Recommendation</strong>
                <p style="color: #075985; margin-top: 8px;">
                    For most people, <strong>Bitwarden</strong> offers the best balance of security, features, and value. 
                    If you want the best user experience and don't mind paying, <strong>1Password</strong> is excellent. 
                    For beginners, <strong>LastPass</strong> free tier is a good starting point.
                </p>
            </div>
            
            <h3>Getting Started</h3>
            <ol style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li>Choose a password manager from the options above</li>
                <li>Create a strong master password (12+ characters, unique)</li>
                <li>Install the browser extension and mobile app</li>
                <li>Import your existing passwords</li>
                <li>Enable 2FA on your password manager account</li>
                <li>Start replacing weak passwords with strong, unique ones</li>
            </ol>
            
            <p style="margin-top: 24px;"><strong>Bottom line:</strong> Any password manager is better than no password manager. Choose one today and start protecting your accounts!</p>
        `
    },
    {
        id: 4,
        title: "VPN Guide: When You Need One and When You Don't",
        summary: "Understanding VPNs and making informed decisions about online privacy.",
        date: "February 6, 2025",
        category: "Privacy",
        readTime: "6 min",
        content: `
            <h2>VPN Guide: When You Actually Need One</h2>
            <p style="color: #64748b; font-size: 0.95em; margin-bottom: 24px;">Published: February 6, 2025 • 6 min read</p>
            
            <p>VPNs (Virtual Private Networks) are often marketed as essential security tools, but when do you actually need one? Let's cut through the hype.</p>
            
            <h3>✅ When You SHOULD Use a VPN</h3>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: #166534;">1. On Public WiFi</h4>
                <p style="color: #166534; margin-top: 8px;">
                    <strong>Critical!</strong> Coffee shops, airports, hotels - public WiFi is inherently insecure. Anyone on the network can potentially intercept your traffic. A VPN encrypts your connection, protecting your data from snoopers.
                </p>
            </div>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: #166534;">2. In Countries with Internet Censorship</h4>
                <p style="color: #166534; margin-top: 8px;">
                    VPNs can help bypass government censorship and access blocked content. However, be aware of local laws regarding VPN usage.
                </p>
            </div>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: #166534;">3. For Privacy from Your ISP</h4>
                <p style="color: #166534; margin-top: 8px;">
                    Your Internet Service Provider can see all your browsing activity. A VPN hides this from your ISP, though the VPN provider can now see it instead (choose trustworthy providers).
                </p>
            </div>
            
            <h3>❌ When You DON'T Need a VPN</h3>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: #991b1b;">1. For Banking</h4>
                <p style="color: #991b1b; margin-top: 8px;">
                    Banking sites use HTTPS encryption. A VPN may actually trigger fraud alerts. Use your home network for banking instead.
                </p>
            </div>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: #991b1b;">2. To "Stay Anonymous Online"</h4>
                <p style="color: #991b1b; margin-top: 8px;">
                    VPNs don't make you anonymous. Websites can still track you through cookies, browser fingerprinting, and account logins. For true anonymity, you need Tor.
                </p>
            </div>
            
            <h3>Choosing a VPN Provider</h3>
            
            <p><strong>Key factors to consider:</strong></p>
            <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li><strong>No-logs policy</strong> - Provider shouldn't record your activity</li>
                <li><strong>Jurisdiction</strong> - Based in privacy-friendly countries</li>
                <li><strong>Kill switch</strong> - Blocks internet if VPN disconnects</li>
                <li><strong>Speed</strong> - Should not significantly slow your connection</li>
                <li><strong>Price</strong> - Expect $3-10/month for quality service</li>
            </ul>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b; margin: 24px 0;">
                <strong style="color: #78350f;">⚠️ Avoid Free VPNs</strong>
                <p style="color: #92400e; margin-top: 8px;">
                    Free VPNs often sell your data, inject ads, or contain malware. If you're not paying for the product, YOU are the product. Stick with reputable paid services.
                </p>
            </div>
            
            <h3>Recommended VPN Services</h3>
            
            <ul style="line-height: 2; color: #475569; margin-left: 20px;">
                <li><strong>Mullvad</strong> - Most private, accepts cash, €5/month</li>
                <li><strong>ProtonVPN</strong> - Swiss-based, free tier available</li>
                <li><strong>NordVPN</strong> - Fast, reliable, $3-12/month</li>
            </ul>
            
            <p style="margin-top: 24px;"><strong>Bottom line:</strong> VPNs are valuable privacy tools for specific use cases, especially public WiFi. They're not magic security solutions or anonymity guarantees. Use them wisely!</p>
        `
    },
    {
        id: 5,
        title: "Ransomware: Prevention and Response Guide",
        summary: "Everything you need to know about protecting against ransomware attacks.",
        date: "February 5, 2025",
        category: "Threats",
        readTime: "7 min",
        content: `
            <h2>Ransomware: Complete Prevention & Response Guide</h2>
            <p style="color: #64748b; font-size: 0.95em; margin-bottom: 24px;">Published: February 5, 2025 • 7 min read</p>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border: 2px solid #fca5a5; margin-bottom: 24px;">
                <strong style="color: #991b1b; font-size: 1.1em;">⚠️ Growing Threat</strong>
                <p style="color: #991b1b; margin-top: 8px;">
                    Ransomware attacks increased 150% in 2024, with average ransom demands exceeding $2 million. Small businesses and individuals are increasingly targeted.
                </p>
            </div>
            
            <h3>What is Ransomware?</h3>
            <p>Ransomware is malware that encrypts all your files and demands payment (usually in cryptocurrency) to decrypt them. Victims face a terrible choice: pay the ransom (with no guarantee of file recovery) or lose all their data.</p>
            
            <h3>How Ransomware Spreads</h3>
            <ol style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li><strong>Phishing emails</strong> - Malicious attachments or links</li>
                <li><strong>Exploit kits</strong> - Targeting unpatched software vulnerabilities</li>
                <li><strong>Remote Desktop Protocol (RDP)</strong> - Weak or stolen credentials</li>
                <li><strong>Malicious downloads</strong> - Pirated software, fake updates</li>
                <li><strong>Supply chain attacks</strong> - Through compromised trusted software</li>
            </ol>
            
            <h3>🛡️ Prevention Strategies</h3>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: #166534;">1. The 3-2-1 Backup Rule</h4>
                <p style="color: #166534; margin-top: 8px;">
                    <strong>Most important defense!</strong>
                </p>
                <ul style="color: #166534; margin-left: 20px; line-height: 1.8; margin-top: 8px;">
                    <li><strong>3</strong> copies of your data</li>
                    <li><strong>2</strong> different storage media types</li>
                    <li><strong>1</strong> copy offsite (cloud or external drive stored elsewhere)</li>
                </ul>
                <p style="color: #166534; margin-top: 8px;">
                    Keep at least one backup offline - ransomware can encrypt network-connected backups too!
                </p>
            </div>
            
            <h4>2. Keep Software Updated</h4>
            <p>Enable automatic updates for:</p>
            <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li>Operating system (Windows, macOS, Linux)</li>
                <li>All applications and software</li>
                <li>Antivirus and security tools</li>
                <li>Browser and plugins</li>
            </ul>
            
            <h4>3. Use Strong Email Filtering</h4>
            <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li>Enable spam filters</li>
                <li>Never open suspicious attachments</li>
                <li>Verify sender addresses carefully</li>
                <li>Be wary of .zip, .exe, .scr file attachments</li>
            </ul>
            
            <h4>4. Implement Access Controls</h4>
            <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li>Use standard user accounts for daily tasks</li>
                <li>Only use admin accounts when necessary</li>
                <li>Implement principle of least privilege</li>
                <li>Disable macros in Office documents</li>
            </ul>
            
            <h3>🚨 If You're Infected</h3>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: #78350f;">Immediate Actions (First 5 Minutes)</h4>
                <ol style="color: #92400e; margin-left: 20px; line-height: 1.8; margin-top: 8px;">
                    <li><strong>Disconnect from internet immediately</strong> - Pull ethernet cable or disable WiFi</li>
                    <li><strong>Disconnect external drives</strong> - Unplug all USB drives, external hard drives</li>
                    <li><strong>Don't turn off the computer</strong> - You may lose decryption opportunities</li>
                    <li><strong>Take photos</strong> - Document the ransom note and any error messages</li>
                </ol>
            </div>
            
            <h4>Next Steps</h4>
            <ol style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li><strong>Identify the ransomware strain</strong> - Use ID Ransomware website</li>
                <li><strong>Check for decryptors</strong> - Visit NoMoreRansom.org for free decryption tools</li>
                <li><strong>Report to authorities</strong> - Contact FBI, local police, IC3.gov</li>
                <li><strong>Restore from backups</strong> - If you have clean backups</li>
                <li><strong>Consult professionals</strong> - Consider hiring incident response team</li>
            </ol>
            
            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #ef4444; margin: 24px 0;">
                <strong style="color: #991b1b;">❌ Should You Pay the Ransom?</strong>
                <p style="color: #991b1b; margin-top: 8px;">
                    <strong>Law enforcement and security experts strongly advise against paying:</strong>
                </p>
                <ul style="color: #991b1b; margin-left: 20px; line-height: 1.8; margin-top: 8px;">
                    <li>No guarantee files will be decrypted (40% don't get files back)</li>
                    <li>Funds criminal organizations</li>
                    <li>Makes you a target for future attacks</li>
                    <li>May be illegal in some jurisdictions</li>
                </ul>
            </div>
            
            <h3>For Businesses</h3>
            <ul style="line-height: 1.8; color: #475569; margin-left: 20px;">
                <li>Develop incident response plan</li>
                <li>Train employees on phishing recognition</li>
                <li>Segment networks to limit spread</li>
                <li>Consider cyber insurance</li>
                <li>Conduct regular security audits</li>
            </ul>
            
            <p style="margin-top: 24px;"><strong>Remember:</strong> The best defense against ransomware is prevention. Regular, offline backups are your insurance policy!</p>
        `
    }
];

// Populate news feed
function populateNews() {
    const newsFeed = document.getElementById('newsFeed');
    if (!newsFeed) return;
    
    // Show first 3 articles initially
    const articlesToShow = newsArticles.slice(0, 3);
    
    newsFeed.innerHTML = articlesToShow.map(article => `
        <div class="news-item" onclick="openNewsArticle(${article.id})" style="cursor: pointer;" tabindex="0" role="button" onkeypress="if(event.key==='Enter') openNewsArticle(${article.id})">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <span style="background: #e0f2fe; color: #0c4a6e; padding: 4px 12px; border-radius: 6px; font-size: 0.75em; font-weight: 700; text-transform: uppercase;">${article.category}</span>
                <span style="color: #94a3b8; font-size: 0.85em;">${article.readTime}</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                <span style="color: #94a3b8; font-size: 0.85em;">${article.date}</span>
                <span class="news-link">Read more →</span>
            </div>
        </div>
    `).join('');
}

// Load more news
let newsDisplayCount = 3;
function loadMoreNews() {
    newsDisplayCount += 2;
    const newsFeed = document.getElementById('newsFeed');
    if (!newsFeed) return;
    
    const articlesToShow = newsArticles.slice(0, Math.min(newsDisplayCount, newsArticles.length));
    
    newsFeed.innerHTML = articlesToShow.map(article => `
        <div class="news-item" onclick="openNewsArticle(${article.id})" style="cursor: pointer;" tabindex="0" role="button" onkeypress="if(event.key==='Enter') openNewsArticle(${article.id})">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <span style="background: #e0f2fe; color: #0c4a6e; padding: 4px 12px; border-radius: 6px; font-size: 0.75em; font-weight: 700; text-transform: uppercase;">${article.category}</span>
                <span style="color: #94a3b8; font-size: 0.85em;">${article.readTime}</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                <span style="color: #94a3b8; font-size: 0.85em;">${article.date}</span>
                <span class="news-link">Read more →</span>
            </div>
        </div>
    `).join('');
    
    // Hide button if all articles are shown
    if (newsDisplayCount >= newsArticles.length) {
        const button = document.querySelector('button[onclick="loadMoreNews()"]');
        if (button) {
            button.style.display = 'none';
        }
    }
}

// Open news article
function openNewsArticle(articleId) {
    const article = newsArticles.find(a => a.id === articleId);
    if (!article) return;
    
    const modal = document.getElementById('newsModal');
    const content = document.getElementById('newsContent');
    
    content.innerHTML = `
        <div style="margin-bottom: 24px;">
            <span style="background: #e0f2fe; color: #0c4a6e; padding: 6px 14px; border-radius: 6px; font-size: 0.85em; font-weight: 700; text-transform: uppercase;">${article.category}</span>
        </div>
        ${article.content}
        <div style="margin-top: 40px; padding-top: 24px; border-top: 2px solid #f1f5f9; text-align: center;">
            <button class="btn" onclick="closeNews()" style="padding: 12px 32px;">
                ← Back to News
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    modal.querySelector('button').focus();
}

// Close news article
function closeNews() {
    const modal = document.getElementById('newsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
