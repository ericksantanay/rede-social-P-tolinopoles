/* Objetivo: Aqui eu vou pegar o token JWT do localstorage e verificar se é realmente o usuario  se for eu carrego os dados se não da erro*/
// TOKEN JWT
 const tokenAdmin: string | null = JSON.parse(localStorage.getItem('idUsuario') as any);

// Saidas aonde vai ir o nome
const saidaNomeAdmin = document.querySelector('.nome-usuario') as HTMLParagraphElement;

function carregarIndentidadeAdmin() {
   

    // Verificando se existe
    if (saidaNomeAdmin) {

        try {

            
            fetch("http://localhost:3000/login", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${tokenAdmin ?? ""}`
                }
            })
            .then((res) => res.json())
            .then((dados) => {

                console.log(dados)

                saidaNomeAdmin.innerText += dados.nome
                

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


                // // 
                // if (dados.mensagem === "admin") {
                //     window.location.replace('http://127.0.0.1:5500/frontend/src/features/admin/admin.html') 
                //     return
                // }
                
                
                if (dados.mensagem !== "admin") {
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
carregarIndentidadeAdmin()