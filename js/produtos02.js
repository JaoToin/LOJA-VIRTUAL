// Se os produtos vêm de outro arquivo, mantenha o import. 
// Certifique-se de que no arquivo 'produtos.js' os itens NÃO estejam duplicados.
import { plantasDoJardim } from "./produtos.js";

// PEGANDO ELEMENTOS DO DOM
const section_cards = document.querySelector('#cards');
const ulMenu = document.querySelector('#menu-secoes');
const inputPesquisa = document.querySelector('#input-pesquisa'); // Seu novo input do HTML

// 1. FUNÇÃO ÚNICA PARA MONTAR CARDS
const montandoCards = (listaDeProdutos) => {
    section_cards.innerHTML = '';

    if (listaDeProdutos.length === 0) {
        section_cards.innerHTML = '<p class="sem-resultado">Nenhum produto encontrado.</p>';
        return;
    }

    listaDeProdutos.forEach((elem) => {
        const divCard = document.createElement('div');
        divCard.setAttribute('class', 'card');

        const imgProduto = document.createElement('img');
        imgProduto.setAttribute('src', elem.imagem);
        imgProduto.setAttribute('alt', elem.alt);
        imgProduto.setAttribute('class', 'img_card');

        const h2titulo = document.createElement('h2');
        h2titulo.innerHTML = elem.titulo;

        const h3Valor = document.createElement('h3');
        h3Valor.setAttribute('class', 'valor_card');
        h3Valor.innerHTML = `R$ ${parseFloat(elem.valor).toFixed(2).replace('.', ',')}`;

        const bntCard = document.createElement('button');
        bntCard.setAttribute('class', 'bnt_card');
        bntCard.innerHTML = 'Adicionar';

        divCard.appendChild(imgProduto);
        divCard.appendChild(h2titulo);
        divCard.appendChild(h3Valor);
        divCard.appendChild(bntCard);

        section_cards.appendChild(divCard);
    });
};

// 2. FILTRANDO AS SEÇÕES (Sem duplicar dados no array)
const listarSecoes = () => {
    const secoesFiltrada = new Map();

    // Inserimos manualmente a seção "Todos" no início do Menu
    secoesFiltrada.set('todos', { id_secao: 'todos', secao: 'Todos' });

    plantasDoJardim.forEach((elem) => {
        secoesFiltrada.set(elem.id_secao, elem);
    });

    return Array.from(secoesFiltrada.values());
};

// 3. MONTANDO O MENU DE SEÇÕES
const montarSecoes = () => {
    ulMenu.innerHTML = '';

    listarSecoes().forEach((elem) => {
        const liSecao = document.createElement('li');
        const aSecao = document.createElement('a');
        aSecao.setAttribute('href', '#');
        aSecao.setAttribute('class', 'lnk-secao');
        aSecao.innerHTML = elem.secao;

        aSecao.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que a página suba ao clicar no '#'
            
            if (elem.id_secao === 'todos') {
                montandoCards(plantasDoJardim);
            } else {
                const produtosFiltrados = plantasDoJardim.filter(produto => produto.id_secao === elem.id_secao);
                montandoCards(produtosFiltrados);
            }
        });

        liSecao.appendChild(aSecao);
        ulMenu.appendChild(liSecao);
    });
};

// 4. LÓGICA DO INPUT DE PESQUISA
if (inputPesquisa) {
    inputPesquisa.addEventListener('input', () => {
        const valorDigitado = inputPesquisa.value.toLowerCase().trim();

        // Filtra os produtos cujo título contém o texto digitado
        const produtosFiltrados = plantasDoJardim.filter((planta) => {
            return planta.titulo.toLowerCase().includes(valorDigitado);
        });

        // Atualiza a tela apenas com o que foi encontrado
        montandoCards(produtosFiltrados);
    });
}

// INICIALIZAÇÃO DA PÁGINA
montandoCards(plantasDoJardim); // Carrega todas as plantas ao abrir
montarSecoes();                 // Cria o menu dinâmico