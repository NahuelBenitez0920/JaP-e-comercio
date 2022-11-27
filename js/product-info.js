/* Esta funcion almacena el identificador de un producto y redirige a la pagina de dicho producto. Fue pensada para
    utilizarse en conjunto con RelatedProducts. */
function redirect(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
}

/* RelatedProducts muestra en pantalla los productos relacionados con el producto que el usuario seleccionó. Recibe
    como parametro un arreglo con los productos relacionados y los imprime mediante una plantilla HTML. Al momento de hacer
    click sobre el div con la información del producto, se redirige a la pagina de dicho porducto. */
function RelatedProducts(RelatedList) {
    let contentHTML = "";
    for (object of RelatedList) {
        contentHTML = `<div class="col-lg-3 col-md-4 col-sm-6 col-12 pb-5">
        <div onclick="redirect(${object.id})" class="card bg-light border border-secondary" style="width: 13rem;">
          <img src="${object.image}" class="card-img-top"
            alt="logo de Bootstrap">
          <div class="card-body border-top border-secondary">
            
            <h5 class="card-title">${object.name} </h5>
            
            
          </div>
        </div>
      </div> `

        document.getElementById("rel-products").innerHTML += contentHTML;

    }
}

/* ShowProductInfo imprime en el HTML la informacion del producto al que el usuario accedió. Para esto, crea una plantilla
    HTML con la informacion del producto y posteriormente se agrega dicha plantilla al HTML principal. Esta funcion fue
    modificada para cumplir con la consigna del desafio 4 que consistía en mostrar las imagenes del producto en un carrusel. */
function ShowProductInfo(Prod) {
    let ContentHTML = ` 
    <div class="mt-5 d-flex border border-secondary rounded"style="width: 65%;">
          <div id="carouselConControles" class="carousel slide" data-bs-interval="5000">
                <div class="carousel-inner rounded">
                    <div class="carousel-item active">
                        <img src="${Prod.images[0]}" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${Prod.images[1]}" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${Prod.images[2]}" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${Prod.images[3]}" class="d-block w-100" alt="...">
                    </div>
                </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselConControles" data-bs-slide="prev">
               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselConControles" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Siguiente</span>
            </button>
        </div>
    </div>    
        
        <div class="text-left p-3" id="product-name">
            <div class="row">
                <div class="col pt-3">
                    <h2>${Prod.name}</h2>
                </div>
                <div class="col pt-3">
                    <button id="Comprar" class="btn btn-outline-success">Comprar</button>
                </div>
            </div>
        </div>
        <hr>
        <div class="text-left p-3">
            <h6 class="title-style">Precio</h6>
            <p>${Prod.currency} ${Prod.cost}</p>
        </div>
        <div class="text-left p-3">
            <h6 class="title-style">Descripción</h6>
            <p>${Prod.description}</p>
        </div>
        <div class="text-left p-3">
            <h6 class="title-style">Categoría</h6>
            <p>${Prod.category}</p>
        </div>
        <div class="text-left p-3">
            <h6 class="title-style">Cantidad de Vendidos</h6>
            <p>${Prod.soldCount}</p>
        </div>
        
    `
    document.getElementById("prod-info").innerHTML = ContentHTML;

}

/* StarRating se encarga mostrar las valoraciones que los usuarios le dan al producto en sus comentarios. 
    La variable "StarsHTML" contiene un arreglo con todos los div donde se agregaran las valoraciones (hay un div 
    por cada comentario). La funcion realiza dos iteraciones, la primera recorre la lista de comentarios y
    en función de la valoración de cada comentario agrega el numero de estrellas correspondientes. 
    La segunda recorrida es sobre StarsHTML, agregando en cada da comentario su respectiva valoración. */

function starRating(CommentaryList) {
 
    let StarsHTML = document.getElementsByClassName("star-rating");
    let list = CommentaryList;
    toHTML = "";
    for (let i = 0; i < StarsHTML.length; i++) {

        for (let j = 0; j < list.length; j++) {

            if (list[j].score == 1) {

                toHTML = `
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star"></span>                    
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span> `

            }
            if (list[j].score == 2) {
                toHTML = `
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star goldenStar"></span>                    
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span> `

            }
            if (list[j].score == 3) {
                toHTML = `
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star goldenStar"></span>                    
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span> `

            }
            if (list[j].score == 4) {
                toHTML = `
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star goldenStar"></span>                    
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star"></span> `

            }
            if (list[j].score == 5) {
                toHTML = `
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star goldenStar"></span>                    
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star goldenStar"></span>
                <span class="fa fa-star goldenStar"></span> `

            }

            StarsHTML[j].innerHTML = toHTML;
        }

    }
}

/* ShowCommentaries recorre la lista de comentarios y los imprime en pantalla mediante una plantilla de HTML con los 
    respectivos datos de cada comentario (descripcion, fecha, nombre de usuario) */
