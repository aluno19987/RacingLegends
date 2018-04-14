document.addEventListener('DOMContentLoaded',function main(){
    //ecraCategorias();
    //ecraPilotos("f1");
    ecraDetalhes("colinmcrae");
})

function mostraCategorias(categorias) {
    topBar.addEventListener("click", voltaInicio);
    for (var i = 0; i < categorias.length; i++) {
        var categoria = categorias[i];
        var CatContainer = document.createElement('div');
        var idcategoria = categoria.id;
        CatContainer.setAttribute("id", categoria.id)
        CatContainer.addEventListener("click", function () { trocaCategPilotos(this.id); });

        var nomeContainer = document.createElement('h2');
        nomeContainer.textContent = categoria.name;

        
        var image = getImage(idcategoria);
        var imageContainer = document.createElement('img')
        imageContainer.setAttribute("src", image)

        var descContainer = document.createElement('div');
        descContainer.textContent = categoria.description;

        CatContainer.appendChild(nomeContainer);
        CatContainer.appendChild(imageContainer);
        CatContainer.appendChild(descContainer);
        

        categ.appendChild(CatContainer);
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
        var piloto = pilotos[i];
        var pilotoContainer = document.createElement('div');
        pilotoContainer.setAttribute("id", piloto.id)

        var nomeContainer = document.createElement('h3');
        nomeContainer.textContent = piloto.name;

        var idPiloto = piloto.id;
        var image = getImagePiloto(idPiloto);
        var imageContainer = document.createElement('img')
        imageContainer.setAttribute("src", image)

        var nacioContainer = document.createElement('div');
        nacioContainer.textContent = piloto.nationality;

        pilotoContainer.appendChild(nomeContainer);
        pilotoContainer.appendChild(imageContainer);
        pilotoContainer.appendChild(nacioContainer);


        drivers.appendChild(pilotoContainer);
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
    drivers.style.display = "block";
    ecraPilotos(idCategoria);
}

function voltaInicio() {
    categ.style.display = "block";
    drivers.style.display = "none";
    drivers.textContent = "";
}

function mostraDetalhes(detalhes) {
    var idPiloto = detalhes.id;
    var image = getImagePiloto(idPiloto);
    var imageContainer = document.createElement('img')
    imageContainer.setAttribute("src", image)
    details.appendChild(imageContainer);

    var nomeContainer = document.createElement("h3")
    nomeContainer.textContent = detalhes.name;
    if (detalhes.nickname != null) {
        nomeContainer.textContent +=" - "+ detalhes.nickname;
    }
    details.appendChild(nomeContainer);

    var nascContainer = document.createElement("p")
    nascContainer.textContent = "Data de Nascimento: " + detalhes.birth_date;
    details.appendChild(nascContainer);

    if (detalhes.death_date != null) {
        var falecimentoContainer = document.createElement("p")
        falecimentoContainer.textContent = "Data de Falecimento: " + detalhes.death_date;
        details.appendChild(falecimentoContainer);
    }

    var nCampionatosContainer = document.createElement("p")
    nCampionatosContainer.textContent = "Nº de Campeonatos Ganhos: " + detalhes.records.championship_victories;
    details.appendChild(nCampionatosContainer);

    var nCorridasGanhasContainer = document.createElement("p")
    nCorridasGanhasContainer.textContent = "Nº de Corridas Ganhas: " + detalhes.records.race_victories;
    details.appendChild(nCorridasGanhasContainer);

    var primeiraVitoriaContainer = document.createElement("p")
    primeiraVitoriaContainer.textContent = "Primeira vitória: " + detalhes.records.first_race_win;
    details.appendChild(primeiraVitoriaContainer);

    var biografiaContainer = document.createElement("p")
    biografiaContainer.textContent = "Biografia: " + detalhes.introduction;
    details.appendChild(biografiaContainer);

    var career = detalhes.career;
    for (var i = 0; i < career.length; i++) {
        var tituloCarreiraContainer = document.createElement("h3")
        tituloCarreiraContainer.textContent = detalhes.career[i].title;
        details.appendChild(tituloCarreiraContainer);

        var textoCarreiraContainer = document.createElement("p")
        textoCarreiraContainer.textContent = detalhes.career[i].text;
        details.appendChild(textoCarreiraContainer);

    }

    var imagens = detalhes.multimedia.images;
    for (var i = 0; i < imagens.length; i++) {
        var img = getImageMult(idPiloto, imagens[i].id);
        var imagemContainer = document.createElement('img')
        imagemContainer.setAttribute("src", img)
        mult.appendChild(imagemContainer);
    }
    



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