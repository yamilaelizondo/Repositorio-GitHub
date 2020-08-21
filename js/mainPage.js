document.addEventListener("DOMContentLoaded",function() {
    var a = document.createElement("a");
    a.classList.add("py-2", "d-none", "d-md-inline-block");
    a.href = "#";
    a.innerHTML = localStorage.getItem("usuario");
    document.getElementById("case").appendChild(a);
    
    var botoncerrasesion = document.createElement("button");
    botoncerrasesion.classList.add("py-2", "d-none", "d-md-inline-block");
    botoncerrasesion.type="button";
    botoncerrasesion.href = "#";
    botoncerrasesion.innerText= "Cerrar sesión";
    botoncerrasesion.id="cerrar_btn";
    document.getElementById("case").appendChild(botoncerrasesion);
    document.getElementById("cerra_btn").addEventListener ("click", function{
        localStorage.removeItem ("usuario");
        window.location.href = "index.html";
        window.location.reload();


    })

    
}

, false);