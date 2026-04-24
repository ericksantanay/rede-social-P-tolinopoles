// Cards 
const cardNome = document.querySelector('.card-exemplo-nome') as HTMLDivElement
const cardSenha = document.querySelector('.card-exemplo-senha') as HTMLDivElement
const cardData = document.querySelector('.card-exemplo-data') as HTMLDivElement



// Depois resolver o problema de precisar dar 2 click para  o card aparecer
// Função mostrar o card de exemplo nome
function mostrarCardNome() {

    if (cardNome.style.display === "none") {
        cardNome.style.display = "block"
    }else {
        cardNome.style.display = "none"
    } 
}

 
// Mostrar o card exemplo Senha
function mostrarCardSenha() {

    if (cardSenha.style.display === "none") {
        cardSenha.style.display = "block"
    }else {
        cardSenha.style.display = "none"
    }

}


// Mostrar card exemplo data
function mostrarCardData() {

    if (cardData.style.display === "none") {
        cardData.style.display = "block"
    }else {
        cardData.style.display = "none"
    }

}