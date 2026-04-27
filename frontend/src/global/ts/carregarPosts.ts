// 
const saidaDosPost = document.getElementById("container-posts") as HTMLElement;

// Função que vai carregar os posts
async function  carregarPostagem()  {

    saidaDosPost.innerHTML = "" 

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
                                <p class="data-da-postagem">12/03/2026 Date</p>
                            </div>

                        </article>


                    
                        <article class="container-conteudo-da-postagem">
                            <!-- conteudo -->
                            <p class="conteudo">${item.postagem}</p>
                        </article>


                    
                        <article class="container-curtida">

                        
                            <div class="curtidas" onclick="curtida()">
                                <!-- imagem da curtida -->
                                <svg class="img-da-curtida" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

                                <p class="quantidade-curtidas">1000</p>

                            </div>

                        </article>


                    
                        <article class="container-dos-comentarios" onclick="avisoComentario()">

                            <div class="icone-e-primeiro-comentario">

                                <svg class="img-comentario" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

                                <p class="primeiro-comentario">Ninguém abriu o bico ainda. Seja o primeiro a comentar!</p>
                            </div>

                        </article>

                    </div>
                `
        });

    } catch (error) {
        console.log("ERRO REAL:", error);
        alert("Erro no servidor tente novamente mais tarde")
        return
    }
}
// Carregar os posts automaticamente
window.carregarPostagem = carregarPostagem
carregarPostagem()

window.onload = function () {
    carregarPostagem();
};