let backButton = document.getElementById("calc-co2-back-button");
let contentTitle = document.getElementById("calc-co2-content-title");
let contentDescription = document.getElementById("calc-co2-content-description");
let contentInitial = document.getElementById("calc-co2-content-initial");
let contentFinal = document.getElementById("calc-co2-content-final");
let contentOptions = document.getElementById("calc-co2-content-options");
let co2Totals = document.getElementById("co2-calc-totals");
let treesTotals = document.getElementById("co2-trees-totals");
let treesCount = document.getElementById("co2-calc-trees-count");
let textTree =  document.getElementById("text-trees-count");

// Data almacena toda la infomación de la calculadora.
// Atributos:
//	- title: Define el título del cuadro actual de la calculadora.
//	- description: Define el texto secundario bajo el título.
//	- backButton: Define si muestra o no el botón de retorno en la etapa actual de la calculadora.
//	- options: Arreglo que contiene los nombres de las opciones en un etapa específica.
//	- values: Arreglo que contiene los valores de co2 a seleccionar.
//	- icons: Arreglo de los íconos asociados a cada una de las opciones.
//	- iconsSize: Arreglo para el tamaño de los íconos.
//	- iconNum: Arreglo para la cantidad de íconos a mostrar por opción.
//
//	Las opciones title, description y backButton son abligatorias, las restantes no.
let data = [
	{ 
		title: "Bienvenido", 
		description: "A continuación te haremos una  serie de preguntas que nos ayudarán a calcular tu huella de carbono.",
		backButton: false
	},
	{ 
		title: "Vivienda", 
		description: "Selecciona el tamaño de tu vivienda.",
		backButton: true,
		options: ["Pequeña", "Mediana", "Grande"],
		values: [558.45, 930.75, 1861.5],
		icons: ["fa-home", "fa-home", "fa-home"],
		iconsSize: ["fa-2x", "fa-3x", "fa-4x"],
		iconsNum: [1, 1, 1]
	},
	{ 
		title: "Vivienda", 
		description: "¿Cuántas personas viven contigo?",
		backButton: true,
		options: ["1", "2", "3", "4 o más"],
		values: [0.5, 0.67, 1, 1.25],
		icons: ["fa-male", "fa-male", "fa-male", "fa-male"],
		iconsSize: ["fa-2x", "fa-2x", "fa-2x", "fa-2x"],
		iconsNum: [1, 2, 3, 4]
	},
	{ 
		title: "Transporte", 
		description: "¿Qué tipo de transporte utilizas regularmente?",
		backButton: true,
		options: ["Camioneta SUV", "Auto Compacto", "Transporte público", "Bicicleta", "Camino"],
		values: [5100, 3000, 105, 0, 0],
		icons: ["fa-car", "fa-car", "fa-bus", "fa-bicycle", "fa-road"],
		iconsSize: ["fa-2x", "fa-lg", "fa-2x", "fa-2x", "fa-2x"],
		iconsNum: [1, 1, 1, 1, 1]
	},
	{ 
		title: "Dieta", 
		description: "¿Con qué frecuencia comes carne?",
		backButton: true,
		options: ["A diario", "A veces", "Poco", "Nunca (Vegetariano)", "Nunca (Vegano)"],
		values: [3785.6, 2642.64, 2264.08, 1907.36, 844.48],
		icons: ["fa-circle", "fa-circle", "fa-circle", "fa-circle-o", "fa-circle-o-notch"],
		iconsSize: ["fa-2x", "fa-2x", "fa-2x", "fa-2x", "fa-2x"],
		iconsNum: [3, 2, 1, 1, 1]
	},
	{ 
		title: "Vuelos", 
		description: "¿Con qué frecuencia viajas en avión al año?",
		backButton: true,
		options: ["2 o mas", "1", "Ninguna vez"],
		values: [2610, 1305, 0],
		icons: ["fa-plane", "fa-plane", "fa-ban"],
		iconsSize: ["fa-2x", "fa-2x", "fa-2x"],
		iconsNum: [3, 1, 1]
	},
	{ 
		title: "Resultado", 
		description: "",
		backButton: true
	}
];

// Mouse and tocuh events
// Credits to Martijn from:
// https://stackoverflow.com/questions/18914568/make-onclick-work-on-iphone
let selectEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

// Delegate the next stage action to the events click and touchstart for initial
// and final stage buttons.
let edgeButtons = document.getElementsByClassName("calc-co2-edge-button");
for (var i = 0; i < edgeButtons.length; i++) {
  edgeButtons[i].addEventListener(selectEvent, function () {
	  co2CalcNextStage();
  });
}

/*document.getElementById("calc-co2-init-button").addEventListener(selectEvent, function() {
co2CalcNextStage();	
});*/

