window.addEventListener("load", title);

let lifes = 3;
let resetlife = 3;
let list = 0;

let myIngredients = [
  "apple",
  "butter",
  "egg",
  "apple",
  "milk",
  "sugar",
  "flour",
  "bacon",
  "chocolate",
  "carrot",
  "pear",
  "salt",
];

let myGoodIngredients = ["apple", "butter", "egg", "milk", "sugar", "flour"];

const listToDo = {
  flour: 8,
  sugar: 8,
  milk: 10,
  butter: 10,
  apple: 15,
  egg: 12,
};

const listGame = {
  flour: 0,
  sugar: 0,
  milk: 0,
  butter: 0,
  apple: 0,
  egg: 0,
};

let gameIsPaused = false;
let gameEnded = false;
let gameLoaded = false;
let bearSteps = false;

let durationOfGame = 120;
let timeLeft;

//list of sounds
let bzzz = document.querySelector("#bzzz");
let pressbee = document.querySelector("#pressbee");
let caida = document.querySelector("#caida");
let pop = document.querySelector("#pop");
let tictac = document.querySelector("#tictac");
let superduper = document.querySelector("#super");
let owh = document.querySelector("#owh");
let bgsong = document.querySelector("#bgsong");
let stepsSound = document.querySelector("#steps");
let risa = document.querySelector("#risa");
let gameOverLivesTheme = document.querySelector("#g-o-lives");
let gameOverTimeTheme = document.querySelector("#g-o-time");
let lcomplete = document.querySelector("#l-complete");
let nej = document.querySelector("#nej");
let clickButtom = document.querySelector("#click_buttom");
let v = 0.1;

//document.querySelector("#header").addEventListener("click",muteSound);

function title() {
  if (bgsong.muted == true) {
    muteSound();
  }
  document.querySelector("#sound2").classList.remove("hide");
  document.querySelector("#sound2").classList.add("mute");
  document.querySelector("#sound2").classList.add("pulse2");
  document.querySelector("#sound2").addEventListener("click", muteSound);
  document.querySelector("#sound2").addEventListener("click", clickButtomPlay);
  document
    .querySelector("#tbuttom_play")
    .addEventListener("click", clickButtomPlay);

  if (document.querySelector("#title_screen").classList.contains("hide")) {
    document.querySelector("#title_screen").classList.remove("hide");
    document.querySelector("#tbuttom_play").classList.add("hide");
    document.querySelector("#sprite_play").classList.remove("hide");
    document.querySelector("#play_bee").classList.remove("fly4");
    document.querySelector("#play_bee").offsetHeight;
  }

  if (gameLoaded == false) {
    document.querySelector("#buttom_square").classList.value = "";
    document.querySelector("#buttom_square").offsetHeight;
    document.querySelector("#buttom_square").classList.add("loadgame");
    document.querySelector("#buttom_square").classList.add("pulse2");
    document
      .querySelector("#buttom_square")
      .addEventListener("click", loadGame);
    document
      .querySelector("#buttom_square")
      .addEventListener("click", clickButtomPlay);
  } else {
    loadGame();
  }

  if (gameEnded == false) {
    document.querySelector("#tbuttom_play").addEventListener("click", start);
    document
      .querySelector("#tbuttom_play")
      .addEventListener("click", clickButtomPlay);
  } else {
    stopSounds();
    document.querySelector("#tbuttom_play").addEventListener("click", replay);
    bgsoundPlay();
  }

  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#time_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#cover").classList.add("hide");
  document.querySelector("#instructions_screen").classList.add("hide");
  document.querySelector("#cover2").classList.add("hide");
  //   //   console.log("title()");

  //    document.querySelector("#inst_but_home").removeEventListener("click", title);
  document.querySelector("#inst_but_play").removeEventListener("click", start);
}

function loadGame() {
  bgsoundPlay();
  document
    .querySelector("#buttom_square")
    .addEventListener("click", clickButtomPlay);
  document
    .querySelector("#buttom_square")
    .removeEventListener("click", loadGame);
  document.querySelector("#buttom_square").classList.value = "";
  document.querySelector("#buttom_square").offsetHeight;
  document.querySelector("#buttom_square").classList.add("instructions");
  document.querySelector("#buttom_square").classList.add("pulse2");

  document.querySelector("#chef_bear").classList.add("walk");
  document.querySelector("#chef_bearsprite").classList.add("steps");
  if (bearSteps == false) {
    stepsSound.play();
  }
  document.querySelector("#play_bee").classList.add("fly3");
  document.querySelector("#play_bee").addEventListener("animationend", flyBee);
  document
    .querySelector("#buttom_square")
    .addEventListener("click", instructionsScreen);
  stepsSound.addEventListener("ended", () => {
    bearSteps = true;
  });
  gameLoaded = true;
}

function flyBee() {
  //   console.log("flyBee()");
  document.querySelector("#tbuttom_play").classList.remove("hide");
  document.querySelector("#sprite_play").classList.add("hide");
  document.querySelector("#play_bee").classList.remove("fly3");
  document.querySelector("#play_bee").classList.add("fly4");
  document
    .querySelector("#play_bee")
    .removeEventListener("animationend", flyBee);
  document.querySelector("#play_bee").offsetHeight;
}

