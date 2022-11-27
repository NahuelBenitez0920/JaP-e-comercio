const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

function getJSONData(url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

/* Esta funcion crea el botón con el dropdown y las opciones de "Mi carrito" "Mi Perfil" y "Cerrar Sesión" y los situa en la
   barra de navegación. Dependiendo si el usuario se encuentra logueado o no el botón va a cambiar en apariencia y funcionalidad. 
   Cuando el usuario este logeado el botón mostrara el email del usuario y al momento de hacer click en "Mi perfil" la pagina 
   redirige hacia la sección del perfil, al hacer click en "Cerrar Sesión" se borraran los datos login del usuario (su email).
   
    Si el usuario no esta logeado, el botón no va a mostrar ninguna informacion, el usuario tampoco podrá ingresar a la sección
    de perfil, ya que al hacer click en "Mi perfil" este será redirigido a la pagina del login para que inicie sesión.
    Si el usuario no esta logeado la opcion de "Cerrar Sesión" estara deshabilitada. */
document.addEventListener("DOMContentLoaded", () => {
  
  if (localStorage.getItem("User") == undefined) {
    let toHTML = `  <div class="dropdown">
                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
                        <li id="myprofile"><span class="dropdown-item">Mi Perfil</span></li>
                        <li class="disabled"><span class="dropdown-item" id="logOut">Cerrar Sesión</span></li>
                    </ul>
                  </div>  `
  document.getElementById("AccData").innerHTML = toHTML;
  }
  else {
    let toHTML = `  <div class="dropdown">
    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
       ${localStorage.getItem("User")}
    </button>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
        <li id="myprofile"><span class="dropdown-item">Mi Perfil</span></li>
        <li onclick="LogOut()"><span class="dropdown-item" id="logOut">Cerrar Sesión</span></li>
    </ul>
  </div>  `
document.getElementById("AccData").innerHTML = toHTML;
  }

  document.getElementById("myprofile").addEventListener("click", ()=> {
  if (localStorage.getItem("User") == undefined) {
    window.location = "login.html"
  }
  else {
    window.location = "my-profile.html"
  }
})

 
})

/* LogOut se encarga de cerrar la sesión, redirige a la pagina principal y elimina los datos de sesión del Usuario. */
function LogOut() {
   window.location = "index.html"
   localStorage.removeItem("User");
}



