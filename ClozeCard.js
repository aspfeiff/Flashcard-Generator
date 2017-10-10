var BasicCard = require("./BasicCard.js");


var ClozeCard = function(text, cloze) {


	if (this instanceof ClozeCard) {

		this.fullText = text;

		this.cloze = cloze;

		this.partial = function() {

			if (this.fullText.includes(this.cloze)) {

				return this.fullText.replace(this.cloze, '...');

			} else {

				var clozeError = "The text does not contain this cloze";

				return clozeError;

			}

		};


	} else {

		return new ClozeCard(text, cloze);

	}

};



var card1 = new BasicCard("Who was the first president of the US?", "George Washington");

console.log(card1.front);

console.log(card1.back);



var card1Cloze = new ClozeCard("George Washington was the first president of the US.", "George Washington");

console.log(card1Cloze.fullText);

console.log(card1Cloze.cloze);

console.log(card1Cloze.partial());




module.exports = ClozeCard;