let values = [0, 0, 0, 0, 0, 0]; // Valores seleccionados en la calculadora.
let currentStage = 0;
let totalCo2 = 0;
let totalTrees = 0;

let contentInitialBaseDisplay = contentInitial.style.display;
let contentFinalBaseDisplay = contentFinal.style.display;
let contentOptionsBaseDisplay = contentOptions.style.display;

// Ajusta la calculadora en su primera vista.
function initializeCo2Calc() {
	backButton.style.display = "none";
	contentFinal.style.display = "none";
	contentOptions.style.display = "none";
	updateContentCo2Calc();
}

// Crea los elementos de las opciones de cada etapa
function createOptions() {
	// Solo si hay opciones disponibles
	if (data[currentStage].options) {
		data[currentStage].options.forEach(currentOptionSettings)
	}

	// Funcion iterativa para recorrer las opciones de una etapa.
	function currentOptionSettings(v, i, a) {
		var div = document.createElement("Div");
		div.classList.add("calc-co2-content-button");
		div.classList.add("calc-co2-button-content");
		div.addEventListener(selectEvent, function () {
			values[currentStage] = data[currentStage].values[i];	
			co2CalcNextStage();	
		});

		var title = document.createElement("Div");
		title.classList.add("calc-co2-button-title");
		title.innerHTML = v;

		var iconDiv = document.createElement("Div");
		iconDiv.classList.add("calc-co2-icon-container");

		// Si hay íconos disponibles se crean en la cantidad y tamaño indicados en data.
		if (data[currentStage].icons) {
			for (j = 0; j < data[currentStage].iconsNum[i]; j++) {
				var icon = document.createElement("I");
				icon.classList.add("fa");
				icon.classList.add(data[currentStage].icons[i]);
				icon.classList.add(data[currentStage].iconsSize[i]);
				icon.classList.add("calc-co2-button-icon");
				iconDiv.appendChild(icon);
			}
		}
		
		div.appendChild(iconDiv);
		div.appendChild(title);
		contentOptions.appendChild(div);
	}
}

// Limpia todas las opciones en una etapa. Elimina los elementos.
function clearOptions() {
	while (contentOptions.firstChild) {
		contentOptions.removeChild(contentOptions.lastChild);
	}
}

// Actualiza el contenido de la calculadora en funcion de la etapa actual.
function updateContentCo2Calc() {
	// ajuste de botón de retorno.
	if (data[currentStage].backButton) backButton.style.display = "initial";
	else backButton.style.display = "none";

	// Verifica si es la primera vista y ajusta los elementos.
	if (currentStage == 0) {
		contentInitial.style.display = contentInitialBaseDisplay;
		contentOptions.style.display = "none";
	} else {
		contentInitial.style.display = "none";
		contentOptions.style.display = contentOptionsBaseDisplay;
	}

	// Verifica si es la última vista y ajusta los elementos.
	if (currentStage == data.length - 1) {
		contentFinal.style.display = contentFinalBaseDisplay;
		contentOptions.style.display = "none";
		co2CalcTotals(); // Genera los resultados según las opciones.
	} else {
		contentFinal.style.display = "none";
		contentOptions.style.display = contentOptionsBaseDisplay;
	}

	// Actualiza los párametros de la calculadora.
	contentTitle.innerHTML = data[currentStage].title;
	contentDescription.innerHTML = data[currentStage].description;
	clearOptions();
	createOptions();
}

// Selecciona y actualiza a la epata siguiente.
function co2CalcNextStage() {
	currentStage += 1;
	if (currentStage >= data.length) currentStage = 0;
	updateContentCo2Calc();
}

// Selecciona y actualiza a la epata previa.
function co2CalcPrevStage(){
	currentStage -= 1;
	if (currentStage < 0) currentStage = data.length - 1;
	updateContentCo2Calc();
}

// Calcula los resultados finales de la calculadora y actualiza los elementos de la vista final.
function co2CalcTotals() {
	totalCo2 = values[1] * values[2] + values[3] + values[4] + values[5];
	totalCo2 /= 1000;
	totalTrees = Math.round(totalCo2 * 0.5);

	co2Totals.innerHTML = totalCo2.toFixed(2);
	treesTotals.innerHTML = totalTrees;
	textTree.innerHTML = (totalTrees == 1) ? "árbol" : "árboles";
	
	while (treesCount.firstChild) {
		treesCount.removeChild(treesCount.lastChild);
	}

	for (j = 0; j < totalTrees; j++) {
		var icon = document.createElement("I");
		icon.classList.add("fa");
		icon.classList.add("fa-tree");
		icon.classList.add("fa-lg");
		icon.classList.add("calc-co2-trees-icon");
		treesCount.appendChild(icon);
	}
}

initializeCo2Calc();
