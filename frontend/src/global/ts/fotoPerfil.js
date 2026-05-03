// Saida 
const fotoPerfil = document.getElementById("foto-perfil") 

// input file
const inputFile = document.getElementById("foto");

function adicionarInput() {
    inputFile.click();
}


inputFile.addEventListener("change", function() {
    // pegar o primeiro arquivo da lista
    const arquivo = this.files[0]

    if (arquivo) {
        // Le o arquivo
        const leitor = new FileReader(); 

        leitor.onload = function(e) {
            const imagemEmTexto =  e.target.result

            fotoPerfil.src = imagemEmTexto


            localStorage.setItem('foto', imagemEmTexto)
        };

        // Iniciando a leitura do arquivo
        leitor.readAsDataURL(arquivo)

    }

})

const FotoPerfilSalva = localStorage.getItem('foto')

if (FotoPerfilSalva) {
    fotoPerfil.src = FotoPerfilSalva
}