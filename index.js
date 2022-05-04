const Inventario = document.getElementById("inventario")
const Pinwi = document.getElementById("pinwi")
const Name = document.getElementById("name")
// const Name = document.getElementById("name")


const pinwiRect = Pinwi.getBoundingClientRect()
const nameRect = Name.getBoundingClientRect()

// var clicked = 0
// var pinwiclicked = 0
var exp = 0
var lvl = 0
var initWidth = Pinwi.clientWidth

Pinwi.addEventListener("click", pinwiFunction) 

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
    if(lvl<4) {
        Pinwi.style.width = (initWidth + exp*3+lvl) + "px"
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
