import { DBManager } from './DBManager.js';

const Pinwi = document.getElementById("pinwi")
const Name = document.getElementById("name")
const head = document.getElementById("Head")
const body = document.getElementById("Body")
const down = document.getElementById("Down")
const face = document.getElementById("Face")
const extra = document.getElementById("extra")
const money = document.getElementById("money")
const Lvl = document.getElementById("lvl")
const Exp = document.getElementById("exp")

const db = new DBManager();
db.init();


var lvl = 0
var initWidth = Pinwi.clientWidth
var user = sessionStorage.getItem("username")
var pet = sessionStorage.getItem("name")

var mon = await db.getCoins(user)
var exp = await db.getExp(user)

lvl = Math.trunc(exp / 10)
exp = exp % 10;

money.innerHTML = mon + "€"
Lvl.innerHTML = "LVL " + lvl
Exp.innerHTML = exp + " EXP"
Name.innerHTML = pet


var equipped = await db.getEquipped(user)
console.log(equipped)

for (var Parte in equipped) {
    if (equipped[Parte] == "b1" || equipped[Parte] == "b2" || equipped[Parte] == "b3" || equipped[Parte] == "b4") {
        document.getElementById(Parte).src = "./ropa/vacio.png"
    } else {
        document.getElementById(Parte).src = "./ropa/" + equipped[Parte] + "F.png"
    }
}

switch (lvl) {
    case 0: break
    case 1: Pinwi.src = "./skin/huevoRotoF.png"; break;
    case 2: Pinwi.src = "./skin/huevoRoto2F.png"; break;
    case 3: Pinwi.src = "./skin/pinwiBBF.png"; break;
    default: Pinwi.src = "./skin/pinwiAdulF.png"; break;
}

face.addEventListener("click", pinwiFunction)
extra.addEventListener("click", dinero)


async function dinero() {
    mon++
    money.innerHTML = mon + "€"
    await db.setCoins(user, mon)
}


function pinwiFunction() {
    let currWidth = Pinwi.clientWidth
    console.log(currWidth)
    Pinwi.style.width = (initWidth * 1.1) + "px"
    head.style.width = (initWidth * 1.1) + "px"
    body.style.width = (initWidth * 1.1) + "px"
    down.style.width = (initWidth * 1.1) + "px"
    face.style.width = (initWidth * 1.1) + "px"
    setTimeout(() => { Pinwi.style.width = initWidth + "px"; }, 150);
    setTimeout(() => { head.style.width = initWidth + "px"; }, 150);
    setTimeout(() => { body.style.width = initWidth + "px"; }, 150);
    setTimeout(() => { down.style.width = initWidth + "px"; }, 150);
    setTimeout(() => { face.style.width = initWidth + "px"; }, 150);
    console.log("BOING")
}
