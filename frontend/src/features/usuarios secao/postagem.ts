// formulario da postagem
const formularioPostagem = document.getElementById('fomulario-postagem') as HTMLFormElement;

// Se o formulario existir ele inicia o codigo
if (formularioPostagem) {

    // Evento do btn formulario
    formularioPostagem.addEventListener('submit', function(calcelar) {

        // Textarea sem o value
        let textareaPostagem = document.querySelector('#escrever-postagem');

        // Isso garante que nao venha nulo 
        if (textareaPostagem instanceof HTMLTextAreaElement) {
            // Valor que esta vindo do textarea
            const postagemTextAreaValue = textareaPostagem.value;


            // Verificando para o usuario escrever alguma coisa
            if (postagemTextAreaValue.trim() === "") {
                return alert("É necessario escrever algo!")
            }


            // Verificando se esta vindo menos de 250 caracteres
            if (postagemTextAreaValue.length > 280) {
                return alert("Voce atingiu o maximo de 280 caracteres")
            }



        }



    }); // Final do evento do formulario




} // If do formulario