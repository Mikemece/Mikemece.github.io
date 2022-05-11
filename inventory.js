// const notBought = document.getElementsByClassName("boxNB")
import {DBManager} from './DBManager.js';


// const bought = document.getElementsByClassName("boxB")

const gorro = document.getElementById("gorro")
const naruto = document.getElementById("naruto")
const mario = document.getElementById("mario")
const cumple = document.getElementById("cumple")
const pajarita = document.getElementById("pajarita")
const cadena = document.getElementById("cadena")
const betis = document.getElementById("betis")
const traje = document.getElementById("traje")
const chancla = document.getElementById("chancla")
const gato = document.getElementById("gato")
const amogus = document.getElementById("amogus")
const tortu = document.getElementById("tortu")
const sandia = document.getElementById("sandia")
const pescao = document.getElementById("pescao")
const burgir = document.getElementById("burgir")
const gafas = document.getElementById("gafas")

const b1 = document.getElementById("b1")
const b2= document.getElementById("b2")
const b3 = document.getElementById("b3")
const b4 = document.getElementById("b4")



const db = new DBManager();
db.init();

// var head= [0,0,0,0,0]
// var body = [0,0,0,0,0]
// var d = [0,0,0,0,0]
// var face = [0,0]
var user = sessionStorage.getItem("name")
var mon = await db.getCoins(user)

money.innerHTML= mon+"€"

var head= false
var body = false
var face = false
var d = false

gorro.addEventListener("click", function() {
    buy(gorro);
}); 
gorro.addEventListener("click", function() {
    equipH(gorro);
}); 
naruto.addEventListener("click", function() {
    buy(naruto);
}); 
naruto.addEventListener("click", function() {
    equipH(naruto);
}); 
mario.addEventListener("click", function() {
    buy(mario);
}); 
mario.addEventListener("click", function() {
    equipH(mario);
}); 
cumple.addEventListener("click", function() {
    buy(cumple);
}); 
cumple.addEventListener("click", function() {
    equipH(cumple);
});
pajarita.addEventListener("click", function() {
    buy(pajarita);
}); 
pajarita.addEventListener("click", function() {
    equipB(pajarita);
}); 
cadena.addEventListener("click", function() {
    buy(cadena);
}); 
cadena.addEventListener("click", function() {
    equipB(cadena);
}); 
betis.addEventListener("click", function() {
    buy(betis);
}); 
betis.addEventListener("click", function() {
    equipB(betis);
}); 
traje.addEventListener("click", function() {
    buy(traje);
}); 
traje.addEventListener("click", function() {
    equipB(traje);
});
chancla.addEventListener("click", function() {
    buy(chancla);
}); 
chancla.addEventListener("click", function() {
    equipD(chancla);
}); 
gato.addEventListener("click", function() {
    buy(gato);
}); 
gato.addEventListener("click", function() {
    equipD(gato);
}); 
amogus.addEventListener("click", function() {
    buy(amogus);
}); 
amogus.addEventListener("click", function() {
    equipD(amogus);
}); 
tortu.addEventListener("click", function() {
    buy(tortu);
}); 
tortu.addEventListener("click", function() {
    equipD(tortu);
});
sandia.addEventListener("click", function() {
    eat(sandia);
}); 
pescao.addEventListener("click", function() {
    eat(pescao);
}); 
burgir.addEventListener("click", function() {
    eat(burgir);
}); 
gafas.addEventListener("click", function() {
    buy(gafas);
}); 
gafas.addEventListener("click", function() {
    equipF(gafas);
}); 
b1.addEventListener("click", function() {
    equipH(b1);
})
b2.addEventListener("click", function() {
    equipB(b2);
})
b3.addEventListener("click", function() {
    equipD(b3);
})
b4.addEventListener("click", function() {
    equipF(b4);
})


async function buy(obj){
    //if tengo dinero lo compro
    let objN = obj.id
    let precio = await db.getItemPrice(objN)
    if (mon >= precio && obj.className[7]=='N') {
        obj.classList.add("boxB")
        obj.classList.remove("boxNB") 
        mon=mon-precio
        money.innerHTML= mon +"€"
    }
    // await db.setCoins(dineroDisponible-dineroObj, user)
 }

function equipH(obj){
    if(head==true){
        unequipH()
    }
    obj.classList.add("boxSel")
    head=true
}

function equipB(obj){
    if(body==true){
        unequipB()
    }
    obj.classList.add("boxSel")
    body=true
}

function equipD(obj){
    if(d==true){
        unequipD()
    }
    obj.classList.add("boxSel")
    d=true
}

function equipF(obj){
    if(face==true){
        unequipF()
    }
    obj.classList.add("boxSel")
    face=true
}

function unequipH(){
    head=false
    gorro.classList.remove("boxSel")
    naruto.classList.remove("boxSel")
    mario.classList.remove("boxSel")
    cumple.classList.remove("boxSel")
    b1.classList.remove("boxSel")
}

function unequipB(){
    body=false
    pajarita.classList.remove("boxSel")
    cadena.classList.remove("boxSel")
    betis.classList.remove("boxSel")
    traje.classList.remove("boxSel")
    b2.classList.remove("boxSel")
}
function unequipD(){
    d=false
    chancla.classList.remove("boxSel")
    gato.classList.remove("boxSel")
    amogus.classList.remove("boxSel")
    tortu.classList.remove("boxSel")
    b3.classList.remove("boxSel")
}
function unequipF(){
    face=false
    gafas.classList.remove("boxSel")
    b4.classList.remove("boxSel")
}

// function equip(obj, bool){
//     if(bool==true){
//         unequip(bool)
//     }
//     obj.classList.add("boxSel")
// }
//  function equip(obj, arr){
//    for(let i in arr){
        
//    }
// }

// function unequip(bool){
//     bool=false
// }


async function eat(obj){
    let objN = obj.id
    let precio = await db.getItemPrice(objN)
    if (mon >= precio && obj.className[7]=='N') {
        obj.classList.add("boxB")
        obj.classList.remove("boxNB") 
        mon=mon-precio
        money.innerHTML= mon +"€"
        setTimeout(() => {   obj.classList.add("boxNB") }, 1000);
        setTimeout(() => {  obj.classList.remove("boxB") }, 1000);
        
    }   
}


