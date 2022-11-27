document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const name = document.getElementById("firstname");
    const secondname = document.getElementById("secondname");
    const surname = document.getElementById("surname1");
    const surname2 = document.getElementById("surname2");
    const email = document.getElementById("email");
    const phone = document.getElementById("phoneNumber");
    const image = document.getElementById("profileimg");
    let uDB = JSON.parse(localStorage.getItem("UsersDB"));
    let User = localStorage.getItem("User");
    let profileimg = "";

    /* Al momento de cargar la pagina, se consulta si existe la variable UsersDB en el localStorage. 
    En caso de que esta no exista (es la primera vez que se ingresa ), esta variable se crea y va a almacenar un
    objeto JSON con los datos del usuario, al ser la primera vez que se ingresa solo se completara el campo
    del email.  */
    if (localStorage.getItem("UsersDB") == undefined) {
        email.value = localStorage.getItem("User");
        let newDB = {
            [localStorage.getItem("User")]: {
                name: `${name.value}`,
                secondname: `${secondname.value}`,
                surname: `${surname.value}`,
                surname2: `${surname2.value}`,
                email: `${email.value}`,
                phone: `${phone.value}`,
                image: ``
            }
        }
        localStorage.setItem("UsersDB", JSON.stringify(newDB));
    }
    /* En caso de que UsersDB este definida en localStorage, cargaremos los datos almacenados en los campos del formulario
      para que el usuario pueda visualizarlos. Se realizara una recorrida donde se consultara si los datos del usuario 
      estan almacenados en la base de datos. De ser esto cierto, se mostrara la informacion en los campos y la variable
      esUsuario tomara valor "true" (se utilizara posteriormente para el desafio). 
      */
    if (localStorage.getItem("UsersDB") != undefined) {
      
        let esUsuario = false;
        for (const key in uDB) {
            if (key == User) {
                name.value = uDB[key].name
                secondname.value = uDB[key].secondname
                surname.value = uDB[key].surname
                surname2.value = uDB[key].surname2
                email.value = uDB[key].email
                phone.value = uDB[key].phone
               
                esUsuario = true;
            }

        }

        /* Este if forma parte del desafio y su funcion es cargar la imagen de perfil que el usuario haya guardado 
        anteriormente. En caso de que esUsuario venga cargada con el valor "true" (lo cual significa que
           los datos del usuario estan en la base de datos). Se consultara que el campo imagen del objeto JSON 
           contenga una imagen cargada, de ser asi se mostrara la imagen en pantalla. */
        if (esUsuario) {
            profileimg = uDB[User].image
            if (profileimg != "") {
                image.src = profileimg;
            }

        }

        if (!esUsuario) {
            email.value = User;
        }

     
    }

    /**********************VALIDACIONES DE DATOS********************/

    /*Se validara que los campos requeridos obligatoriamente no esten vacios, si esto se cumple los datos se almacenan 
    en la base de datos y se despliega una alerta indicando que los datos se guardaron satisfactoriamente. En caso contrario,
    se le indica al usuario cuales son los campos que debe completar obligatoriamente para poder guardar sus datos. */ 
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated")

        if (form.checkValidity()) {
                let UsersDB = JSON.parse(localStorage.getItem("UsersDB"));
                localStorage.setItem(
                    "UsersDB",
                    JSON.stringify({
                        ...UsersDB,
                        [localStorage.getItem("User")]: {
                            name: `${name.value}`,
                            secondname: `${secondname.value}`,
                            surname: `${surname.value}`,
                            surname2: `${surname2.value}`,
                            email: `${email.value}`,
                            phone: `${phone.value}`,
                            image: `${profileimg}`
                        },
                    })
                );
            
            document.getElementById("foralert").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Tus datos se guardaron exitosamente!</strong> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`

            form.classList.remove("was-validated");
    
        }

    })

        /*DESAFIO 7: Esta funcion nos permite cargar y previsualizar la imagen de perfil del usuario. Se crea un objeto FileReader
        para poder obtener la direccion en la que esta almacenada la imagen en el dispositivo del usuario. Dicha URL es asignada
        al atributo src de una etiqueta img en el HTML a modo de preview de la imagen. La URL tambien se almacena en una variable
        global llamada "profileimg". Para que al momento que el usuario desee guardar definitivamente su imagen de perfil esta pueda ser
        almacenada junto con los otros datos al validarse el formulario. */ 
        document.getElementById("fileimg").onchange = function(e) {
            dataimg = new FileReader();
            dataimg.readAsDataURL(e.target.files[0]);
            dataimg.onload = function() {
                image.src = dataimg.result;
                profileimg = dataimg.result;

            }
            
        }
  
})














