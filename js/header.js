document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catName", "Autos");
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catName", "Juguetes");
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catName", "Muebles");
    });
});