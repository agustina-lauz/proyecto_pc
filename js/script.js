// Obtengo los datos del formulario
let username = document.getElementById("username");
let lastname = document.getElementById("lastname");
let email = document.getElementById("email");
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");
let submit = document.getElementById("regBtn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let usersArray = users ? users : [];

// Creo funcion para validar que los campos no esten vacios. El email debe tener formato de correo electronico. Las contrasenas deben ser iguales y deben tener al menos 8 caracteres.
function validateData() {
  if (
    username.value.length === 0 ||
    lastname.value.length === 0 ||
    email.value.length === 0 ||
    password1.value.length === 0 ||
    password2.value.length === 0
  ) {
    alert("Todos los campos son obligatorios");
    return false;
  } else if (password1.value !== password2.value) {
    alert("Las contraseñas no coinciden");
    return false;
  } else if (!validateEmail(email.value)) {
    alert("El email no es válido");
    return false;
  }
  return true;
}

// Función para validar el formato del email utilizando una expresión regular
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Tomo informacion de archivo ./js/data/usuarios.json y guardarlo en localstorage
function loadUsers() {
  fetch("./js/data/usuarios.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("users", JSON.stringify(data));
    });
}

// Creo una funcion para validar que el usuario existe en el localstorage
function validateUser(email) {
  // Recorro el array para ver si el mail ya está registrado en el localstorage
  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].email === email) {
      alert("El usuario ya existe");
      return true;
    }
  }
  return false;
}

// Creo una funcion para agregar un nuevo usuario al localstorage
function addUser() {
  let user = {
    username: username.value,
    lastname: lastname.value,
    email: email.value,
    password: password1.value,
  };
  usersArray.push(user);
  localStorage.setItem("users", JSON.stringify(usersArray));
}

document.addEventListener("DOMContentLoaded", function (e) {
  loadUsers();
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    if (validateData() && !validateUser(email.value)) {
      addUser();
      alert("Usuario registrado con éxito");
    }
  });
});
