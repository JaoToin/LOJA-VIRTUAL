document.addEventListener("DOMContentLoaded", () => {
    
    // ====================================================================
    // 1. LÓGICA DO ÍCONE DO CARRINHO (Mostra a quantidade de itens)
    // ====================================================================
    function atualizarContadorCarrinho() {
        // Pega a quantidade do LocalStorage (memória do navegador)
        let quantidadeItens = localStorage.getItem('qtdCarrinho') || 0;
        
        // Procura os links que levam para a página do carrinho
        const iconesCarrinho = document.querySelectorAll('a[href*="carrinho.html"]');
        
        iconesCarrinho.forEach(link => {
            let badge = link.querySelector('.badge-carrinho');
            // Se o badge ainda não existir, cria ele
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'badge-carrinho';
                // Estilização do contador numérico bolinha vermelha
                badge.style.cssText = 'background-color: red; color: white; border-radius: 50%; padding: 2px 6px; font-size: 12px; position: absolute; top: -10px; right: -10px; font-weight: bold;';
                link.style.position = 'relative'; // Necessário para posicionar o badge no canto do ícone
                link.appendChild(badge);
            }
            // Atualiza o número do contador
            badge.innerText = quantidadeItens;
        });
    }

    // Chama a função logo que a página carrega
    atualizarContadorCarrinho();

    // ====================================================================
    // 2. LÓGICA DA PÁGINA INICIAL (Adicionar item e Redirecionar)
    // ====================================================================
    const botoesAdicionar = document.querySelectorAll('.bnt_card');
    
    if (botoesAdicionar.length > 0) {
        botoesAdicionar.forEach(botao => {
            botao.addEventListener('click', () => {
                // Aumenta +1 na quantidade do carrinho no LocalStorage
                let qtdAtual = parseInt(localStorage.getItem('qtdCarrinho') || 0);
                localStorage.setItem('qtdCarrinho', qtdAtual + 1);
                
                // Redireciona automaticamente para o carrinho.
                // Verifica o caminho para não dar erro de rota dependendo de onde está
                if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
                    window.location.href = 'paginas/carrinho.html';
                } else {
                    window.location.href = 'carrinho.html';
                }
            });
        });
    }

    // ====================================================================
    // 3. LÓGICA DA PÁGINA DO CARRINHO (Multiplicação e Somatório Total)
    // ====================================================================
    const containerCarrinho = document.getElementById('carrinho-container-principal');
    
    // Só executa essa parte se estivermos na página do carrinho
    if (containerCarrinho) {
        const cardsCarrinho = containerCarrinho.querySelectorAll('.card');
        const divValorTotalItens = document.getElementById('div-result-valor-itens');
        const divFrete = document.getElementById('div-result-frete');
        const divTotalPagar = document.getElementById('div-result-totalpagar');
        
        // Defina o valor fixo do frete aqui (Ex: R$ 20,00)
        const valorFreteFixo = 20.00; 
        
        // Imprime o frete na tela
        divFrete.innerText = `R$ ${valorFreteFixo.toFixed(2).replace('.', ',')}`;

        function calcularTotais() {
            let somaTotalItens = 0;

            cardsCarrinho.forEach(card => {
                // 1. Pega o valor unitário do texto do HTML (Ex: "R$ 25,00 unidade")
                const textoValor = card.querySelector('.carrinho_card').innerText;
                const valorUnitario = parseFloat(textoValor.replace('R$', '').replace('unidade', '').replace(',', '.').trim());
                
                // 2. Pega o input numérico e a div de resultado correspondente àquele card
                const inputQuantidade = card.querySelector('input[type="number"]');
                const divSubtotal = card.querySelector('div[id^="div-result-itens"]');
                
                // 3. Verifica o número digitado
                const quantidade = parseInt(inputQuantidade.value) || 0; 
                
                // 4. Multiplica valor pela quantidade
                const subtotal = valorUnitario * quantidade;
                
                // 5. Exibe no resultado do card (só mostra se for maior que 0)
                if (divSubtotal) {
                    divSubtotal.innerText = quantidade > 0 ? `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}` : '';
                    divSubtotal.style.fontWeight = "bold";
                    divSubtotal.style.color = "#2c7a2c"; // cor verde escura
                    divSubtotal.style.marginTop = "10px";
                }
                
                // 6. Vai somando ao total geral
                somaTotalItens += subtotal;
            });

            // 7. Atualiza os campos de resumo lá na lateral (Aside)
            divValorTotalItens.innerText = `R$ ${somaTotalItens.toFixed(2).replace('.', ',')}`;
            
            // Calcula o total com frete (só cobra o frete se tiver selecionado algum produto)
            const totalComFrete = somaTotalItens > 0 ? somaTotalItens + valorFreteFixo : 0;
            divTotalPagar.innerText = `R$ ${totalComFrete.toFixed(2).replace('.', ',')}`;
        }

        // Adiciona um "escutador" em cada input para refazer o cálculo em tempo real ao digitar
        cardsCarrinho.forEach(card => {
            const inputQuantidade = card.querySelector('input[type="number"]');
            if (inputQuantidade) {
                inputQuantidade.min = "0"; // Não deixa colocar número negativo na setinha
                inputQuantidade.addEventListener('input', calcularTotais);
            }
        });

        // Chama o cálculo uma vez no início para zerar as informações
        calcularTotais();
    }
});