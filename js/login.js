document.getElementById("btn").addEventListener("click", function(){
if((document.getElementById("email").value != "") && (document.getElementById("pwd").value != "")) {
    location.href = "principal.html"
}
else {
    alert("Debe completar ambos campos para poder ingresar")
}
})