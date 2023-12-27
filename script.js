document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "What is the purpose of the 'traceroute' command in Linux?",
            a: "Display system routes",
            b: "Identify network latency",
            c: "Trace file modifications",
            d: "Execute remote scripts",
            correct: "b",
            explanation: "'traceroute' is used to trace the route that packets take to reach a destination, helping identify network latency.",
          },
          {
            question: "In Windows Server, what is the purpose of the Active Directory Schema?",
            a: "Manage user passwords",
            b: "Define data structure",
            c: "Monitor network traffic",
            d: "Install server roles",
            correct: "b",
            explanation: "The Active Directory Schema defines the structure and attributes of objects in the directory.",
          },
          {
            question: "Which Linux command is used to schedule recurring tasks at specified intervals?",
            a: "cron",
            b: "task",
            c: "schedule",
            d: "plan",
            correct: "a",
            explanation: "'cron' is a time-based job scheduler in Unix-like operating systems.",
          },
          {
            question: "What is the purpose of the 'ipconfig' command in Windows?",
            a: "Display network configuration",
            b: "Install new network adapters",
            c: "Configure IP addresses",
            d: "Check internet speed",
            correct: "a",
            explanation: "'ipconfig' is used to display the IP configuration for all network interfaces on a Windows system.",
          },
          {
            question: "In Linux, what command is used to find the size of a directory and its contents?",
            a: "sizedir",
            b: "dirsize",
            c: "du",
            d: "sized",
            correct: "c",
            explanation: "'du' (disk usage) displays the sizes of directories and their contents in Linux.",
          },
          {
            question: "What is the purpose of the Windows Task Manager in system administration?",
            a: "Install software updates",
            b: "Monitor system performance",
            c: "Manage user accounts",
            d: "Configure network settings",
            correct: "b",
            explanation: "Task Manager is used to monitor and manage the performance of a Windows system.",
          },
          {
            question: "Which RAID level provides fault tolerance by dedicating a parity disk?",
            a: "RAID 0",
            b: "RAID 1",
            c: "RAID 5",
            d: "RAID 6",
            correct: "c",
            explanation: "RAID 5 uses parity information to provide fault tolerance.",
          },
          {
            question: "In Linux, how can you search for a specific text string within files in a directory and its subdirectories?",
            a: "grep -r",
            b: "findstring",
            c: "searchtext -d",
            d: "textgrep -s",
            correct: "a",
            explanation: "'grep -r' recursively searches for a text string in files within a directory and its subdirectories.",
          },
          {
            question: "What is the purpose of the Windows Registry in system administration?",
            a: "Manage user profiles",
            b: "Store system configuration",
            c: "Install device drivers",
            d: "Configure network protocols",
            correct: "b",
            explanation: "The Windows Registry stores configuration settings and options for the operating system and applications.",
          },
          {
            question: "In Linux, what command is used to change the ownership of a file or directory?",
            a: "own",
            b: "chown",
            c: "changeowner",
            d: "fileown",
            correct: "b",
            explanation: "'chown' is used to change the ownership of a file or directory in Linux.",
          },
          // Add more questions here if needed...
  
    ];
    const quiz = document.getElementById('quiz');
    const answerEls = document.querySelectorAll('.answer');
    const questionEl = document.getElementById('question');
    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');
    const submitBtn = document.getElementById('submit');
    const resultsDiv = document.getElementById('quiz-results');

    let currentQuiz = 0;
    let score = 0;
    const startTimestamp = new Date().getTime();

    loadQuiz();

    function loadQuiz() {
        deselectAnswers();
    
        const currentQuizData = quizData[currentQuiz];
    
        questionEl.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;
    
        if (currentQuiz === quizData.length - 1) {
            submitBtn.innerText = 'Submit Quiz';
            submitBtn.removeEventListener('click', loadNextQuestion); // Remove the previous event listener
            submitBtn.addEventListener('click', submitLastQuestion); // Add the correct event listener
        } else {
            submitBtn.innerText = 'Submit';
            submitBtn.removeEventListener('click', submitLastQuestion); // Remove the previous event listener
            submitBtn.addEventListener('click', loadNextQuestion); // Add the correct event listener
        }
    }

    


    function submitLastQuestion() {
        const answer = getSelected();
    
        if (answer) {
            if (answer === quizData[currentQuiz].correct) {
                score++;
            }
    
            showResults(); // Call showResults directly
        }
    }
    

    function loadNextQuestion() {
        const answer = getSelected();

        if (answer) {
            if (answer === quizData[currentQuiz].correct) {
                score++;
            }

            currentQuiz++;

            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                showResults();
            }
        }
    }


    function showResults() {
        const endTimestamp = new Date().getTime();
        const timeTaken = (endTimestamp - startTimestamp) / 1000; // in seconds
    
        const name = document.getElementById('name').value;
        const rollNumber = document.getElementById('rollNumber').value;
    
        // Save data for result.html
        localStorage.setItem('name', name);
        localStorage.setItem('rollNumber', rollNumber);
        localStorage.setItem('questionsAttempted', quizData.length);
        localStorage.setItem('correctAnswers', score);
        localStorage.setItem('wrongAnswers', quizData.length - score);
        localStorage.setItem('percentage', ((score / quizData.length) * 100).toFixed(2));
        localStorage.setItem('timeTaken', timeTaken);
    
        // Redirect to result.html
        location.href = 'result.html';

        const resultData = {
          name,
          rollNumber,
          questionsAttempted: quizData.length,
          correctAnswers: score,
          wrongAnswers: quizData.length - score,
          percentage: ((score / quizData.length) * 100).toFixed(2),
          timeTaken
      };
  
      // Convert resultData to XML or plain text
      const resultXml = convertToXml(resultData);
      // You can also use a plain text format if preferred
  
      // Save the data to a file and prompt the user to download it
      saveToFile(resultXml, 'quiz-results.xml');
  
    }
    
    function convertToXml(resultData) {
      // Implement your logic to convert the resultData object to XML
      // For simplicity, you can use a library like xmlbuilder or construct it manually
      // Example using xmlbuilder:
      const xmlBuilder = require('xmlbuilder');
      const xml = xmlBuilder.create('QuizResult')
          .ele('Name', resultData.name)
          .ele('RollNumber', resultData.rollNumber)
          .ele('QuestionsAttempted', resultData.questionsAttempted)
          .ele('CorrectAnswers', resultData.correctAnswers)
          .ele('WrongAnswers', resultData.wrongAnswers)
          .ele('Percentage', resultData.percentage)
          .ele('TimeTaken', resultData.timeTaken)
          .end({ pretty: true });
  
      return xml;
  }
  
  function saveToFile(data, fileName) {
    const blob = new Blob([data], { type: 'application/xml' });

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Append the link to the DOM (hidden)
    link.style.display = 'none';
    document.body.appendChild(link);

    // Trigger a click event on the link to initiate the download
    link.click();

    // Remove the link from the DOM after a short delay
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    }, 100);
}


    function deselectAnswers() {
        answerEls.forEach(answerEl => answerEl.checked = false);
    }

    function getSelected() {
        let answer;

        answerEls.forEach(answerEl => {
            if (answerEl.checked) {
                answer = answerEl.id;
            }
        });

        return answer;
    }
});

