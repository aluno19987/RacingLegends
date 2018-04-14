document.addEventListener('DOMContentLoaded',function main(){
    ecraCategorias();
    //ecraPilotos("f1");
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
