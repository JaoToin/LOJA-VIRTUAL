//PEGANDO  O INPUT CEP DO DOM 
const inputCep = document.querySelector('#cep')

//CAPTURANDO O EVENTO AO PERDERR O FOCO 
inputCep.addEventListener('change', (evt) => {

    //PEGANDO OS NUM DO INPUT NÃO 
    const numCep = evt.target.value.replace(/\D/g,'')

    if(numCep.length != 8){
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

        //CASO HAJA ALGUM ERRO É CAPTURADO PELO catch
    } catch(erro){
        console.log('ERRO APRESENTADO',erro.message)
    }
}

//OBJETO LITERAL CAMPOS QUE CADA CHAVE REPRESENTA OS INPUTS DO DOM
const campos = {
    logradouro: document.querySelector('#logradouro'),
    bairro:  document.querySelector('bairro'),
    localidade: document.querySelector('localidade'),
    uf: document.querySelector('uf')
}

//FUNÇÃO EXIBE DADOS 
const exibeDados = (objDados) => {

    //PEGANDO A DIV PAI DOS ELEMENTOS DO ENDEREÇO
    const divEndereco = document.querySelector('#div-dadosendereco')


    //REMOVE DA DIV O CLASS OCULTO
    divEndereco.classList.remove('oculto')

    document.querySelector('#logradouro').value = objDados.logradouro
    document.querySelector('#logradouro').disabled = true

    document.querySelector('#bairro').value = objDados.bairro
    document.querySelector('#bairro').disabled = true

    document.querySelector('#localidade').value = objDados.localidade
    document.querySelector('#localidade').disabled = true

    document.querySelector('#uf').value = objDados.uf
    document.querySelector('#uf').disabled = true


/*
    for (let chave in objDados)

    campos[chave].value = objDados[chave]

    campos[chave].disabled = objDados[chave]*/
} 