# MundoExperiencia
### Librer铆as utilizadas:
###### CDN de Boostrap [Bootstrap 5](https://getbootstrap.com/docs/5.2/getting-started/introduction/). 馃憠 `no es necesario descargar para su implementaci贸n`

###### Para ejecutar el archivo es necesario hacer uso de un servidor, en este caso se utilz贸 live server de VS 馃憠 `no es necesario descargar para su implementaci贸n`

### Variables para capturar datos del usuario desde el dominio del cliente
```js
const userName = "Juan";
const userNit = "123123123";
const userPhone = "1233242342";
const guideNumber = "NO APLICA";
const user_type = "MEC";
```
### Funci贸n para definir atributos del usuario
###### Genesys Cloud cuenta con el m茅todo `Genesys` para enviar informaci贸n a los flujos de IVR y posteriormente ser gestionados por medio de un  `Get Participant Data`. La funci贸n `sendValues_toGenesys` recibe como par谩metro `observation` el cual trae la informaci贸n del usuario si presenta novedades u observaciones en el env铆o. 

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
### Evento asociado al bot贸n de novedades en el env铆o
###### Por medio de esta funci贸n se invoca un m茅todo para abrir y cerrar el contenedor del chat, adicionalmente; se captura el valor del ```js <textarea>``` y se env铆a como par谩metro a la funci贸n `sendValues_toGenesys` para posteriormente enviarse como atributos del usuario a Genesys Cloud.

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