function instructionsScreen() {
  document
    .querySelector("#inst_but_play")
    .addEventListener("click", clickButtomPlay);
  document.querySelector("#sound2").classList.add("hide");
  bgsong.pause();
  steps.pause();
  //   console.log("instructionsScreen()");
  document.querySelector("#instructions_screen").classList.value = "";
  document
    .querySelector("#buttom_square")
    .removeEventListener("click", instructionsScreen);
  if (gameEnded == false) {
    document.querySelector("#inst_but_play").addEventListener("click", start);
  } else {
    document.querySelector("#inst_but_play").addEventListener("click", replay);
  }
  //    document.querySelector("#inst_but_home").addEventListener("click", title);
  document.querySelector("#close_buttom").addEventListener("click", title);
  document
    .querySelector("#close_buttom")
    .addEventListener("click", clickButtomPlay);
}

function start() {
  if (bgsong.muted == true) {
    muteSound();
  }
  bgsoundPlay();
  document.querySelector("#title_screen").classList.add("hide");

  if (document.querySelector("#sound2").classList.contains("hide")) {
    document.querySelector("#sound2").classList.remove("hide");
    document.querySelector("#sound2").classList.add("mute");
    document.querySelector("#sound2").classList.add("pulse2");
    document.querySelector("#sound2").addEventListener("click", muteSound);
  }

  document.querySelector("#ui_but_home").classList.add("pulse2");
  document.querySelector("#ui_but_home").classList.add("hide");
  document.querySelector("#ui_but_home").addEventListener("click", title);

  document.querySelector("#instructions_screen").classList.add("hide");

  timeLeft = durationOfGame;
  startTimer();
  document.querySelector("#time_left").textContent = "";

  document.querySelector("#cflour").textContent = 0;
  document.querySelector("#csugar").textContent = 0;
  document.querySelector("#cmilk").textContent = 0;
  document.querySelector("#cbutter").textContent = 0;
  document.querySelector("#capple").textContent = 0;
  document.querySelector("#cegg").textContent = 0;

  document.querySelector("#xflour").classList.add("hide");
  document.querySelector("#xsugar").classList.add("hide");
  document.querySelector("#xmilk").classList.add("hide");
  document.querySelector("#xbutter").classList.add("hide");
  document.querySelector("#xapple").classList.add("hide");
  document.querySelector("#xegg").classList.add("hide");
  document.querySelector("#xflour").classList.add("line");
  document.querySelector("#xsugar").classList.add("line");
  document.querySelector("#xmilk").classList.add("line");
  document.querySelector("#xbutter").classList.add("line");
  document.querySelector("#xapple").classList.add("line");
  document.querySelector("#xegg").classList.add("line");

  //   console.log("function start()1");
  document.querySelector("#bee_1_container").classList.add("flying");
  document.querySelector("#bee_1_container").classList.add("p1");
  document.querySelector("#bee_1_container").classList.add("bd1");
  document.querySelector("#bee_1_sprite").addEventListener("click", diy1);
  document
    .querySelector("#bee_1_container")
    .addEventListener("animationiteration", newDuration);
  document
    .querySelector("#bee_1_container")
    .addEventListener("animationstart", bzzzPlay);

  //   console.log("function start()2");
  document.querySelector("#bee_2_container").classList.add("flying");
  document.querySelector("#bee_2_container").classList.add("p2");
  document.querySelector("#bee_2_container").classList.add("bd2");
  document.querySelector("#bee_2_sprite").addEventListener("click", diy1);
  document
    .querySelector("#bee_2_container")
    .addEventListener("animationiteration", newDuration);
  document
    .querySelector("#bee_2_container")
    .addEventListener("animationstart", bzzzPlay);

  //   console.log("function start()3");
  document.querySelector("#bee_3_container").classList.add("flying");
  document.querySelector("#bee_3_container").classList.add("p3");
  document.querySelector("#bee_3_container").classList.add("bd3");
  document.querySelector("#bee_3_sprite").addEventListener("click", diy1);
  document
    .querySelector("#bee_3_container")
    .addEventListener("animationiteration", newDuration);
  document
    .querySelector("#bee_3_container")
    .addEventListener("animationstart", bzzzPlay);

  //   console.log("function start()4");
  document.querySelector("#bee_4_container").classList.add("flying");
  document.querySelector("#bee_4_container").classList.add("p4");
  document.querySelector("#bee_4_container").classList.add("bd4");
  document.querySelector("#bee_4_sprite").addEventListener("click", diy1);
  document
    .querySelector("#bee_4_container")
    .addEventListener("animationiteration", newDuration);
  document
    .querySelector("#bee_4_container")
    .addEventListener("animationstart", bzzzPlay);

  //   console.log("function start()5");
  document.querySelector("#bee_5_container").classList.add("flying");
  document.querySelector("#bee_5_container").classList.add("p5");
  document.querySelector("#bee_5_container").classList.add("bd5");
  document.querySelector("#bee_5_sprite").addEventListener("click", diy1);
  document
    .querySelector("#bee_5_container")
    .addEventListener("animationiteration", newDuration);
  document
    .querySelector("#bee_5_container")
    .addEventListener("animationstart", bzzzPlay);

  //   console.log("function start()bad1");
  document.querySelector("#container1").classList.add("falling");
  document.querySelector("#container1").classList.add("pX1");
  document.querySelector("#container1").classList.add("ingd6");
  document.querySelector("#sprite1").classList.add("salt");
  document.querySelector("#sprite1").addEventListener("click", good);
  document
    .querySelector("#container1")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()bad2");
  document.querySelector("#container2").classList.add("falling");
  document.querySelector("#container2").classList.add("pX2");
  document.querySelector("#container2").classList.add("ingd5");
  document.querySelector("#sprite2").classList.add("bacon");
  document.querySelector("#sprite2").addEventListener("click", good);
  document
    .querySelector("#container2")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()bad3");
  document.querySelector("#container3").classList.add("falling");
  document.querySelector("#container3").classList.add("pX3");
  document.querySelector("#container3").classList.add("ingd4");
  document.querySelector("#sprite3").classList.add("carrot");
  document.querySelector("#sprite3").addEventListener("click", good);
  document
    .querySelector("#container3")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()bad4");
  document.querySelector("#container4").classList.add("falling");
  document.querySelector("#container4").classList.add("pX4");
  document.querySelector("#container4").classList.add("ingd3");
  document.querySelector("#sprite4").classList.add("pear");
  document.querySelector("#sprite4").addEventListener("click", good);
  document
    .querySelector("#container4")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()bad5");
  document.querySelector("#container5").classList.add("falling");
  document.querySelector("#container5").classList.add("pX5");
  document.querySelector("#container5").classList.add("ingd2");
  document.querySelector("#sprite5").classList.add("chocolate");
  document.querySelector("#sprite5").addEventListener("click", good);
  document
    .querySelector("#container5")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()good1");
  document.querySelector("#container6").classList.add("falling");
  document.querySelector("#container6").classList.add("pX1");
  document.querySelector("#container6").classList.add("ingd1");
  document.querySelector("#sprite6").classList.add("flour");
  document.querySelector("#sprite6").addEventListener("click", good);
  document
    .querySelector("#container6")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()good2");
  document.querySelector("#container7").classList.add("falling");
  document.querySelector("#container7").classList.add("pX2");
  document.querySelector("#container7").classList.add("ingd2");
  document.querySelector("#sprite7").classList.add("sugar");
  document.querySelector("#sprite7").addEventListener("click", good);
  document
    .querySelector("#container7")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()good3");
  document.querySelector("#container8").classList.add("falling");
  document.querySelector("#container8").classList.add("pX3");
  document.querySelector("#container8").classList.add("ingd3");
  document.querySelector("#sprite8").classList.add("egg");
  document.querySelector("#sprite8").addEventListener("click", good);
  document
    .querySelector("#container8")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()good4");
  document.querySelector("#container9").classList.add("falling");
  document.querySelector("#container9").classList.add("pX4");
  document.querySelector("#container9").classList.add("ingd4");
  document.querySelector("#sprite9").classList.add("apple");
  document.querySelector("#sprite9").addEventListener("click", good);
  document
    .querySelector("#container9")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()good5");
  document.querySelector("#container10").classList.add("falling");
  document.querySelector("#container10").classList.add("pX5");
  document.querySelector("#container10").classList.add("ingd5");
  document.querySelector("#sprite10").classList.add("butter");
  document.querySelector("#sprite10").addEventListener("click", good);
  document
    .querySelector("#container10")
    .addEventListener("animationiteration", newGoodSprite);

  //   console.log("function start()good6");
  document.querySelector("#container11").classList.add("falling");
  document.querySelector("#container11").classList.add("pX6");
  document.querySelector("#container11").classList.add("ingd6");
  document.querySelector("#sprite11").classList.add("milk");
  document.querySelector("#sprite11").addEventListener("click", good);
  document
    .querySelector("#container11")
    .addEventListener("animationiteration", newGoodSprite);

  document.querySelector("#sunmoon").classList.add("night");
  document.querySelector("#forest").classList.add("dark");
  document.querySelector("#sprites").classList.add("dark");

  //   console.log("function start()replay");
  document.querySelector("#goreplay").addEventListener("click", replay);
  document
    .querySelector("#goreplay")
    .addEventListener("click", clickButtomPlay);
  document.querySelector("#toreplay").addEventListener("click", replay);
  document
    .querySelector("#toreplay")
    .addEventListener("click", clickButtomPlay);
  document.querySelector("#lcreplay").addEventListener("click", replay);
  document
    .querySelector("#lcreplay")
    .addEventListener("click", clickButtomPlay);
  document.querySelector("#pause").classList.add("button_pause");
  document.querySelector("#pause").classList.add("pulse2");
  document.querySelector("#pause").addEventListener("click", pauseGame);
  document.querySelector("#pause").addEventListener("click", clickButtomPlay);

  document
    .querySelector("#container1")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container2")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container3")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container4")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container5")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container6")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container7")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container8")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container9")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container10")
    .addEventListener("animationstart", popPlay);
  document
    .querySelector("#container11")
    .addEventListener("animationstart", popPlay);

  //    document.querySelector("#header").addEventListener("click",headerPause);
}

