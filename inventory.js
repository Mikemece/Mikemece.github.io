// const notBought = document.getElementsByClassName("boxNB")
import { DBManager } from './DBManager.js';


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
const b2 = document.getElementById("b2")
const b3 = document.getElementById("b3")
const b4 = document.getElementById("b4")

const items = document.getElementsByClassName("box")


const db = new DBManager();
db.init();

// var head= [0,0,0,0,0]
// var body = [0,0,0,0,0]
// var d = [0,0,0,0,0]
// var face = [0,0]
var user = sessionStorage.getItem("username")
var mon = await db.getCoins(user)
var exp = await db.getExp(user)

money.innerHTML = mon + "€"

var head = true
var body = true
var face = true
var d = true

var bought = await db.getBuy(user)
for (let i = 0; i < bought.length; i++) {
    let found = false
    let j = 0
    while (j < items.length && !found) {
        if (bought[i] == items[j].id) {
            items[j].classList.add("boxB")
            items[j].classList.remove("boxNB")
            found = true
        }
        j++
    }
}

var equipped = await db.getEquip(user)
for (let i = 0; i < equipped.length; i++) {
    let found = false
    let j = 0
    while (j < items.length && !found) {
        if (equipped[i] == items[j].id) {
            items[j].classList.add("boxSel")
            found = true
        }
        j++
    }
}


gorro.addEventListener("click", function () {
    buy(gorro);
});
gorro.addEventListener("click", function () {
    equipH(gorro);
});
naruto.addEventListener("click", function () {
    buy(naruto);
});
naruto.addEventListener("click", function () {
    equipH(naruto);
});
mario.addEventListener("click", function () {
    buy(mario);
});
mario.addEventListener("click", function () {
    equipH(mario);
});
cumple.addEventListener("click", function () {
    buy(cumple);
});
cumple.addEventListener("click", function () {
    equipH(cumple);
});
pajarita.addEventListener("click", function () {
    buy(pajarita);
});
pajarita.addEventListener("click", function () {
    equipB(pajarita);
});
cadena.addEventListener("click", function () {
    buy(cadena);
});
cadena.addEventListener("click", function () {
    equipB(cadena);
});
betis.addEventListener("click", function () {
    buy(betis);
});
betis.addEventListener("click", function () {
    equipB(betis);
});
traje.addEventListener("click", function () {
    buy(traje);
});
traje.addEventListener("click", function () {
    equipB(traje);
});
chancla.addEventListener("click", function () {
    buy(chancla);
});
chancla.addEventListener("click", function () {
    equipD(chancla);
});
gato.addEventListener("click", function () {
    buy(gato);
});
gato.addEventListener("click", function () {
    equipD(gato);
});
amogus.addEventListener("click", function () {
    buy(amogus);
});
amogus.addEventListener("click", function () {
    equipD(amogus);
});
tortu.addEventListener("click", function () {
    buy(tortu);
});
tortu.addEventListener("click", function () {
    equipD(tortu);
});
sandia.addEventListener("click", function () {
    eat(sandia);
});
pescao.addEventListener("click", function () {
    eat(pescao);
});
burgir.addEventListener("click", function () {
    eat(burgir);
});
gafas.addEventListener("click", function () {
    buy(gafas);
});
gafas.addEventListener("click", function () {
    equipF(gafas);
});
b1.addEventListener("click", function () {
    equipH(b1);
})
b2.addEventListener("click", function () {
    equipB(b2);
})
b3.addEventListener("click", function () {
    equipD(b3);
})
b4.addEventListener("click", function () {
    equipF(b4);
})


async function buy(obj) {
    //if tengo dinero lo compro
    let objN = obj.id
    let precio = await db.getItemPrice(objN)
    if (mon >= precio && obj.className[7] == 'N') {
        obj.classList.add("boxB")
        obj.classList.remove("boxNB")
        mon = mon - precio
        money.innerHTML = mon + "€"
        await db.setCoins(user, mon)
        bought.push(objN)
        console.log(bought)
        await db.setBuy(user, bought)
    }
}

async function equipH(obj) {
    if (obj.className[7] != 'N') {
        if (head == true) {
            unequipH()
        }
        obj.classList.add("boxSel")
        equipped.splice(0, 1, obj.id)
        await db.setEquip(user, equipped)
        head = true
    }
}

async function equipB(obj) {
    if (obj.className[7] != 'N') {
        if (body == true) {
            unequipB()
        }
        obj.classList.add("boxSel")
        equipped.splice(1, 1, obj.id)
        await db.setEquip(user, equipped)
        body = true
    }
}

async function equipD(obj) {
    if (obj.className[7] != 'N') {
        if (d == true) {
            unequipD()
        }
        obj.classList.add("boxSel")
        equipped.splice(2, 1, obj.id)
        await db.setEquip(user, equipped)
        d = true
    }
}

async function equipF(obj) {
    if (obj.className[7] != 'N') {
        if (face == true) {
            unequipF()
        }
        obj.classList.add("boxSel")
        equipped.splice(3, 1, obj.id)
        await db.setEquip(user, equipped)
        face = true
    }
}

function unequipH() {
    head = false
    gorro.classList.remove("boxSel")
    naruto.classList.remove("boxSel")
    mario.classList.remove("boxSel")
    cumple.classList.remove("boxSel")
    b1.classList.remove("boxSel")
}

function unequipB() {
    body = false
    pajarita.classList.remove("boxSel")
    cadena.classList.remove("boxSel")
    betis.classList.remove("boxSel")
    traje.classList.remove("boxSel")
    b2.classList.remove("boxSel")
}
function unequipD() {
    d = false
    chancla.classList.remove("boxSel")
    gato.classList.remove("boxSel")
    amogus.classList.remove("boxSel")
    tortu.classList.remove("boxSel")
    b3.classList.remove("boxSel")
}
function unequipF() {
    face = false
    gafas.classList.remove("boxSel")
    b4.classList.remove("boxSel")
}


async function eat(obj) {
    let objN = obj.id
    let precio = await db.getItemPrice(objN)
    let itemExp = await db.getItemExp(objN)

    if (mon >= precio && obj.className[7] == 'N') {
        obj.classList.add("boxB")
        obj.classList.remove("boxNB")
        mon = mon - precio
        exp += itemExp
        money.innerHTML = mon + "€"
        await db.setCoins(user, mon)
        await db.setExp(user, exp)
        setTimeout(() => { obj.classList.add("boxNB") }, 1000);
        setTimeout(() => { obj.classList.remove("boxB") }, 1000);

    }
}


