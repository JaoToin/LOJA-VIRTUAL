import { plantasDoJardim } from "./produtos.js";

//PEGANDO ELEMENTOS DO DOM

const section_cards = document.querySelector('#cards')


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

        const h3Valor = document.createElement('h3')
        h3Valor.setAttribute('class','valor_card')
        h3Valor.innerHTML `R$ ${parseFloat(elem.valor).toFixed(2).replace('.',',')}`

        const bntCard = document.createElement('button')
        bntCard.setAttribute('class','bnt_card')
        bntCard.innerHTML = 'Adicionar'

        divCrad.appendChild(imgProduto)
        divCrad.appendChild(h2titulo)
        divCrad.appendChild(h3Valor)
        divCrad.appendChild(bntCard)

        section_cards.appendChild(divCrad)

    })
}

listaProdutos()


//filtrando as seções com a coleção map
const listarSecoes = () => {
    //criando a coleção map
    const secoesFiltrada = new Map()

    //percoreendo o array produtos e filtrando as seções 
    produtos.foreach((elem,i) =>{

        //criando a chave e o valor da coleção map a partir do id da seção 
        secoesFiltrada.set(elem.id, elem)
    })

    //convertendo o map em arry
    const secoesMenu = Array.from(secoesFiltrada.values())

    //retornando o array convertido
    return secoesMenu
}



const montarSecoes = () => {
    const ulMenu  = document.querySelector('#menu-secoes')
    ulMenu.innerHTML = ''

    //percorendo o array das seções filtrada 
    listaProdutos().foreach((elem, i) => {

        //criando o elemento li
        const liSecao = document.createElement('li')

        //criando o elemento a 
        const aSecao = document.createElement('a')
        aSecao.setAttribute('href', '#')
        aSecao.setAttribute('class', 'lnk-secao')
        aSecao.innerHTML = elem.secao

        //capturando o click dos links 
        aSecao.addEventListener('click', ()=>{

            //parar teste
            console.log(elem.id)
        })

        //adicionando o elemento filho a no elemento li
        liSecao.appendChild(aSecao)

        //adicionando o elemento filho li no elemento do dom ul
        ulMenu.appendChild(liSecao)
    }) 
}

montarSecoes()