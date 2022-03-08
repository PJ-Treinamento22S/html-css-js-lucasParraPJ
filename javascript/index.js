let qtdPosts = 0;
let posts = [];
let posicaoInsercao = 2;

async function getData() {
  const response = await fetch(
    "https://api.json-generator.com/templates/BQZ3wDrI6ts0/data?access_token=n7lhzp6uj5oi5goj0h2qify7mi2o8wrmebe3n5ad"
  );
  posts = await response.json();
  for (let i = posts.length - 1; i > -1; i--) {
    let dia = `${posts[i].created_at.slice(8, 10)} ${mesPort(
      posts[i].created_at.slice(5, 7)
    )} ${posts[i].created_at.slice(0, 4)}`;
    criarPost(
      posts[i].user.username,
      posts[i].user.photo,
      posts[i].text,
      dia,
      0
    );
  }
}

getData();

function mesPort(mes) {
  switch (mes) {
    case "01":
      return "jan";
    case "02":
      return "fev";
    case "03":
      return "mar";
    case "04":
      return "abr";
    case "05":
      return "mai";
    case "06":
      return "jun";
    case "07":
      return "jul";
    case "08":
      return "ago";
    case "09":
      return "set";
    case "10":
      return "out";
    case "11":
      return "nov";
    case "12":
      return "dez";
  }
}

function deletarPost(idPost) {
  const post = document.querySelector(`#${idPost}`);
  post.remove();
}

function destacar(idPost) {
  const post = document.querySelector(`#${idPost}`);
  const user = post.firstChild.lastChild.firstChild.innerHTML
    .split(" . ")[0]
    .slice(1)
    .trim();

  const data = post.firstChild.lastChild.firstChild.innerHTML
    .split(" . ")[1]
    .trim();
  const conteudo = post.firstChild.lastChild.lastChild.innerHTML;

  const foto = post.firstChild.firstChild.src;
  criarPost(user, foto, conteudo, data, 0);
  const likes = post.lastChild.firstChild.lastChild.innerHTML;
  const comentarios = post.children.item(1).lastChild.innerHTML;
  const compartilhamentos = post.lastChild.lastChild.lastChild.innerHTML;
  const novoPost = document.querySelector(`#post-${qtdPosts - 1}`);

  novoPost.lastChild.firstChild.lastChild.innerHTML = likes;
  if (post.lastChild.firstChild.firstChild.style.color == "rgb(203, 124, 6)") {
    novoPost.lastChild.firstChild.firstChild.style.color = "rgb(203, 124, 6)";
  }

  novoPost.lastChild.lastChild.lastChild.innerHTML = compartilhamentos;
  if (post.lastChild.lastChild.firstChild.style.color == "rgb(203, 124, 6)") {
    novoPost.lastChild.lastChild.firstChild.style.color = "rgb(203, 124, 6)";
  }

  novoPost.children
    .item(1)
    .firstChild.firstChild.classList.remove("fa-arrow-up");
  novoPost.children
    .item(1)
    .firstChild.firstChild.classList.add("fa-arrow-down");
  novoPost.children.item(1).firstChild.removeAttribute("onclick");
  novoPost.children
    .item(1)
    .firstChild.setAttribute(
      "onclick",
      `tirarDestacar("post-${qtdPosts - 1}")`
    );

  novoPost.style.borderColor = "rgb(0,255,255)";
  novoPost.style.boxShadow = "0 0 10px rgb(0,255,255)";
  post.remove();
  posicaoInsercao += 1;
}

function tirarDestacar(idPost) {
  const post = document.querySelector(`#${idPost}`);
  const user = post.firstChild.lastChild.firstChild.innerHTML
    .split(" . ")[0]
    .slice(1)
    .trim();
  const data = post.firstChild.lastChild.firstChild.innerHTML
    .split(" . ")[1]
    .trim();
  const conteudo = post.firstChild.lastChild.lastChild.innerHTML;

  const foto = post.firstChild.firstChild.src;
  criarPost(user, foto, conteudo, data, 0);
  const likes = post.lastChild.firstChild.lastChild.innerHTML;
  const comentarios = post.children.item(1).lastChild.innerHTML;
  const compartilhamentos = post.lastChild.lastChild.lastChild.innerHTML;
  const novoPost = document.querySelector(`#post-${qtdPosts - 1}`);

  novoPost.lastChild.firstChild.lastChild.innerHTML = likes;
  if (post.lastChild.firstChild.firstChild.style.color == "rgb(203, 124, 6)") {
    novoPost.lastChild.firstChild.firstChild.style.color = "rgb(203, 124, 6)";
  }

  novoPost.lastChild.lastChild.lastChild.innerHTML = compartilhamentos;
  if (post.lastChild.lastChild.firstChild.style.color == "rgb(203, 124, 6)") {
    novoPost.lastChild.lastChild.firstChild.style.color = "rgb(203, 124, 6)";
  }

  if (
    post.firstChild.lastChild.firstChild.innerHTML.split(".")[0].trim() ==
    "@username123"
  ) {
    let botaoDelete = document.createElement("button");
    let iconeDelete = document.createElement("i");
    botaoDelete.classList.add("deletaPosts");
    iconeDelete.classList.add("fa-x");
    iconeDelete.classList.add("fa-solid");
    botaoDelete.setAttribute("onclick", `deletarPost("post-${qtdPosts - 1}")`);
    novoPost.appendChild(botaoDelete);
    botaoDelete.appendChild(iconeDelete);
    novoPost.children[1].appendChild(botaoDelete);
  }

  novoPost.style.borderColor = "rgba(203, 124, 6, 1)";
  novoPost.style.boxShadow = "0";

  document
    .querySelector(".containerCentral")
    .insertBefore(
      novoPost,
      document.querySelector(".containerCentral").children[posicaoInsercao]
    );

  posicaoInsercao -= 1;

  post.remove();
}

