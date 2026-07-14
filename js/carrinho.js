// CRIANDO O ARRAY INTENS DO CARRINHO
const itensCarrinho = []

//CRIANDO A FUNÇÃO PARA ADICIONAR O ITEM NO ARRAY

const addItem = (objItem) => {

    itensCarrinho.push(objItem)
}

//CRIANDO LISTAR ITENS DO CARRINHO

const listItens = () => {
    return itensCarrinho
}

export{addItem}