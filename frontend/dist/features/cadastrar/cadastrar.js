"use strict";
// buscando o formulario
const formulario = document.querySelector('#formulario-cadastro');
// #############################
// MENSAGENS PARA O USUARIO
// #############################
const mensagemPreencherOsCampos = document.querySelector('#mensagem-preencha-os-campos');
const mensagemContaCriada = document.getElementById('mensagem-conta-criada');
const mensagemMenorDeIdade = document.getElementById('mensagem-menor-de-idade');
const mensagemUsuarioEmUso = document.getElementById('mensagem-usuario-esta-em-uso');
const mensagemDeErroNoServidor = document.getElementById('mensagem-erro-no-servidor');
// condição se o formulario existe
if (formulario) {
    // formulario
    formulario.addEventListener('submit', async function (prevenir) {
        prevenir.preventDefault();
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
            if (nomeUser.trim() === "" || senhaUser.trim() === "" || isNaN(dataUser)) {
                // dataUser === null
                // Previnindo que a pagina não carrege
                prevenir.preventDefault();
                // Aqui esta mostrando a mensagem 
                let mensagem0 = setTimeout(() => {
                    mensagemPreencherOsCampos.style.display = 'block';
                }, 10);
                // aqui esta escondendo a mensagem depois de 4 segundos
                setTimeout(() => {
                    clearTimeout(mensagem0);
                    mensagemPreencherOsCampos.style.display = 'none';
                }, 4000);
                return;
            } // final if 1
            let dataUserComprimento = String(dataUser);
            // Verificando o comprimento do value que esta vindo do input DateUser
            if (dataUserComprimento.length > 4) {
                return alert('Digite a data corretamente');
            }
            try {
                // Url da API
                const response = await fetch("http://localhost:3000/cadastrarUsuarios", {
                    method: "POST", // Aqui eu estou falando que eu quero enviar os dados
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome: nomeUser,
                        senha: senhaUser,
                        anoNascimento: dataUser
                    })
                });
                // Aqui esta estraindo o corpo da reposta
                const dadosUser = await response.json();
                // Aqui estão os dados
                console.log(dadosUser);
                // Verificando a Idade do usuarios
                let data = new Date();
                // Ano atual
                let dataAtual = data.getFullYear();
                // Data atual menos o ano que o usuário colocou
                let idade = (dataAtual - dataUser);
                // Verificando a data de nascimento
                if (idade < 18 || response.status === 403) {
                    // mensagem de menor de idade
                    // mostrando card
                    let mensagem1 = setTimeout(() => {
                        mensagemMenorDeIdade.style.display = 'block';
                    }, 10);
                    // removendo card
                    setTimeout(() => {
                        clearTimeout(mensagem1);
                        mensagemMenorDeIdade.style.display = 'none';
                    }, 4000);
                    return;
                }
                else if (idade >= 18) {
                    // CONDIÇÕES COM OS ERROS HTTP
                    // Pedindo pora o usuario se cadastrar
                    if (response.status === 404) {
                        alert('Erro cadastre-se');
                        return;
                    }
                    ;
                    // Caso o nome seja igual ao que tem no banco de dados, no caso se o nome já existir
                    if (response.status === 409) {
                        // mostrando a mensagem
                        let mensagem2 = setTimeout(() => {
                            mensagemUsuarioEmUso.style.display = 'block';
                        }, 10);
                        // removendo a mensagem
                        setTimeout(() => {
                            clearTimeout(mensagem2);
                            mensagemUsuarioEmUso.style.display = 'none';
                        }, 4000);
                        return;
                    }
                    // criando o usuario
                    if (response.status === 201) {
                        // mostrando mensagem 
                        let mensagem3 = setTimeout(() => {
                            mensagemContaCriada.style.display = 'block';
                        }, 10);
                        // removendo a mensagem
                        setTimeout(() => {
                            clearTimeout(mensagem3);
                            mensagemContaCriada.style.display = 'none';
                        }, 4000);
                        return;
                    }
                }
            }
            catch (error) {
                // mostrando mensagem de erro no servidor 
                let mensagem4 = setTimeout(() => {
                    mensagemDeErroNoServidor.style.display = 'block';
                }, 10);
                setTimeout(() => {
                    clearTimeout(mensagem4);
                    mensagemDeErroNoServidor.style.display = 'none';
                }, 4000);
                return;
            }
            // ###########################################################
        } // If com o instanceof
    }); // Final do formulario 
}