//function headerPause(){
//    if(timeLeft>0){if (gameIsPaused == false){pauseGame();}}
//    if(gameEnded==true){muteSound();}
//}

function cleanText() {
  document.querySelector("#sprite1").textContent = "";
  document.querySelector("#sprite2").textContent = "";
  document.querySelector("#sprite3").textContent = "";
  document.querySelector("#sprite4").textContent = "";
  document.querySelector("#sprite5").textContent = "";
  document.querySelector("#sprite6").textContent = "";
  document.querySelector("#sprite7").textContent = "";
  document.querySelector("#sprite8").textContent = "";
  document.querySelector("#sprite9").textContent = "";
  document.querySelector("#sprite10").textContent = "";
  document.querySelector("#sprite11").textContent = "";
}

function newGoodSprite() {
  //   console.log("function newGoodSprite()");
  this.classList.value = "";
  this.firstElementChild.classList.value = "";
  this.firstElementChild.removeEventListener("click", good);
  this.offsetHeight;

  let randPos = Math.floor(Math.random() * 6) + 1;
  //   console.log(randPos);
  this.classList.add("pX" + randPos);

  let randDur = Math.floor(Math.random() * 6) + 1;
  //   console.log(randDur);
  this.classList.add("ingd" + randDur);

  let ingredient =
    myIngredients[Math.floor(Math.random() * myIngredients.length)];
  //   console.log(ingredient);
  this.firstElementChild.classList.add(ingredient);

  this.firstElementChild.addEventListener("click", good);
  this.addEventListener("animationstart", popPlay);
  this.classList.add("falling");
}

