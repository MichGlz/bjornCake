window.addEventListener("load", start);

function start() {

console.log("function start()1");
document.querySelector("#bee_1_container").classList.add("flying");
document.querySelector("#bee_1_container").classList.add("p1");
document.querySelector("#bee_1_sprite").addEventListener("click", diy1);
console.log("function start()2");
document.querySelector("#bee_2_container").classList.add("flying");
document.querySelector("#bee_2_container").classList.add("p2");
document.querySelector("#bee_2_sprite").addEventListener("click", diy2);
console.log("function start()3");
document.querySelector("#bee_3_container").classList.add("flying");
document.querySelector("#bee_3_container").classList.add("p3");
document.querySelector("#bee_3_sprite").addEventListener("click", diy3);
console.log("function start()4");
document.querySelector("#bee_4_container").classList.add("flying");
document.querySelector("#bee_4_container").classList.add("p4");
document.querySelector("#bee_4_sprite").addEventListener("click", diy4);

}

// And the function which was mentioned in the eventListener line is created
function diy1() {
    console.log("function diy1");
   document.querySelector("#bee_1_container").classList.add("stop"); document.querySelector("#bee_1_sprite").classList.add("falling2");
    document.querySelector("#bee_1_sprite").addEventListener("animationend", restart1);
}

function diy2() {
    console.log("function diy2");
   document.querySelector("#bee_2_container").classList.add("stop"); document.querySelector("#bee_2_sprite").classList.add("falling2");
    document.querySelector("#bee_2_sprite").addEventListener("animationend", restart2);
}

function diy3() {
    console.log("function diy3");
   document.querySelector("#bee_3_container").classList.add("stop"); document.querySelector("#bee_3_sprite").classList.add("falling2");
    document.querySelector("#bee_3_sprite").addEventListener("animationend", restart3);
}

function diy4() {
    console.log("function diy4");
   document.querySelector("#bee_4_container").classList.add("stop"); document.querySelector("#bee_4_sprite").classList.add("falling2");
    document.querySelector("#bee_4_sprite").addEventListener("animationend", restart4);
}

function restart1() {
    console.log("function restart1()");
    document.querySelector("#bee_1_container").classList.remove("stop")
    document.querySelector("#bee_1_container").classList.remove("flying");
    document.querySelector("#bee_1_container").classList.remove("p1");
    document.querySelector("#bee_1_sprite").classList.remove("falling2");
    document.querySelector("#bee_1_container").offsetHeight;
    start();
}

function restart2() {
    console.log("function restart2()");
    document.querySelector("#bee_2_container").classList.remove("stop")
    document.querySelector("#bee_2_container").classList.remove("flying");
    document.querySelector("#bee_2_container").classList.remove("p2");
    document.querySelector("#bee_2_sprite").classList.remove("falling2");
    document.querySelector("#bee_2_container").offsetHeight;
    start();
}

function restart3() {
    console.log("function restart3()");
    document.querySelector("#bee_3_container").classList.remove("stop")
    document.querySelector("#bee_3_container").classList.remove("flying");
    document.querySelector("#bee_3_container").classList.remove("p3");
    document.querySelector("#bee_3_sprite").classList.remove("falling2");
    document.querySelector("#bee_3_container").offsetHeight;
    start();
}

function restart4() {
    console.log("function restart4()");
    document.querySelector("#bee_4_container").classList.remove("stop")
    document.querySelector("#bee_4_container").classList.remove("flying");
    document.querySelector("#bee_4_container").classList.remove("p4");
    document.querySelector("#bee_4_sprite").classList.remove("falling2");
    document.querySelector("#bee_4_container").offsetHeight;
    start();
}






