console.log("🔐 login.js carregado!");

const formCadastro = document.getElementById("form-cadastro");
if (formCadastro) {
  formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeCadastro").value.trim();
    const email = document.getElementById("emailCadastro").value.trim();
    const senha = document.getElementById("senhaCadastro").value.trim();
    const confirmaSenha = document.getElementById("confirmaSenha").value.trim();

    if (!nome || !email || !senha || !confirmaSenha) {
      alert("⚠️ Preencha todos os campos!");
      return;
    }

    if (senha !== confirmaSenha) {
      alert("⚠️ As senhas não coincidem!");
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find((u) => u.email === email);

    if (existe) {
      alert("⚠️ Já existe uma conta com esse email!");
      return;
    }
    usuarios.push({ nome, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ Conta criada com sucesso!");
    window.location.href = "login.html";
  });
}

const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value.trim();

    if (!email || !senha) {
      alert("⚠️ Preencha todos os campos!");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuario) {
      alert(`👋 Bem-vindo(a), ${usuario.nome}!`);
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      window.location.href = "index.html";
    } else {
      alert("❌ Email ou senha incorretos!");
    }
  });
}
function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}
function verificarLogin() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario) {
    alert("⚠️ Faça login para acessar esta página!");
    window.location.href = "login.html";
  } else {
    console.log("Usuário logado:", usuario.nome);
  }
}