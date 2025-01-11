document.getElementById('homeworkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dueDate = document.getElementById('dueDate').value;
    const subject = document.getElementById('subject').value;
    const homework = document.getElementById('homework').value;
    saveHomework(dueDate, subject, homework);
});

function saveHomework(date, subject, homework) {
    const [year, month, day] = date.split('-');
    const homeworkRef = firebase.database().ref(`${year}/${month}/${day}`);
    homeworkRef.once('value', (snapshot) => {
        const homeworkData = snapshot.val() || {};
        const homeworkKey = `${subject} homework ${Object.keys(homeworkData).length + 1}`;
        homeworkData[homeworkKey] = homework;
        homeworkRef.set(homeworkData)
            .then(() => {
                alert('Homework added successfully');
                displayHomeworkList();
            })
            .catch((error) => {
                console.error('Failed to add homework:', error);
                alert('Failed to add homework: ' + error.message);
            });
    });
}

function displayHomeworkList() {
    const homeworkListDiv = document.getElementById('homeworkList');
    homeworkListDiv.innerHTML = '';

    const homeworkRef = firebase.database().ref();
    homeworkRef.on('value', (snapshot) => {
        const homeworkList = snapshot.val();
        if (homeworkList) {
            for (const year in homeworkList) {
                for (const month in homeworkList[year]) {
                    for (const day in homeworkList[year][month]) {
                        const date = `${year}/${month}/${day}`;
                        for (const key in homeworkList[year][month][day]) {
                            const dateDiv = document.createElement('div');
                            dateDiv.innerHTML = `${date} - ${key}: ${homeworkList[year][month][day][key]}`;
                            applyFont(dateDiv);
                            const deleteButton = document.createElement('button');
                            deleteButton.textContent = 'Delete';
                            deleteButton.className = 'btn btn-danger btn-sm ml-2';
                            deleteButton.addEventListener('click', function() {
                                deleteHomework(year, month, day, key);
                            });
                            dateDiv.appendChild(deleteButton);
                            homeworkListDiv.appendChild(dateDiv);
                        }
                    }
                }
            }
        } else {
            homeworkListDiv.textContent = 'No homework available';
        }
    });
}

function deleteHomework(year, month, day, key) {
    const homeworkRef = firebase.database().ref(`${year}/${month}/${day}/${key}`);
    homeworkRef.remove()
        .then(() => {
            alert('Homework deleted successfully');
            displayHomeworkList();
        })
        .catch((error) => {
            console.error('Failed to delete homework:', error);
            alert('Failed to delete homework: ' + error.message);
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

document.addEventListener('DOMContentLoaded', displayHomeworkList);