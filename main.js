const Inventario = document.getElementById("inventario")
const Pinwi = document.getElementById("pinwi")
const Name = document.getElementById("name")
const Head = document.getElementById("head")
const body = document.getElementById("body")
const d1 = document.getElementById("d1")
const d2 = document.getElementById("d2")
const Ropa = document.getElementById("roro")


// const Name = document.getElementById("name")


const pinwiRect = Pinwi.getBoundingClientRect()
const nameRect = Name.getBoundingClientRect()

// var clicked = 0
// var pinwiclicked = 0
var exp = 0
var lvl = 0
var initWidth = Pinwi.clientWidth

Pinwi.addEventListener("click", pinwiFunction) 
d2.addEventListener("click", pinwiFunction) 
Ropa.addEventListener("click", dress) 

function dress(){
    Head.src="./ropa/gorroF.png";
    body.src="./ropa/pajaF.png";
    d1.src="./ropa/amogusF.png";
    d2.src="./ropa/gatoF.png";
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
    d1.style.width = (initWidth*1.03) + "px"
    d2.style.width = (initWidth*1.03) + "px"
    setTimeout(() => {  Pinwi.style.width = initWidth + "px"; }, 150);
    setTimeout(() => {  Head.style.width = initWidth + "px"; }, 150);
    setTimeout(() => {  body.style.width = initWidth + "px"; }, 150);
    setTimeout(() => {  d1.style.width = initWidth + "px"; }, 150);
    setTimeout(() => {  d2.style.width = initWidth + "px"; }, 150);
    
    if(lvl<4) {
        if(pinwiRect.y <= nameRect.y+nameRect.height){
            console.log("Collision!")
            Name.style.top = (Name.offsetTop - 1) + "px"
        }

        
    }

    console.log(nameRect.top)
    Lvl.innerHTML = "Nivel "+ lvl
    Exp.innerHTML = exp + " EXP"

    // if(!pinwiclicked) {
    //     Name.style.animation = "sizing 1s ease-in-out 0s infinite alternate"
    //     pinwiclicked=1
    // }else{
    //     pinwiclicked=0
    // } 
    }


