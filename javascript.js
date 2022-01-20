/* Javascript Integrations */

/* Quote Bank */
var quotes = [
  "Wait, you\'re not done building it!? -KingSwagus",
  "Dude it\'s fine I got this -Luvonox",
  "Some people are like slinkies. They aren\'t really good for anything, but it brings a smile to your face when you push them down a flight of stairs. -Unknown",
  "Bruh... -People in North Korea",
  "That math problem dude be livin in a watermelon house -3rd Grader",
  "Who ate my cat? -Unknown",
  "Dang I love running, it really warms me up! -Anonymous Refrigerator",
  "Subscribe to 182exe! -Dream (definitely)",
  "You smell... like a baka... -Erin Yaeger",
  "WAIT HE DIDN\'T DIE!? -Every skywars player ever",
  "Oh... could you be... the Sussus, Amongus, Imposter!? -Gabe",
  "Are you domb!? -KSI",
  "These orphans are gettin\' destroyed -Technoblade",
  "Memes are dumb -Reddit",
  ";l;;gmlxzssaw. -US Strategetic Command on Twitter",
  "HHHHHHHHHHHHHHHHHHHHHH -h man",
  "Very Inspiring! -Cool Kid",
  "Racism is really stupid, and the fact that it\'s still in this world and being taught is insane to me. -Unknown",
  "Bro stop putting the cereal in the fridge -David",
  "Bean Burrito -David",
  "No, I don\'t think I will. -i forgor",
  "Don\'t be polite. -AI Quote Generator",
  "Nice reach kid -Hypixel Players when they go on Minemen",
  "How do I make this text bigger -182exe",
  "Bro stop throwing rocks at the WASP NEST -Smart Kid",
  "Semi-Barbaric teachers are cool -182exe",
  "Damn bro, O.K.! -Unknown Airsoft Referee",
  "Your mother -Comedy Genius",
  "That\'s not very bible of you. -Anonymous",
  "Sometimes I like to think about my past actions, and then imagine how I could have made them SO much worse. -Gabe",
  "0101000010100101111101010011010 -Computer",
  "It\'s BOOM time -Unknown",
  "Ay watch yo jet bro... watch yo jet bro WATCH YO JET-! -Skydiver",
  "Yo watch this! -Famous Last Words",
  "Every hour spent shopping with parents is 6 years back on earth. -Intersteller (wait no...)",
  "Aye yuh gang slatt fr -SKRRRTT",
  "Don\'t mind me... -Bankrobber",
  "Hold up the fire! -Yeah",
  "iusehuzuni is a mcdonalds employee who beats up people in a block game -182exe",
  "Yeah? So? -Unknown",
  "I ran out of quote ideas -182exe",
  "Gentlemen, you can\’t fight in here. This is the war room! —President Merkin Muffley",
  "Before you criticize someone, you should walk a mile in their shoes. That way when you criticize them, you are a mile away from them and you have their shoes. -Jack Handey",
  "I want my children to have all the things I couldn\'t have as a kid. Then I want to move in with them. -Phyllis Diller",
  "Never follow anyone else\’s path. Unless you\’re in the woods and you\’re lost and you see a path. Then by all means follow that path. -Ellen DeGeneres",
  "Common sense is like deodorant. The people who need it most never use it. -Anonymous",
  "As you get older, three things happen. The first is your memory goes, and I can\’t remember the other two. -Sir Norman Wisdom",
  "That\’s why New York is so great, though. Everyone you care about can despise you and you can still find a bagel so good, nothing else matters. Who needs love when you’ve got lox? They both stink, but only one tastes good. -Midge Maisel",
  "Here\’s some advice: At a job interview, tell them you\’re willing to give 110 percent. Unless the job is a statistician. -Adam Gropman",
  "You should really come with a warning label -Anonymous",
  "Feed your own ego. I’m busy. -Anonymous",
  "When I\'m eating cereal and the 8 foot tall screaming skinless corpse reappears for two seconds before vanishing again -Noah",
  "Why do they call it rush hour when nothing moves? -Robin Williams",
  "They said to not give up on my dreams, so I went back to sleep. -Unknown",
  "One day I will make them onions cry, ya hear me!? -Unknown",
  "My life needs some editing, but maybe not shake transitions. -182exe",
  "Rice can literally go with anything. -Smart People",
  "Math is blue, black, or purple. Not red. Red is for reading. -182exe",
  "I think we can all agree that science is green, right? -182exe",
  "A day without sunshine is, like, night. -182exe",
  "What is a simile of thesaurus? -182exe",
  "Procrastination - The art of keeping up with yesterday. -Don Marquis",
  "If you want a guarantee, buy a toaster. -Unknown",
  "Can you not pee on my laptop? -Cat to Dog",
  "Reality continues to ruin my life. -Bill Waterson",
  "AEEEEEEEEEE! -Dude that slammed his hand in the car door",
  "I AM PUNCHING YOUR SALAD -asdfmovie",
  "Good luck, my friend. -No",
  "Avian, be normal please. -Brug   Avian: TEETH",
  "Please do not pull an arson, they burn. -Unknown",
  "Tinder: A woman\'s ego boost and a man\'s waste of time",
  "Bro can you not, like, set my house on fire? I\'ve got a family, you know. -Unknown",
  "Sub to 182 or else -182exe",
  "Please for the love of god, Jimmy, stop eating the goldfish! -Jimmy\'s Mom",
  "123, that\'s enough for me! -1st Grader",
  "BICYCLE -BIKE",
  "EEEEEEEEEEEEEEEEE -e man",
  "hUeShIfT mOrE -Pack Community Members",
  "Skill Issue -Discord",
  "Scientific Name for Pig? -Sus",
  "Hello there -Josh",
  "It\'s over anakin, I have the high ground! -Darth Vader"
  "wtf -wtf",
  "amongus could be the last remendents of humanity and aliens will look at the massiv statue and think that it was our god. -182exe",
  "Dial 911 for emergencies in the US -all",
];

