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
    costo_envio.style.color = "blue";
    costo_envio.textContent = "Espere ...";

    if (pais.value === "") {
      costo_envio.style.color = "red";
      costo_envio.textContent = "Debe ingresar el pais";
      return;
    }
    if (ciudad.value === "") {
      costo_envio.style.color = "red";
      costo_envio.textContent = "Debe ingresar la ciudad";
      return;
    }
    if (cantidad.value === "") {
      costo_envio.style.color = "red";
      costo_envio.textContent = "Debe ingresar cantidad";
      return;
    }

    botones(pais, ciudad, cantidad, consultar, true);

    datos.getCountryCallback(pais.value, function(error, id_pais) {
      if (error !== null) {
        costo_envio.style.color = "green";
        costo_envio.textContent = "Pais no existe";
        botones(pais, ciudad, cantidad, consultar, false);
        return;
      }
      datos.getCityCallback(id_pais, ciudad.value, function(error, id_city) {
        if (error !== null) {
          costo_envio.style.color = "green";
          costo_envio.textContent = "Ciudad no existe";
          botones(pais, ciudad, cantidad, consultar, false);
          return;
        }
        datos.getPriceCallback(id_city, function(error, price) {
          costo_envio.style.color = "blue";
          costo_envio.textContent = price * parseInt(cantidad.value, 10);
          botones(pais, ciudad, cantidad, consultar, false);
        });
      });
    });
  });
}

function botones(pais, ciudad, cantidad, consultar, estado) {
  pais.disabled = estado;
  ciudad.disabled = estado;
  cantidad.disabled = estado;
  consultar.disabled = estado;
}
