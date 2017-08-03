document.addEventListener("DOMContentLoaded", function() {
  comenzar();

  var time = document.getElementById("time");
  setInterval(() => (time.innerText = new Date()), 1000);
});

function comenzar() {
  var pais = document.getElementById("pais");
  var ciudad = document.getElementById("ciudad");
  var cantidad = document.getElementById("cantidad");
  var consultar = document.getElementById("consultar");
  var costo_envio = document.getElementById("costo_envio");

  var datos = init();
  console.dir(datos);

  consultar.addEventListener("click", function() {
    if (pais.value === "") {
      costo_envio.textContent = "Debe ingresar el pais";
      return;
    }
    if (ciudad.value === "") {
      costo_envio.textContent = "Debe ingresar la ciudad";
      return;
    }
    if (cantidad.value === "") {
      costo_envio.textContent = "Debe ingresar cantidad";
      return;
    }
    var id_pais = datos.getCountrySync(pais.value);
    console.log(id_pais);
    if (id_pais === null) {
      costo_envio.textContent = "Pais no existe";
      return;
    }

    var id_city = datos.getCitySync(id_pais, ciudad.value);
    console.log(id_city);
    if (id_city === null) {
      costo_envio.textContent = "Cuidad no existe";
      return;
    }

    var price = datos.getPriceSync(id_city);
    console.log(price);
    costo_envio.textContent = parseInt(cantidad.value) * price;
  });
}
