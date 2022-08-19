const CAT_AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json"

function ShowProductsList(Lista) {
    let ContenidoHTML = "";
    for (elemento of Lista) {

        ContenidoHTML += `
        <div onclick="setProductID(${elemento.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
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
    document.getElementById("product-list-container").innerHTML = ContenidoHTML;
   
}
 
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CAT_AUTOS).then(result => {
        if (result.status == "ok") {
            let ListaProd = result.data.products;
            ShowProductsList(ListaProd);
            console.log(ListaProd)

        }
        else {
            alert("Hubo un problema: " + result.data);
        }
    })
})