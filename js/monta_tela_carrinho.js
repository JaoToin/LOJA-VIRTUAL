import { listItens, removerItem, atualizarQuantidade } from "./carrinho.js";

// Função para calcular e exibir o resumo total do carrinho (Total + Frete)
const atualizarResumoGeral = () => {
    const itens = listItens();
    const divTotalItens = document.querySelector('#div-result-valor-itens');
    const divTotalPagar = document.querySelector('#div-result-totalpagar');
    const valorFrete = 25.00; // Valor fixo do frete visual no HTML

    // Calcula a soma de todos os itens (valor x quantidade)
    const somaTotalItens = itens.reduce((acumulador, item) => {
        return acumulador + (item.valor * item.quantidade);
    }, 0);

    // Atualiza o DOM
    if (divTotalItens && divTotalPagar) {
        divTotalItens.innerHTML = `R$ ${somaTotalItens.toFixed(2).replace('.', ',')}`;
        divTotalPagar.innerHTML = `R$ ${(somaTotalItens + valorFrete).toFixed(2).replace('.', ',')}`;
    }
}

// MONTANDO A TELA DO CARRINHO
const montaTelaCarrinho = () => {
    const sectionItensCarrinho = document.querySelector('#cards');
    sectionItensCarrinho.innerHTML = ''; 

    listItens().forEach((elem, i) => {

        const sectionItem = document.createElement('section');
        sectionItem.setAttribute('class', 'card');
        
        // Corrigido: Multiplicando o valor pela quantidade, e removendo ID repetido (usando classe para o subtotal)
        sectionItem.innerHTML = `
            <img src='${elem.imagem}' alt='${elem.alt}' class="img_card01"/>
            <h3 class='tito_card'> ${elem.titulo}</h3> 
            <h2 class='carrinho_card'>R$ ${elem.valor.toFixed(2).replace('.', ',')} a unidade</h2>
            <input type="number" name='valor${i}' id='valor${i}' value="${elem.quantidade}" min="1">
            <h2 class='subtotal-item'> R$ ${(elem.valor * elem.quantidade).toFixed(2).replace('.', ',')}</h2>
        `;

        // PEGANDO ELEMENTOS ESPECÍFICOS DESTE CARD
        const inputQuantidade = sectionItem.querySelector(`#valor${i}`);
        const tagSubtotal = sectionItem.querySelector('.subtotal-item');

        // EVENTO: Atualizar quantidade e validar
        inputQuantidade.addEventListener('click', (e) => {
            let novaQtd = parseInt(e.target.value);

            // Validação: Não permite números nulos, negativos ou zeros
            if (isNaN(novaQtd) || novaQtd < 1) {
                novaQtd = 1;
                e.target.value = 1; // Força visualmente de volta para 1
            }

            // Atualiza o subtotal individual no HTML
            const novoSubtotal = (elem.valor * novaQtd);
            tagSubtotal.innerHTML = `R$ ${novoSubtotal.toFixed(2).replace('.', ',')}`;

            // Atualiza no LocalStorage
            atualizarQuantidade(i, novaQtd);

            // Atualiza o resumo financeiro da lateral
            atualizarResumoGeral();
        });

        const imgRemover = document.createElement('img');
        imgRemover.setAttribute('src', '../imagens/icones/icones/remover.png');
        imgRemover.setAttribute('alt', 'Remover');
        imgRemover.setAttribute('class', 'img-remover');

        imgRemover.addEventListener('click', () => {
            if(confirm(`Deseja remover ${elem.titulo} da sua lista?`)){
                removerItemCarrinho(i);
            }
        });

        sectionItem.appendChild(imgRemover);
        sectionItensCarrinho.appendChild(sectionItem);
    });

    // Ao montar a tela, atualiza o resumo lateral imediatamente
    atualizarResumoGeral();
}

const removerItemCarrinho = (pos) => {
    removerItem(pos);
    montaTelaCarrinho(); // Recarrega os cards
    atualizarResumoGeral(); // Recarrega os valores totais
}

montaTelaCarrinho();