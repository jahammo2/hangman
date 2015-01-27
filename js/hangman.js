//////////////////////////////////////////////////////////////
/////// THE GAME ITSELF ///////
//////////////////////////////////////////////////////////////

var hangmanWords = [
  "the","of","and","a","to","in","is","you","that","it","he",
  "was","for","on","are","as","with","his","they","i","at","be",
  "this","have","from","or","one","had","by","word","but","not",
  "what","all","were","we","when","your","can","said","there",
  "use","an","each","which","she","do","how","their","if","will",
  "up","other","about","out","many","then","them","these","so",
  "some","her","would","make","like","him","into","time","has",
  "look","two","more","write","go","see","number","no","way",
  "could","people","my","than","first","water","been","call",
  "who","oil","its","now","find","long","down","day","did","get",
  "come","made","may","part"
];

//////////////////////////////////////////////////////////////
/////// DECLARED VARIABLES ///////
//////////////////////////////////////////////////////////////

var randomNumber = Math.floor(Math.random() * 100);
var randomWord = hangmanWords[randomNumber];
var underscoreCount = randomWord.length;
var underscoreArr = [];
var counter = randomWord.length;
var numberTest = 0;
var lettersGuessedArr = [];
var correctLetters = []
var sortCorrectLetters = correctLetters.sort();

///////////////////// GENERAL QUERY SELECTORS ////////////////////////////////

var lettersGuessedClass = document.querySelector('.letters-guessed');
var li = document.getElementsByClassName('letter');
var textValue = document.querySelector('.text-value');
var attemptTitle = document.querySelector('.attempt-number');
var hangmanWordClass = document.querySelector('.hangman-word');
var hangmanLettersClass = document.querySelector('.hangman-letters');
var beginStatementClass = document.querySelector('.begin-statement');
var arrowClass = document.querySelector('.arrow-div');
var checkboxWin = document.querySelector('.win-checkbox');
var checkboxLose = document.querySelector('.lose-checkbox');

///////////////////// HANGMAN FIGURE ////////////////////////////////

var stringOverlayClass = document.querySelector('.individual-string-overlay');
var stringClass = document.querySelector('.individual-string');
var deadmanOverlayClass = document.querySelector('.deadman-overlay');
var hideEyes = document.querySelector('.hide-eyes');
var hideFace = document.querySelector('.hide-face');
var hideBodyRightArm = document.querySelector('.hide-body-rightarm');
var hideLeftArm =  document.querySelector('.hide-leftarm');
var hideHipsLeftLeg = document.querySelector('.hide-hips-leftleg');
var hideRightLeg = document.querySelector('.hide-rightleg');

//////////////////////////////////////////////////////////////
/////// GAME ACTIONS ///////
//////////////////////////////////////////////////////////////

attemptTitle.innerHTML = counter;
console.log(randomWord);

for (i=0;i<underscoreCount;i+=1) {
  underscoreArr.push("_ ");
  underscoreArr.join(" ");
  var underscoreArrString = underscoreArr.toString();
  var underscoreArrEdited = underscoreArrString.replace(/,/g," ");
  hangmanLettersClass.innerHTML = underscoreArrEdited;
}

function setGuess(guess) {
  personGuess = guess;
  personGuess = guess.toLowerCase();
}

function pushGuess () {
  lettersGuessedArr.push(personGuess);
  var lettersGuessedArrString = lettersGuessedArr.toString();
  var lettersGuessedArrEdited = lettersGuessedArrString.replace(/,/g," ");
  lettersGuessedClass.innerHTML = lettersGuessedArrEdited;
}

function RepeatedLettersAddToGuess () {
for (var i = 0; i < correctLetters.length - 1; i++) {
    if (sortCorrectLetters[i + 1] == sortCorrectLetters[i]) {
        pushGuess();
    }
  }
}

// function pushCorrectLetter () {
//   // for (var i=0;i<randomWord.length;i+=1) {
//     if (personGuess !== correctLetters[i]) {
//               correctLetters.push(randomWord[i]);
//     }
//   // };
// }

