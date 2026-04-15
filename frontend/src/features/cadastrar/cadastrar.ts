// buscando o formulario
const formulario = document.querySelector('#formulario-cadastro') as HTMLFormElement;

// MENSAGENS PARA O USUARIO
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
                let nomeUser = nomeUsuario.value;
                let senhaUser = senhaUsuario.value;
                let dataUser = Number(dataUsuario.value); 

                // Depois fazer a verificação para nao permitir que nem uma string seja cadastrada


                // Verificando se o usuario nao esta mandando o input vazio
                if (nomeUser.trim() === "" || senhaUser.trim() === "") {
                    
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


                // API
            // ###########################################################
                // Dados que eu espero ter
                interface User {
                    nome: string;
                    senha: string;
                    data: number;
                }


                try {
                    // Url da API
                    const response = await fetch("http://localhost:3000/cadastrarUsuarios", {
                        method: "POST", // Aqui eu estou falando que eu quero enviar os dados
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            nome:  nomeUser,
                            senha: senhaUser,
                            anoNascimento: dataUser
                        })
                    });

                    // if(!response.ok) {
                    //     throw new Error("Erro");
                    // }

                    // Aqui esta estraindo o corpo da reposta
                    const dadosUser: User = await response.json()
                    
                    // Aqui estão os dados
                    console.log(dadosUser)


                    
                    // Verificando a Idade do usuarios
                    let data =  new Date()

                    // Ano atual
                    let dataAtual = data.getFullYear()

                    // Data atual menos o ano que o usuário colocou
                    let idade = (dataAtual - dataUser)

                    // Verificando a data de nascimento
                    if (idade < 18 || response.status === 403) {
                        alert('Voce é menor de idade')
                        return
                    }else if (idade >= 18 ) {


                        // CONDIÇÕES COM OS ERROS HTTP
                        // Pedindo pora o usuario se cadastrar
                        if (response.status === 404) {
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

                    }
                } catch (error) {
                    alert(`Erro no servidor tente novamente mais tarde`)
                }
                

            // ###########################################################

        } // If com o instanceof

    }); // Final do formulario 

}
