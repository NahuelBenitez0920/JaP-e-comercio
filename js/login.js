document.getElementById("btn").addEventListener("click", function(){
if((document.getElementById("email").value != "") && (document.getElementById("pwd").value != "")) {
    localStorage.setItem("User", document.getElementById("email").value)
    location.href = "index.html"
}
else {
    alert("Debe completar ambos campos para poder ingresar")
}
})