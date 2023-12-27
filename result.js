

document.addEventListener('DOMContentLoaded', function () {
    const nameElement = document.getElementById('result-name');
    const rollNumberElement = document.getElementById('result-rollNumber');
    const questionsAttemptedElement = document.getElementById('result-questionsAttempted');
    const correctAnswersElement = document.getElementById('result-correctAnswers');
    const wrongAnswersElement = document.getElementById('result-wrongAnswers');
    const percentageElement = document.getElementById('result-percentage');
    const timeTakenElement = document.getElementById('result-timeTaken');
    const explanationsElement = document.getElementById('result-explanations');
    const explanationBox = document.getElementById('explanation-box');

    const name = localStorage.getItem('name');
    const rollNumber = localStorage.getItem('rollNumber');
    const questionsAttempted = localStorage.getItem('questionsAttempted');
    const correctAnswers = localStorage.getItem('correctAnswers');
    const wrongAnswers = localStorage.getItem('wrongAnswers');
    const percentage = localStorage.getItem('percentage');
    const timeTaken = localStorage.getItem('timeTaken');

    nameElement.innerText = name;
    rollNumberElement.innerText = rollNumber;
    questionsAttemptedElement.innerText = questionsAttempted;
    correctAnswersElement.innerText = correctAnswers;
    wrongAnswersElement.innerText = wrongAnswers;
    percentageElement.innerText = percentage;
    timeTakenElement.innerText = timeTaken;

// Display explanations
const explanations = [
    "'traceroute' is used to trace the route that packets take to reach a destination, helping identify network latency.",
    "The Active Directory Schema defines the structure and attributes of objects in the directory.",
    "'cron' is a time-based job scheduler in Unix-like operating systems.",
    "'ipconfig' is used to display the IP configuration for all network interfaces on a Windows system.",
    "'du' (disk usage) displays the sizes of directories and their contents in Linux.",
    "Task Manager is used to monitor and manage the performance of a Windows system.",
    "RAID 5 uses parity information to provide fault tolerance.",
    "'grep -r' recursively searches for a text string in files within a directory and its subdirectories.",
    "The Windows Registry stores configuration settings and options for the operating system and applications.",
    "'chown' is used to change the ownership of a file or directory in Linux.",
    // Add more explanations here if needed...
  ];

    explanationsElement.innerHTML = explanations.map((explanation, index) => `<li>${explanation}</li>`).join('');
    
    // Check if explanations are available and show/hide the explanation box
    if (explanations.length > 0) {
        explanationBox.style.display = 'block';
    } else {
        explanationBox.style.display = 'none';
    }
});