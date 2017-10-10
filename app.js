
var ClozeCard = require("./ClozeCard.js");


var firebase = require("firebase");


 // Initialize Firebase
 
 var config = {
 	apiKey: "AIzaSyC5xX6xFeFxCNQ9yF1n6HE5ADooBsHSve0",
 	authDomain: "flashcard-generator-d77f4.firebaseapp.com",
 	databaseURL: "https://flashcard-generator-d77f4.firebaseio.com",
 	projectId: "flashcard-generator-d77f4",
 	storageBucket: "",
 	messagingSenderId: "697659251089"
 };
 
 firebase.initializeApp(config);


 var database = firebase.database();


// use inquirer to add new cards from command

var inquirer = require('inquirer');


// enter full text and cloze text

var questions = [

{

	type: 'input',

	name: 'text',

	message: 'What is the full text of the card?',

	default: function () {

		return 'Add full text here.';

	}

},

{

	type: 'input',

	name: 'cloze',

	message: 'What is the cloze text of the card?',

	default: function () {

		return 'Add cloze text here.';

	}

},

{

	type: 'confirm',

	name: 'askAgain',

	message: 'Would you like to add another card?',

	default: true

}

];


function ask() {

	inquirer.prompt(questions).then(function (answers) {

		var newCloze = new ClozeCard(answers.text, answers.cloze);

		var fullText = newCloze.fullText;

		var cloze = newCloze.cloze;

		var partialText = newCloze.partial();

		

		// adds new card in firebase

		addNewCloze(fullText, cloze, partialText);

		if (answers.askAgain) {

			ask();

		} else {

			console.log("You have added a new flashcard!");

		}

	});

}

ask();

// stores new card in firebase

function addNewCloze(fullText, cloze, partialText) {

	database.ref().push({

		fullText: fullText,

		cloze: cloze,

		partialText: partialText

	});

};