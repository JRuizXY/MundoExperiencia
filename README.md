# MundoExperiencia
### Librerías utilizadas:
###### CDN de Boostrap [Bootstrap 5](https://getbootstrap.com/docs/5.2/getting-started/introduction/). 👉 `no es necesario descargar para su implementación`

###### Para ejecutar el archivo es necesario hacer uso de un servidor, en este caso se utilzó live server de VS 👉 `no es necesario descargar para su implementación`

### Variables para capturar datos del usuario desde el dominio del cliente
```js
const userName = "Juan";
const userNit = "123123123";
const userPhone = "1233242342";
const guideNumber = "NO APLICA";
const user_type = "MEC";
```
### Función para definir atributos del usuario
###### Genesys Cloud cuenta con el método `Genesys` para enviar información a los flujos de IVR y posteriormente ser gestionados por medio de un  `Get Participant Data`. La función `sendValues_toGenesys` recibe como parámetro `observation` el cual trae la información del usuario si presenta novedades u observaciones en el envío. 

```js
function toggleMessenger_novedades() {
  Genesys(
    "command",
    "Messenger.open",
    {},
    function (o) {
      //CAPTURO VALORES DEL TEXTAREA 
      observation = document.querySelector("#floatingTextarea2").value;
      
      sendValues_toGenesys(observation);
    }, // if resolved
    function (o) {
      // if rejected
      Genesys("command", "Messenger.close");
    }
  );
}
```
### Evento asociado al botón de novedades en el envío
###### Por medio de esta función se invoca un método para abrir y cerrar el contenedor del chat, adicionalmente; se captura el valor del ```js <textarea>``` y se envía como parámetro a la función `sendValues_toGenesys` para posteriormente enviarse como atributos del usuario a Genesys Cloud.

```js
const sendValues_toGenesys = (observation = "NO APLICA") => {
  Genesys("command", "Database.set", {
    messaging: {
      customAttributes: {
        isLogin: client_state,
        user: userName,
        nit: userNit,
        phone: userPhone,
        guide: guideNumber,
        notes: observation,
        type: user_type,
      },
    },
  });
};
```
