import { DBManager } from './DBManager.js';

const items = document.getElementsByClassName("box")

const db = new DBManager();
db.init();

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
        console.log(items[j].classList);
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

for (let i = 0; i < items.length; i++) {
    console.log(items[i])
    if (i == 15 || i == 16 || i == 17) {
        items[i].addEventListener("click", function () {
            console.log(items[i].classList);
            eat(items[i]);
        });

    } else {

        items[i].addEventListener("click", function () {
            buy(items[i]);
        });
        if (items[i].classList[1] == 'h' || items[i].classList[2] == 'h') {
            items[i].addEventListener("click", function () {
                equipH(items[i]);
            });
        }
        if (items[i].classList[1] == 'b' || items[i].classList[2] == 'b') {
            items[i].addEventListener("click", function () {
                equipB(items[i]);
            });
        }
        if (items[i].classList[1] == 'd' || items[i].classList[2] == 'd') {
            items[i].addEventListener("click", function () {
                equipD(items[i]);
            });
        }
        if (items[i].classList[1] == 'f' || items[i].classList[2] == 'f') {
            items[i].addEventListener("click", function () {
                equipF(items[i]);
            });
        }

    }
}


async function buy(obj) {
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
    for (let i = 0; i < 5; i++) {
        items[i].classList.remove("boxSel")
    }
}

function unequipB() {
    body = false
    for (let i = 5; i < 10; i++) {
        items[i].classList.remove("boxSel")
    }
}

function unequipD() {
    d = false
    for (let i = 10; i < 15; i++) {
        items[i].classList.remove("boxSel")
    }
}
function unequipF() {
    face = false
    for (let i = 18; i < 20; i++) {
        items[i].classList.remove("boxSel")
    }
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
