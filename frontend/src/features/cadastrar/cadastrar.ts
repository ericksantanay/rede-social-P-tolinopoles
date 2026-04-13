// buscando o formulario
const formulario = document.querySelector('#formulario-cadastro') as HTMLFormElement;

const mensagemPreencherOsCampos = document.querySelector('#mensagem-preencha-os-campos')  as HTMLDivElement;


    // condição se o formulario existe
if (formulario) {

    // formulario
    formulario.addEventListener('submit', async function(prevenir) {
    
        prevenir.preventDefault()


        const nomeUsuario = document.querySelector('#nome');

        const senhaUsuario = document.querySelector('#senha');

        const dataUsuario = document.querySelector('#nascimento');

        // Verificando se não esta vindo nulo
        if (nomeUsuario instanceof HTMLInputElement &&
            senhaUsuario instanceof HTMLInputElement &&
            dataUsuario instanceof HTMLInputElement) {
            
                // Value dos inputs 
                const nomeUser = nomeUsuario.value;
                const senhaUser = senhaUsuario.value;
                const dataUser = dataUsuario.value; 

                // Verificando se o usuario nao esta mandando o input vazio
                if (nomeUser.trim() === "" || senhaUser.trim() === "" || dataUser.trim() === "") {
                    
                    // Previnindo que a pagina não carrege
                    prevenir.preventDefault()
                    
                    // Aqui esta mostrando a mensagem 
                    if (mensagemPreencherOsCampos) {
                        let time1 = setTimeout(() => {
                            mensagemPreencherOsCampos.style.display = 'block'
                        }, 100);

                        // aqui esta escondendo a mensagem depois de 4 segundos
                        setTimeout(() => {
                            clearTimeout(time1);
                            mensagemPreencherOsCampos.style.display = 'none'
                        }, 4000)

                        return

                    } // Final if 2

                } // final if 1


                // Verificando a Idade do usuarios
                let data =  new Date()

                let dataAtual = data.getFullYear()


                // Terminar a data

                let anoNascimento = dataAtual





                // API
            // ###########################################################
                // Dados que eu espero ter
                interface User {
                    nome: string;
                    senha: string;
                    data: Date;
                }


                // Url da API
                const response = await fetch("http://localhost:3000/cadastrarUsuarios", {
                    method: "POST", // Aqui eu estou falando que eu quero enviar os dados
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome: nomeUser,
                        senha: senhaUser,
                        data: dataUser
                    })
                });

                    if(!response.ok) {
                        throw new Error("Erro");
                    }

                    // Aqui esta estraindo o corpo da reposta
                    const dadosUser: User = await response.json()
                    
                    // Aqui estão os dados
                    console.log(dadosUser)

                    // Pedindo pora o usuario se cadastrar
                    if (response.status === 400) {
                        alert('Erro cadastre-se')
                        return
                    };


                    // Caso o nome seja igual ao que tem no banco de dados, no caso se o nome já existir
                    if(response.status === 409) {
                        return alert("Esse nome ja existe")
                    }


                    // criando o usuario
                    if (response.status === 201) {
                        alert("Usuario criado com sucesso")
                        return
                    }
            



            // ###########################################################
                
                




                




        } // If com o instanceof

    }); // Final do formulario 

}
