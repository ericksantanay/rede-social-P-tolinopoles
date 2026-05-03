 const tokenPerfil: string | null = JSON.parse(localStorage.getItem('idUsuario') as any);

// Saidas nome do usuario
const nomeUsuario = document.getElementById('nome-do-usuario') as HTMLElement;
let nomeUsuarioComArroba = document.getElementById('nome-com-arroba') as HTMLElement;

function renderizarNomePerfil() {

    try {

        const API_URL = "https://rede-social-p-tolinopoles.onrender.com";
        
        fetch(`${API_URL}/login`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "authorization": `Bearer ${tokenPerfil ?? ""}`
        }
        })
        .then((res) => res.json())
        .then((dados) => {
            console.log(dados)

            nomeUsuario.innerText = dados.nome

            let nomeUsuarioComArrobaComEspaco = `@${dados.nome}`

            // Tirando o espaço
            let nomeUsuarioComArrobaSemEspaco = nomeUsuarioComArrobaComEspaco.replace(/\s+/g, "");

            // Mostrando o nome
            nomeUsuarioComArroba.innerText =  nomeUsuarioComArrobaSemEspaco
        })
    } catch (error) {
        alert("Erro no servidor")
        console.log(error)
        return
    }

}
renderizarNomePerfil()