function replay() {
  stopSounds();
  lifes = 3;
  listGame.flour = 0;
  listGame.sugar = 0;
  listGame.milk = 0;
  listGame.butter = 0;
  listGame.apple = 0;
  listGame.egg = 0;
  list = 0;
  document.querySelector("#sadbear").classList.add("hide");
  document.querySelector("#wowbear").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#time_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#cover").classList.add("hide");
  document.querySelector("#game").classList.remove("blur");
  document.querySelector("#deadbeeRP").classList.remove("gameover");
  restarLives();
  removeClass();

  document.querySelector("#pause").classList.value = "";
  document.querySelector("#pause").removeEventListener("click", title);

  document.querySelector("#pause").classList.add("button_pause");
  document.querySelector("#sunmoon").classList.remove("night");
  document.querySelector("#forest").classList.remove("dark");
  document.querySelector("#sprites").classList.remove("dark");
  document.querySelector("#sunmoon").offsetHeight;
  document.querySelector("#forest").offsetHeight;
  document.querySelector("#sprites").offsetHeight;

  gameIsPaused = false;
  cleanText();
  start();
}

function diy1() {
  //   console.log("function diy1");
  document.querySelector("#live" + lifes).classList.remove("live");
  document.querySelector("#live" + lifes).classList.add("lostlive");
  lifes--;
  alarm();
  this.removeEventListener("click", diy1);
  this.parentElement.classList.add("stop");
  pressbee.currentTime = 0;
  pressbee.volume = 0.5;
  pressbee.play();
  nej.volume = 0.5;
  nejPlay();

  this.offsetHeight;
  this.classList.add("falling2");
  document.querySelector("#sadbear").classList.remove("hide");

  caidaPlay();
  this.addEventListener("animationend", restart1);
}

function gameOverLives() {
  tictac.currentTime = 0;
  tictac.pause();

  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#cover").classList.remove("hide");
  document.querySelector("#deadbeeRP").classList.add("gameover");
  pauseGame();
  caida.currentTime = 0.5;
  caida.volume = 0.4;
  caida.play();
  caida.addEventListener("ended", gameOverLivesPlay);

  document.querySelector("#pause").classList.remove("button_play");
  document.querySelector("#pause").removeEventListener("click", pauseGame);

  document.querySelector("#pause").classList.add("button_home");
  document.querySelector("#pause").addEventListener("click", title);

  //    document.querySelector("#ui_but_home").classList.remove("hide");
  gameEnded = true;
  bgsong.pause();
  bgsong.currentTime = 0;
}

function timeOver() {
  tictac.currentTime = 0;
  tictac.pause();
  gameOverTimePlay();

  bgsong.currentTime = 0;
  //   console.log(tictac.pause);

  document.querySelector("#time_over").classList.remove("hide");
  document.querySelector("#cover").classList.remove("hide");

  document.querySelector("#time_left").textContent = "";
  pauseGame();

  document.querySelector("#pause").classList.remove("button_play");
  document.querySelector("#pause").removeEventListener("click", pauseGame);

  document.querySelector("#pause").classList.add("button_home");
  document.querySelector("#pause").addEventListener("click", title);

  //    document.querySelector("#ui_but_home").classList.remove("hide");
  gameEnded = true;
}

function levelComplete() {
  tictac.currentTime = 0;
  tictac.pause();
  risa.volume = 0.8;
  risa.play();
  lcompletePlay();
  bgsong.currentTime = 0;

  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#cover").classList.remove("hide");
  pauseGame();
  document.querySelector("#pause").classList.remove("button_play");
  document.querySelector("#pause").removeEventListener("click", pauseGame);

  document.querySelector("#pause").classList.add("button_home");
  document.querySelector("#pause").addEventListener("click", title);

  //    document.querySelector("#ui_but_home").classList.remove("hide");
  gameEnded = true;
}

function restarLives() {
  document.querySelector("#live1").classList.remove("lostlive");
  document.querySelector("#live2").classList.remove("lostlive");
  document.querySelector("#live3").classList.remove("lostlive");
  document.querySelector("#live1").classList.add("live");
  document.querySelector("#live2").classList.add("live");
  document.querySelector("#live3").classList.add("live");
}

function restart1() {
  if (lifes == 0) {
    gameOverLives();
  } else {
    // console.log("function restart1()");
    this.classList.value = "";
    this.offsetHeight;
    this.parentElement.classList.value = "";
    this.parentElement.offsetHeight;
    // console.log("function newDuration()");
    let randPos = Math.floor(Math.random() * 5) + 1;
    // console.log(randPos);
    this.parentElement.classList.add("p" + randPos);
    let randDur = Math.floor(Math.random() * 5) + 1;
    // console.log(randDur);
    this.parentElement.classList.add("bd" + randDur);
    this.parentElement.classList.add("flying");
    document.querySelector("#sadbear").classList.add("hide");
    this.parentElement.addEventListener("animationstart", bzzzPlay);
    this.addEventListener("click", diy1);
  }
}

