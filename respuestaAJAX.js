
function submitForm() {
  var dep = $("#cantidadDeposito").val();
  var formDep = {
      depositoRealizado: dep
      
  };

  // Realizar una solicitud AJAX a servidor.php usando jQuery
  $.ajax({
      type: "POST",
      url: "/pegasus/guardarDatosCompletos",
      contentType: "application/json",
      data: JSON.stringify(formDep),
      success: function(response) {
          console.log("Respuesta del servidor:", response);
      },
      error: function(error) {
          console.error("Error en la solicitud AJAX:", error);
      }
  });
}

/*
// RECOGER TODOS LOS DATOS EN UNA SOLA LLAMADA

var deposito = $("#cantidadDeposito").val();
var retiro = $("#cantidadRetiro").val();
var apuestaRealizada = $("#apuesta").val();
var recogerMultiplicador = $("#multiplicadorPremio").val();
var totalGanado = $("#premioTotal").val();

// Crear un único objeto que combine todos los datos.
var formDatosCompletos = {

DEPOSITOREALIZADO: parseFloat(deposito) || 0,
RETIROREALIZADO: parseFloat(retiro) || 0,
SALDOAPOSTADO: parseFloat(apuestaRealizada) || 0,
MULTIPLICADOR: parseFloat(recogerMultiplicador) || 1,
PREMIO_TOTAL: parseFloat(totalGanado) || 0

};

// Enviar una única solicitud AJAX con todos los datos.
$.ajax({
type: "POST",
url: "/olympusGame/guardarDatosCompletos",
contentType: "application/json",
data: JSON.stringify(formDatosCompletos),
success: function(response) {
console.log("Respuesta del servidor:", response);
},

error: function(error) {
console.error("Error en la solicitud AJAX:");
console.error("Estado:", error.status); // Código de estado HTTP
console.error("Mensaje de error:", error.statusText); // Descripción del error
console.error("Respuesta del servidor:", error.responseText); // Mensaje detallado del servidor
}
});

*/
