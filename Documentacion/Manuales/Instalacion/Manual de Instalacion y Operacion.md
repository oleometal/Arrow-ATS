<<<<<<< HEAD
<div class="center">
# MANUAL DE USUARIO


INSTALACIÓN Y OPERACIÓN DE
SISTEMA DE CONTROL DE
HERRAMIENTA DE CNC</div>
# MANUAL DE USUARIO


INSTALACIÓN Y OPERACIÓN DE
SISTEMA DE CONTROL DE
HERRAMIENTA DE CNC
=======
###### DISEÑO Y DESARROLLO DE SITIOS WEB Y APPS MOVILES Email: contacto@lynext.com Sitio web: http://lynext.com Tegucigalpa, Honduras

# MANUAL DE USUARIO INSTALACIÓN Y OPERACIÓN DE SISTEMA DE CONTROL DE HERRAMIENTA DE CNC

###### LYNEXT S.A. DE C.V Ing. Erick Zelaya Ing. Alejandro Delcid
---
##  CONTENIDO

CONCEPTOS BASICOS 
1. INSTALACIÓN
2. ARDUINO IDE
3. AÑADIR LAS BOARDS DE INDUSTRIALS SHIELDS AL IDE DE ARDUINO
4. REVISIONES PREVIAS 
5. JSON SERVER 
6. DISPOSITIVOS CONECTADOS
7. FRECUENCIA DE LOS DISPOSITIVOS
8. SELECCIONAR DISPOSITIVOS
9. PARSER
10. CORS
11. PASO A PASO 
12. G-CODE PARSER 
13. COMO USAR: 
14. COMO SOLUCIONAR ERRORES: 
15.CONTROL DE HERRAMIENTAS
16. CREAR UNA HERRAMIENTA 
17. MODIFICAR UNA HERRAMIENTA
18. BORRAR UNA HERRAMIENTA
19. FUNCIONAMIENTO ESPECIAL DEL COMPONENTE 
20. WIDGET DEL PLC 
21. CONTROLES MANUALES 
22. RESETEAR TINY G 
---
## CONCEPTOS BASICOS
A continuación se listan los componentes técnicos que serán mencionados en el
presente documento, se detalla el significado de cada componente para una mejor
lectura y comprensión de los manuales:
1. **IP:** Es una dirección única que se le asigna a cada equipo conectado a la red
local. Mediante esta dirección otros equipos dentro de la misma red podrán
comunicarse entre ellos. Ejemplo de IP: 192.168.0.1
2. **Servidor:** Computadora que se utiliza para conectar los componentes
asociados a la maquina CNC. La dirección IP del servidor es la 192.168.0.98.
3. **CNC:** Por sus siglas en inglés Computer Numerical Control. Maquina Arrow
ATS cuya función es ejecutar las instrucciones que se le pasaran mediante
código.
4. **Parser:** Pagina web instalada localmente en el servidor cuya función es recibir
el código g generado por el diseñador y formatearlo para luego ser
procesado en la plataforma chilipeppr.
5. **Chilipeppr:** Plataforma web donde se deberá ingresar el código que fue
previamente pasado por la pagina parser y donde se puede comenzar la
ejecución de las instrucciones de diseño.
6. **Arduino:** plataforma open-source de prototipado electrónico que permite a
los usuarios interactuar con objetos electrónicos.
7. **PLC:** Control lógico programable (por sus siglas en inglés) que permite
manipular entradas y salidas lógicas, tanto digitales como analógicas.
8. **Macro:** Codigo de javascript cuya función es ejecutarse cada vez que se
encuentra un cambio de herramienta en el código g.
9. **JSON Server:** Archivo que actua como intermedio entre la plataforma
chilipeppr y Arduino o Tiny G.
10. **TinyG:** Placa programable encargada de interpretar las coordenadas en el
código g.
11. **Terminal:** Programa instalado por defecto en el servidor que ayuda a ejecutar
comandos de administrador.
12. **Puertos:** Como mencionamos anteriormente la IP nos sirve para ingresar a
un determinado equipo dentro de la red pero para acceder a un dispositivo
conectado a ese equipo necesitamos especificar el identificador del
dispositivo que queremos acceder [Arduino o TinyG] para eso necesitamos
especificar los puertos en los cuales están conectados los dispositivos.
13. **CORS:** Cross Origin Resource Sharing. Es un mecanismo que permite la
comunicación entre dominios diferentes. Es decir para comunicarnos desde
chilippepr.com al servidor local [192.168.0.98] tenemos que habilitar esta
opción en el navegador [firefox]. Por defecto esto viene deshabilitado, para
habilitar tenemos que instalar en la máquina que accedemos a chilipeppr un
complemento al navegador [firefox].
14. **Widget:** Componente de chilipeppr que permite controlar y llevar un registro
de la actividad de los procesos que se están ejecutando en segundo plano.
Por ejemplo leer estado de sensores, listado de pasos en ejecución del código
g etc.
---
## INSTALACIÓN
En la Consola de Linux para correr el servidor de la aplicación parser
automáticamente en el reinicio (solo cuando se requiera configurar un servidor
nuevo, por defecto ya está instalado): `~$ npm install pm2 -g`
En la carpeta del proyecto de página-parser ejecutar el comando:
```
~$ sudo pm2 start bin/www
~$ sudo pm2 startup
~$ sudo pm2 save
```
Configurar puertos para el sistema operativo Linux en caso de cambiar de
servidor:
1. Identificar en qué dirección de puerto se encuentra ubicado la placa del tinyG
y del arduino mega, respectivamente
2. En el archivo de macro ubicar el texto "/dev/ttyUSB0", se debe verificar que
esa dirección coincide con el puerto al cual está asociado la placa tinyG
3. Sustituir el texto por el puerto nuevo en el cual se conecta la placa tinyG (en
caso de ser necesario).
4. En el archivo widget-plc.js en la carpeta del proyecto del servidor parser,
ubicar el texto "/dev/ttyACM0"
5. Sustituir la dirección por el puerto nuevo en el cual se conecta la placa de
arduino mega (en caso de ser necesario)
6. Identificar los puertos en Linux al cual se asocia cada placa:
7. Para lograr este objetivo se utiliza Python y el módulo serial. Con la siguiente
lista de instrucciones:
```
~$ sudo python
>>> import serial.tools.list_ports
>>> portlist = serial.tools.list_ports.comports()
>>> conn = []
>>> for device in portlist:
>>> con.append(elemento.device)
>>>print str(conn)
>>> exit()
```
De las instrucciones anteriores se imprime en consola los puertos que están
utilizados del servidor. Los que nos interesa son los puertos ACM que relaciona
con el PLC industrials shields; el puerto USB relaciona con la placa tinyG.
___
## ARDUINO IDE
1. Descargar la última versión de la página oficial de arduino:
https://www.arduino.cc/en/Main/Software
2. Descomprimir y extraer el archivo descargado
3. Ejecutar el script de instalación que se encuentra en la carpeta del archivo
descomprimido. Para ello se debe acceder al archivo mediante la consola y
ejecutar el comando `sudo ./install.sh`. Tal como se muestra en la siguiente
imagen:
4. En la terminal ejecutar el siguiente comando: `ls -l /dev/ttyACM*`. Esta acción
imprime en la pantalla algo como:
**crw-rw---- 1 root dialout 188, 0 5 apr 23.01 ttyACM0**
El 0 al final de ACM indica el archivo al cual se relaciona el arduino con su
respectivo puerto serial.
5. En la terminal ejecutar el siguiente comando:
`sudo usermod -a -G dialout <username>`
En donde se encuentra la etiqueta <username> cambiar por el nombre de
usuario del servidor.
6. Para que todos los cambios se realicen correctamente, se debe reiniciar el
servidor.
## AÑADIR LAS BOARDS DE INDUSTRIALS SHIELDS AL IDE DE ARDUINO
1. Abrir el Arduino IDE
2. Pulsar en la opción “Preferencias” del menú “Archivo” para abrir la ventana de
Preferencias.
3. En el cuadro de texto “Gestor de URLs Adicionales de Tarjetas”, añadir la
dirección:
> http://apps.industrialshields.com/main/arduino/boards/package_industrialshields_index.json
4. Cerrar la ventana de Preferencias con el botón “Ok”.
5. En el menú “Herramientas”, abrir el submenú “Placa”, pulsar sobre la opción
“Gestor de Tarjetas”, para abrir la ventana del Gestor de Tarjetas.
6. Buscar la entrada “industrialshields” en las lista y pulsar sobre el botón
“Instalar”.
7. Una vez realizados estos pasos, ya se puede seleccionar el PLC con el que se
desea trabajar en el menú “Herramientas” > “Placa”: ARDBOX, M-DUINO.
___
## REVISIONES PREVIAS
#### JSON SERVER
Revisar que el servicio de Json Server Serial Port está activo y corriendo en el
servidor [192.168.0.98].
Formas de hacerlo:
1. Terminal del servidor: buscar terminal en el buscador de aplicaciones del
servidor. Una vez abierta la terminal escribir el comando:
`sudo ps aux | grep “json-server”`
Deberá mostrarse un listado con el proceso que se está ejecutando. Si no aparece en
el listado deberá ejecutar el json server manualmente:
a. Ir a la carpeta donde se encuentra el archivo json server:
`cd /home/ats/json-server-serial-port`
b. Levantar el servidor de json server:
`sudo ./json-server-serial-port`
2. Desde chilipeppr: Conectarse desde el asistente de conexión con json
server ingresando la ip del servidor 192.168.0.98. Si le muestra el listado
de puertos abiertos en el servidor todo está bien de lo contrario ir al paso
anterior y seguir todos los pasos para reiniciar manualmente json server.
#### DISPOSITIVOS CONECTADOS
El siguiente paso es verificar que los dispositivos TinyG y Arduino están conectados y
disponibles para su utilización:
Como hacerlo:
Para identificar ambos dispositivos debemos conocer en qué puerto están
conectados. TinyG está conectado en el puerto /dev/ttyUSB0 y Arduino está
conectado en el puerto /dev/ttyACM0. Chilipeppr debería mostrar estos dos puertos
en su listado. Puede ser que no se muestre la nomenclatura /dev/ en los puertos
pero básicamente es lo mismo.
#### FRECUENCIA DE LOS DISPOSITIVOS
Previo a seleccionar los dispositivos que vamos a usar en este caso TinyG y Arduino.
Debemos Revisar que Arduino[ttyACM0] este seteado con los valores default y 9600
en y TinyG[ttyUSB0] este seteado con los valores tinyg y 115200.
___
#### SELECCIONAR DISPOSITIVOS
Una vez completado el paso anterior podemos proceder a seleccionar los
dispositivos. Dando click en el check a lado izquierdo del dispositivo se seleccionara y
se posicionara en la parte de arriba del listado.
Nota: Revisar que TinyG [ttyUSB0] este como dispositivo primario. Es decir que este
con un color verde de fondo. Esto le dice a chilipeppr que dispositivo actuara como
principal y cuales dispositivos actuaran como secundarios.
#### PARSER
Esta página tiene varias funcionalidades:
1. Procesar el código g que exporto el diseñador y prepararlo para ser utilizado
por chilipeppr.
2. Almacenar los mensajes de error que se muestran en la plataforma de
chilipeppr.
3. Almacenar parámetros de configuración de los sensores de movimiento y
calibración de la cnc.
4. Validar si las herramientas están listas para ser utilizadas.
Debemos verificar que la pagina este corriendo y funcionando.
Como hacerlo:
Esta página está instalada en el servidor es decir que podemos acceder a ella
mediante su dirección IP. En cualquier computadora conectada a la red abrimos
Firefox y escribimos en la barra superior de navegación lo siguiente:
http://192.168.0.98:8080

