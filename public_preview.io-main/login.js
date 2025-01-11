document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const passcode = document.getElementById('passcode').value;
        checkPasscode(passcode);
    });
});

function checkPasscode(passcode) {
    const validPasscode = 'this_is_The_pw'; // 更改密碼
    if (passcode === validPasscode) {
        alert('Login successful');
        window.location.href = 'admin.html';
    } else {
        alert('Invalid passcode');
    }
}