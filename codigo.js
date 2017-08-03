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

    datos.getCountryCallback(pais.value, function(error, id_pais) {
      if (error !== null) {
        costo_envio.textContent = "Pais no existe";
        return;
      }
      datos.getCityCallback(id_pais, ciudad.value, function(error, id_city) {
        if (error !== null) {
          costo_envio.textContent = "Ciudad no existe";
          return;
        }
        datos.getPriceCallback(id_city, function(error, price) {
          costo_envio.textContent = price * parseInt(cantidad.value, 10);
        });
      });
    });
  });
}
