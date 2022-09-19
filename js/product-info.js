
function ShowProductInfo(Prod) {
    let ContentHTML = ` 
        
        <div class="text-left p-3" id="product-name">
            <h2>${Prod.name}</h2>
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
        <div class="text-left p-3">
            <h6 class="title-style">Imágenes Ilustrativas</h6>
            
            <div class="row">
                <div class="col">
                    <img class="product-img" src="${Prod.images[0]}"> 
                </div>
        
                <div class="col">
                    <img class="product-img" src="${Prod.images[1]}"> 
                </div>

                <div class="col">
                     <img class="product-img" src="${Prod.images[2]}"> 
                </div>
                
                <div class="col">
                    <img class="product-img" src="${Prod.images[3]}"> 
                </div>

            </div>
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