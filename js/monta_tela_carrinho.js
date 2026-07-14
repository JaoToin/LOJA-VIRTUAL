import { listItens } from "./carrinho.js";



//MONTANDO A TELA DO CARRINHO
const montaTelaCarrinho = () => {
    const sectionItensCarrinho = document.querySelector('#cards')

    listItens().forEach((elem,i) => {

        const sectionItem = document.createElement('section')
        sectionItem.setAttribute('class', 'card')
        sectionItem.innerHTML = `<img src='${elem.imagem}' alt=${elem.alt}/>
        <h3 class='tito_card'> ${elem.titulo}</h3> 
        <h2 class='carrinho_card'>${elem.valor}</h2>
        <input type="number" name='valor${i}' id='valor${i}' value="${1}">
        <h2 id='div-result-itens'>${elem.valor * 1}</h2>`

        sectionItensCarrinho.appendChild(sectionItem)

        
    });

}

montaTelaCarrinho()