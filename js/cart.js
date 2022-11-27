
let List;
let cantidadesCorrectas = true;
document.addEventListener("DOMContentLoaded", () => {

    getJSONData(CART_INFO_URL + "25801.json").then(result => {
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
                SubtotalPrice(List);
                costoDeEnvio();          


              
        }
        else {
            alert("Hubo un problema: " + result.data);
        }
    })
})
 

 /*ShowCartProducts recibe como parametro una la lista de productos del carrito. Para cada producto de la lista imprime en pantalla 
    la información necesaria */
function showCartProducts(ProdList) {                    
  
    for (const key in ProdList) {
       
        let ContentHTML = `
                    <div id="prod${key}" class="container row">
                        <div class="col-lg-2 col-md-2 col-sm-3 col-2">
                            <div class="w-50 pb-2">
                        <img src=${ProdList[key].image} class="w-100">
                        </div> 
                        </div>
                        
                        <div class="col-lg-2 col-md-2 col-sm-2 col-2 pt-2">
                        <p>${ProdList[key].name}</p> 
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-2 pt-2">
                        <p>${ProdList[key].currency} ${ProdList[key].unitCost}</p>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-2 pt-2">
                        <input onclick="showPriceByCount(List,${key})"id="${key}"type="number" class="w-50 cantidad"  value="1">
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-2 pt-2 fw-bold">
                        <p id="subtotal-${key}">${ProdList[key].currency} ${ProdList[key].unitCost}</p>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-1  pb-2">
                        <span onclick="removeProduct(${key})" class="fs-5 fa fa-trash btn btn-outline-danger"></span>
                        </div>
                        <hr>
                        </div> 
                        
                    `


            document.getElementById("cartProductList").innerHTML += ContentHTML;
            /* console.log(key); */
    
    }

}
 /*ShowPriceByCount recibe como parametro una lista de productos del carrito y el identificador de un producto en especifico.
    Calcula el subtotal de dinero para ese producto especifico teniendo en cuenta el precio del producto y la cantidad
    de items seleccionados por el usuario.*/
function showPriceByCount(ProdList, id) {
    document.getElementById(id).addEventListener("input",()=> {
        let subtotal;
        let cantidad = document.getElementById(id).value;
       
       
       subtotal = cantidad * ProdList[id].unitCost;
      
       if (subtotal > 0) {
           document.getElementById("subtotal-"+id).innerText = ProdList[id].currency + " " + subtotal; 
           costoDeEnvio();
       }     
      
    })
  
}
/*SubtotalPrice recibe como parametro la lista de productos del carrito. Calcula el subtotal general, es decir la suma de los
   subtotales de cada producto en especifico.*/
 function SubtotalPrice(ProdList) {
        let generalPrice = 0;
        for (const key in ProdList) {
            if(ProdList[key].currency != "USD") {
                generalPrice += (parseInt(ProdList[key].unitCost) / 40) * document.getElementById(key).value;
            }
            else {
                generalPrice += parseInt(ProdList[key].unitCost) * document.getElementById(key).value;
            }
            
        }
        document.getElementById("generalsub").innerText = "USD" + " " + Math.round(generalPrice);
        return Math.round(generalPrice);
    }
    /*costoDeEnvio deduce los costos de envío a partir del subtotal general de los productos dependiendo de cual opción
    de envío seleccione el usuario. Tambien calcula el precio total como la suma del subtotal general mas el costo de envío.*/
function costoDeEnvio() {
    let precioProductos = SubtotalPrice(List);
    let Premium = document.getElementById("Premium-envio");
    let Express = document.getElementById("Express-envio");
    let Standard = document.getElementById("Standard-envio");
   

    if (Standard.checked) {
        let costoEnvio = precioProductos * 0.05;
        document.getElementById("costoEnvio").innerText = "USD" + " " + Math.round(costoEnvio);
        let total = precioProductos + costoEnvio;
        document.getElementById("Total").innerText = "USD" + " " + total;
    }
    if (Express.checked) {
        let costoEnvio = precioProductos * 0.07;
        document.getElementById("costoEnvio").innerText = "USD" + " " + Math.round(costoEnvio);
        let total = precioProductos + costoEnvio;
        document.getElementById("Total").innerText = "USD" + " " + Math.round(total);
    }
    if (Premium.checked) {
        let costoEnvio = precioProductos * 0.15;
        document.getElementById("costoEnvio").innerText = "USD" + " " + Math.round(costoEnvio);
        let total = precioProductos + costoEnvio;
        document.getElementById("Total").innerText = "USD" + " " + total;
    }

}
/*disableFields habilita o deshabilita los inputs del modal en función de que opción seleccione el usuario.
 Si el usuario selecciona pago con tarjeta deshabilitará el campo para transferencia bancaria, en caso de que el usuario
 desee pagar con transferencia se habilitara dicho campo y se deshabilitara la seccion de pago con tarjeta.*/
function disableFields() {
    const tarjeta = document.getElementById("PaymentOption1");
    const transferencia = document.getElementById("PaymentOption2");
   
    if (tarjeta.checked) {
        document.getElementById("cardNumber").disabled = false;
        document.getElementById("securityCode").disabled = false;
        document.getElementById("expireDate").disabled = false;
        document.getElementById("TransferAcc").disabled = true;
        document.getElementById("forma-de-pago").innerText = "Tarjeta de Crédito"   
    }
    
    if (transferencia.checked) {
        document.getElementById("cardNumber").disabled = true;
        document.getElementById("securityCode").disabled = true;
        document.getElementById("expireDate").disabled = true;
        document.getElementById("TransferAcc").disabled = false;
        document.getElementById("forma-de-pago").innerText = "Transf. Bancaria"
    }
   
}
/* *********************VALIDACIONES************************ */