/*
<div class="piu">
          <div class="imgETexto">
            <img src="../imagens/cachorro.jpg" class="fotoPerfil" />
            <div class="textosPosts">
              <p class="userEData">@username123.data</p>
              <p class="conteudoPost">Conteudo post</p>
            </div>
          </div>
          <button class="ajustesPosts"><i class="fa-solid fa-gear"></i></button>
          <div class="interacoes">
            <button><i class="fa-solid fa-thumbs-up"></i></button>
            <button><i class="fa-solid fa-comment-dots"></i></button>
            <button><i class="fa-solid fa-retweet"></i></button>
          </div>
        </div>

*/

function buscar(busca) {
  const pius = Array.from(
    document.querySelector(".containerCentral").children
  ).slice(2);
  pius.forEach((piu) => piu.remove());
  let piusFiltrados = posts.filter(
    (piu) => piu.user.username.slice(0, busca.length) == busca
  );
  piusFiltrados
    .reverse()
    .forEach((piu) =>
      criarPost(
        piu.user.username,
        piu.user.photo,
        piu.text,
        `${piu.created_at.slice(8, 10)} ${mesPort(
          piu.created_at.slice(5, 7)
        )} ${piu.created_at.slice(0, 4)}`
      )
    );
  document
    .querySelectorAll(".containerLateral")[1]
    .insertBefore(
      document.querySelector("#containerBusca"),
      document.querySelector("#containerNoticias")
    );
  document.querySelector("#busca").value = "";
}

document.querySelector("#busca").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    buscar(document.querySelector("#busca").value);
  }
});

function postar() {
  let conteudo = document.querySelector("#conteudoNovoPiu").value;
  if (conteudo.length != 0 && conteudo.length <= 140) {
    criarPost("username123", "../imagens/cachorro.jpg", conteudo, "24 fev", 1);
    document.querySelector("#conteudoNovoPiu").value = "";
  } else if (conteudo.length == 0) {
    let mensagem = document.createElement("p");
    mensagem.classList.add("msgVazia");
    mensagem.innerHTML = "Escreva algo antes de postar";
    document.querySelector("#novoPiu").appendChild(mensagem);
    setTimeout(() => mensagem.remove(), 2000);
  } else {
    let mensagem = document.createElement("p");
    mensagem.classList.add("msgVazia");
    mensagem.innerHTML = "Texto muito longo";
    document.querySelector("#novoPiu").appendChild(mensagem);
    setTimeout(() => mensagem.remove(), 2000);
  }
}

function like(id) {
  let botao = document.querySelector(`#${id}`);
  let likes = botao.lastChild;
  if (botao.firstChild.style.color == "black") {
    botao.firstChild.style.color = "rgba(203, 124, 6, 1)";
    likes.innerHTML = String(parseInt(likes.innerHTML) + 1);
  } else {
    botao.firstChild.style.color = "black";
    likes.innerHTML = String(parseInt(likes.innerHTML) - 1);
  }
}

function rt(id) {
  let botao = document.querySelector(`#${id}`);
  let rt = botao.lastChild;
  if (botao.firstChild.style.color == "black") {
    botao.firstChild.style.color = "rgba(203, 124, 6, 1)";
    rt.innerHTML = String(parseInt(rt.innerHTML) + 1);
  } else {
    botao.firstChild.style.color = "black";
    rt.innerHTML = String(parseInt(rt.innerHTML) - 1);
  }
}

function contarCaracteres() {
  let numeroCaracteres =
    document.querySelector("#conteudoNovoPiu").value.length;
  document.querySelector(
    "#contadorCaracter"
  ).innerHTML = `${numeroCaracteres}/140`;
  if (numeroCaracteres > 140) {
    document.querySelector("#contadorCaracter").style.color = "red";
  } else {
    document.querySelector("#contadorCaracter").style.color =
      "rgba(203, 124, 6, 1)";
  }
}

