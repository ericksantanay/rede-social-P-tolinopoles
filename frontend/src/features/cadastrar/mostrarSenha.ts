 // Icone mostrar senha
let mostrarSenhaIcone = document.getElementById('mostrar-senha') as HTMLSpanElement;


// mostrar senha
function mostrarSenhaUser() {
   
    // Input 
    let inputSenha = document.getElementById('senha') as HTMLInputElement

    // COndição para mostrar a sneha
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text'
        mostrarSenhaIcone.innerText = "visibility_off"
    }else {
        inputSenha.type = 'password'
        mostrarSenhaIcone.innerText = "visibility"
    }
}