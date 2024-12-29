// Check authentication
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'user-login.html';
}

// Show welcome popup if profile is not completed
const userProfile = JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || null;
if (!userProfile) {
    document.getElementById('welcomePopup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('welcomePopup').classList.add('hidden');
}

function showProfile() {
    document.getElementById('profileSection').classList.remove('hidden');
    document.getElementById('symptomSection').classList.add('hidden');
    
    // Load existing profile data
    if (userProfile) {
        document.getElementById('fullName').value = userProfile.fullName || '';
        document.getElementById('age').value = userProfile.age || '';
        document.getElementById('gender').value = userProfile.gender || '';
        document.getElementById('medicalHistory').value = userProfile.medicalHistory || '';
    }
}

function showSymptomChecker() {
    // if (!userProfile) {
        // alert('Please complete your profile first!');
        // showProfile();
        // return;
    // }
    document.getElementById('profileSection').classList.add('hidden');
    document.getElementById('symptomSection').classList.remove('hidden');
}

function saveProfile(event) {
    event.preventDefault();
    
    const profile = {
        fullName: document.getElementById('fullName').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        medicalHistory: document.getElementById('medicalHistory').value
    };
    
    localStorage.setItem(`profile_${currentUser}`, JSON.stringify(profile));
    alert('Profile saved successfully!');
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Simple symptom checker logic
const symptoms = {
    fever: {
        diseases: ['Common Cold', 'Flu'],
        precautions: [
            'Rest well',
            'Stay hydrated',
            'Take temperature regularly',
            'Consult doctor if fever persists'
        ]
    },
    cough: {
        diseases: ['Common Cold', 'Bronchitis', 'Asthma'],
        precautions: [
            'Stay warm',
            'Drink warm fluids',
            'Use honey for soothing throat',
            'Avoid irritants'
        ]
    },
    headache: {
        diseases: ['Migraine', 'Tension Headache', 'Sinusitis'],
        precautions: [
            'Rest in a quiet, dark room',
            'Stay hydrated',
            'Practice stress management',
            'Consider over-the-counter pain relievers'
        ]
    },
    fatigue: {
        diseases: ['Anemia', 'Depression', 'Chronic Fatigue Syndrome'],
        precautions: [
            'Get adequate sleep',
            'Maintain a balanced diet',
            'Exercise moderately',
            'Manage stress levels'
        ]
    }
    
    
};

function checkSymptoms(event) {
    event.preventDefault();
    
    const checkedSymptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked'))
        .map(input => input.value);
    
    if (checkedSymptoms.length === 0) {
        alert('Please select at least one symptom');
        return false;
    }
    
    const results = {
        diseases: new Set(),
        precautions: new Set()
    };
    
    checkedSymptoms.forEach(symptom => {
        symptoms[symptom].diseases.forEach(disease => results.diseases.add(disease));
        symptoms[symptom].precautions.forEach(precaution => results.precautions.add(precaution));
    });
    
    const resultHTML = `
        <div class="result-section">
            <h4>Possible Conditions:</h4>
            <ul>
                ${Array.from(results.diseases).map(disease => `<li>${disease}</li>`).join('')}
            </ul>
            <h4>Recommended Precautions:</h4>
            <ul>
                ${Array.from(results.precautions).map(precaution => `<li>${precaution}</li>`).join('')}
            </ul>
            <p class="disclaimer">Note: This is a basic symptom checker. Please consult a healthcare professional for accurate diagnosis.</p>
        </div>
    `;
    
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('resultContent').innerHTML = resultHTML;
    
    return false;
}