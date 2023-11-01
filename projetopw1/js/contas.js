
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

var divUser = document.querySelector('.conteudoUser')
var email = document.querySelector('.email-input')
var senha = document.querySelector('.senha')
var nome = document.querySelector('.nomepessoa');
var botaoentrar = document.querySelector('.botaoentrar')
var conteudodiv = document.querySelector('.conteudoUser')
var criar = document.querySelector('.criar');
var carrinhoDiv = document.getElementById("carrinho");


// PROJETO PW PART 2:

const form = document.querySelector('#boxlog');

form.addEventListener('submit', async e => {

e.preventDefault();

const data = await fetch('usuario.php', {

method: 'POST',

body: new FormData(form)

}).then(res => res.json());

console.log(data);

});






//FUNÇÕES USUARIO - CRIAR CONTA (NEW)


function sairdaconta() {
  localStorage.removeItem("logado");
  window.location.href = 'usuario.html';
}

// Verificar se há alguém logado ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  var logado = localStorage.getItem('logado');
  if (logado) {
    // Alguém está logado
    var userlogado = JSON.parse(logado);
    conteudodiv.innerHTML = `<h1>Você está logado! Bem-vindo, ${userlogado.nome}</h1>`;

    var logout = document.createElement('button');
    logout.classList.add('sairconta');
    logout.textContent = 'Sair conta';
    conteudodiv.appendChild(logout);

    logout.addEventListener('click', sairdaconta);
  }
});


/*
// SENHA REVELADA 
function togglePasswordVisibility(icon) {
  var input = icon.previousElementSibling;
  if (input.type === "password") {
    input.type = "text";                // se o tipo do input for senha, estilo texto e classe active
    icon.classList.add("active");
  } else {
    input.type = "password";
    icon.classList.remove("active");  // se nao, ele remove a classe active e volta a ser oculto
  }
}



var contas = []

var criar = document.querySelector('.criar');


criar.addEventListener('click', () => {


  divUser.innerHTML = ''

  // MENSAGEM AO CLICAR NO BOTAO
  var mensagem = document.createElement("h1")
  mensagem.textContent = 'Crie sua conta aqui:'
  mensagem.classList.add("mensagemCriar");
  divUser.appendChild(mensagem);

  // CAIXA NOME
  var nomeCriar = document.createElement("input");
  nomeCriar.setAttribute("placeholder", "Digite seu nome:");
  nomeCriar.classList.add("nomeCriar");
  nomeCriar.style.display = "block";
  nomeCriar.style.width = "380px";
  nomeCriar.style.marginBottom = "2px";
  divUser.appendChild(nomeCriar);

  var caixaEmail = document.createElement("input");
  caixaEmail.setAttribute("placeholder", "exemplo@email.com");
  caixaEmail.classList.add("emailCriar");
  caixaEmail.style.display = "block";
  caixaEmail.style.width = "380px";
  caixaEmail.style.marginBottom = "2px";
  divUser.appendChild(caixaEmail);

  var caixaSenha = document.createElement("input");
  caixaSenha.setAttribute("placeholder", "Digite sua senha");
  caixaSenha.classList.add("senhaCriar");
  caixaSenha.style.display = "block";
  caixaSenha.style.width = "380px";
  caixaSenha.style.marginBottom = "2px";
  divUser.appendChild(caixaSenha);

  // Centralizar os inputs no meio do documento
  divUser.style.display = "flex";
  divUser.style.flexDirection = "column";
  divUser.style.alignItems = "center";


  //BOTAO CRIAR REGISTRO 
  var criarconta = document.createElement("button")
  criarconta.textContent = "REALIZAR CADASTRO"
  criarconta.classList.add("botaocadastro");
  divUser.appendChild(criarconta);

  var emailCriar = document.querySelector('.emailCriar');
  var senhaCriar = document.querySelector('.senhaCriar');
  var botaocadastro = document.querySelector('.botaocadastro');




  botaocadastro.addEventListener('click', () => {

    var login = {
      nome: nomeCriar.value,
      email: emailCriar.value,
      senha: senhaCriar.value
    }

    contas.push(login)

    //-----------------------------------------------------------------------------------------------------------------------------------------
    let users = JSON.stringify(contas);

    localStorage.setItem('user', users);

    //-----------------------------------------------------------------------------------------------------------------------------------------


    if (emailCriar.value === "" || senhaCriar.value === "" || nomeCriar === "") {
      var mensagemErro = document.createElement("p");
      mensagemErro.textContent = "É obrigatório seu nome, email e uma senha.";
      mensagemErro.style.color = "red";
      conteudodiv.appendChild(mensagemErro);
    }
    else {
      conteudodiv.innerHTML = `<h1>Você foi cadastrado com sucesso! Bem-vindo(a) ${login.nome}</h1>`;

      var userlogado = {
        email: login.email,
        nome: login.nome
      };

      localStorage.setItem('logado', JSON.stringify(userlogado));

      var logout = document.createElement('button');
      logout.classList.add('sairconta');
      logout.textContent = 'Sair conta';
      conteudodiv.appendChild(logout);

      logout.addEventListener('click', sairdaconta);
    }




  });

});





// BOTAO ENTRAR ACIONADO 



var nome = document.querySelector('.nomepessoa');

botaoentrar.addEventListener('click', () => {


  var busca = localStorage.getItem('user');
  contas = JSON.parse(busca);

  if (email.value === "" || senha.value === "" || nome.value === "") {
    var mensagemErro = document.createElement("p");
    mensagemErro.textContent = "É obrigatório um email, nome e uma senha.";
    mensagemErro.style.color = "red";
    conteudodiv.appendChild(mensagemErro);
  } else {
    var encontrado = false;
    for (var i = 0; i < contas.length; i++) {
      var usuario = contas[i];
      if (usuario.email === email.value && usuario.senha === senha.value && usuario.nome === nome.value) {
        encontrado = true;

        // BOTAR NUM OBJ AS INFORMACOES DO USUARIO ENCONTRADO
        var userlogado = {
          email: usuario.email,
          nome: usuario.nome
        }

        localStorage.setItem('logado', JSON.stringify(userlogado));
        // SALVA NO LS

        break;
      }
    }

    if (encontrado) {
      conteudodiv.innerHTML = `<h1>Você foi logado com sucesso! Bem-vindo(a), ${nome.value}</h1>`;


      var userlogado = {
        email: usuario.email,
        nome: usuario.nome
      }

      localStorage.setItem('logado', JSON.stringify(userlogado));


      var logout = document.createElement('button');
      logout.classList.add('sairconta');
      logout.textContent = 'Sair conta';
      conteudodiv.appendChild(logout);

      logout.addEventListener('click', sairdaconta);

    } else {
      var mensagemErro = document.createElement("p");
      mensagemErro.textContent = "Usuário não encontrado ou dados incorretos";
      mensagemErro.style.color = "red";
      conteudodiv.appendChild(mensagemErro);
    }
  }
});

*/