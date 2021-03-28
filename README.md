# AN-C02-Calculadora-huella-de-carbono

Implementación de la calculadora para el cálculo de la huella de carbono.

* El archivo wordpress.css contiene el estilo a agregar en la configuración global de Wordpress. Se usa para hacer funcionar la calculadora al ser implementada en el sitio mediante un iframe con un campo de texto. **Obligatoriamente, para evitar problemas con los eventos de touch en ciertos dispositivos táctiles, el campo de texto donde es agregado el iframe de la calculadora debe estar configurado para tener una única columna.**

* Para editar los textos de la primera y última vista de la calculadora hay que editar el archivo *index.html*.

## Las operaciones que realiza la calculadora

El texto y el contenido de las opciones se editan directamente desde el objeto *data* en *script.js*.
 
**Pregunta 1 - Selecciona el tamaño de tu vivienda**
 * Pequeña hasta 100m2 = 558,45
 * Mediana hasta 200m2 = 930,75
 * Grande más de 200 m2 = 1861,5

**Pregunta 2 - Cuántas personas viven contigo**
 * 1 = 0.5
 * 2 = 0.67
 * 3 = 1
 * 4 o más = 1.25

**Pregunta 3 - ¿Qué tipo de transporte utilizas regularmente?**
 * Camioneta SUV = 5100
 * Auto compacto = 3000
 * Transporte Público = 105
 * Bicicleta / Camino = 0

**Pregunta 4 - Con qué frecuencia comes carne**
 * A diario = 3785,6
 * A veces = 2642,64
 * Poco = 2264,08
 * Nunca (Vegetariano) = 1907,36
 * Nunca (Vegano) = 844,48

**Pregunta 5 - Con qué frecuencia viajas en avion**
 * Más de dos veces al año = 2610
 * Una vez al año = 1305
 * Ninguna vez = 0
 
 **Total-c02** = ( pregunta1 * pregunta2 + pregunta3 + pregunta4 + pregunta5 ) / 1000  
 **Total-árboles** = Total-co2 ÷ 2
