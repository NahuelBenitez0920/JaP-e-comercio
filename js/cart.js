
let List;
document.addEventListener("DOMContentLoaded", () => {

    getJSONData("https://japceibal.github.io/emercado-api/user_cart/25801.json").then(result => {
        if (result.status == "ok") {
            let preLoadedProduct = result.data.articles[0];
            let cart = JSON.parse(localStorage.getItem("Cart"));
            
             localStorage.setItem(
                "Cart",
                JSON.stringify({
                  ...cart,
                  [preLoadedProduct.id]: {
                    name :  `${preLoadedProduct.name}`,
                    unitCost : `${preLoadedProduct.unitCost}`,
                    currency : `${preLoadedProduct.currency}`,
                    image : `${preLoadedProduct.image}`
                }
                })
              );

               List = JSON.parse(localStorage.getItem("Cart"));
            showCartProducts(List);
       
            
        }
        else {
            alert("Hubo un problema: " + result.data);
        }
    })


})

function showCartProducts(ProdList) {

    for (const key in ProdList) {
       
        let ContentHTML = `
                    <div class="container row">
                        <div class="col-2">
                            <div class="w-50 pb-2">
                        <img src=${ProdList[key].image} class="w-100">
                        </div> 
                        </div>
                        
                        <div class="col-2 pt-2">
                        <p>${ProdList[key].name}</p> 
                        </div>
                        <div class="col-2 pt-2">
                        <p>${ProdList[key].currency} ${ProdList[key].unitCost}</p>
                        </div>
                        <div class="col-2 pt-2">
                        <input onclick="showPriceByCount(List,${key})"id="${key}"type="number" class="w-50 cantidad" value="1">
                        </div>
                        <div class="col-2 pt-2 fw-bold">
                        <p id="subtotal-${key}">${ProdList[key].currency} ${ProdList[key].unitCost}</p>
                        </div>
                        <hr>
                        </div> 
                        
                    `


            document.getElementById("cartProductList").innerHTML += ContentHTML;
            console.log(key);
    
    }

}

function showPriceByCount(ProdList, id) {
    let subtotal;
    document.getElementById(id).addEventListener("input", ()=> {
        let cantidad = document.getElementById(id).value;
         subtotal = cantidad * ProdList[id].unitCost;
        console.log(id);
        
        if (subtotal > 0) {
            document.getElementById("subtotal-"+id).innerText = ProdList[id].currency + " " + subtotal;
        }
    })
}
