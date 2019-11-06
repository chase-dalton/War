let suits = ["Spades","Hearts","Diamonds","Clubs"];
let faces = ["Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King","Ace"];
let deck = [];
let players=[];
let discardPile = [];

//make the deck

let makeDeck = () => {
  //let deck = [];
  for (let i in suits){
    for (let j=0;j<faces.length;j++){
      const card = {
        suit:suits[i],
        face:faces[j],
        value:j+2
      };
      deck.push(card);
    }
  }
  return deck;
}

 
//shuffle the deck

let shuffle = (array) => {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
//create players

let createPlayers = (num) => {
  for (let i=1;i<=num;i++){
    let hand = [];
    let player = {
      name: "Player " + i,
      id: i,
      hand:hand,
      score:0
    };
    players.push(player);
  }
  return players;
}
//deal cards

let deal = (deck) => {
  let insertValue = [];
  let p1Hand = players[0].hand;
  let p2Hand = players[1].hand;
  for(let i=0;i<deck.length;i++){
    if (i%2 === 0){
      insertValue = deck[i];
      p1Hand.push(insertValue);
    } else {
      insertValue = deck[i];
      p2Hand.push(insertValue);
    }
  }
}
//play a turn

let turn = () => {
  let compareArray = [];
  for(let i=0;i<1;i++){
    let p1Card = players[0].hand[i];
    let p2Card = players[1].hand[i];
    let p1Hand = players[0].hand;
    let p2Hand = players[1].hand;
    compareArray.push(p1Card);
    compareArray.push(p2Card);
    if(compareArray[0].value > compareArray[1].value){
      console.log ('Player 1 Wins with a ' + compareArray[0].face + " of " + compareArray[0].suit);
      players[0].score += 1;
      discardPile.push(p1Hand.shift());
      discardPile.push(p2Hand.shift());
    } else {
      console.log ('Player 2 Wins with a ' + compareArray[1].face + " of " + compareArray[1].suit);
      players[1].score += 1;
      discardPile.push(p1Hand.shift());
      discardPile.push(p2Hand.shift());
    }
  }
  return compareArray;
}

//turn 2.0
//describe code as wordlike as possible

let turn2 = ([topCard1, ...restDeck1], [topCard2, ...restDeck2]) => {
  if(topCard1.value > topCard2.value) {
    return { winner: 'deck1', deck1: restDeck1, deck2: restDeck2, score:1};
  } else if(topCard1.value < topCard2.value) {
    return { winner: 'deck2', deck1: restDeck1, deck2: restDeck2, score:1};
  } else {
    if(restDeck1.length === 0){
      return { winner: 'none', deck1: [], deck2: [], score: 0 };
    }
    const sacraficialN = restDeck1.length <= 3 ? restDeck1.length - 1 : 3;
    const { winner, deck1, deck2, score } = turn2(
      restDeck1.slice(sacraficialN),
      restDeck2.slice(sacraficialN)
    );
    if(winner === 'none'){ return { winner, deck1, deck2, score}; }
    return { winner, deck1, deck2, score : score + sacraficialN + 1 };
  }
};


makeDeck(); //deck made
shuffle(deck); //deck shuffled
createPlayers(2); //players made
deal(deck); // deck dealt

//console.log(players[0])
//console.log(players[1])
//console.log(turn()); // turn occured
console.log(players);
//console.log(discardPile);

 