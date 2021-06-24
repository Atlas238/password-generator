// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Establishing global arrays/variables/etc so we can access them within our function
// First object is our user responses default state
var userPreferences = {
  passLength: 0,
  numbers: false,
  specChar: false,
  upperCase: false,
  lowerCase: false,
};

// funcArray holds our four random number generators with specific ASCII ranges for each preference case
var funcArray = [
  function numbersOnlyMath() {
    return Math.floor(Math.random() * (57 - 49) + 49);
  },

  function specialOnlyMath() {
    return Math.floor(Math.random() * (47 - 33) + 33);
  },

  function upperOnlyMath() {
    return Math.floor(Math.random() * (90 - 65) + 65);
  },

  function lowerOnlyMath() {
    return Math.floor(Math.random() * (122 - 97) + 97);
  },
];

// takePreferences accepts the user input and writes those inputs to the object userPreferences, overwriting our default values
function takePreferences() {
  // Take Input
  userPreferences.passLength = window.prompt(
    "How many characters do you want your password to be?"
  );
  // If input is acceptable...
  if (userPreferences.passLength >= 8 || userPreferences.passLength <= 128) {
    if (window.confirm("Do you want special characters in your password?")) {
      userPreferences.specChar = true;
    }

    if (window.confirm("Do you want numbers in your password?")) {
      userPreferences.numbers = true;
    }

    if (window.confirm("Do you want uppercase letters in your password?")) {
      userPreferences.upperCase = true;
    }

    if (window.confirm("Do you want lowercase letters in your password?")) {
      userPreferences.lowerCase = true;
    }

    if (
      userPreferences.numbers !== true &&
      userPreferences.specChar !== true &&
      userPreferences.lowerCase !== true &&
      userPreferences.upperCase !== true
    ) {
      window.alert("You must select at least one type of character!");

      if (
        window.confirm(
          "Would you like to try again? You will need to refresh the page to try again if you select cancel."
        )
      ) {
        location.reload();
      } else {
        window.alert("Thanks for playin!");
      }
    }
    // If input is unacceptable...
  } else {
    userPreferences.passLength = window.prompt(
      "Your password must be at minimum 8 characters or at maximum 128 characters, please try again!"
    );
  }
}

// generatePassword does the heavy lifting...
function generatePassword() {
  // Confirming that userPreferences object is set to default, in case user has been on our page already (resolves potential need to relog)
  userPreferences = {
    passLength: 0,
    numbers: false,
    specChar: false,
    upperCase: false,
    lowerCase: false,
  };

  // Runs our above defined takePreferences function to collect user input for the current use
  takePreferences();
  // Creating a locally scoped array filled with our previously defined random number generator functions, each only getting added if a user has selected the corresponding character type
  var usableGenerators = [];

  if (userPreferences.numbers === true) {
    usableGenerators.push(funcArray[0]);
  }

  if (userPreferences.specChar === true) {
    usableGenerators.push(funcArray[1]);
  }

  if (userPreferences.upperCase === true) {
    usableGenerators.push(funcArray[2]);
  }

  if (userPreferences.lowerCase === true) {
    usableGenerators.push(funcArray[3]);
  }

  // New array is created to hold the indiviudal characters, iterating through the user-input of desired password length. Our for loop provides a random selection of our generator functions, meaning that each character is calculated truly randomly, using our usableGenerators array length as our maximum as it's length varies based on user input
  let passArray = [];
  for (i = 0; i < userPreferences.passLength; i++) {
    let x = 0;
    x = Math.floor(Math.random() * (usableGenerators.length - 0) + 0);
    passArray.push(usableGenerators[x]());
  }

  // Final loop converts each of the indexes in our passArray (containing our constructed ASCII-code password) into a single string, finally converting from simple numbers to proper characters
  var passString = "";

  for (let i = 0; i < passArray.length; i++) {
    var char = String.fromCharCode(passArray[i]);
    passString += char;
  }
  // return is our final result! String of custom length with custom characters, each randomly generated per user preferences. User can simply click "Generate Password" a second time to reset userPreference and begin anew.
  return passString;
}
