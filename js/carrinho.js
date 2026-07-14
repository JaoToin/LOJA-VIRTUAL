// CRIANDO O ARRAY INTENS DO CARRINHO
const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []

//CRIANDO A FUNÇÃO PARA ADICIONAR O ITEM NO ARRAY

const addItem = (objItem) => {

    itensCarrinho.push(objItem)
    
    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))
}

//CRIANDO LISTAR ITENS DO CARRINHO

const listItens = () => {

    const itensSelecionados = JSON.parse(localStorage.getItem('itensSessao')) || []


    return itensSelecionados
}

export{addItem, listItens}