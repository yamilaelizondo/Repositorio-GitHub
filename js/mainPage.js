document.addEventListener("DOMContentLoaded",function() {
    var a = document.createElement("a");
    a.classList.add("py-2", "d-none", "d-md-inline-block");
    a.href = "#";
    a.innerHTML = localStorage.getItem("usuario");
    document.getElementById("case").appendChild(a);

}

, false);