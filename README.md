# Proyecto-Olympus
# Olympus Game

Olympus Game es un emocionante juego en línea inspirado en la mitología y diseñado para proporcionar entretenimiento dinámico e interactivo. Este proyecto está desarrollado utilizando tecnologías web modernas y se centra en ofrecer una experiencia visualmente atractiva y funcional.

## Características principales

- **Interfaz intuitiva**: Una interfaz de usuario bien diseñada que incluye un sistema de saldo dinámico y botones para gestionar depósitos y retiros.
- **Juego emocionante**: Un sistema de juego que muestra un multiplicador en tiempo real y anima al jugador a detenerse en el momento justo para maximizar sus ganancias.
- **Historial de multiplicadores**: Visualización de los multiplicadores obtenidos en rondas previas.
- **Modales interactivos**: Modales personalizados para depósitos, retiros, errores y resultados del juego, incluyendo premios o derrotas.
- **Animaciones atractivas**: Uso de elementos visuales como el GIF del Pegaso y animaciones para mejorar la experiencia del usuario.

## Tecnologías utilizadas

- **HTML**: Para estructurar el contenido del juego.
- **CSS**: Para estilizar la interfaz del usuario y los modales.
- **JavaScript**: Para implementar la lógica del juego y la interacción del usuario.

## Estructura del proyecto

```
PegasusGame/
|-- Assets/
|   |-- Icono-Pegaso.png
|   |-- Logo.png
|   |-- Pegaso.gif
|   |-- Gif-Premio.gif
|   |-- gif-derrota.gif
|
|-- Styls/
|   |-- style.css
|   |-- modalesSaldoError.css
|   |-- modalBotonesHeader.css
|
|-- index.html
|-- index.js
|-- respuestaAJAX.js
```

### Archivos principales

- **index.html**: Archivo principal que contiene la estructura del juego.
- **style.css**: Define los estilos básicos de la interfaz.
- **modalesSaldoError.css** y **modalBotonesHeader.css**: Archivos CSS adicionales para estilizar los modales y botones.
- **index.js**: Archivo JavaScript que contiene la lógica del juego.
- **respuestaAJAX.js**: Módulo JavaScript para gestionar posibles interacciones con un backend.

## Cómo usar

1. **Descargar o clonar el repositorio**:
   ```bash
   git clone <URL-del-repositorio>  https://github.com/sergiobmnv/Proyecto-Pegasus.git
   ```
2. **Abrir el archivo HTML**:
   Navega a la carpeta del proyecto y abre el archivo `index.html` en tu navegador.

3. **Disfrutar del juego**:
   - Deposita saldo para comenzar.
   - Haz tu apuesta, presiona "Jugar" y detén el multiplicador para ganar.
   - Administra tu saldo con los botones de "Depositar" y "Retirar".

## Próximas mejoras

- Integración con un backend para persistir datos del usuario.
- Añadir más animaciones y efectos visuales.
