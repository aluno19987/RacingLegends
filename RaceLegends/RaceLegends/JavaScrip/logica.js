document.addEventListener('DOMContentLoaded',function main(){
    ecraCategorias()
    
})

function mostraCategorias(categorias) {
    for (var i = 0; i < categorias.length; i++) {
        var categoria = categorias[i];
        var CatContainer = document.createElement('div');
        CatContainer.setAttribute("id", categoria.id )

        var nomeContainer = document.createElement('h3');
        nomeContainer.textContent = categoria.name;

        var idcategoria = categoria.id;
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

