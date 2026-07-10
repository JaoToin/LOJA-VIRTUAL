import { plantasDoJardim } from "./produtos.js";

//PEGANDO ELEMENTOS DO DOM

const section_cards = document.querySelector('#cards')


const listaProdutos = ()=>{

    section_cards.innerHTML = ''
   
}

listaProdutos()

//filtrando as seções com a coleção map
const listarSecoes = () => {
    //criando a coleção map
    const secoesFiltrada = new Map()

    //percoreendo o array produtos e filtrando as seções 
    plantasDoJardim.forEach((elem, i) =>{
        //criando a chave e o valor da coleção map a partir do id da seção 
        secoesFiltrada.set(elem.id_secao, elem)
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
    listarSecoes().forEach((elem, i) => {

        //criando o elemento li
        const liSecao = document.createElement('li')

        //criando o elemento a 
        const aSecao = document.createElement('a')
        aSecao.setAttribute('href', '#')
        aSecao.setAttribute('class', 'lnk-secao')
        aSecao.innerHTML = elem.secao

        //capturando o click dos links 
        aSecao.addEventListener('click', ()=>{

            //chamando a função produtos filtrados 
            montandoCards(produtosFiltros(elem.id_secao))

            //parar teste
          //  console.log(elem.id_secao)
        })

        //adicionando o elemento filho a no elemento li
        liSecao.appendChild(aSecao)

        //adicionando o elemento filho li no elemento do dom ul
        ulMenu.appendChild(liSecao)
    }) 
}

montarSecoes()

//filtrando produtos 

const produtosFiltros = (idSecao) => {
    return plantasDoJardim.filter(elem => elem.id_secao === idSecao)
}

//monstando cards 

const montandoCards = (objProdutos) =>{

    section_cards.innerHTML = ''

    

    objProdutos.forEach((elem, i)=>{

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
        h3Valor.innerHTML = `R$ ${parseFloat(elem.valor).toFixed(2).replace('.',',')}`

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

montandoCards(plantasDoJardim); 
montarSecoes();