function criarPost(username, foto, conteudo, dataCriacao, meu) {
  let containerGeral = document.createElement("div");
  let containerImgETexto = document.createElement("div");
  let fotoPerfil = document.createElement("img");
  let containerTextos = document.createElement("div");
  let userEDataCriacao = document.createElement("p");
  let conteudoPost = document.createElement("p");
  let iconeAjustes = document.createElement("i");
  let divIcones = document.createElement("div");
  let botaoLike = document.createElement("button");
  let botaoComentar = document.createElement("button");
  let botaoCompartilhar = document.createElement("button");
  let botaoDestacar = document.createElement("button");
  let iconeDestacar = document.createElement("i");
  let iconeLike = document.createElement("i");
  let iconeComentar = document.createElement("i");
  let iconeCompartilhar = document.createElement("i");
  let qtdLike = document.createElement("p");
  let qtdComentario = document.createElement("p");
  let qtdCompartilhar = document.createElement("p");
  let divAcoes = document.createElement("div");

  fotoPerfil.src = foto;
  userEDataCriacao.innerText = `@${username} . ${dataCriacao}`;
  conteudoPost.innerText = conteudo;
  qtdLike.innerHTML = "0";
  qtdComentario.innerHTML = "0";
  qtdCompartilhar.innerHTML = "0";
  iconeLike.style.color = "black";
  iconeComentar.style.color = "black";
  iconeCompartilhar.style.color = "black";

  containerGeral.classList.add("piu");
  containerImgETexto.classList.add("imgETexto");
  fotoPerfil.classList.add("fotoPerfil");
  containerTextos.classList.add("textosPosts");
  userEDataCriacao.classList.add("userEData");
  conteudoPost.classList.add("conteudoPost");
  divIcones.classList.add("interacoes");
  botaoDestacar.classList.add("destacaPosts");
  iconeDestacar.classList.add("fa-solid");
  iconeDestacar.classList.add("fa-arrow-up");
  iconeLike.classList.add("fa-solid");
  iconeLike.classList.add("fa-thumbs-up");
  iconeComentar.classList.add("fa-solid");
  iconeComentar.classList.add("fa-comment-dots");
  iconeCompartilhar.classList.add("fa-solid");
  iconeCompartilhar.classList.add("fa-retweet");
  divAcoes.classList.add("acoes");

  botaoLike.setAttribute("id", `like-${qtdPosts}`);
  botaoLike.setAttribute("onclick", `like("like-${qtdPosts}")`);
  botaoComentar.setAttribute("id", `comentario-${qtdPosts}`);
  botaoCompartilhar.setAttribute("id", `compartilhar-${qtdPosts}`);
  botaoCompartilhar.setAttribute("onclick", `rt("compartilhar-${qtdPosts}")`);
  botaoDestacar.setAttribute("onclick", `destacar("post-${qtdPosts}")`);
  containerGeral.setAttribute("id", `post-${qtdPosts}`);

  containerGeral.appendChild(containerImgETexto);
  containerGeral.appendChild(botaoDestacar);
  containerGeral.appendChild(divAcoes);
  containerGeral.appendChild(divIcones);

  containerImgETexto.appendChild(fotoPerfil);
  containerImgETexto.appendChild(containerTextos);

  containerTextos.appendChild(userEDataCriacao);
  containerTextos.appendChild(conteudoPost);

  divAcoes.appendChild(botaoDestacar);

  divIcones.appendChild(botaoLike);
  divIcones.appendChild(botaoComentar);
  divIcones.appendChild(botaoCompartilhar);

  botaoLike.appendChild(iconeLike);
  botaoLike.appendChild(qtdLike);

  botaoComentar.appendChild(iconeComentar);
  botaoComentar.appendChild(qtdComentario);

  botaoCompartilhar.appendChild(iconeCompartilhar);
  botaoCompartilhar.appendChild(qtdCompartilhar);

  botaoDestacar.appendChild(iconeDestacar);

  if (meu == 1) {
    let botaoDelete = document.createElement("button");
    let iconeDelete = document.createElement("i");
    botaoDelete.classList.add("deletaPosts");
    iconeDelete.classList.add("fa-x");
    iconeDelete.classList.add("fa-solid");
    botaoDelete.setAttribute("onclick", `deletarPost("post-${qtdPosts}")`);
    containerGeral.appendChild(botaoDelete);
    botaoDelete.appendChild(iconeDelete);
    divAcoes.appendChild(botaoDelete);
  }

  document
    .querySelector(".containerCentral")
    .insertBefore(
      containerGeral,
      document.querySelector(".containerCentral").children[posicaoInsercao]
    );
  qtdPosts += 1;
}

/*

<div class="piu">
          <div class="imgETexto">
            <img src="../imagens/cachorro.jpg" class="fotoPerfil" />
            <div class="textosPosts">
              <p class="userEData">@username123.data</p>
              <p class="conteudoPost">Conteudo post</p>
            </div>
          </div>
          <button class="ajustesPosts"><i class="fa-solid fa-gear"></i></button>
          <div class="interacoes">
            <button><i class="fa-solid fa-thumbs-up"></i></button>
            <button><i class="fa-solid fa-comment-dots"></i></button>
            <button><i class="fa-solid fa-retweet"></i></button>
          </div>
        </div>

*/
