function postar() {
  let conteudo = document.querySelector("#conteudoNovoPiu").value;
  if (conteudo.length != 0 && conteudo.length <= 140) {
    criarPost("lucas", "../imagens/cachorro.jpg", conteudo, "24 fev");
  } else if(conteudo.length == 0){
    let mensagem = document.createElement("p");
    mensagem.classList.add("msgVazia");
    mensagem.style.top = "23%"
    mensagem.style.left = "48%"
    mensagem.innerHTML = "Escreva algo antes de postar"
    document.querySelector("#novoPiu").appendChild(mensagem)
    setTimeout(() => mensagem.remove(), 2000)
  }
  else{
    let mensagem = document.createElement("p");
    mensagem.classList.add("msgVazia");
    mensagem.style.top = "23%"
    mensagem.style.left = "52%"
    mensagem.innerHTML = "Texto muito longo"
    document.querySelector("#novoPiu").appendChild(mensagem)
    setTimeout(() => mensagem.remove(), 2000)
  }
  document.querySelector("#conteudoNovoPiu").value = "";
}


function contarCaracteres(){
  let numeroCaracteres = document.querySelector("#conteudoNovoPiu").value.length;
  document.querySelector("#contadorCaracter").innerHTML = `${numeroCaracteres}/140`
  if(numeroCaracteres > 140){
    document.querySelector("#contadorCaracter").style.color = "red"
  }
  else{
    document.querySelector("#contadorCaracter").style.color = "rgba(203, 124, 6, 1)"
  }
}

function criarPost(username, foto, conteudo, dataCriacao) {
  let containerGeral = document.createElement("div");
  let containerImgETexto = document.createElement("div");
  let fotoPerfil = document.createElement("img");
  let containerTextos = document.createElement("div");
  let userEDataCriacao = document.createElement("p");
  let conteudoPost = document.createElement("p");
  let botaoAjustes = document.createElement("button");
  let iconeAjustes = document.createElement("i");
  let divIcones = document.createElement("div");
  let botaoLike = document.createElement("button");
  let botaoComentar = document.createElement("button");
  let botaoCompartilhar = document.createElement("button");
  let iconeLike = document.createElement("i");
  let iconeComentar = document.createElement("i");
  let iconeCompartilhar = document.createElement("i");

  fotoPerfil.src = foto;
  userEDataCriacao.innerText = `@${username}.${dataCriacao}`;
  conteudoPost.innerText = conteudo;

  containerGeral.classList.add("piu");
  containerImgETexto.classList.add("imgETexto");
  fotoPerfil.classList.add("fotoPerfil");
  containerTextos.classList.add("textosPosts");
  userEDataCriacao.classList.add("userEData");
  conteudoPost.classList.add("conteudoPost");
  botaoAjustes.classList.add("ajustesPosts");
  iconeAjustes.classList.add("fa-solid");
  iconeAjustes.classList.add("fa-gear");
  divIcones.classList.add("interacoes");
  iconeLike.classList.add("fa-solid");
  iconeLike.classList.add("fa-thumbs-up");
  iconeComentar.classList.add("fa-solid");
  iconeComentar.classList.add("fa-comment-dots");
  iconeCompartilhar.classList.add("fa-solid");
  iconeCompartilhar.classList.add("fa-retweet");

  containerGeral.appendChild(containerImgETexto);
  containerImgETexto.appendChild(fotoPerfil);
  containerImgETexto.appendChild(containerTextos);
  containerTextos.appendChild(userEDataCriacao);
  containerTextos.appendChild(conteudoPost);

  containerGeral.appendChild(botaoAjustes);
  botaoAjustes.appendChild(iconeAjustes);
  containerGeral.appendChild(divIcones);
  divIcones.appendChild(botaoLike);
  divIcones.appendChild(botaoComentar);
  divIcones.appendChild(botaoCompartilhar);
  botaoLike.appendChild(iconeLike);
  botaoComentar.appendChild(iconeComentar);
  botaoCompartilhar.appendChild(iconeCompartilhar);

  document
    .querySelector(".containerCentral")
    .insertBefore(
      containerGeral,
      document.querySelector(".containerCentral").children[2]
    );
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