a. http: Es el protocolo de comunicación web.

b. 192.168.0.98: Es la dirección ip del servidor

c. 8080: puerto sobre el que está corriendo la página.

Deberá mostrarse la página parser. En caso que no se muestre significa que
debemos levantar la página manualmente.
Usando la terminal escribiremos los siguientes comandos:
1. Primero debemos acceder a la carpeta donde se encuentra la página parser:
`cd /home/ats/Arrow/Parser`
2. Levantar el servicio que muestra la página:
`sudo npm start bin/www`
Con esto ya tendremos corriendo la página parser. Para revisar que todo esté
funcionando ir a “Como hacerlo” de esta sección.
___
#### CORS
Revisar que está habilitada la opción para comunicarnos entre dominios cruzados:
Chilipeppr y el servidor local [192.168.0.98].
Como hacerlo:
1. Revisar que el icono ubicado en la parte superior derecha del navegador está
habilitada en color verde.
2. También puedes verificar viendo que los botones de husillo, brazo y carrusel
se encuentren en estado liberar o contraer. Cada vez que se recarga la
página se consulta el estado de estos 3 sensores y se muestra en el widget
del PLC de esta manera podemos comprobar que al comunicación se logró
satisfactoriamente. 
#### PASO A PASO
1. Parsear el CODIGO G generado por el diseñador, arrastrando el archivo al GCODE
PARSER
2. Subir el archivo generado por el parseador al entorno de trabajo
(http://chilipeppr.com/dida)
3. Seleccionar la placa principal, TINY G (ttyUSB0), y la placa secundaria,
ARDUINO (ttyACM0).
4. Hacer HOME en toda la máquina, tiene que hacer HOME en el Arduino cada
vez que se enciende la máquina. Una vez hecho HOME y la maquina está
encendida no es necesario volver a hacer HOME.

![Figura 3 HACER HOME EN LA MAQUINA](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/123.png)
###### Figura 3 HACER HOME EN LA MAQUINA
5. Correr el código G desde el Widget Gcode: Si siguió todas las instrucciones
previas de chequeo, no debería tener problema para realizar toda la
operación. Si surgió algún problema en ejecución, lo verá reflejado en el
listado de errores del WIDGET PLC.
![Figura 4 COMENZAR EJECUCION](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%204%20COMENZAR%20EJECUCION.png)
###### Figura 4 COMENZAR EJECUCION
#### G-CODE PARSER
Componente que posee la capacidad de identificar los cambios de herramientas den
el código G generado por el diseñador para luego agregar las cabeceras y líneas de
pausas requeridas por la plataforma chilipeppr.
![Figura 5 G-CODE PARSER](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%205%20G-CODE%20PARSER.png)
###### Figura 5 G-CODE PARSER
#### COMO USAR:
● Arrastrar el archivo o dar click en el área negra para buscar el archivo
generado por el diseñador.
● Si el código g es válido el componente generara un nuevo archivo que se
guarda en descargas. Dicho archivo estará listo para ser usado en la
plataforma chilipeppr.
● Si el código g no es válido aparecerán los errores de compilación.COMO SOLUCIONAR ERRORES:
1. HERRAMIENTA NO LISTA
![Figura 6 HERRAMIENTA NO LISTA](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%206%20HERRAMIENTA%20NO%20LISTA.png)
###### Figura 6 HERRAMIENTA NO LISTA
Este mensaje indica que la herramienta no está lista o en mal estado. Para
solucionar este problema vamos a la tabla de offset y verifique el estado de la
herramienta y cambie el estado a “Herramienta lista”.
2. HERRAMIENTA NO EXISTE
![Figura 7 HERRAMIENTA NO EXISTE](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%207%20HERRAMIENTA%20NO%20EXISTE.png)
###### Figura 7 HERRAMIENTA NO EXISTE

Este mensaje indica que la herramienta que va a utilizar en el código g no
existe y ha sido removida del carrusel herramientas. Para solucionar este
error debe crear dicha herramienta, para esto presione el botón (+) verde
debajo de la tabla y llene el siguiente formulario.
___
#### CONTROL DE HERRAMIENTAS
Permite el control de los pockets y detalles de las herramientas como ser nombre,
longitud, offset y diámetro. Todos estos datos son actualizables por el usuario y se
guardan en un archivo de configuración.
![Figura 9 CONTROL DE HERRAMIENTAS](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%209%20CONTROL%20DE%20HERRAMIENTAS.png)
###### Figura 9 CONTROL DE HERRAMIENTAS
#### CREAR UNA HERRAMIENTA
Presionar el botón verde (+) y se le abrirá el siguiente formulario.
![Figura 10 NUEVA HERRAMIENTA](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%20NUEVA%20HERRAMIENTA.png)
###### Figura 10 NUEVA HERRAMIENTA

Complete todos los campos:
*  Número de herramienta
*  Posición en el pocket
*  Nombre de la herramienta
*  Longitud (milímetros)
*  Offset (milímetros)
*  Diámetro (milímetros)

Para guardar los cambios, presione el botón guardar.
NOTA: Solamente se pueden guardar 18 herramientas. Una por cada posición en el
carrusel.
___
#### MODIFICAR UNA HERRAMIENTA
Seleccionar la herramienta que desee modificar. Puede editar todos los campos
como ser pocket, nombre, longitud, Offset y diámetro.
![Figura 11 MODIFICAR HERRAMIENTA](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%2011%20MODIFICAR%20HERRAMIENTA.png)
###### Figura 11 MODIFICAR HERRAMIENTA
Para guardar los cambios, presione el botón azul y le aparecerá un mensaje que
indicará que los cambios han sido realizados.
Si le aparece un mensaje de error que dos herramientas no puede estar en el mismo
pocket. Debe de revisar que el pocket de la herramienta que modificó este libre.
![Figura 12 VALIDACION POCKET](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%2012%20VALIDACION%20POCKET.png)
###### Figura 12 VALIDACION POCKET
Para facilitar esta tarea abajo de la tabla de herramientas aparecen los pockets
disponible.
![Figura 13 POCKETS LIBRES](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%2013%20POCKETS%20LIBRES.png)
###### Figura 13 POCKETS LIBRES
#### BORRAR UNA HERRAMIENTA
Sí desea eliminar una herramienta que no se está usando, solamente tiene que
presionar el icono rojo de basura, se le pedirá una confirmación antes de eliminar la
herramienta.
![Figura 14 BORRAR HERRAMIENTA](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%2014%20BORRAR%20HERRAMIENTA.png)
###### Figura 14 BORRAR HERRAMIENTA
#### FUNCIONAMIENTO ESPECIAL DEL COMPONENTE
Cada vez que se ejecute un cambio de herramienta se podrá ver en tiempo real la
herramienta que se encuentra en el husillo y los pockets que van quedando libres.
Esta funcionalidad es completamente automática y no requiere de intervención del
usuario.
![Figura 15 HERRAMIENTA EN HUSILLO - POCKETS LIBRES](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%2015%20HERRAMIENTA%20EN%20HUSILLO%20-%20POCKETS%20LIBRES.png)
###### Figura 15 HERRAMIENTA EN HUSILLO - POCKETS LIBRES
#### WIDGET DEL PLC
Componente desarrollado para el manejo manual de selección del pocket,
contracción y liberación de los pistones de la cnc y los mensajes de error que se
puedan producir en el proceso de cambio de herramienta.
Cada vez que se carga el entorno de trabajo dida (http://chilipeppr.com/dida) se
actualiza el estado de los pistones (LIBERADO Y CONTRAIDO) del carrusel, brazo y
husillo.
En la siguiente imagen se muestran los 3 botones de control manual de los pistones.
Como se puede apreciar no aparece ninguno de los estados (LIBERADO -
CONTRAIDO) por lo tanto no se han cargado correctamente.

![Figura 16 WIDGET PLC](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%2016%20WIDGET%20PLC.png)
###### Figura 16 WIDGET PLC
Para solucionar este problema verificar que la extensión de dominio cruzado este
activada. Cada vez que se reinicie el servidor deberá de activar esta extensión para
evitar problemas con la comunicación con el PLC.
![Figura 17 CORS=CROSS-ORIGIN RESOURCE SHARING](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%2017%20CORS%3DCROSS-ORIGIN%20RESOURCE%20SHARING.png)
###### Figura 17 CORS=CROSS-ORIGIN RESOURCE SHARING
#### CONTROLES MANUALES
![Figura 18 CONTROLES MANUALES PLC](https://github.com/oleometal/Arrow-ATS/blob/master/Documentacion/Imagenes/Figura%2018%20CONTROLES%20MANUALES%20PLC.png)
###### Figura 18 CONTROLES MANUALES PLC
1. Seleccionar pocket: posicionar un determinado pocket en HOME.
2. Control manual de pistones: Liberar o contraer los pistones del carrusel,
brazo y husillo.
#### RESETEAR TINY G
Cada vez que se resetea el TINY G, debe seguir los siguientes pasos para que el
sistema funcione de nuevo:
1. Apagar la maquina desde el botón rojo.
2. Reiniciar el JSON SERVER: Terminar el servicio desde el administrador de
tareas y levantarlo de nuevo desde el acceso directo que se encuentra en el
escritorio.
3. Reconectar JSON SERVER desde chilipeppr.
4. Revisar de nuevo que la placa principal (TINY G) y la secundaria (ARDUINO)
estén conectados y en los puertos correctos.
>>>>>>> 4ca380e7f297146f44acdac5dd48deaf0a0c7fdc
