// const notBought = document.getElementsByClassName("boxNB")
const pj = document.getElementById("pajarita")
// const bought = document.getElementsByClassName("boxB")
const cad = document.getElementById("cadena")
const bts = document.getElementById("betis")
const g = document.getElementById("gorro")
const nar = document.getElementById("naruto")
const mar = document.getElementById("mario")
const pie = document.getElementById("chancla")
const cat = document.getElementById("gato")
const sus = document.getElementById("amogus")
const sandi = document.getElementById("sandia")
const pez = document.getElementById("pescao")
const burg = document.getElementById("burgir")
const gafa = document.getElementById("gafas")

const b1 = document.getElementById("b1")
const b2= document.getElementById("b2")
const b3 = document.getElementById("b3")
const b4 = document.getElementById("b4")

// var head= [0,0,0,0,0]
// var body = [0,0,0,0,0]
// var d = [0,0,0,0,0]
// var face = [0,0]

var head= false
var body = false
var face = false
var d = false

pj.addEventListener("click", function() {
    buy(pj);
}); 
pj.addEventListener("click", function() {
    equipB(pj);
}); 
cad.addEventListener("click", function() {
    buy(cad);
}); 
cad.addEventListener("click", function() {
    equipB(cad);
}); 
bts.addEventListener("click", function() {
    buy(bts);
}); 
bts.addEventListener("click", function() {
    equipB(bts);
}); 
g.addEventListener("click", function() {
    buy(g);
}); 
g.addEventListener("click", function() {
    equipH(g);
}); 
nar.addEventListener("click", function() {
    buy(nar);
}); 
nar.addEventListener("click", function() {
    equipH(nar);
}); 
mar.addEventListener("click", function() {
    buy(mar);
}); 
mar.addEventListener("click", function() {
    equipH(mar);
}); 
pie.addEventListener("click", function() {
    buy(pie);
}); 
pie.addEventListener("click", function() {
    equipD(pie);
}); 
cat.addEventListener("click", function() {
    buy(cat);
}); 
cat.addEventListener("click", function() {
    equipD(cat);
}); 
sus.addEventListener("click", function() {
    buy(sus);
}); 
sus.addEventListener("click", function() {
    equipD(sus);
}); 
sandi.addEventListener("click", function() {
    eat(sandi);
}); 
pez.addEventListener("click", function() {
    eat(pez);
}); 
burg.addEventListener("click", function() {
    eat(burg);
}); 
gafa.addEventListener("click", function() {
    buy(gafa);
}); 
gafa.addEventListener("click", function() {
    equipF(gafa);
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


function buy(obj){
    //if tengo dinero lo compro
    obj.classList.add("boxB")
    obj.classList.remove("boxNB")
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
    g.classList.remove("boxSel")
    nar.classList.remove("boxSel")
    mar.classList.remove("boxSel")
    b1.classList.remove("boxSel")
}

function unequipB(){
    body=false
    pj.classList.remove("boxSel")
    cad.classList.remove("boxSel")
    bts.classList.remove("boxSel")
    b2.classList.remove("boxSel")
}
function unequipD(){
    d=false
    pie.classList.remove("boxSel")
    cat.classList.remove("boxSel")
    sus.classList.remove("boxSel")
    b3.classList.remove("boxSel")
}
function unequipF(){
    face=false
    gafa.classList.remove("boxSel")
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


function eat(obj){
    obj.classList.add("boxB")
    obj.classList.remove("boxNB")
    setTimeout(() => {   obj.classList.add("boxNB") }, 1000);
}