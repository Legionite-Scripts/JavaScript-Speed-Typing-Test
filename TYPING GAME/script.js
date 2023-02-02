let start = function() {
  //Start function to begin the entire process
  document.getElementById("startButton").innerHTML = "Try Again";
  //Js code starts here
  const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span");
  wpmTag = document.querySelector(".wpm span");
  cpmTag = document.querySelector(".cpm span");

  let timer,
    maxTime = 120;
  (timeLeft = maxTime), (charIndex = mistakes = isTyping = 0);

  function randomParagraph() {
    //Code to get a random number which is always less then the paragraph's length.
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    //This is for getting random items from the array and splitting all characters
    paragraphs[randIndex].split("").forEach(span => {
      let spanTag = `<span>${span}</span>`;
      typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    //focusing on input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
  }
  function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
      if (!isTyping) {
        //This if statement is to set the timer once, so it wont activate on every single key clicked or entered by the user
        timer = setInterval(initTimer, 1000);
        isTyping = true;
      }

      //If the user hasn't entered any character or pressed backspace
      if (typedChar == null) {
        charIndex--; // charIndex decrement

        //decrement of mistakes only takes place if the charIndex contains the incorrect class
        if (characters[charIndex].classList.contains("incorrect")) {
          // mistakes--;
          //This if statement is to decrease the number of mistakes counted if the user clicks backspace
        }

        characters[charIndex].classList.remove("correct", "incorrect");
      } else {
        if (characters[charIndex].innerText === typedChar) {
          //if user typed character and shown character matches,then add the correct class else add the incorrect class
          characters[charIndex].classList.add("correct");
        } else {
          mistakes++;
          characters[charIndex].classList.add("incorrect");
        }
        charIndex++; //increment the character index either user typed correct or incorrect character
      }

      characters.forEach(span => span.classList.remove("active"));
      characters[charIndex].classList.add("active");

      //To get words per minute(WPM),first,subtracting total mistakes from the total typed characters then dividing it by 5 and again dividing this+
      //output by subtracting timeLeft from maxTime and last multiplying the output by 60.
      let wpm = Math.round(
        (charIndex - mistakes) / 5 / (maxTime - timeLeft) * 60
      );
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm; // if wpm value is 0,empty or infinity,set its value to 0
      mistakeTag.innerText = mistakes;
      wpmTag.innerText = wpm;
      cpmTag.innerText = charIndex - mistakes; //The cpm will not count mistakes
    } else {
      inpField.value = "";
      clearInterval(timer);
    }
  }
  function initTimer() {
    //If timeLeft is greater than 0 decrement the timeLeft else clear the interval(Which is the timer in this case)
    if (timeLeft > 0) {
      timeLeft--;
      timeTag.innerText = timeLeft;
    } else if(timeLeft == 0){
      clearInterval(timer);
      document.getElementById("mistakeDisplayText").innerHTML = "Your total number of mistakes are "+mistakes;
      document.getElementById("wpmDisplayText").innerHTML = "Your average words are "+wpmTag.innerText;
      document.getElementById("cpmDisplayText").innerHTML = "Number of correct letters you typed are "+cpmTag.innerText;
      
        //     "\nNumber of correct letters you typed are "+cpmTag.innerText;
        //     mistakes +
        // confirm(
        //   "Time Up!\nYour total number of mistakes are " +
        //     mistakes +
        //     "\nYour average words per minute are " +
        //     wpmTag.innerText +
        //     "\nNumber of correct letters you typed are "+cpmTag.innerText);
        
    }

    // if(timeLeft === 0){

    // }
  }

  randomParagraph();

  inpField.addEventListener("input", initTyping); //add event listener for the input field
};
let refresh = function() {
  location.reload(); // Reload button to refresh the browser for new array generation
};
//Js code ends here
