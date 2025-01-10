document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const generateButton = document.getElementById('generate-calendar');
    generateButton.addEventListener('click', generateCalendar);

    function generateCalendar() {
        const year = document.getElementById('year').value;
        const month = document.getElementById('month').value;
        calendar.innerHTML = ''; // Clear previous calendar

        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDay = new Date(year, month - 1, 1).getDay();

        // Create empty slots for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'date empty';
            calendar.appendChild(emptyDiv);
        }

        // Create slots for each day of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'date';
            dateDiv.textContent = i;
            dateDiv.addEventListener('click', function() {
                const date = `${year}-${month.padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
                window.location.href = `homework.html?date=${date}`;
            });
            applyFont(dateDiv);
            calendar.appendChild(dateDiv);
        }
    }
});

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
