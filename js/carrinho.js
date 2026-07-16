// CRIANDO O ARRAY INTENS DO CARRINHO ---------------------------------------------------------------------------------

const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []

//CRIANDO A FUNÇÃO PARA ADICIONAR O ITEM NO ARRAY ---------------------------------------------------------------------- modeficado para ter apenas um card por item


const addItem = (objItem) => {
    const itemExistente = itensCarrinho.find(item => item.id === objItem.id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        itensCarrinho.push(fobjItem(objItem));
    }
    
    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho));
};

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

//REMOVER ELEMENTO -------------------------------------------------------------------------------------------------------------- adicionado e modificado

const removerItem = (pos) =>{
    itensCarrinho.splice(pos, 1)

    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))

}


const atualizarQuantidade = (pos, novaQtd) => {
    if (itensCarrinho[pos]) {
        itensCarrinho[pos].quantidade = novaQtd;
        localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho));
    }
};

// EXPORT --------------------------------------------------------------------------------------------------------------

export { addItem, listItens, removerItem, atualizarQuantidade };

