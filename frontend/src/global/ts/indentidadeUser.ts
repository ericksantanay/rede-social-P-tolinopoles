/* Objetivo: Aqui eu vou pegar o token JWT do localstorage e verificar se é realmente o usuario  se for eu carrego os dados se não da erro*/
// TOKEN JWT
 const token: string | null = JSON.parse(localStorage.getItem('idUsuario') as any);

// Saidas aonde vai ir o nome
const saidaNome = document.querySelector<HTMLParagraphElement>('.nome-usuario');

function carregarIndentidadeUser() {
   

    // Verificando se existe
    if (saidaNome) {

        try {

            
            fetch("http://localhost:3000/login", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token ?? ""}`
                }
            })
            .then((res) => res.json())
            .then((dados) => {
                console.log(dados)
                

                if (dados.mensagem === "")
                
                
                // Token não autorizado
                if (dados.mensagem === "Nao Autorizado") {
                    return alert("Nao Autorizado")
                }

                

                // Token verificado
                if (dados.mensagem === "Token verificado") {
                    saidaNome.innerText = dados.nome
                }

            })


            // Final do try
        } catch (error) {
            console.log(error)
            alert("Erro no servidor")
            return
        }
    }



}
carregarIndentidadeUser()