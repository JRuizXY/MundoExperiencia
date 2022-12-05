//VARIABLES PARA DEFINIR ATRIBUTOS DEL USUARIO
//NO PUEDEN ALMACENAR VALORES VACIOS || NULL || UNDEFINED
//POR DEFECTO DEBE DEFINIRSE COMO NO APLICA

//CLIENTE LOGUEADO -> DIFINIR CON true SI INICIÓ SESIÓN
const client_state = false; 

//NOMBRE DEL CLIENTE
const userName = "Hermes";

//NÚMERO DE DOCUMENTO DE IDENTIDAD
const userNit = "12334342";

//NÚMERO DE TELÉFONO 
const userPhone = "NO APLICA";

//NÚMERO DE GUÍA
const guideNumber = "NO APLICA";

//TIPO DE USUARIO
const user_type = "MEC";

//CONEXIÓN CON GENESYS, SE DEBE SETEAR EN EL HTML O EL COMPONENTE PARA
//ESTABLECER LA CONEXIÓN CON EL SERVIDOR,  DEBE SER EJECUTADO UNA SOLA VEZ
//AL CARGAR EL DOM, VISTA O COMPONENTE
(function (g, e, n, es, ys) {
  g["_genesysJs"] = e;
  g[e] =
    g[e] ||
    function () {
      (g[e].q = g[e].q || []).push(arguments);
    };
  g[e].t = 1 * new Date();
  g[e].c = es;
  ys = document.createElement("script");
  ys.async = 1;
  ys.src = n;
  ys.charset = "utf-8";
  document.head.appendChild(ys);
})(
  window,
  "Genesys",
  "https://apps.mypurecloud.com/genesys-bootstrap/genesys.min.js",
  {
    environment: "use1",
    deploymentId: "99ced391-894d-4a9b-81e8-87a4f2adc4de",
  }
);

/* FUNCIÓN PARA ENVIAR PARAMETROS A GENESYS 
DESDE CADA BOTÓN O EVENTO */
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

//SE DEBE INICIALIZAR LA FUNCIÓN POR DEFECTO
sendValues_toGenesys();

//EVENTO ASOCIADO A GENESYS PARA ABRIR LA BURBUJA DEL CHAT
function toggleMessenger() {
  Genesys(
    "command",
    "Messenger.open",
    {},

    function (o) {}, // if resolved
    function (o) {
      // if rejected
      Genesys("command", "Messenger.close");
    }
  );
}

//EVENTO ASOCIADO A GENESYS PARA ABRIR LA BURBUJA DEL CHAT DESDE
//ENVÍO DE NOVEDADES

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
