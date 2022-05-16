import { DBManager } from './DBManager.js';
let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let base_preguntas
let interprete_bp
const db = new DBManager()
db.init()

let date = new Date()
let username = sessionStorage.getItem("username")
let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")
let btn3 = document.getElementById("btn3")
let btn4 = document.getElementById("btn4")



window.onload = async function () {

  const db = new DBManager();
  db.init();

  const ultimaFecha = await db.getFecha(username)
  console.log(ultimaFecha)
  if (ultimaFecha == date.toLocaleDateString()) {
    document.getElementById("contenedor").classList.add("hidden")
    swal.fire({
      title: "¡Prueba mañana!",
      text:
        "Ya has intentado jugar hoy, ¡vuelve mañana!",
      icon: "error",
      confirmButtonText: "Vale :(",
    })
      .then(() => {
        document.location.href = "./main.html";
      });
  } else {

    await db.setFecha(username, date.toLocaleDateString())
    base_preguntas = readText("./base-preguntas.json");
    interprete_bp = JSON.parse(base_preguntas);
    escogerPreguntaAleatoria();

    btn1.addEventListener("click", function () {
      oprimir_btn(0)
    })
    btn2.addEventListener("click", function () {
      oprimir_btn(1)
    })
    btn3.addEventListener("click", function () {
      oprimir_btn(2)
    })
    btn4.addEventListener("click", function () {
      oprimir_btn(3)
    })
  }
};

let mon = await db.getCoins(username)
money.innerHTML = mon + "€"

let pregunta;
let posibles_respuestas;
let btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function escogerPreguntaAleatoria() {
  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }

  if (preguntas_hechas == 4) {
    let react
    switch (preguntas_correctas) {
      case 0: react = "Penoso."; break
      case 1: react = "Regulero..."; break
      case 2: react = "Aprobado raspado"; break
      case 3: react = "¡Bien hecho!"; break
      default: react = "¡¡Perfecto, vaya máquina!!"; break
    }
    //Aquí es donde el juego se reinicia
    if (mostrar_pantalla_juego_términado) {
      //Libreria sweet alert2
      swal.fire({
        title: "¡Juego finalizado!",
        text:
          "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas),
        icon: "success",
        confirmButtonText: react
      }).then(() => {
        document.location.href = "./main.html";
      });
    }
    npreguntas = [];
  }
  while (npreguntas.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
      n = 0;
    }


  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

async function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "lightgreen";
    mon++
    money.innerHTML = mon + "€"
    await db.setCoins(username, mon)
  } else {
    btn_correspondiente[i].style.background = "pink";
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    // if (preguntas_hechas<=1)
    // {
    reiniciar();
    suspender_botones = false;
    // }else{
    //     finalizar_juego()
    //     suspender_botones = false;
    // }
  }, 3000);
}

// let p = prompt("numero")

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}


