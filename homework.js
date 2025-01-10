document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const date = params.get('date');
    fetchHomework(date);
});

function fetchHomework(date) {
    const [year, month, day] = date.split('-');
    const homeworkRef = firebase.database().ref(`${year}/${month}/${day}`);
    homeworkRef.on('value', (snapshot) => {
        const homeworkData = snapshot.val();
        const homeworkDetailsDiv = document.getElementById('homeworkDetails');
        homeworkDetailsDiv.innerHTML = ''; // Clear previous homework details
        if (homeworkData) {
            for (const key in homeworkData) {
                const homeworkDiv = document.createElement('div');
                homeworkDiv.innerHTML = `${key}: ${homeworkData[key]}`;
                applyFont(homeworkDiv);
                homeworkDetailsDiv.appendChild(homeworkDiv);
            }
        } else {
            homeworkDetailsDiv.textContent = 'No homework due on that day';
        }
    });
}

function applyFont(element) {
    const text = element.innerHTML;
    const chineseRegex = /[\u4e00-\u9fa5]/;
    const englishRegex = /[a-zA-Z]/;
    element.innerHTML = text.split('').map(char => {
        if (chineseRegex.test(char)) {
            return `<span style="font-family: 'Noto Sans TC', sans-serif;">${char}</span>`;
        } else if (englishRegex.test(char)) {
            return `<span style="font-family: 'Funnel Display', serif;">${char}</span>`;
        } else {
            return char;
        }
    }).join('');
}