// Create clientside array that will be used to store already used quote IDs //
const usedQuotes = [];

// Create a variable to show how many quotes there was generated //
var quotesUsed = 0;

// New Quote Function (checks for already used quotes using the usedQuotes //
function newQuote() {
  
  // Generate a random number //
  var randomNumber = Math.floor(Math.random() * (quotes.length));
  
  // While the random number generated is in usedQuotes, generate a new number so as there is not any repeats //
  while (usedQuotes.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (quotes.length));
  }
  
  // Add 1 to the amount of quotes used //
  var quotesUsed = quotesUsed + 1;
  
  // Add the number that the random value chose to usedQuotes //
  usedQuotes.push(randomNumber);
  
  // Give HTML the quote based on the value of the random number //
  document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
}

//ayyy wave time
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth + 100;
canvas.height = window.innerHeight;

var date = Date.now();
function draw(delta) {
    requestAnimationFrame(draw);
    canvas.width = canvas.width;
    var grd = ctx.createLinearGradient(0, 90, 1200, 0);
      grd.addColorStop(0, "#AE2DD1");
      grd.addColorStop(1, "#6A15A1");
    ctx.fillStyle = grd;
    
    var randomLeft = Math.abs(Math.pow( Math.sin(delta/1000), 3 )) * 100;
    var randomRight = Math.abs(Math.pow( Math.sin((delta/1000) + 10), 2 )) * 100;
    var randomLeftConstraint = Math.abs(Math.pow( Math.sin((delta/1000)+2), 2 )) * 100;
    var randomRightConstraint = Math.abs(Math.pow( Math.sin((delta/1000)+1), 2)) * 100;
    
    ctx.beginPath();
    ctx.moveTo(0, randomLeft);
    
    //ctx.lineTo(canvas.width, randomRight);
    ctx.bezierCurveTo(canvas.width / 3, randomLeftConstraint, canvas.width / 6 * 4, randomRightConstraint, canvas.width, randomRight);
    ctx.lineTo(canvas.width , canvas.height - 200);
    ctx.lineTo(0, canvas.height - 200);
    ctx.lineTo(0, randomLeft);
    
    ctx.closePath();
    ctx.fill();
}
requestAnimationFrame(draw, 20);

let offline = navigator.onLine;
var offlineAlert = document.getElementById('alert');
if (offline === true) {
  offlineAlert.style.display = "none";
} else {
  offlineAlert.style.display = "block";
}
