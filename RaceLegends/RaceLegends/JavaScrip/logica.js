document.addEventListener('DOMContentLoaded', function main() {
    var tituloContainer = document.createElement("h1");
    tituloContainer.textContent = "Racing Legends";
    tituloContainer.setAttribute("style", "color:cadetblue");
    tituloContainer.setAttribute("id","titulo")
    tituloContainer.addEventListener("click", voltaInicio);
 
    var botao = document.createElement("button");
    botao.textContent = "<-";
    botao.setAttribute("id", "volta");
    botao.classList.add("float-right");
    botao.setAttribute("style", "position: relative; top:10px; right:10px; display:none;");
    botao.addEventListener("click", volta);

    topBar.appendChild(botao);
    topBar.appendChild(tituloContainer);

    ecraCategorias();
    //ecraPilotos("f1");
    //ecraDetalhes("colinmcrae");
});



function mostraCategorias(categorias) {
    for (var i = 0; i < categorias.length; i++) {

        var Container = document.createElement('div');

        Container.classList.add("col-sm-12");
        Container.classList.add("col-md-12");
        Container.classList.add("col-lg-6");
        Container.setAttribute("style", "width: 35rem;");
        var categoria = categorias[i];
        var CatContainer = document.createElement('div');
        var idcategoria = categoria.id;
        CatContainer.setAttribute("class", "card");

        CatContainer.setAttribute("style", "width: 33.5rem; height: 410px; ");
        CatContainer.setAttribute("id", categoria.id);
        CatContainer.addEventListener("click", function () { trocaCategPilotos(this.id); });

        var image = getImage(idcategoria);
        var imageContainer = document.createElement('img');
        
        imageContainer.setAttribute("class", "card-img-top");
        imageContainer.setAttribute("style", "object-fit: cover; width:33.4rem; height: 300px");
        imageContainer.setAttribute("src", image);

        var nomeContainer = document.createElement('h2');
        nomeContainer.textContent = categoria.name;
        nomeContainer.setAttribute("class", "card-title");
        
        

        var descContainer = document.createElement('div');
        descContainer.textContent = categoria.description;
        descContainer.setAttribute("class", "card-text");


        CatContainer.appendChild(nomeContainer);
        CatContainer.appendChild(imageContainer);
        CatContainer.appendChild(descContainer);

        Container.appendChild(CatContainer);
        categ.appendChild(Container);
    }
}
    
