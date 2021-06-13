// DOM Elements
const time = document.getElementById('time'), 
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

const showAmPm = true;
// Show time
function showTime() {
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    //Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    // Output time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}
    ${showAmPm ? amPm : ''}`;

    // Every second, update the time via calling this function
    setTimeout(showTime, 1000);
}

// Add zeros to seconds when turning from 59 to 0
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set background and greeting
function setBackgroundGreeting() {
    let today = new Date(), 
    hour = today.getHours();
    
    if(hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('../assets/img/morning.jpg')";
        greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('../assets/img/afternoon.jpg')";
        greeting.textContent = 'Good Afternoon';
        document.body.style.color = 'white';
    } else {
        // Night/Evening
        document.body.style.backgroundImage = "url('../assets/img/night.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white';
    }
}

// Set name
function setName(event) {
    if(event.type === 'keypress') {
        if(event.which == 13 || event.keyCode == 13) {
            localStorage.setItem('name', event.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', event.target.innerText);
    }
}

function setFocus(event) {
    if(event.type === 'keypress') {
        if(event.which == 13 || event.keyCode == 13) {
            localStorage.setItem('focus', event.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', event.target.innerText);
    }
}

// Get name
function getName() {
    if(localStorage.getItem('name') === null) {
        name.textContent = '[Enter name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Get focus
function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter focus for today]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//Update name and focus
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
setBackgroundGreeting();
getName();
getFocus();