/*------------------------copy funtion good--------------*/
function good() {
  //   console.log("function good");
  this.parentElement.classList.add("stop");

  document.querySelector("#wowbear").classList.remove("hide");

  console.log(this.classList[0]);

  ingredientX = this.classList[0];

  function checkIngredient(ingredientY) {
    return ingredientY == ingredientX;
  }

  if (myGoodIngredients.findIndex(checkIngredient) >= 0) {
    if (listGame[`${ingredientX}`] <= listToDo[`${ingredientX}`] - 1) {
      this.classList.add("scale");
      superDuper();
      listGame[`${ingredientX}`]++;
      document.querySelector(`#c${ingredientX}`).textContent =
        listGame[`${ingredientX}`];

      if (listGame[`${ingredientX}`] == listToDo[`${ingredientX}`]) {
        this.textContent = "Done";
      } else {
        this.textContent =
          listToDo[`${ingredientX}`] - listGame[`${ingredientX}`];
      }
    }
    if (listGame[`${ingredientX}`] == listToDo[`${ingredientX}`]) {
      listGame[`${ingredientX}`]++;
      this.classList.remove("scale");
      this.offsetHeight;
      this.classList.add("scale2");
      document.querySelector(`#x${ingredientX}`).classList.add("mark");
      document.querySelector(`#x${ingredientX}`).classList.remove("hide");
      list++;
    }
    if (listGame[`${ingredientX}`] > listToDo[`${ingredientX}`]) {
      owhPlay();
      this.classList.add("turn");
    }
  } else {
    this.classList.add("turn");
    owhPlay();
  }

  this.removeEventListener("click", good);

  this.addEventListener("animationend", restartGood);
  this.offsetHeight;

  if (list == 6) {
    levelComplete();
  }
}

/*----------------------------------------------------*/

function restartGood() {
  //   console.log("function restartGood()");
  this.textContent = "";
  this.parentElement.classList.value = "";
  this.classList.value = "";
  this.parentElement.offsetHeight;
  this.offsetHeight;
  document.querySelector("#wowbear").classList.add("hide");
  this.addEventListener("click", good);
  let randPos = Math.floor(Math.random() * 6) + 1;
  this.parentElement.classList.add("pX" + randPos);
  let randDur = Math.floor(Math.random() * 6) + 1;
  //   console.log(randDur);
  this.parentElement.classList.add("ingd" + randDur);
  let ingredient =
    myIngredients[Math.floor(Math.random() * myIngredients.length)];
  //   console.log(ingredient);
  this.classList.add(ingredient);
  this.addEventListener("click", good);
  this.parentElement.classList.add("falling");
}

function newDuration() {
  //   console.log("function newDuration()");
  this.classList.value = "";
  this.offsetHeight;
  let randPos = Math.floor(Math.random() * 5) + 1;
  //   console.log(randPos);
  this.classList.add("p" + randPos);
  let randDur = Math.floor(Math.random() * 5) + 1;
  //   console.log(randDur);
  this.classList.add("bd" + randDur);
  this.classList.add("flying");
  this.addEventListener("animationstart", bzzzPlay);
}

