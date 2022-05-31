import { DBManager } from './DBManager.js';

const Pinwi = document.getElementById("pinwi")
const Name = document.getElementById("name")
const head = document.getElementById("Head")
const body = document.getElementById("Body")
const down = document.getElementById("Down")
const face = document.getElementById("Face")
const money = document.getElementById("money")
const Lvl = document.getElementById("lvl")
const Exp = document.getElementById("exp")
const info = document.getElementById("info")
const infoCont = document.getElementById("infoCont")
const gato = document.getElementById("elgato")
const db = new DBManager();


db.init();


var lvl = 0
var initWidth = Pinwi.clientWidth
var user = sessionStorage.getItem("username")
var pet = await db.getPetName(user)

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
    case 3:
    case 4: Pinwi.src = "./skin/pinwiBBF.png"; break;
    default: Pinwi.src = "./skin/pinwiAdulF.png"; break;
}

face.addEventListener("click", pinwiFunction)
info.addEventListener("click", showInfo)
gato.addEventListener("click", gatoFunc)

var ibai = new Audio("./audio/ibai.mp3")
var aud = new Audio("./audio/nonot.mp3")
var sans = new Audio("./audio/sans.mp3")
var yepa = new Audio("./audio/yepa.mp3")

function pinwiFunction() {
    if(pet.toLowerCase().localeCompare("ibai")==0){
        ibai.play()
    }else if(pet.toLowerCase().localeCompare("sans")==0){
        sans.play()
    }else if(pet.toLowerCase().localeCompare("lolito")==0){
        yepa.play()
    }else{
        aud.play()
    }

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

var cl = false
function showInfo(){
    if(!cl){
        infoCont.style.top=0+"rem"
        cl=true

    }else{
        infoCont.style.top=100+"%"
        cl=false
    }
    
}

var elgato = new Audio("./audio/elgato.mp3")

function gatoFunc(){
    elgato.play();
}