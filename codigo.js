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
    var id_pais = datos.getCountrySync(pais.value);
    console.log(id_pais);
    var id_city = datos.getCitySync(id_pais, ciudad.value);
    console.log(id_city);
    var price = datos.getPriceSync(id_city);
    console.log(price);
    costo_envio.textContent = parseInt(cantidad.value) * price;
  });
}
