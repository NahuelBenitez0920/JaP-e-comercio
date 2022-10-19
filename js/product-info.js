
function redirect(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
}


function RelatedProducts(RelatedList) {
   let contentHTML = "";
    for(object of RelatedList) {
        contentHTML = `<div class="col-3">
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

function starRating(CommentaryList) {
   /*  <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>                    
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
     */
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
    
    
function ShowCommentaries(CommentaryList) {
    let ContentHTML = "";
    for(commentary of CommentaryList) {
        ContentHTML += ` 
        <div class="commentary text-left p-3">
            <div class="row">
                <div class="col cmt-info">
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
    let url = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("ProductID")}.json`
    let commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("ProductID")}.json`
    getJSONData(url).then(result => {
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

    getJSONData(commentsUrl).then(result => {
        if (result.status == "ok") {
            let CommentList = result.data;
            ShowCommentaries(CommentList);
            starRating(CommentList);
        }
        else {
            alert("Hubo un problema: " + result.data);
        }
    })



})

function CreateCart(Prod) {
   document.getElementById("Comprar").addEventListener("click", ()=> {
        if(localStorage.getItem("Cart") == undefined){
                let newCart =  {
                [Prod.id] : {
                    name :  `${Prod.name}`,
                    unitCost : `${Prod.cost}`,
                    currency : `${Prod.currency}`,
                    image : `${Prod.images[0]}`
                }
            }
            localStorage.setItem("Cart", JSON.stringify(newCart))
        }
        if(localStorage.getItem("Cart")) {
          let cart = JSON.parse(localStorage.getItem("Cart"));
          localStorage.setItem(
            "Cart",
            JSON.stringify({
              ...cart,
              [Prod.id]: {
                name :  `${Prod.name}`,
                unitCost : `${Prod.cost}`,
                currency : `${Prod.currency}`,
                image : `${Prod.images[0]}`
            },
            })
          );
         
           
        }
   })
}