function ShowCommentaries(CommentaryList) {
    let ContentHTML = "";
    for (commentary of CommentaryList) {
        ContentHTML += ` 
        <div class="commentary text-left p-3">
            <div class="row">
                <div class="col-12 cmt-info">
                    <span class="sp1">${commentary.user}</span>
                    <span>${commentary.dateTime}</span>
                    
                    <span class="star-rating"> 
                        
                    
                    </span>
                    
                </div>
            </div>
        
            <div>
                <p>${commentary.description}</p>
            </div>
      </div>
     `
    }

    document.getElementById("comment-section").innerHTML += ContentHTML;


}


document.addEventListener("DOMContentLoaded", function () {
    let commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("ProductID")}.json`
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("ProductID") + ".json").then(result => {
        if (result.status == "ok") {
            let Product = result.data;
            ShowProductInfo(Product);
            RelatedProducts(Product.relatedProducts);
            CreateCart(Product);

        }
        else {
            alert("Hubo un problema: " + result.data);
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("ProductID") + ".json").then(result => {
        if (result.status == "ok") {
            let CommentList = result.data;
            ShowCommentaries(CommentList);
            starRating(CommentList);


            /* DESAFIO 3: Esta funcion permite realizar un comentario, como requisito previo para poder comentar
            el usuario debe estar logeado y debe haber completado los campos "nombre" y "apellido" de su perfil.
            Dichos datos se utilizaran para identificar al usuario con su comentario. Se recorre una base de datos 
            en local storage con todos los perfiles de usuarios registrados, si el perfil del usuario se encuentra significa
            que completo los datos (datos registrados = true;) y podra comentar un articulo.
            
            El comentario que el usuario vaya a realizar se agregara a la lista de comentarios previos(de manera local), 
            esto para poder reutilizar las funciones ShowCommentaries y starRating que recorrian la dicha lista mostrando 
            los comentarios y su valoración respectivamente. */
            
            document.getElementById("comment-send").addEventListener("click", () => {
                let Usuario = localStorage.getItem("User");
                let UserDatabase = JSON.parse(localStorage.getItem("UsersDB"));
                if (Usuario != null) {
                    let datosRegistrados = false;
                    for (const key in UserDatabase) {
                        if (key == Usuario) {
                            datosRegistrados = true;
                        }
                    }

                    if (datosRegistrados) {
                        const date = new Date();
                        let fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" +
                            date.getMinutes() + ":" + date.getSeconds();

                        let comment = document.getElementById("cmt-field").value;
                        let valoracion = parseInt(document.getElementById("ratingnumber").value);
                        if (comment != "") {
                            let newComment = {
                                product: `${localStorage.getItem("ProductID")}`,
                                score: valoracion,
                                description: `${comment}`,
                                user: `${UserDatabase[Usuario].name.toLowerCase()}_${UserDatabase[Usuario].surname.toLowerCase()}`,
                                dateTime: `${fecha}`
                            }

                            CommentList.push(newComment);



                            document.getElementById("comment-section").innerHTML = "";
                            ShowCommentaries(CommentList);
                            starRating(CommentList);
                            document.getElementById("errorMsj").innerHTML = "";
                            document.getElementById("cmt-field").value = "";


                        }
                        else {
                            document.getElementById("errorMsj").innerHTML = "Debe escribir un comentario en el campo de texto."
                        }
                    }
                    else {
                        document.getElementById("errorMsj").innerHTML = `Debe completar todos los datos de su perfil para comentar, click <a href="my-profile.html">aqui</a> para acceder a su perfil`;
                    }
                }
                else {
                    document.getElementById("errorMsj").innerHTML = `Debe iniciar sesión para poder comentar, click <a href="login.html">aqui</a> para iniciar sesión`;
                }
            })
        }
        else {
            alert("Hubo un problema: " + result.data);
        }
    })




})
 /* DESAFIO 5: Esta función se encarga de almacenar los datos del producto que el usuario desea comprar para mostrarlos
    posteriormente en el carrito, al momento de hacer click en el boton "Comprar" si esta es la primera compra, se creará
    una variable en el almacenamiento local que alojara un objeto con los datos del producto a comprar. De no ser la primer
    compra, se agregara un objeto con la informacion del producto y se almacenará seguido de los objetos de los productos
    anteriores. */
function CreateCart(Prod) {
    document.getElementById("Comprar").addEventListener("click", () => {
        if (localStorage.getItem("Cart") == undefined) {
            let newCart = {
                [Prod.id]: {
                    name: `${Prod.name}`,
                    unitCost: `${Prod.cost}`,
                    currency: `${Prod.currency}`,
                    image: `${Prod.images[0]}`
                }
            }
            localStorage.setItem("Cart", JSON.stringify(newCart))
        }
        if (localStorage.getItem("Cart")) {
            let cart = JSON.parse(localStorage.getItem("Cart"));
            localStorage.setItem(
                "Cart",
                JSON.stringify({
                    ...cart,
                    [Prod.id]: {
                        name: `${Prod.name}`,
                        unitCost: `${Prod.cost}`,
                        currency: `${Prod.currency}`,
                        image: `${Prod.images[0]}`
                    },
                })
            );


        }
    })
}


