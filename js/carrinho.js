// CRIANDO O ARRAY INTENS DO CARRINHO ---------------------------------------------------------------------------------

const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []

//CRIANDO A FUNÇÃO PARA ADICIONAR O ITEM NO ARRAY ----------------------------------------------------------------------

const addItem = (objItem) => {

    itensCarrinho.push(fobjItem(objItem))
    
    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))
}

//CRIANDO O ARROW ITEM --------------------------------------------------------------------------------------------------

const fobjItem = (objProduto) => {
    const item = {
        id: objProduto.id,
        titulo: objProduto.titulo,
        valor: objProduto.valor,
        imagem: objProduto.imagem,
        quantidade: 1
    }

    return item
}

//pegando o indice do array --------------------------------------------------------------------------------------------------




//CRIANDO LISTAR ITENS DO CARRINHO ---------------------------------------------------------------------------------------------

const listItens = () => {

    const itensSelecionados = JSON.parse(localStorage.getItem('itensSessao')) || []


    return itensSelecionados
}

//REMOVER ELEMENTO --------------------------------------------------------------------------------------------------------------

const removerItem = (pos) =>{
    itensCarrinho.splice(pos, 1)

    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))

}

export{addItem, listItens, removerItem}