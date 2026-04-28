// 
const saidaDosPost = document.getElementById("container-posts") as HTMLElement;

// Função que vai carregar os posts
async function  carregarPostagem()  {

    saidaDosPost.innerHTML += "";

    let data = new Date();

    let dia = String(data.getDate()).padStart(2, '0');

    let mes = String(data.getMonth() + 1).padStart(2, '0');

    let ano = data.getFullYear();



    // Fetch 
    try {

        const res = await fetch("http://localhost:3000/postagem");
        const dados = await res.json();
        console.log(dados)

        dados.forEach((item: any) => {
        console.log(item.postagem);
        console.log(item.nome);


                saidaDosPost.innerHTML +=
                `
                    <div class="posts" data-id="${item.id}">

                        
                        <article class="container-nome-data-foto">
                        
                            

                            <div class="container-nome-data">
                                <h2 class="nome-usuario-post">${item.nome}</h2>
                                <p class="data-da-postagem">${dia}/${mes}/${ano}</p>
                            </div>

                        </article>


                    
                        <article class="container-conteudo-da-postagem">
                            <!-- conteudo -->
                            <p class="conteudo">${item.postagem}</p>
                        </article>              

                    </div>
                `
        });

    } catch (error) {
        console.log("ERRO REAL:", error);
        alert("Erro no servidor tente novamente mais tarde")
        return
    };
};
// Carregar os posts automaticamente
window.carregarPostagem = carregarPostagem;
carregarPostagem();

window.onload = function () {
    carregarPostagem();
};