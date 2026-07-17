//PEGANDO  O INPUT CEP DO DOM 
const inputCep = document.querySelector('#cep')

//CAPTURANDO O EVENTO AO PERDERR O FOCO 
inputCep.addEventListener('change', (evt) => {
    const numCep = evt.target.value.replace(/\D/g,'')

    if(numCep != 8){
        alert('CEP INVÁLIDO !!!')
        return
        }

        buscaDadosCep(numCep)
})

//BUSCAR OS DADOS DOS CEP NO VIA CEP 

const buscaDadosCep = async (cep) =>{
    //TENTAR BUSCAR OS DADOS 
    try{
        //BUSCAR OS DADOS NO VIA CEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        //CONVERTER  OS DADOS  NO FORMATO JSON
        const dadosEndereco = await response.json()

        //CHAMA A FUNÇÃO exibeDados
        exibeDados(dadosEndereco)

        //
    } catch(erro){
        console.log(erro.menssagem)
    }
}

//OBJETO LITERAL CAMPOS 
const campos = {
    logradouro: document.querySelector('#logradouro'),
    bairro:  document.querySelector('bairro'),
    localidade: document.querySelector('localidade'),
    uf: document.querySelector('uf')
}

//FUNÇÃO EXIBE DADOS 
const exibeDados = (objDados) => {

    const divEndereco = document.querySelector('#div-dadosendereco')


    divEndereco.classList.remove('oculto')

    for (let chave in objDados)

    campos[chave].value = objDados[chave]

    campos[chave].disabled = objDados[chave]
}