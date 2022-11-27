/* const CAT_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json" */

let ListaProd = [];
let min = undefined;
let max = undefined;

/* Esta función se encarga de guardar el identificador del producto en el almacenamiento local, para que posteriormente
ese dato sea accedido al momento de realizar la request al servidor. */
function setProductID(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html";
}


 
function SetProductCategory() {
    let ProductCat = PRODUCTS_URL + localStorage.getItem("catID") + ".json";
    return ProductCat;
}
/* ShowProductList se encarga de imprimir en el HTML una plantilla con la informacion del producto. 
    Recibe como parametro una lista de productos y la recorre creando una plantilla para cada producto
    que posteriormente se imprime en el HTML. Ademas, esta función mostrara o no ciertos productos dependiendo
    de si el usuario seteo un minimo y/o un maximo para el precio del producto.*/
function ShowProductsList(Lista) {
    let ContenidoHTML = "";
    document.getElementById("product-list-container").innerHTML = "";
    
    for (elemento of Lista) {
        if ((min == undefined && max == undefined) || (parseInt(elemento.cost)>= min && parseInt(elemento.cost)<= max) ||
        (parseInt(elemento.cost)>= min && max == undefined) || (min == undefined && parseInt(elemento.cost)<= max)) {
        
                ContenidoHTML += `
                    <div onclick="setProductID(${elemento.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <img src="${elemento.image}" alt="${elemento.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${elemento.name}</h4>
                            <small class="text-muted">${elemento.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${elemento.description}</p>
                    </div>
                </div>
            </div>
                `
        }
    }
    document.getElementById("product-list-container").innerHTML = ContenidoHTML;

}

document.addEventListener("DOMContentLoaded", function () {
    let Cat = SetProductCategory();

    getJSONData(Cat).then(result => {
        if (result.status == "ok") {
            ListaProd = result.data.products;
            ShowProductsList(ListaProd);
        }
        else {
            alert("Hubo un problema: " + result.data);
        }
    })
})

/* Esta función consulta el valor de los campos "minimo" y "maximo". Si los campos se encuentran vaciós 
    dejara las variables min y max como indefinidas, si se ingresó en un valor en alguno (o en ambos) de los campos
    min y max tomaran el valor de dichos campos. */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("rangeFilterCount").addEventListener("click", () => {
        if (document.getElementById("rangeFilterCountMin").value != "") {
         min = document.getElementById("rangeFilterCountMin").value;
        } else {
            min = undefined;
        }

        if (document.getElementById("rangeFilterCountMax").value != "") {
            max = document.getElementById("rangeFilterCountMax").value;
        } else {
               max = undefined;
           }
           
        
         ShowProductsList(ListaProd);
    })
})

/* Esta funcion se encarga de limpiar el filtrado por precio. Dejara indefinidas las variables min y max (para que no se realize
    el filtrado en ShowProductList) y limpiara los campos "minimo" y "maximo" de sus antiguos valores. Por ultimo, haciendo un
    llamado a ShowProductList (esta vez con min y max indefinidas) mostrara el listado completo de productos*/
document.getElementById("clearRangeFilter").addEventListener("click", () => {
    min = undefined;
    max = undefined;
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    ShowProductsList(ListaProd);
})

/* Esta funcion modifica el encabezado de la página */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("header").innerText = `Verás aquí todas las productos de la categoria ${localStorage.getItem("catName")}.`
})
   
      /*   Orden Ascendente por precio */
document.getElementById("sortAsc").addEventListener("click",() => {
   let arrayOrdenado = ListaProd.sort(function(a, b) {return a.cost - b.cost;});
   ShowProductsList(arrayOrdenado);
})
     /*   Orden Descendente por precio*/
document.getElementById("sortDesc").addEventListener("click",() => {
    let arrayOrdenado = ListaProd.sort(function(a, b) {return b.cost - a.cost;});
    ShowProductsList(arrayOrdenado);
 })
        /* Orden Descendente por Relevancia */
 document.getElementById("sortByCount").addEventListener("click",() => {
    let arrayOrdenado = ListaProd.sort(function(a, b) {return b.soldCount - a.soldCount;});
    ShowProductsList(arrayOrdenado);
 })

