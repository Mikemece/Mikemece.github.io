import {DBManager} from './DBManager.js';

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");
const petName = document.getElementById("petName")

const sessionStorage = window.sessionStorage


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
            setFormMessage(loginForm, "error", "Usuario o contraseña incorrecto/s");
        }else
        {
            console.log("Hemos iniciado sesión en usuario: " + usuario.user + " con la contraseña: " + usuario.Password + " con un nivel de experiencia: " + usuario.EXP);
            let petName = await db.getPetName(loginUsername.value)
            if (petName===undefined){
                const petNameChanged = await db.setPetName(loginUsername.value,loginUsername.value)
                sessionStorage.setItem("name", loginUsername.value)
            }else{
                sessionStorage.setItem("name", petName)
            }
            sessionStorage.setItem("username", loginUsername.value)
            window.location.href = "./main.html";
        }
    });

    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault()
        clearInputError(petName)
        if (signupPassword.value!=confirmPassword.value){
            setFormMessage(createAccountForm, "error", "Las contraseñas no coinciden")
        }else if (petName.value==""){
            setInputError(petName,"¡Tienes que darle un nombre a tu mascota!")
        }else{
            const isRegistered = await db.loginUser(signupUsername.value)
            if(isRegistered==-1){
                const registeredUser = await db.registerUser(signupUsername.value, signupPassword.value, petName.value);
                setFormMessage(loginForm, "success", "¡Registrado exitosamente!")
                loginForm.classList.remove("form--hidden");
                createAccountForm.classList.add("form--hidden");
            }else{
                setFormMessage(createAccountForm, "error", "Este usuario ya existe")
            }
        }
        
    }); 
});
