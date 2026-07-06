import { plantasDoJardim } from "./produtos.js";

//PEGANDO ELEMENTOS DO DOM

const section_cards = document.querySelector(#cards)


const listaProdutos = ()=>{

    section_cards.innerHTML = ''

    plantasDoJardim.foreach((elem, i)=>{

        const divCrad = document.createElement('div')
        divCrad.setAttribute('class','card')

        const imgProduto = document.createElement('img')
        imgProduto.setAttribute('src',elem.imagem)
        imgProduto.setAttribute('alt',elem.alt)
        imgProduto.setAttribute('class','img_card')

        const h2titulo = document.createElement('h2')
        h2titulo.innerHTML = elem.titulo

        const divValor = document.createElement('h3')
        divValor.setAttribute('class','')

    })
}