import { listItens, removerItem } from "./carrinho.js";



//MONTANDO A TELA DO CARRINHO --------------------------------------------------------------------------------------------------------------
const montaTelaCarrinho = () => {
    const sectionItensCarrinho = document.querySelector('#cards')

    sectionItensCarrinho.innerHTML = ''
    

    listItens().forEach((elem,i) => {

        const sectionItem = document.createElement('section')
        sectionItem.setAttribute('class', 'card')
        sectionItem.innerHTML = `<img src='${elem.imagem}' alt=${elem.alt} class="img_card01"/>
        <h3 class='tito_card'> ${elem.titulo}</h3> 
        <h2 class='carrinho_card'>R$ ${elem.valor}</h2>
        <input type="number" name='valor${i}' id='valor${i}' value="${elem.quantidade}">
        <h2 id='div-result-itens'> R$ ${elem.valor * 0}</h2>`



        const imgRemover = document.createElement('img')
        imgRemover.setAttribute('src', '../imagens/icones/icones/remover.png')
        imgRemover.setAttribute('alt', 'Remover')
        imgRemover.setAttribute('class', 'img-remover')

        imgRemover.addEventListener('click', () =>{
            if(confirm(`Deseja remover ${elem.titulo} da sua lista?`)){
                removerItemCarrinho(i)
            }
        })

        sectionItem.appendChild(imgRemover)

        sectionItensCarrinho.appendChild(sectionItem)

    });

    

}

const removerItemCarrinho = (pos) =>{
    removerItem(pos)

    montaTelaCarrinho()
}

montaTelaCarrinho()