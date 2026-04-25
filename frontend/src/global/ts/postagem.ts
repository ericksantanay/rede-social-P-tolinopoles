// formulario da postagem
const formularioPostagem = document.getElementById('fomulario-postagem') as HTMLFormElement;


// Se o formulario existir ele inicia o codigo
if (formularioPostagem) {

    // Evento do btn formulario
    formularioPostagem.addEventListener('submit', async function(calcelar) {

        calcelar.preventDefault()

        // Textarea sem o value
        let textareaPostagem = document.querySelector('#escrever-postagem');

        // Isso garante que nao venha nulo 
        if (textareaPostagem instanceof HTMLTextAreaElement) {

            // Valor que esta vindo do textarea
            let postagemTextAreaValue = textareaPostagem.value;


            // Verificando para o usuario escrever alguma coisa
            if (postagemTextAreaValue.trim() === "") {
                return alert("É necessario escrever algo!")
            }


            // Verificando se esta vindo menos de 250 caracteres
            if (postagemTextAreaValue.length > 280) {
                return alert("Voce atingiu o maximo de 280 caracteres")
            }


            try {

                // API
                await fetch("http://localhost:3000/postagem", {
                        method: "POST", 
                        headers: {
                            "Content-Type": "application/json"
                        }, 
                        body: JSON.stringify({
                            postagem: postagemTextAreaValue
                        }) 
                    })
                    .then(post => post.json())
                    .then(dadosPost => {

                        console.log(dadosPost)

                        // Mensagem de que a mensagem nao existe
                        if (dadosPost.mensagem === "Postagem não existe" && dadosPost.status === 404) {
                            return alert("Erro na postagem, tente novamente mais tarde")
                        }


                        // Mensagem de que a postagem foi criada com sucesso
                        if (dadosPost.mensagem === "Postagem criada com sucesso") {
                            return alert("Postagem criada com sucesso")
                        };
                        
                })
                
            } catch (error) {
                console.log(error)
                return alert("Erro no servidor")
            }

            // Zerando o textarea
            textareaPostagem.value = ""; 
        } 

    }); // Final do evento do formulario

} // If do formulario