function pauseGame() {
  // Checking game run status
  if (gameIsPaused == false) {
    // console.log("Game is set to PAUSED");
    bgsong.pause();
    bzzz.pause();
    if (caida.currentTime > 0) {
      caida.pause();
    }
    tictac.pause();

    document.querySelector("#pause").classList.remove("button_pause");
    document.querySelector("#pause").classList.add("button_play");

    document.querySelector("#sunmoon").classList.add("paused");
    document.querySelector("#forest").classList.add("paused");
    document.querySelector("#sprites").classList.add("paused");
    // Pause all animations (containers)

    document.querySelector("#bee_1_container").classList.add("paused");
    document.querySelector("#bee_2_container").classList.add("paused");
    document.querySelector("#bee_3_container").classList.add("paused");
    document.querySelector("#bee_4_container").classList.add("paused");
    document.querySelector("#bee_5_container").classList.add("paused");

    document.querySelector("#container1").classList.add("paused");
    document.querySelector("#container2").classList.add("paused");
    document.querySelector("#container3").classList.add("paused");
    document.querySelector("#container4").classList.add("paused");
    document.querySelector("#container5").classList.add("paused");

    document.querySelector("#container6").classList.add("paused");
    document.querySelector("#container7").classList.add("paused");
    document.querySelector("#container8").classList.add("paused");
    document.querySelector("#container9").classList.add("paused");
    document.querySelector("#container10").classList.add("paused");
    document.querySelector("#container11").classList.add("paused");

    // Pause all spriteAnimations
    document.querySelector("#bee_1_sprite").classList.add("paused");
    document.querySelector("#bee_2_sprite").classList.add("paused");
    document.querySelector("#bee_3_sprite").classList.add("paused");
    document.querySelector("#bee_4_sprite").classList.add("paused");
    document.querySelector("#bee_5_sprite").classList.add("paused");

    document.querySelector("#sprite1").classList.add("paused");
    document.querySelector("#sprite2").classList.add("paused");
    document.querySelector("#sprite3").classList.add("paused");
    document.querySelector("#sprite4").classList.add("paused");
    document.querySelector("#sprite5").classList.add("paused");

    document.querySelector("#sprite6").classList.add("paused");
    document.querySelector("#sprite7").classList.add("paused");
    document.querySelector("#sprite8").classList.add("paused");
    document.querySelector("#sprite9").classList.add("paused");
    document.querySelector("#sprite10").classList.add("paused");
    document.querySelector("#sprite11").classList.add("paused");

    document.querySelector("#time_left").classList.add("paused");

    // Remove all eventListeners

    document.querySelector("#bee_1_sprite").removeEventListener("click", diy1);
    document
      .querySelector("#bee_1_container")
      .removeEventListener("animationiteration", newDuration);
    document.querySelector("#bee_2_sprite").removeEventListener("click", diy1);
    document
      .querySelector("#bee_2_container")
      .removeEventListener("animationiteration", newDuration);
    document.querySelector("#bee_3_sprite").removeEventListener("click", diy1);
    document
      .querySelector("#bee_3_container")
      .removeEventListener("animationiteration", newDuration);
    document.querySelector("#bee_4_sprite").removeEventListener("click", diy1);
    document
      .querySelector("#bee_4_container")
      .removeEventListener("animationiteration", newDuration);
    document.querySelector("#bee_5_sprite").removeEventListener("click", diy1);
    document
      .querySelector("#bee_5_container")
      .removeEventListener("animationiteration", newDuration);

    document.querySelector("#sprite1").removeEventListener("click", good);
    document
      .querySelector("#container1")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite2").removeEventListener("click", good);
    document
      .querySelector("#container2")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite3").removeEventListener("click", good);
    document
      .querySelector("#container3")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite4").removeEventListener("click", good);
    document
      .querySelector("#container4")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite5").removeEventListener("click", good);
    document
      .querySelector("#container5")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite6").removeEventListener("click", good);
    document
      .querySelector("#container6")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite7").removeEventListener("click", good);
    document
      .querySelector("#container7")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite8").removeEventListener("click", good);
    document
      .querySelector("#container8")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite9").removeEventListener("click", good);
    document
      .querySelector("#container9")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite10").removeEventListener("click", good);
    document
      .querySelector("#container10")
      .removeEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite11").removeEventListener("click", good);
    document
      .querySelector("#container11")
      .removeEventListener("animationiteration", newGoodSprite);

    // Changing game running status
    gameIsPaused = true;
  } else {
    // console.log("Game is set to NOT Paused");
    bgsong.play();
    bzzz.play();
    // Start the game if is paused...
    if (timeLeft < 20) {
      tictac.play();
    }
    if (caida.currentTime > 0) {
      caida.play();
    }
    document.querySelector("#pause").classList.remove("button_play");
    document.querySelector("#pause").classList.add("button_pause");

    // Remove all paused classes
    document.querySelector("#sunmoon").classList.remove("paused");
    document.querySelector("#forest").classList.remove("paused");
    document.querySelector("#sprites").classList.remove("paused");

    // Pause all spriteAnimations
    document.querySelector("#bee_1_container").classList.remove("paused");
    document.querySelector("#bee_2_container").classList.remove("paused");
    document.querySelector("#bee_3_container").classList.remove("paused");
    document.querySelector("#bee_4_container").classList.remove("paused");
    document.querySelector("#bee_5_container").classList.remove("paused");

    document.querySelector("#container1").classList.remove("paused");
    document.querySelector("#container2").classList.remove("paused");
    document.querySelector("#container3").classList.remove("paused");
    document.querySelector("#container4").classList.remove("paused");
    document.querySelector("#container5").classList.remove("paused");

    document.querySelector("#container6").classList.remove("paused");
    document.querySelector("#container7").classList.remove("paused");
    document.querySelector("#container8").classList.remove("paused");
    document.querySelector("#container9").classList.remove("paused");
    document.querySelector("#container10").classList.remove("paused");
    document.querySelector("#container11").classList.remove("paused");

    document.querySelector("#bee_1_sprite").classList.remove("paused");
    document.querySelector("#bee_2_sprite").classList.remove("paused");
    document.querySelector("#bee_3_sprite").classList.remove("paused");
    document.querySelector("#bee_4_sprite").classList.remove("paused");
    document.querySelector("#bee_5_sprite").classList.remove("paused");

    document.querySelector("#sprite1").classList.remove("paused");
    document.querySelector("#sprite2").classList.remove("paused");
    document.querySelector("#sprite3").classList.remove("paused");
    document.querySelector("#sprite4").classList.remove("paused");
    document.querySelector("#sprite5").classList.remove("paused");

    document.querySelector("#sprite6").classList.remove("paused");
    document.querySelector("#sprite7").classList.remove("paused");
    document.querySelector("#sprite8").classList.remove("paused");
    document.querySelector("#sprite9").classList.remove("paused");
    document.querySelector("#sprite10").classList.remove("paused");
    document.querySelector("#sprite11").classList.remove("paused");

    document.querySelector("#time_left").classList.remove("paused");

    // add all eventlisteners

    document.querySelector("#bee_1_sprite").addEventListener("click", diy1);
    document
      .querySelector("#bee_1_container")
      .addEventListener("animationiteration", newDuration);
    document.querySelector("#bee_2_sprite").addEventListener("click", diy1);
    document
      .querySelector("#bee_2_container")
      .addEventListener("animationiteration", newDuration);
    document.querySelector("#bee_3_sprite").addEventListener("click", diy1);
    document
      .querySelector("#bee_3_container")
      .addEventListener("animationiteration", newDuration);
    document.querySelector("#bee_4_sprite").addEventListener("click", diy1);
    document
      .querySelector("#bee_4_container")
      .addEventListener("animationiteration", newDuration);
    document.querySelector("#bee_5_sprite").addEventListener("click", diy1);
    document
      .querySelector("#bee_5_container")
      .addEventListener("animationiteration", newDuration);

    document.querySelector("#sprite1").addEventListener("click", good);
    document
      .querySelector("#container1")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite2").addEventListener("click", good);
    document
      .querySelector("#container2")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite3").addEventListener("click", good);
    document
      .querySelector("#container3")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite4").addEventListener("click", good);
    document
      .querySelector("#container4")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite5").addEventListener("click", good);
    document
      .querySelector("#container5")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite6").addEventListener("click", good);
    document
      .querySelector("#container6")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite7").addEventListener("click", good);
    document
      .querySelector("#container7")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite8").addEventListener("click", good);
    document
      .querySelector("#container8")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite9").addEventListener("click", good);
    document
      .querySelector("#container9")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite10").addEventListener("click", good);
    document
      .querySelector("#container10")
      .addEventListener("animationiteration", newGoodSprite);
    document.querySelector("#sprite11").addEventListener("click", good);
    document
      .querySelector("#container11")
      .addEventListener("animationiteration", newGoodSprite);

    gameIsPaused = false;
    startTimer();
  }
}