function ecraCategorias() {
    return getCategorias()
        .then(function (categorias) {
            mostraCategorias(categorias);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

function mostraPilotos(pilotos) {
    for (var i = 0; i < pilotos.length; i++) {
        var Container = document.createElement('div');
        Container.classList.add("col-sm-12");
        Container.classList.add("col-md-6");
        Container.classList.add("col-lg-4");
        Container.setAttribute("style", "width: 25rem;");

        var piloto = pilotos[i];
        var pilotoContainer = document.createElement('div');
        pilotoContainer.setAttribute("id", piloto.id);
        pilotoContainer.setAttribute("class", "card");
        pilotoContainer.addEventListener("click", function () { trocaPilotoDetalhes(this.id); });
        pilotoContainer.setAttribute("style", "width: 20rem;");

        var idPiloto = piloto.id;
        var image = getImagePiloto(idPiloto);
        var imageContainer = document.createElement('img');
        imageContainer.setAttribute("style", "object-fit: cover; width:19.9rem; height: 300px");
        imageContainer.setAttribute("src", image);
        imageContainer.setAttribute("class", "card-img-top");


        var nomeContainer = document.createElement('h3');
        nomeContainer.setAttribute("class", "card-title");
        nomeContainer.textContent = piloto.name;

        

        var nacioContainer = document.createElement('div');
        nacioContainer.textContent = piloto.nationality;
        nacioContainer.setAttribute("class", "card-text");
        pilotoContainer.appendChild(nomeContainer);
        pilotoContainer.appendChild(imageContainer);
        pilotoContainer.appendChild(nacioContainer);

        Container.appendChild(pilotoContainer);
        drivers.appendChild(Container);
    }
}


function ecraPilotos(idCateg) {
    return getPilotos(idCateg)
        .then(function (pilotos) {
            mostraPilotos(pilotos);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

function trocaCategPilotos(idCategoria) {
    categ.style.display = "none";
    drivers.style.display = "flex";
    document.getElementById("volta").style.display = "block";
    ecraPilotos(idCategoria);
}

function voltaInicio() {
    document.getElementById("volta").style.display = "none";
    categ.style.display = "flex";
    drivers.style.display = "none";
    drivers.textContent = "";
    details.style.display = "none";
    details.textContent = "";
    document.getElementById("titulo").setAttribute("style", "color:cadetblue");
    
}

function mostraDetalhes(detalhes) {

    var right = document.createElement('div');
    var multim = document.createElement('div');

    var topo = document.createElement('div');
    topo.classList.add("row");
    

    var idPiloto = detalhes.id;
    var image = getImagePiloto(idPiloto);
    var imageContainer = document.createElement('img');
    imageContainer.setAttribute("src", image);
    imageContainer.classList.add("img-thumbnail");
    imageContainer.setAttribute("style","object-fit: cover; width:250px; height: 300px; position:relative; left:100 px;")
    topo.appendChild(imageContainer);

    
    var topoDireito = document.createElement('div');
    topoDireito.classList.add("container");


    var nomeContainer = document.createElement("h3");
    nomeContainer.textContent = detalhes.name;
    nomeContainer.setAttribute("style","color:#A0522D")
    if (detalhes.nickname !== null) {
        nomeContainer.textContent +=" - "+ detalhes.nickname;
    }
    topoDireito.appendChild(nomeContainer);

    var nascContainer = document.createElement("p");
    nascContainer.textContent = "Data de Nascimento: " + detalhes.birth_date;
    topoDireito.appendChild(nascContainer);

    if (detalhes.death_date !== null) {
        var falecimentoContainer = document.createElement("p");
        falecimentoContainer.textContent = "Data de Falecimento: " + detalhes.death_date;
        topoDireito.appendChild(falecimentoContainer);
    }

    var nCampionatosContainer = document.createElement("p");
    nCampionatosContainer.textContent = "Nº de Campeonatos Ganhos: " + detalhes.records.championship_victories;
    topoDireito.appendChild(nCampionatosContainer);

    var nCorridasGanhasContainer = document.createElement("p");
    nCorridasGanhasContainer.textContent = "Nº de Corridas Ganhas: " + detalhes.records.race_victories;
    topoDireito.appendChild(nCorridasGanhasContainer);

    var primeiraVitoriaContainer = document.createElement("p");
    primeiraVitoriaContainer.textContent = "Primeira vitória: " + detalhes.records.first_race_win;
    topoDireito.appendChild(primeiraVitoriaContainer);

    topo.appendChild(topoDireito);
    right.appendChild(topo);

    var biografiaTitulo = document.createElement("h3");
    biografiaTitulo.textContent = "Biografia: ";
    biografiaTitulo.setAttribute("style", "color:#A0522D")
    right.appendChild(biografiaTitulo);

    var biografiaContainer = document.createElement("p");
    biografiaContainer.textContent = detalhes.introduction;
    biografiaContainer.classList.add("justify");
    biografiaContainer.setAttribute("style","font-size:18px;");
    right.appendChild(biografiaContainer);

    var career = detalhes.career;
    for (var i = 0; i < career.length; i++) {
        var tituloCarreiraContainer = document.createElement("h3");
        tituloCarreiraContainer.textContent = detalhes.career[i].title;
        tituloCarreiraContainer.setAttribute("style", "color:#A0522D")
        right.appendChild(tituloCarreiraContainer);

        var textoCarreiraContainer = document.createElement("p");
        textoCarreiraContainer.textContent = detalhes.career[i].text;
        right.appendChild(textoCarreiraContainer);

    }

    var imagens = detalhes.multimedia.images;
    for ( i = 0; i < imagens.length; i++) {
        var img = getImageMult(idPiloto, imagens[i].id);
        var imagemContainer = document.createElement('img');
        imagemContainer.setAttribute("style", "width:300px; padding:10px")
        imagemContainer.classList.add("imagem");
        imagemContainer.setAttribute("src", img);
        imageContainer.setAttribute("data-toggle", "modal");
        imageContainer.setAttribute("data-target", ".bd-example-modal-lg");

        multim.appendChild(imagemContainer);
    }

    //var videos = detalhes.multimedia.videos;
    //for ( i = 0; i < videos.length; i++) {
    //    var frame = document.createElement('iframe');
    //    var url = "https://www.youtube.com/embed/";
    //    url += videos[i].youtube_id;
    //    frame.setAttribute("src", url);
    //    frame.setAttribute("allow", "autoplay; encrypted-media");
    //    frame.setAttribute("allowfullscreen", "allowfullscreen");
    //    multim.appendChild(frame);
    //}

    multim.classList.add("float-right")

    multim.setAttribute("style", "width:300px;  ")
    details.appendChild(multim);
    details.appendChild(right);
    
    $(document).ready(function () {
        $('.imagem').click(function (event) {
            event.preventDefault();
            $('.modal img').attr('src', $(this).attr('src'));
            $('.modal').modal('show');
        })
    })
   


}


function ecraDetalhes(idPiloto) {
    return getDetalhes(idPiloto)
        .then(function (detalhes) {
            mostraDetalhes(detalhes);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

function trocaPilotoDetalhes(idPiloto) {
    drivers.style.display = "none";
    details.style.display = "block";
    ecraDetalhes(idPiloto);
    document.getElementById("titulo").setAttribute("style","color:#A0522D")
}

function volta() {
    if (details.style.display !== "none") {
        details.style.display = "none";
        details.textContent = "";
        drivers.style.display = "flex";
        document.getElementById("titulo").setAttribute("style", "color:cadetblue");
    } else if (drivers.style.display !== "none") {
        categ.style.display = "flex";
        document.getElementById("volta").style.display = "none";
        drivers.style.display = "none";
        drivers.textContent = "";
    } 
}