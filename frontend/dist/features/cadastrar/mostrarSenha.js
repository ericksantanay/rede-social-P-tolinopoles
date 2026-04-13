"use strict";
// Icone mostrar senha
let mostrarSenhaIcone = document.getElementById('mostrar-senha');
// mostrar senha
function mostrarSenhaUser() {
    // Input 
    let inputSenha = document.getElementById('senha');
    // COndição para mostrar a sneha
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
        mostrarSenhaIcone.innerText = "visibility_off";
    }
    else {
        inputSenha.type = 'password';
        mostrarSenhaIcone.innerText = "visibility";
    }
}
