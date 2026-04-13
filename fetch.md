const response = await fetch(apiUrl);

Esse response retorna as seguintes coisas:

response.ok      // true ou false
response.status  // 200, 404, 500...
response.headers // cabeçalhos
response.body    // stream (dados crus)
# Aqui ele ainda nao tem o JSON utilizavel


###### // Dados que eu espero ter
interface User {
    nomeUser: string;
    senhaUser: string;
    dataUser: number;
}

### #### ############ ######## #### ####### #### #### #####

##### fetch()
Essa é a função que faz o pedido HTTP

# Pensa assim:
você está mandando uma “requisição” para um servidor


### #### ############ ######## #### ####### #### #### #####


## fetch(......)
Dentro do fetch #()# vai a URL para aonde vamos enviar os dados

# Equivalente a:
“manda isso pra esse lugar aqui”


### #### ############ ######## #### ####### #### #### #####
# headers
headers: {
  "Content-Type": "application/json"
}

Aqui é como se eu tivesse falando para o servidor que os dados estão em formato JSON



### #### ############ ######## #### ####### #### #### #####
# body
Esse é o conteudo que eu tou enviando 



### #### ############ ######## #### ####### #### #### #####
# JSON.stringify

Aqui eu vou transformar em texto porque eu escrevi em obejto  


### #### ############ ######## #### ####### #### #### #####
# await
const response = await fetch(...)

Isso significa espera o servidor responder antes de continuar, sem await, o código continuaria antes da resposta chegar.]

interface Usuario {
  nome: string
  idade: number
}

const response = await fetch("https://api.exemplo.com/usuario", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nome: "Erick",
    idade: 20
  })
})

if (!response.ok) {
  throw new Error("Erro")
}

# aqui você extrai o corpo da resposta
# agora sim você tem os dados reais
const data: Usuario = await response.json()

console.log(data)