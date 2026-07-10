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
    ulMenu.innerHTML = '' // Limpa o menu (inclusive o HTML antigo)

    // === 1. CRIANDO O COPIADO/BOTÃO "TODOS" ===
    const liTodos = document.createElement('li')
    const aTodos = document.createElement('a')
    aTodos.setAttribute('href', '#')
    aTodos.setAttribute('class', 'lnk-secao')
    aTodos.innerHTML = 'todos'

    // EVENTO DO TODOS: Quando clicado, mostra a lista com TODAS as plantas
    aTodos.addEventListener('click', () => {
        montandoCards(plantasDoJardim)
    })

    // Adiciona o "TODOS" na árvore do HTML primeiro
    liTodos.appendChild(aTodos)
    ulMenu.appendChild(liTodos)


    // === 2. RENDERIZANDO AS OUTRAS SEÇÕES (Seu código original) ===
    listarSecoes().forEach((elem, i) => {

        // criando o elemento li
        const liSecao = document.createElement('li')

        // criando o elemento a 
        const aSecao = document.createElement('a')
        aSecao.setAttribute('href', '#')
        aSecao.setAttribute('class', 'lnk-secao')
        aSecao.innerHTML = elem.secao

        // capturando o click dos links das seções específicas
        aSecao.addEventListener('click', ()=>{
            // chamando a função produtos filtrados 
            montandoCards(produtosFiltros(elem.id_secao))
        })

        // adicionando o elemento filho a no elemento li
        liSecao.appendChild(aSecao)

        // adicionando o elemento filho li no elemento do dom ul
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





// --- SISTEMA DE PESQUISA EM TEMPO REAL ---

// 1. Elemento do input de pesquisa
// Usamos 'input#pesquisa' porque a <section> e o <input> estão usando o mesmo ID
const inputPesquisa = document.querySelector('input#pesquisa');

// Função auxiliar para remover acentos e deixar o texto em minúsculo
const normalizarTexto = (texto) => {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

// 2. Ouvinte de evento para capturar cada digitação ('input')
inputPesquisa.addEventListener('input', (evento) => {
    // Pega o termo digitado e normaliza (retira acentos e joga pra minúsculo)
    const termoBusca = normalizarTexto(evento.target.value);

    // 3. Filtra o array original baseado no título da planta
    const produtosFiltrados = plantasDoJardim.filter((elem) => {
        const tituloNormalizado = normalizarTexto(elem.titulo);
        
        // Verifica se o título da planta contém o termo digitado
        return tituloNormalizado.includes(termoBusca);
    });

    // 4. Atualiza a tela chamando a sua função com o resultado do filtro
    montandoCards(produtosFiltrados);
});
