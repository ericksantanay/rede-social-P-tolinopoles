"use strict";
// buscando o formulario
const formulario = document.getElementById("formulario-cadastro");
const mensagemPreencherOsCampos = document.querySelector('#mensagem-preencha-os-campos');
// condição se o formulario existe
if (formulario) {
    // formulario
    formulario.addEventListener('submit', function (prevenir) {
        prevenir.preventDefault();
        const nome = document.querySelector('#nome');
        const senha = document.querySelector('#senha');
        const data = document.querySelector('#nascimento');
        // Verificando se não esta vindo nulo
        if (nome instanceof HTMLInputElement &&
            senha instanceof HTMLInputElement &&
            data instanceof HTMLInputElement) {
            const nomeUser = nome.value;
            const senhaUser = senha.value;
            const dataUser = data.value;
            // Verificando se o usuario nao esta mandando o input vazio
            if (!nomeUser.trim() || senhaUser.trim() || dataUser.trim()) {
                // Previnindo que a pagina não carrege
                prevenir.preventDefault();
                // Aqui esta mostrando a mensagem 
                if (mensagemPreencherOsCampos) {
                    let time1 = setTimeout(() => {
                        mensagemPreencherOsCampos.style.display = 'block';
                    }, 100);
                    // aqui esta escondendo a mensagem depois de 4 segundos
                    setTimeout(() => {
                        clearTimeout(time1);
                        mensagemPreencherOsCampos.style.display = 'none';
                    }, 4000);
                } // Final if 2
            } // final if 1
        } // If com o instanceof
    }); // Final do formulario 
}
