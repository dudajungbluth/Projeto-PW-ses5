function pag() {
  window.location.href = "index.html";
}
function user() {
  window.location.href = "usuario.html";
}
function roupas() {
  window.location.href = "roupas.html";
}
function abrirCarrinho() {
 
  carrinhoDiv.style.display = "block";
}
function fecharCarrinho() {
  var carrinhoDiv = document.getElementById("carrinho");
  carrinhoDiv.style.display = "none";
}


// PROJETO PW PART 2

window.addEventListener('DOMContentLoaded', async() => {
  let produtosadc = await fetch('mostrarprodutos.php').then(res => res.json());
  console.log(produtosadc);

  conteiner.innerHTML = ''; // Limpa a pagina antes de adicionar os produtos

  for (let i in produtosadc) {
    let produto = produtosadc[i];

    const div = document.createElement('div');
    div.classList.add('boxfem');
    div.innerHTML = `<img class="imagem" src="${produto.url_prod}">
      <p class="nomepeca">${produto.nome_prod}</p>
      <div class="linha">
        <p class="p">R$</p>
        <p class="precos">${produto.preco_prod}</p><br>
        <button class="adicionar">Adicionar ao carrinho</button>
      </div>`;

    conteiner.appendChild(div);

    const botaoAdicionar = div.querySelector('.adicionar');
    
    botaoAdicionar.addEventListener('click', () => {

      console.log('Clique no botão Adicionar ao carrinho');
      const existingProduct = produtosCarrinho.find((prod) => prod.nome_prod === produto.nome_prod);
    
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        produto.quantity = 1;
        produtosCarrinho.push(produto);
      }
    
      console.log(produtosCarrinho); 
      atualizarCarrinho()
      const jsccarro = JSON.stringify(produtosCarrinho);
      localStorage.setItem('produto', jsccarro);
    });
  }    
  


  });

  let produtosCarrinho = [];
  var conteiner = document.querySelector('.conteiner');
  var carrinhoDiv = document.getElementById("carrinho");

  atualizarCarrinho()


// Evento disparado quando a página é carregada
window.addEventListener('DOMContentLoaded', () => {
  carregarCarrinhoLocalStorage();

  var add = document.querySelectorAll('.adicionar');
  add.forEach((botao) => {
    botao.addEventListener('click', adicionarAoCarrinho);

  });
});

window.addEventListener('DOMContentLoaded', () => {
  carregarCarrinhoLocalStorage();
  atualizarCarrinho()
});


function adicionarAoCarrinho() {
  salvarCarrinhoLocalStorage();
  atualizarCarrinho();
}


function salvarCarrinhoLocalStorage() {
  localStorage.setItem('carrinho', JSON.stringify(produtosCarrinho));
}


// Função para carregar o carrinho a partir do armazenamento local
function carregarCarrinhoLocalStorage() {
  var carrinhoArmazenado = localStorage.getItem('carrinho');
  console.log(carrinhoArmazenado)
  if (carrinhoArmazenado) {
    produtosCarrinho = JSON.parse(carrinhoArmazenado);
    atualizarCarrinho();
  }
}


function atualizarCarrinho() {
  carrinhoDiv.innerHTML = '';
  let total = 0;
  for (let i in produtosCarrinho) {
    let produto = produtosCarrinho[i];
    var colocam = document.createElement('div');
    colocam.innerHTML = `
      <img class="imgcarrinho" src="${produto.url_prod}">
      <p class="nomecarrinho">${produto.nome_prod}</p>
      <p class="precocarrinho">R$ ${produto.preco_prod * produto.quantity}</p>
      <div>
        <button class="remove-button">-</button>
        <span class="quantity">${produto.quantity}</span>
        <button class="add-button">+</button>
    `;
    carrinhoDiv.appendChild(colocam);
  
    total += produto.preco_prod * produto.quantity;
  
    const addButton = colocam.querySelector('.add-button');
    const removeButton = colocam.querySelector('.remove-button');
  
    addButton.addEventListener('click', () => {
      produto.quantity += 1;
      salvarCarrinhoLocalStorage();
      atualizarCarrinho();
    });
  
    removeButton.addEventListener('click', () => {
      if (produto.quantity > 0) {
        produto.quantity -= 1;
        if (produto.quantity <= 0) {
          produtosCarrinho = produtosCarrinho.filter((item) => item !== produto);
        }
        salvarCarrinhoLocalStorage();
        atualizarCarrinho();
      }
    });
  }
  
  carrinhoDiv.insertAdjacentHTML('beforeend', `<hr class="hr"><p class='total'>Subtotal:  R$${total}</p><button class="botaofechar" onclick="fecharCarrinho()">FECHAR</button>`);
}  