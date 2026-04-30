const tokenBiografia: string | null = JSON.parse(localStorage.getItem('idUsuario') as any);
// O que vai aparecer e o que vai sumir
const editarBiografiaBtn = document.getElementById('btn-editar-biografia') as HTMLButtonElement;

const btnSalvarBiografia = document.getElementById('btn-salvar-biografia') as HTMLButtonElement;

let textareaComABiografia = document.getElementById('biografiaNovo') as HTMLTextAreaElement;

// Saida da biografia
const resultadoBiografia = document.getElementById('resultado-da-biografia') as HTMLParagraphElement;


//  Esse evento eu mostro o textarea e o botão editar biografia
editarBiografiaBtn.addEventListener("click", () => {
    textareaComABiografia.style.display = 'block';
    btnSalvarBiografia.style.display = 'block'
    editarBiografiaBtn.style.display = 'none';
});

// Esse evento eu removo o textarea e o botão salvar biografia
btnSalvarBiografia.addEventListener("click", () => {
    textareaComABiografia.style.display = 'none';
    btnSalvarBiografia.style.display = 'none'
    editarBiografiaBtn.style.display = 'block';
})


btnSalvarBiografia.addEventListener("click", function() {

    if (textareaComABiografia instanceof HTMLTextAreaElement) {

        const biografia =  textareaComABiografia.value;

        // Verificando se a biografia nao esta vindo vazia 
        if (biografia.trim() === "") {
            return alert("Escreva uma biografia")
        };



        try {
            fetch("http://localhost:3000/biografiaRouter", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${tokenBiografia ?? ""}`
                },
                body: JSON.stringify({
                    biografia: biografia
                })
            })
            .then((res) => res.json())
            .then((dados) => {
                console.log(dados);

                if (dados.mensagem === "Biografia não existe") {
                    return alert("Biografia não existe")
                }

                 resultadoBiografia.innerText = biografia;
            });

        } catch (error) {
            console.log(error);
            return alert("Erro no servidor");
        };
        textareaComABiografia.value = ""
    };

});

function renderizarBiografia() {
    
    fetch("http://localhost:3000/biografiaRouter", {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((dados) => {

        console.log(dados)
        
        dados.forEach((item: any) => {

        resultadoBiografia.innerText = item.biografia
        });
    }); 
};
renderizarBiografia();