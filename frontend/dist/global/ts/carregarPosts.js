"use strict";
// 
const saidaDosPost = document.getElementById("container-posts");
// Função que vai carregar os posts
async function carregarPostagem() {
    saidaDosPost.innerHTML = "";
    // Fetch 
    try {
        const API_URL = "https://rede-social-p-tolinopoles.onrender.com";
        const res = await fetch(`${API_URL}/postagem`);
        const dados = await res.json();
        console.log(dados);
        dados.forEach((item) => {
            console.log(item.postagem);
            console.log(item.nome);
            saidaDosPost.innerHTML +=
                `
                    <div class="posts" data-id="${item.id}">

                        
                        <article class="container-nome-data-foto">
                        
                            

                            <div class="container-nome-data">
                                <h2 class="nome-usuario-post">${item.nome}</h2>                  
                            </div>

                        </article>


                    
                        <article class="container-conteudo-da-postagem">
                            <!-- conteudo -->
                            <p class="conteudo">${item.postagem}</p>
                        </article>              

                    </div>
                `;
        });
    }
    catch (error) {
        console.log("ERRO REAL:", error);
        alert("Erro no servidor tente novamente mais tarde");
        return;
    }
    ;
}
;
// Carregar os posts automaticamente
window.carregarPostagem = carregarPostagem;
window.onload = function () {
    carregarPostagem();
};
