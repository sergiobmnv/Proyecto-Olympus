/*-----------------------------------------------------------------------------------------------*/
//RECOGER LOS DATOS.

  //DATOS DEL DEPOSITO Y RETIRO.
  var deposito = $("#cantidadDeposito").val();
  var retiro = $("#cantidadRetiro").val();
    var formData = {
      depositar: deposito,
      retirar: retiro
    };

    $.ajax({
      rype: "POST",
      url: "/olympuesGame/guardardepositos",
      contentType: "application/json",
              data: JSON.stringify(formData),
              success: function(response) {
                  console.log("Respuesta del servidor:", response);
              },
              error: function(error) {
                  console.error("Error en la solicitud AJAX:", error);
              }
    });

//DATOS SOBRE LA APUESTA REALIZADA.
    var apuestaRealizada = $("#apuesta").val(); 
      var formData = {
        apuestaRealizada: apuestaRealizada
      };

      $.ajax({
        type: "POST",
        url: "/olympusGame/guardarApuesta",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function(response) {
            console.log("Respuesta del servidor:", response);
        },
        error: function(error) {
            console.error("Error en la solicitud AJAX:", error);
        }
    });

//DATOS DEL MULTIPLICADOR QUE SALGA Y EL TOTAL GANADO.
  var recogerMultiplicador = $("#multiplicadorPremio").val();
  var totalGanado = $("#premioTotal").val();
          var formData = {
              multiplicador: recogerMultiplicador,
              premioTotal: totalGanado
          };

          // Realizar una solicitud AJAX a UsuarioController.java usando jQuery
          $.ajax({
              type: "POST",
              url: "/olympusGame/guardarTirada",
              contentType: "application/json",
              data: JSON.stringify(formData),
              success: function(response) {
                  console.log("Respuesta del servidor:", response);
              },
              error: function(error) {
                  console.error("Error en la solicitud AJAX:", error);
              }
          });

/*-----------------------------------------------------------------------------------------------*/