document.addEventListener("DOMContentLoaded", ()=> {
    const form = document.getElementById("form");
    
    
    form.addEventListener("submit", (event)=> {
        const aux = document.getElementsByClassName("cantidad");
        let cont = 0;
        let camposModal;
        
        event.stopPropagation();
        event.preventDefault();
       
        form.classList.add("was-validated");
       
             
           /*****************VALIDACION FORMA DE PAGO**********************/
        if (!document.getElementById("PaymentOption1").checked && !document.getElementById("PaymentOption2").checked) {
            document.getElementById("pago-validation").innerHTML = `<p class="text-danger"> Debe elegir una de las opciones de pago.</p>`
        }
         
        document.getElementById("PaymentOption1").addEventListener("change", ()=>{
            if ( document.getElementById("pago-validation").innerHTML != "") {
                document.getElementById("pago-validation").innerHTML = "";
            }
        })
        document.getElementById("PaymentOption2").addEventListener("change", ()=>{
            if ( document.getElementById("pago-validation").innerHTML != "") {
                document.getElementById("pago-validation").innerHTML = "";
            }
        })

            /******************VALIDACION CANTIDAD DE PRODUCTOS***************/
            while (cont < aux.length && aux[cont].value >= 1) {
                 cont++
            }
            if (cont >= aux.length) {
                cantidadesCorrectas = true;
            }
            else {
                cantidadesCorrectas = false;
            }
           

            if (!cantidadesCorrectas) {
                document.getElementById("cantidadesIncorrectas").innerHTML = "Debe ingresar una cantidad de items mayor a cero"
            }
            else {
                document.getElementById("cantidadesIncorrectas").innerHTML = "";
            }


                /************************VALICACION DE LOS CAMPOS DEL MODAL*********************/ 

            if (document.getElementById("PaymentOption1").checked) {
                if (document.getElementById("cardNumber").validity.valueMissing) {
                    document.getElementById("cardNumber").classList.add("is-invalid");
                }
                if (document.getElementById("expireDate").validity.valueMissing) {
                    document.getElementById("expireDate").classList.add("is-invalid");
                }
                if (document.getElementById("securityCode").validity.valueMissing) {
                    document.getElementById("securityCode").classList.add("is-invalid");
                }

               document.getElementById("cardNumber").addEventListener("input", ()=> {
                    if (document.getElementById("cardNumber").validity.valueMissing) {
                        document.getElementById("cardNumber").classList.add("is-invalid");
                        document.getElementById("cardNumber").classList.remove("is-valid");
                    }
                    else {
                        document.getElementById("cardNumber").classList.add("is-valid");
                        document.getElementById("cardNumber").classList.remove("is-invalid");
                    }
               })
               document.getElementById("securityCode").addEventListener("input", ()=> {
                if (document.getElementById("securityCode").validity.valueMissing) {
                    document.getElementById("securityCode").classList.add("is-invalid");
                    document.getElementById("securityCode").classList.remove("is-valid");
                }
                else {
                    document.getElementById("securityCode").classList.add("is-valid");
                    document.getElementById("securityCode").classList.remove("is-invalid");
                }
               })
                document.getElementById("expireDate").addEventListener("input", ()=> {
                if (document.getElementById("expireDate").validity.valueMissing) {
                    document.getElementById("expireDate").classList.add("is-invalid");
                    document.getElementById("expireDate").classList.remove("is-valid");
                }
                else {
                    document.getElementById("expireDate").classList.add("is-valid");
                    document.getElementById("expireDate").classList.remove("is-invalid");
                }
                })

                if (!document.getElementById("cardNumber").validity.valueMissing && 
                    !document.getElementById("securityCode").validity.valueMissing && 
                    !document.getElementById("expireDate").validity.valueMissing) {
                      camposModal = true;
                }
                else {
                    camposModal = false;
                }
            }

            if (document.getElementById("PaymentOption2").checked) {
                if (document.getElementById("TransferAcc").validity.valueMissing) {
                    document.getElementById("TransferAcc").classList.add("is-invalid");
                }
                document.getElementById("TransferAcc").addEventListener("input", ()=> {
                    if (document.getElementById("TransferAcc").validity.valueMissing) {
                        document.getElementById("TransferAcc").classList.add("is-invalid");
                        document.getElementById("TransferAcc").classList.remove("is-valid");
                    }
                    else {
                        document.getElementById("TransferAcc").classList.add("is-valid");
                        document.getElementById("TransferAcc").classList.remove("is-invalid");
                    }
                })
                if (document.getElementById("TransferAcc").validity.valueMissing) {
                        camposModal = false;
                }
                else {
                    camposModal = true;
                }
                
            }
            
            if (form.checkValidity() && cantidadesCorrectas && camposModal) {
                document.getElementById("foralert").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>¡Has comprado con éxito!</strong> 
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`


              form.classList.remove("was-validated")
            }
    })
})

/*DESAFIO 6: removeProduct se encarga de eliminar un producto del carrito, recibe como parametro el id del producto que el usuario
  va a eliminar, recorre la lista de productos y elimina el que el usuario seleccionó. Posteriormente, vuelve a guardar el
  objeto (ahora con el producto eliminado) en local storage. Hace un llamado a las funciones SubtotalPrice y costodeEnvio 
   para que realizen el cálculo del subtotal, costo de envío y total nuevamente. Por último elimina la información del producto
   del HTML para que no se visualize en pantalla.*/
function removeProduct(id) {
    
    for (const key in List) {
        if (key == id) {
            delete List[key];
        }
    }
    localStorage.setItem("Cart", JSON.stringify(List));
    SubtotalPrice(List);
    costoDeEnvio(); 
    document.getElementById("prod"+id).innerHTML = "";
}
