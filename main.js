
const Pinwi = document.getElementById("pinwi")
const Name = document.getElementById("name")
const Head = document.getElementById("head")
const body = document.getElementById("body")
const d = document.getElementById("d")
const face = document.getElementById("face")
const Ropa = document.getElementById("roro")
const money = document.getElementById("money")

var exp = 0
var lvl = 0
var initWidth = Pinwi.clientWidth
var cont= 0

var mon = sessionStorage.getItem("m")
money.innerHTML= mon +"€"

Pinwi.addEventListener("click", pinwiFunction) 
face.addEventListener("click", pinwiFunction) 
Ropa.addEventListener("click", dress) 
money.addEventListener("click", hereComes) 


function hereComes(){
    mon++
    money.innerHTML=mon +"€"
}


function dress(){

    if(cont==0){
        Head.src="./ropa/gorroF.png";
        body.src="./ropa/cadenaF.png";
        d.src="./ropa/chanclasF.png";
        face.src="./ropa/gafasF.png"
        cont++

    }else if(cont==1){
        Head.src="./ropa/narutoF.png";
        body.src="./ropa/betisF.png";
        d.src="./ropa/amogusF.png";
        face.src="./ropa/vacio.png"
        cont++

    }else{
        Head.src ="./ropa/marioF.png"
        body.src="./ropa/pajaF.png"
        d.src="./ropa/gatoF.png"
        face.src="./ropa/vacio.png"
        cont=cont-2
    }
}


function pinwiFunction () {
    // console.log(pinwiclicked)
    let nameRect = Name.getBoundingClientRect()
    let pinwiRect = Pinwi.getBoundingClientRect()
    exp++
    let Exp = document.getElementById("exp")
    let Lvl = document.getElementById("lvl")
    let currWidth = Pinwi.clientWidth
    console.log(currWidth)
    if(exp==10){
        exp-=10;
        lvl++;
    }
    switch (lvl){
        case 0: break
        case 1: Pinwi.src="./skin/huevoRotoF.png"; break;
        case 2: Pinwi.src = "./skin/pinwiBBF.png"; break;
        default: Pinwi.src = "./skin/pinwiAdulF.png"; break;
    }


    Pinwi.style.width = (initWidth*1.03) + "px"
    Head.style.width = (initWidth*1.03) + "px"
    body.style.width = (initWidth*1.03) + "px"
    d.style.width = (initWidth*1.03) + "px"
    face.style.width = (initWidth*1.03) + "px"
    setTimeout(() => {  Pinwi.style.width = initWidth + "px"; }, 150);
    setTimeout(() => {  Head.style.width = initWidth + "px"; }, 150);
    setTimeout(() => {  body.style.width = initWidth + "px"; }, 150);
    setTimeout(() => {  d.style.width = initWidth + "px"; }, 150);
    setTimeout(() => {  face.style.width = initWidth + "px"; }, 150);

    console.log(nameRect.top)
    Lvl.innerHTML = "LVL "+ lvl
    Exp.innerHTML = exp + " EXP"

    }


