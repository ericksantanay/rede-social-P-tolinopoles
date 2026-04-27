// TOKEN JWT
 const token: string | null = JSON.parse(localStorage.getItem('idUsuario') as any);

// Saidas aonde vai ir o nome
const saidaNome = document.querySelector('.nome-usuario') as HTMLParagraphElement;

interface nomeUser {
    nome: string;
}


function carregarIndentidadeCliente() {

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

                saidaNome.innerText += dados.nome
    
                // Token não autorizado
                if (dados.mensagem === "Token nao Autorizado" || 
                    dados.mensagem === "Erro, token esta invalido" || 
                    dados.mensagem === "Esse Token não existe") {
                    alert("Nao Autorizado")
                    window.location.replace('http://127.0.0.1:5500/frontend/src/features/login/login.html')
                    return  
                }

                // Se o role nao existir eu redireciono para o login
                if (!dados.role) {
                    alert("Faça Login")
                    window.location.replace('http://127.0.0.1:5500/frontend/src/features/login/login.html')
                    return
                }


                // 
                if (dados.role !== "cliente") {
                    window.location.replace('http://127.0.0.1:5500/frontend/src/features/login/login.html')
                    return
                }

            })


            // Final do try
        } catch (error) {
            console.log(error)
            alert("Erro no servidor tente novamente mais tarde")
            return
        }
    }

}
carregarIndentidadeCliente()