function removeClass() {
  document.querySelector("#sunmoon").classList.value = "";
  document.querySelector("#forest").classList.value = "";
  document.querySelector("#sprites").classList.value = "";
  document.querySelector("#xflour").classList.value = "";
  document.querySelector("#xsugar").classList.value = "";
  document.querySelector("#xmilk").classList.value = "";
  document.querySelector("#xbutter").classList.value = "";
  document.querySelector("#xapple").classList.value = "";
  document.querySelector("#xegg").classList.value = "";
  document.querySelector("#time_left").classList.value = "";

  document.querySelector("#bee_1_container").classList.value = "";
  document.querySelector("#bee_2_container").classList.value = "";
  document.querySelector("#bee_3_container").classList.value = "";
  document.querySelector("#bee_4_container").classList.value = "";
  document.querySelector("#bee_5_container").classList.value = "";

  document.querySelector("#container1").classList.value = "";
  document.querySelector("#container2").classList.value = "";
  document.querySelector("#container3").classList.value = "";
  document.querySelector("#container4").classList.value = "";
  document.querySelector("#container5").classList.value = "";

  document.querySelector("#container6").classList.value = "";
  document.querySelector("#container7").classList.value = "";
  document.querySelector("#container8").classList.value = "";
  document.querySelector("#container9").classList.value = "";
  document.querySelector("#container10").classList.value = "";
  document.querySelector("#container11").classList.value = "";

  document.querySelector("#bee_1_sprite").classList.value = "";
  document.querySelector("#bee_2_sprite").classList.value = "";
  document.querySelector("#bee_3_sprite").classList.value = "";
  document.querySelector("#bee_4_sprite").classList.value = "";
  document.querySelector("#bee_5_sprite").classList.value = "";

  document.querySelector("#sprite1").classList.value = "";
  document.querySelector("#sprite2").classList.value = "";
  document.querySelector("#sprite3").classList.value = "";
  document.querySelector("#sprite4").classList.value = "";
  document.querySelector("#sprite5").classList.value = "";

  document.querySelector("#sprite6").classList.value = "";
  document.querySelector("#sprite7").classList.value = "";
  document.querySelector("#sprite8").classList.value = "";
  document.querySelector("#sprite9").classList.value = "";
  document.querySelector("#sprite10").classList.value = "";
  document.querySelector("#sprite11").classList.value = "";

  // Remove all eventListeners

  document.querySelector("#bee_1_sprite").removeEventListener("click", diy1);
  document
    .querySelector("#bee_1_container")
    .removeEventListener("animationiteration", newDuration);
  document.querySelector("#bee_2_sprite").removeEventListener("click", diy1);
  document
    .querySelector("#bee_2_container")
    .removeEventListener("animationiteration", newDuration);
  document.querySelector("#bee_3_sprite").removeEventListener("click", diy1);
  document
    .querySelector("#bee_3_container")
    .removeEventListener("animationiteration", newDuration);
  document.querySelector("#bee_4_sprite").removeEventListener("click", diy1);
  document
    .querySelector("#bee_4_container")
    .removeEventListener("animationiteration", newDuration);
  document.querySelector("#bee_5_sprite").removeEventListener("click", diy1);
  document
    .querySelector("#bee_5_container")
    .removeEventListener("animationiteration", newDuration);

  document.querySelector("#sprite1").removeEventListener("click", good);
  document
    .querySelector("#container1")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite2").removeEventListener("click", good);
  document
    .querySelector("#container2")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite3").removeEventListener("click", good);
  document
    .querySelector("#container3")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite4").removeEventListener("click", good);
  document
    .querySelector("#container4")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite5").removeEventListener("click", good);
  document
    .querySelector("#container5")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite6").removeEventListener("click", good);
  document
    .querySelector("#container6")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite7").removeEventListener("click", good);
  document
    .querySelector("#container7")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite8").removeEventListener("click", good);
  document
    .querySelector("#container8")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite9").removeEventListener("click", good);
  document
    .querySelector("#container9")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite10").removeEventListener("click", good);
  document
    .querySelector("#container10")
    .removeEventListener("animationiteration", newGoodSprite);
  document.querySelector("#sprite11").removeEventListener("click", good);
  document
    .querySelector("#container11")
    .removeEventListener("animationiteration", newGoodSprite);

  document.querySelector("#bee_5_container").offsetHeight;
}

