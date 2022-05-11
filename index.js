import {DBManager} from './DBManager.js';

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const db = new DBManager();
    db.init();

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", async e => {
        e.preventDefault();
        
        //const usuario = await basedato.loginUser(usuario, contraseña);
        //Prueba con usuario conocido en BD \/
        const usuario = await db.loginUser(loginUsername.value, loginPassword.value);
        //console.log(await basedato.loginUser("diablo", "mami"));
        console.log(usuario);
        if(usuario == 0 || usuario == -1)
        {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }else
        {
            console.log("Hemos iniciado sesión en usuario: " + usuario.user + " con la contraseña: " + usuario.Password + " con un nivel de experiencia: " + usuario.EXP);
            setFormMessage(loginForm, "success", "You logged in succesfully!")
            window.location.href = "./main.html";
        }
    });

/*     createAccountForm.addEventListener("submit", e => {
        if(db.loginUser(signupUsername) == -1){
            db.registerUser(signupUsername, signupPassword);
            window.location.href = "./main.html";
        }
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        }); 
    }); */
});