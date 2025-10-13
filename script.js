const botoes = document.querySelectorAll('.botao');

if (botoes.length > 0) {
  botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();

      const nome = botao.dataset.nome;
      const preco = parseFloat(botao.dataset.preco);
      const img = botao.dataset.img || "https://via.placeholder.com/100x120";

      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

      const produtoExistente = carrinho.find(item => item.nome === nome);

      if (produtoExistente) {
        produtoExistente.quantidade += 1;
      } else {
        carrinho.push({ nome, preco, img, quantidade: 1 });
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      alert(`${nome} foi adicionado ao carrinho!`);
    });
  });
}

const tabela = document.querySelector('table tbody');
const subtotalSpan = document.querySelector('aside .info div span:last-child');
const totalSpan = document.querySelector('aside footer span:last-child');

if (tabela) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    tabela.innerHTML = `<tr><td colspan="5" style="text-align:center;">Seu carrinho está vazio 😕</td></tr>`;
    if (subtotalSpan) subtotalSpan.textContent = "R$ 0,00";
    if (totalSpan) totalSpan.textContent = "R$ 0,00";
  } else {
    atualizarCarrinho();
  }

  function atualizarCarrinho() {
    tabela.innerHTML = "";
    let subtotal = 0;

    carrinho.forEach((item, index) => {
      const totalItem = item.preco * item.quantidade;
      subtotal += totalItem;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="product">
            <img src="${item.img}" alt="${item.nome}">
            <div class="info">
              <div class="name">${item.nome}</div>
              <div class="category">Produto odontológico</div>
            </div>
          </div>
        </td>
        <td>R$ ${item.preco.toFixed(2)}</td>
        <td>
          <div class="qty">
            <button class="menos" data-index="${index}">-</button>
            <span>${item.quantidade}</span>
            <button class="mais" data-index="${index}">+</button>
          </div>
        </td>
        <td>R$ ${totalItem.toFixed(2)}</td>
        <td><button class="remove" data-index="${index}">x</button></td>
      `;
      tabela.appendChild(tr);
    });

    if (subtotalSpan) subtotalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (totalSpan) totalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;

    atualizarBotoes();
  }
  function atualizarBotoes() {
    document.querySelectorAll('.mais').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.dataset.index;
        carrinho[i].quantidade++;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
      });
    });
    document.querySelectorAll('.menos').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.dataset.index;
        if (carrinho[i].quantidade > 1) {
          carrinho[i].quantidade--;
        } else {
          carrinho.splice(i, 1);
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
      });
    });

    document.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.dataset.index;
        carrinho.splice(i, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
      });
    });
  }
}
const btnLimpar = document.getElementById('limpar');
if (btnLimpar) {
  btnLimpar.addEventListener('click', () => {
    localStorage.removeItem('carrinho');
    location.reload();
  });
}
