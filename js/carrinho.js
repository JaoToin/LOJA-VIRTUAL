// CRIANDO O ARRAY INTENS DO CARRINHO
const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []

//CRIANDO A FUNÇÃO PARA ADICIONAR O ITEM NO ARRAY

const addItem = (objItem) => {

    itensCarrinho.push(objItem)
    
    localStorage.setItem('itensSessao', itensCarrinho)
}

//CRIANDO LISTAR ITENS DO CARRINHO

const listItens = () => {

    const itensSelecionados = JSON.stringify(localStorage.getItem('itensSessao'))


    return itensCarrinho
}

//MONTANDO A TELA DO CARRINHO
const montaTelaCarrinho = () => {
    const sectionItensCarrinho = document.querySelector('#cards')

    listItens().forEach((elem,i) => {

        const sectionItem = document.createElement('section')
        sectionItem.setAttribute('class', 'card')
        sectionItem.innerHTML = `<img src='${elem.imagem}' alt=${elem.alt}/>
        <h3 class='tito_card'> ${elem.titulo}</h3> 
        <h2 class='carrinho_card'>${elem.valor}</h2>
        <input type="number" name='valor${i}' id='valor${i}' value=>
        <h2 id='div-result-itens'>${elem.valor}</h2>
        <img src="../imagens/icones/remover.png" alt="" class="img-remove">
        `

        
    });

}

export{addItem}