// formulario de login
const formularioLogin = document.getElementById('formulario-login') as HTMLFormElement;

if (formularioLogin) {

    // evento do formulario
    formularioLogin.addEventListener('submit', async function(previnirLogin) {

        let nome = document.querySelector('#nome')

        let senha = document.querySelector('#senha')

        // Verificando se nao esta vindo como nulo
        if (nome instanceof HTMLInputElement  && senha instanceof HTMLInputElement) {

            previnirLogin.preventDefault();

            // Inputs
            const nomeLogin = nome.value;

            const senhaLogin = senha.value;

            
            // Verificando se os campos estão preenchidos
            if (nomeLogin.trim() === '' || senhaLogin.trim() === '') {
                return alert("Preencha os campos corretamente")
            }


            // Dados que eu espero ter
            interface UserLogin {
                nome: string;
                senha: string;
            };


            try {
                const response = await fetch("http://localhost:3000/loginUsuarios", {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json",
                    }, 
                    body: JSON.stringify({
                        nome: nomeLogin,
                        senha: senhaLogin
                    })
                })

                // Aqui esta estraindo o corpo da reposta
                const dadosUsuario: UserLogin = await response.json()
                
                // Aqui estão os dados
                console.log(dadosUsuario);

                if (response)
                






            } catch (error) {
                console.log(error)
                alert("Erro no servidor tente novamente mais tarde")
            }

            


            



        }



    }); // evento do btn
     



} // IF do fomulario 