function checkGuess() {
  for (var i=0;i<randomWord.length;i+=1) {
    if (personGuess === randomWord[i]) {
        // pushCorrectLetter();
        correctLetters.push(randomWord[i]);
        console.log(correctLetters);
        console.log(personGuess);
        li[i].textContent = randomWord[i];
        textValue.value= "";
        counter += 1;
        RepeatedLettersAddToGuess();
        begin();
        win();
    } else if ((randomWord.length - 1) > i ) {
        console.log("works");
    } else {
        pushGuess();
        counter -= 1;
        attemptTitle.innerHTML = counter;
        textValue.value= "";
        begin();
        bodyPartAppear()
        lose();
    };
  };
};

///////////////////// WIN/LOSE ////////////////////////////////

function win () {
  if (correctLetters.length === randomWord.length) {
      checkboxWin.checked = true;
  };
};

function lose () {
  if (counter === 0) {
      checkboxLose.checked = true;
      console.log("test");
      displayWord();
  };
};

function displayWord () {
  for (var i=0;i<randomWord.length;i+=1) {
    li[i].textContent = randomWord[i];
  };
}

//////////////////////////////////////////////////////////////
/////// HIDING THE STICK FIGURE ///////
//////////////////////////////////////////////////////////////

function hide (element) {
  element.style.opacity = "0";
  element.style.transition = ".3s ease-in"
}

function show (element) {
  element.style.opacity = "1";
  element.style.transition = ".3s ease-in"
}

function begin () {
  hide(beginStatementClass);
  hide(stringClass);
  hide(deadmanOverlayClass);
  show(stringOverlayClass);
  show(hideEyes);
  show(hideFace);
  show(hideBodyRightArm);
  show(hideLeftArm);
  show(hideHipsLeftLeg);
  show(hideRightLeg);
  hide(arrowClass);
}

function hideAll () {
  hide(hideEyes);
  show(stringClass);
  show(deadmanOverlayClass);
  hide(stringOverlayClass);
  hide(hideRightLeg);
  hide(hideHipsLeftLeg);
  hide(hideLeftArm);
  hide(hideBodyRightArm);
  hide(hideFace);  
}

function hideBody () {
  hide(hideRightLeg);
  hide(hideHipsLeftLeg);
  hide(hideLeftArm);
  hide(hideBodyRightArm);
  hide(hideFace);  
}

function hideArmsFace () {
  hide(hideLeftArm);
  hide(hideBodyRightArm);
  hide(hideFace);  
}


function bodyPartAppear () {

  function bodyPartAppearSixLetters () {
  if (counter === 5) {
    hide(hideFace);
  } else if (counter === 4) {
    hide(hideBodyRightArm);
    hide(hideFace);
  } else if (counter === 3) {
    hideArmsFace();   
  } else if (counter === 2) {
    hide(hideRightLeg);
    hide(hideLeftArm);
    hide(hideBodyRightArm);
    hide(hideFace);   
  } else if (counter === 1) {
    hideBody()
  } else if (counter === 0) {
    hideAll();
  }
}

function bodyPartAppearFiveLetters () {
  if (counter === 4) {
      hide(hideFace);
    } else if (counter === 3) {
      hide(hideBodyRightArm);
      hide(hideFace);
    } else if (counter === 2) {
      hideArmsFace();    
    } else if (counter === 1) {
      hideBody()
    } else if (counter === 0) {
      hideAll();
    }
  }

  function bodyPartAppearFourLetters () {
    if (counter === 3) {
      hide(hideFace);
    } else if (counter === 2) {
      hideArmsFace();    
    } else if (counter === 1) {
      hideBody()
    } else if (counter === 0) {
      hideAll();
    }
  }

  function bodyPartAppearThreeLetters () {
    if (counter === 2) {
      hide(hideFace);
    } else if (counter === 1) {
      hideBody()
    } else if (counter === 0) {
      hideAll();
    }
  }

  function bodyPartAppearTwoLetters () {
    if (counter === 1) {
      hide(hideFace);
    } else if (counter === 0) {
      hideAll();
    }
  }

  function bodyPartAppearOneLetter () {
    if (counter === 0) {
      hideAll();
    }
  }


  if (randomWord.length === 6) {
    bodyPartAppearSixLetters()
  } else if (randomWord.length === 5) {
    bodyPartAppearFiveLetters()
  } else if (randomWord.length === 4) {
    bodyPartAppearFourLetters()
  } else if (randomWord.length === 3) {
    bodyPartAppearThreeLetters()
  } else if (randomWord.length === 2) {
    bodyPartAppearTwoLetters()
  } else if (randomWord.length === 1) {
    bodyPartAppearOneLetter()
  }; 

};