//time functions
function startTimer() {
  //   console.log("function startTimer()");

  // Checking if game is paused
  if (gameIsPaused == false) {
    // if game is running:
    // Checking is player has any lives left
    if (timeLeft == 0) {
      // If lives are at zero, call the gameOver function
      timeOver();
    } else {
      // If player has lives left, start a timeuot of 1 second
      setTimeout(showTime, 1000);
    }
  }
}

function showTime() {
  //   console.log("function showTime()");

  // If there is still time left
  if (timeLeft > 0) {
    // Subtracct 1 from the seconds left
    timeLeft--;
    // console.log("Time left: " + timeLeft);
    // Then call the startTimer function again (so that it can run ont time more)
    startTimer();
    // and make sure that the UI is updated
    if (timeLeft == 20) {
      tictac.volume = 1;
      tictac.play();
    }
    if (timeLeft < 20) {
      if (timeLeft < 10) {
        document.querySelector("#time_left").textContent = ":0" + timeLeft;
      } else {
        document.querySelector("#time_left").textContent = ":" + timeLeft;
      }
      document.querySelector("#time_left").classList.add("fontpulse");
    }
  } else {
    // or if no time is left - call the gameOver function

    timeOver();
  }
}

//sound functions

function muteSound() {
  //   console.log("function muteSound()");
  if (bgsong.muted == false) {
    bgsong.muted = true;
    gameOverLivesTheme.muted = true;
    gameOverTimeTheme.muted = true;
    lcomplete.muted = true;
    bzzz.muted = true;
    pressbee.muted = true;
    caida.muted = true;
    pop.muted = true;
    tictac.muted = true;
    superduper.muted = true;
    owh.muted = true;
    steps.muted = true;
    risa.muted = true;
    nej.muted = true;
    document.querySelector("#sound2").classList.remove("mute");
    document.querySelector("#sound2").classList.add("unmute");
  } else {
    bgsong.muted = false;
    gameOverLivesTheme.muted = false;
    gameOverTimeTheme.muted = false;
    lcomplete.muted = false;
    bzzz.muted = false;
    pressbee.muted = false;
    caida.muted = false;
    pop.muted = false;
    tictac.muted = false;
    superduper.muted = false;
    owh.muted = false;
    steps.muted = false;
    risa.muted = false;
    nej.muted = false;
    document.querySelector("#sound2").classList.remove("unmute");
    document.querySelector("#sound2").classList.add("mute");
  }
}

function stopSounds() {
  bzzz.pause();
  pressbee.pause();
  caida.pause();
  caida.removeEventListener("ended", gameOverLivesPlay);
  pop.pause();
  tictac.pause();
  superduper.pause();
  owh.pause();
  bgsong.pause();
  steps.pause();
  risa.pause();
  gameOverLivesTheme.pause();
  gameOverLivesTheme.removeEventListener("ended", gameOverLivesPlay);
  gameOverTimeTheme.pause();
  lcomplete.pause();
}

function bgsoundPlay() {
  bgsong.removeEventListener("ended", bgsoundPlay);
  bgsong.volume = 0.3;
  bgsong.play();
  bgsong.addEventListener("ended", bgsoundPlay);
}
function gameOverLivesPlay() {
  gameOverLivesTheme.removeEventListener("ended", gameOverLivesPlay);
  gameOverLivesTheme.currentTime = 0;
  gameOverLivesTheme.volume = 0.3;
  gameOverLivesTheme.play();
  gameOverLivesTheme.addEventListener("ended", gameOverLivesPlay);
}

function gameOverTimePlay() {
  gameOverTimeTheme.removeEventListener("ended", gameOverTimePlay);
  gameOverTimeTheme.currentTime = 0;
  gameOverTimeTheme.volume = 0.3;
  gameOverTimeTheme.play();
  gameOverTimeTheme.addEventListener("ended", gameOverTimePlay);
}

function lcompletePlay() {
  lcomplete.removeEventListener("ended", lcompletePlay);
  lcomplete.currentTime = 0;
  lcomplete.volume = 0.3;
  lcomplete.play();
  lcomplete.addEventListener("ended", lcompletePlay);
}

function bzzzPlay() {
  bzzz.currentTime = 0;
  bzzz.volume = 0.2;
  bzzz.play();
}

function popPlay() {
  pop.currentTime = 0;
  pop.volume = 0.8;
  pop.play();
}

function superDuper() {
  superduper.currentTime = 0;
  superduper.volume = 0.3;
  superduper.play();
}

function owhPlay() {
  owh.currentTime = 0;
  owh.volume = 0.3;
  owh.play();
}
function caidaPlay() {
  caida.volume = 1;
  caida.play();
  caida.addEventListener("ended", caidaZero);
}
function caidaZero() {
  caida.removeEventListener("ended", caidaZero);
  caida.currentTime = 0;
  caida.offsetHeight;
  caida.addEventListener("ended", caidaZero);
}

function nejPlay() {
  nej.currentTime = 0;
  nej.play();
}

function clickButtomPlay() {
  clickButtom.currentTime = 0;
  clickButtom.play();
}

function alarm() {
  document.querySelector("#alarm").classList.add("alarma");
  document
    .querySelector("#alarm")
    .addEventListener("animationend", function () {
      document.querySelector("#alarm").classList.remove("alarma");
    });
}
