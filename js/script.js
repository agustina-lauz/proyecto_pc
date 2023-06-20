//Obtengo los datos del formulario.
let username = document.getElementById("username");
let lastname = document.getElementById("lastname");
let email = document.getElementById("email");
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");
let submit = document.getElementById("regBtn");
let users = JSON.parse(localStorage.getItem("users"));;
let usersArray = users ? users : []

// Creo funcion para validar que los campos no esten vacios. El email debe tener formato de correo electronico. Las contrasenas deben ser iguales y deben tener al menos 8 caracteres.
function validateData() {
    if (
        username.length < 0 ||
        lastname.length < 0 ||
        email.length < 0 ||
        password1.length < 0 ||
        password2.length < 0
    ) {
        alert("Todos los campos son obligatorios");
        return false;
    }  else if (password1.value !== password2.value) {
        alert("Las contraseñas no coinciden");
        return false;
    } //else if (email.indexOf("@") == -1) {
       // alert("El email no es valido");
        //return false;
   // }
    return true;
}


// Tomo informacion de archivo ./js/data/usuarios.json y guardarlo en localstorage
function loadUsers() {
    fetch("./js/data/usuarios.json")
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("users", JSON.stringify(data));
        });
}


// Creo una funcion para validar que el usuario existe en el localstorage.
function validateUser(email) {
  
     // Recorro el array para ver si el mail ya está registrado en el localstorage.
    for (let i = 0; i < usersArray.length; i++) {    
        if (usersArray[i].email === email) {
            alert("El usuario ya existe");
            return true;
        }
    }
    return false;
}


// Creo una funcion para agregar un nuevo usuario al localstorage.
function addUser() {
    let user = {
        username: username.value,
        lastname: lastname.value,
        email: email.value,
        password: password1.value,
    };
    usersArray.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}


document.addEventListener("DOMContentLoaded", function (e) {
    loadUsers();
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        if (validateData() && validateUser()) {
            addUser();
            console.log(users)
            alert("Usuario registrado con éxito");
        }
    })
});