//////////////////////////////////////////////////////////////
/////// EXTRA JAVASCRIPT FOR ANIMATIONS AND STUFF ///////
//////////////////////////////////////////////////////////////



// function bodyPartAppearSixLetters () {
//   if (counter === 5) {
//     hide(hideFace);
//   }
// }

// function bodyPartAppear (argument) {
//     bodyPartAppearSixLetters() 
//   // if ((randomWord.length === 6) && (counter === 5)) {

//   // }
// }


// $(function() {

// })
// var $hiders = $('.hiders');

// $hiders.on('click', function () {
//   // $hiders.hide()
// });

//////////////////////////////////////////////////////////////
/////// JQUERY ///////
//////////////////////////////////////////////////////////////

$('img.svg').each(function(){
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
    }, 'xml');

});

$('.reset-button').click(function() {
    location.reload();
});

$(".text-value").keyup(function(event){
    if(event.keyCode == 13){
        $(".text-button").click();
    }
});

// var keyCodeAlphabet = [65, 66, 67, 68]

// $(".text-value").keyup(function(event){
//   for (var i = keyCodeAlphabet.length - 1; i >= 0; i--) {

//     if(event.keyCode == keyCodeAlphabet[i]){
//       // $(".text-button").click();
//       console.log(keyCodeAlphabet[i]);
//     }
//   };
// });

// $(".text-value").on("keydown", function(){
//     // if(event.keyCode == 13){
//         $(".text-button").click();
//     // }
// });

//////////////////////////////////////////////////////////////
/////// EXCESS CODE ///////
//////////////////////////////////////////////////////////////

// hangmanWordClass.innerHTML = randomWord;

// function toggleVisibility() {
//   hangmanWordClass.style.opacity = '1';
// }
// toggleVisibility();

// var ul = document.querySelectorAll('ul');
// var li = document.querySelectorAll(":scope > li");
// li.textContent = "test";

// var li = document.querySelector('.try');
// li.textContent = "test";
// console.log(underscoreCount);
  // console.log(underscoreArr);  
  // console.log(underscoreArrString)
// || numberTest > randomWord.length
// console.log(lettersRight);
// if (lettersRight.length = 1) {
        // lettersGuessedArr.pop();
  // for (var i = 0; i < randomWord.length ; i += 1) {
    // var newLi = document.createElement("li");
    // var newLiText= document.createTextNode(randomWord[i]);
    // newLi.appendChild(newLiText);
    // hangmanWordClass.appendChild(newLi);
    // document.querySelector("li").textContent = "test";
    // document.querySelector("li").replace(randomWord[i]," ");
  // };
// var li = document.getElementsByClassName('lette');

// function checkGuess() {
//   for (var i=0;i<randomWord.length;i+=1) {
//     if (personGuess === randomWord[i]) {
//         console.log(personGuess);
//         console.log(lettersRight);
//         li[i].textContent = randomWord[i];
//         return personGuess;
//     } else {
//         lettersGuessedArr.push(personGuess);
//         var lettersGuessedArrString = lettersGuessedArr.toString()
//         var lettersGuessedArrEdited = lettersGuessedArrString.replace(/,/g," ")
//         lettersGuessedClass.innerHTML = lettersGuessedArrEdited;
//         counter -= 1;
//         attemptTitle.innerHTML = "You have made this many attempts: " + counter;
//         return personGuess;
//     };
//   };
// }

///////////////////// comment ////////////////////////////////

//////////////////////////////////////////////////////////////
/////// comment ///////
//////////////////////////////////////////////////////////////



