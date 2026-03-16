const map = L.map("map", {
	zoomControl: true,
	preferCanvas: true
});

///////// Plans //////////

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

///////// Images aériennes //////////

var ignaerial1950 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_0_18" +
    "&FORMAT=image/png"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.1950-1965"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 0,
        maxZoom : 18,
        attribution : "IGN",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
    });

var ignaerial1965 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=BDORTHOHISTORIQUE" +
    "&TILEMATRIXSET=PM_3_18" +
    "&FORMAT=image/png"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.1965-1980"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 3,
        maxZoom : 18,
        attribution : "IGN",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
    });

var ignaerial2000 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_6_18" +
    "&FORMAT=image/png"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.COAST2000"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 6,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2005 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_6_18" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS2000-2005"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 6,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2009 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_6_18" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS2006-2010"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 6,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2015 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_6_18" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS2011-2015"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 6,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2018 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_0_18" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS2018"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 0,
        maxZoom : 18,
        attribution : "IGN",
    });

var ignaerial2023 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 0,
        attribution : "IGN",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
    });

var ign2023 = L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM_0_19" +
    "&FORMAT=image/png"+
    "&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"+
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom : 0,
        maxZoom : 19,
        attribution : "IGN",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
    });

const baseLayers = {
	"OpenStreetMap": osm,
    "Plan IGN":ign2023,
	"IGN 1950-1965": ignaerial1950,
	"IGN 1965-1980": ignaerial1965,
	"IGN Coast 2000": ignaerial2000,
	"IGN 2000-2005": ignaerial2005,
	"IGN 2006-2010": ignaerial2009,
	"IGN 2011-2015": ignaerial2015,
	"IGN 2018": ignaerial2018,
	"IGN 2023": ignaerial2023
};

const panelType = document.getElementById("feature-type");
const panelTitle = document.getElementById("feature-title");
const panelSubtitle = document.getElementById("feature-subtitle");
const panelMeta = document.getElementById("feature-meta");
const panelDescription = document.getElementById("feature-description");
const panelComment = document.getElementById("feature-comment");
const searchInput = document.getElementById("search-toponym");
const filterType = document.getElementById("filter-type");
const filterStatus = document.getElementById("filter-status");
const filterPrecision = document.getElementById("filter-precision");
const colorMode = document.getElementById("color-mode");
const locateUserButton = document.getElementById("locate-user");
const resetFiltersButton = document.getElementById("filters-reset");
const resultsCount = document.getElementById("results-count");

const TYPE_LABELS = {
	lavoir: "Lavoir",
	fontaine: "Fontaine",
	lavoir_fontaine: "Lavoir et fontaine",
	"lavoir en bordure de greve": "Lavoir en bordure de greve"
};

const STATUS_CLASS = {
	exists: "#007f73",
	uncertain: "#ca6a2a",
	removed: "#8f3b2c"
};

const PRECISION_CLASS = {
	exact: "#0b7a75",
	refined: "#3f9d68",
	approximate: "#d8a021",
	veryApproximate: "#c95d3a",
	unknown: "#7b8790"
};

const LEGEND_ENTRIES = {
	status: [
		{ color: STATUS_CLASS.exists, label: "Existant" },
		{ color: STATUS_CLASS.uncertain, label: "À déterminer" },
		{ color: STATUS_CLASS.removed, label: "Détruit / Ruiné" }
	],
	precision: [
		{ color: PRECISION_CLASS.exact, label: "Exacte" },
		{ color: PRECISION_CLASS.refined, label: "Affinée" },
		{ color: PRECISION_CLASS.approximate, label: "Approximative" },
		{ color: PRECISION_CLASS.veryApproximate, label: "Très imprécise" },
		{ color: PRECISION_CLASS.unknown, label: "Inconnue" }
	]
};

let selectedLayer = null;
let defaultStyleByLayer = new WeakMap();
const visibleLayerGroup = L.layerGroup().addTo(map);
const markerEntries = [];
let userLocationMarker = null;
let userAccuracyCircle = null;

const layerControl = L.control.layers(
	baseLayers,
	{
		"Points recensés": visibleLayerGroup
	},
	{
		collapsed: false,
		position: "topright"
	}
).addTo(map);

const layerControlContainer = layerControl.getContainer();
if (layerControlContainer) {
	layerControlContainer.classList.add("base-layer-control");
	layerControlContainer.classList.add("base-layer-control--collapsed");

	const controlHeader = document.createElement("div");
	controlHeader.className = "base-layer-control__header";

	const controlTitle = document.createElement("span");
	controlTitle.className = "base-layer-control__title";
	controlTitle.textContent = "Fonds de carte";

	const controlToggle = document.createElement("button");
	controlToggle.type = "button";
	controlToggle.className = "base-layer-control__toggle";
	controlToggle.setAttribute("aria-expanded", "false");
	controlToggle.setAttribute("aria-label", "Afficher les fonds de carte");
	controlToggle.textContent = "Fonds";

	controlHeader.append(controlTitle, controlToggle);
	layerControlContainer.prepend(controlHeader);

	const controlForm = layerControlContainer.querySelector(".leaflet-control-layers-form");

	function setLayerControlCollapsed(isCollapsed) {
		layerControlContainer.classList.toggle("base-layer-control--collapsed", isCollapsed);
		controlToggle.setAttribute("aria-expanded", String(!isCollapsed));
		controlToggle.setAttribute(
			"aria-label",
			isCollapsed ? "Afficher les fonds de carte" : "Replier les fonds de carte"
		);
		controlToggle.textContent = isCollapsed ? "Fonds" : "Replier";
		if (controlForm) {
			controlForm.hidden = isCollapsed;
		}
	}

	setLayerControlCollapsed(true);
	controlToggle.addEventListener("click", () => {
		setLayerControlCollapsed(
			!layerControlContainer.classList.contains("base-layer-control--collapsed")
		);
	});
}

function normalizeText(value) {
	return safeText(value, "")
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim();
}

function toYesNo(value) {
	if (value === true) return "Oui";
	if (value === false) return "Non";
	return "Inconnu";
}

function safeText(value, fallback = "Non renseigne") {
	if (value === null || value === undefined) {
		return fallback;
	}
	const text = String(value).trim();
	return text.length ? text : fallback;
}

function typeLabel(rawType) {
	return TYPE_LABELS[rawType] || safeText(rawType);
}

function markerColorFromStatus(statusRaw) {
	const status = safeText(statusRaw, "").toLowerCase();
	if (status.includes("détruit") || status.includes("ruine")) {
		return STATUS_CLASS.removed;
	}
	if (status.includes("à déterminer") || status.includes("a déterminer")) {
		return STATUS_CLASS.uncertain;
	}
	return STATUS_CLASS.exists;
}

function markerColorFromPrecision(precisionRaw) {
	const precision = normalizeText(precisionRaw);
	if (precision.includes("exacte")) {
		return PRECISION_CLASS.exact;
	}
	if (precision.includes("affinee") || precision.includes("affinée")) {
		return PRECISION_CLASS.refined;
	}
	if (precision.includes("approximative")) {
		return PRECISION_CLASS.approximate;
	}
	if (precision.includes("tres imprecise") || precision.includes("très imprécise")) {
		return PRECISION_CLASS.veryApproximate;
	}
	return PRECISION_CLASS.unknown;
}

function markerStyleFromFeature(feature) {
	const color = colorMode?.value === "precision"
		? markerColorFromPrecision(feature.properties?.modif_geom)
		: markerColorFromStatus(feature.properties?.statut);

	return {
		radius: 7,
		color,
		weight: 1.5,
		fillColor: color,
		fillOpacity: 0.85
	};
}

function selectedMarkerStyle(baseStyle) {
	return {
		...baseStyle,
		color: "#172328",
		weight: 2,
		radius: 10,
		fillOpacity: 1
	};
}

function applyMarkerStyle(layer, feature) {
	const style = markerStyleFromFeature(feature);
	defaultStyleByLayer.set(layer, style);
	layer.setStyle(layer === selectedLayer ? selectedMarkerStyle(style) : style);
}

function updateLegend() {
	const container = document.getElementById("map-legend");
	if (!container) return;
	const mode = colorMode?.value === "precision" ? "precision" : "status";
	const title = mode === "precision" ? "Précision de localisation" : "Statut";
	const entries = LEGEND_ENTRIES[mode];
	const items = entries
		.map(
			(e) =>
				`<li class="map-legend__item">` +
				`<span class="map-legend__dot" style="background:${e.color}"></span>` +
				`<span>${e.label}</span>` +
				`</li>`
		)
		.join("");
	container.innerHTML =
		`<p class="map-legend__title">${title}</p>` +
		`<ul class="map-legend__list">${items}</ul>`;
}

function refreshMarkerColors() {
	markerEntries.forEach((entry) => {
		applyMarkerStyle(entry.layer, entry.feature);
	});
	updateLegend();
}

function setLocateButtonState(isLoading, label) {
	if (!locateUserButton) return;
	locateUserButton.disabled = isLoading;
	locateUserButton.textContent = label;
}

function showLocationFeedback(message) {
	if (!resultsCount) return;
	resultsCount.textContent = message;
	window.clearTimeout(showLocationFeedback.timeoutId);
	showLocationFeedback.timeoutId = window.setTimeout(() => {
		renderVisibleLayers(false);
	}, 2500);
}

showLocationFeedback.timeoutId = null;

function drawUserLocation(latlng, accuracy) {
	if (userLocationMarker) {
		map.removeLayer(userLocationMarker);
	}
	if (userAccuracyCircle) {
		map.removeLayer(userAccuracyCircle);
	}

	userLocationMarker = L.circleMarker(latlng, {
		radius: 8,
		color: "#0b4f95",
		weight: 2,
		fillColor: "#2c7edb",
		fillOpacity: 0.9
	}).addTo(map);

	userAccuracyCircle = L.circle(latlng, {
		radius: Math.max(accuracy || 0, 10),
		color: "#2c7edb",
		weight: 1,
		fillColor: "#2c7edb",
		fillOpacity: 0.15
	}).addTo(map);

	map.fitBounds(userAccuracyCircle.getBounds(), {
		padding: [24, 24],
		maxZoom: 17
	});

	if (locateUserButton) {
		locateUserButton.classList.add("is-active");
	}
	setLocateButtonState(false, "Ma position");
	showLocationFeedback("Position affichée sur la carte");
}

function requestUserLocation() {
	if (!navigator.geolocation) {
		showLocationFeedback("Géolocalisation non supportée par ce navigateur");
		return;
	}

	setLocateButtonState(true, "Localisation...");
	map.locate({
		setView: false,
		watch: false,
		enableHighAccuracy: true,
		maximumAge: 0,
		timeout: 12000
	});
}

map.on("locationfound", (event) => {
	drawUserLocation(event.latlng, event.accuracy);
});

map.on("locationerror", () => {
	setLocateButtonState(false, "Ma position");
	if (locateUserButton) {
		locateUserButton.classList.remove("is-active");
	}
	showLocationFeedback("Impossible d'obtenir votre position");
});

if (locateUserButton) {
	locateUserButton.addEventListener("click", requestUserLocation);
}

function panelRow(label, value) {
	const dt = document.createElement("dt");
	dt.textContent = label;

	const dd = document.createElement("dd");
	dd.textContent = value;

	panelMeta.appendChild(dt);
	panelMeta.appendChild(dd);
}

function updatePanel(feature) {
	const props = feature.properties || {};

	panelType.textContent = typeLabel(props.type);
	panelTitle.textContent = safeText(props.nom, "Nom non renseigné");
	panelSubtitle.textContent = safeText(props["alt-name"], "Aucun nom alternatif");

	panelMeta.innerHTML = "";
	panelRow("Identifiant", safeText(props.fid));
	panelRow("Statut", safeText(props.statut));
	panelRow("Précision des coordonnées", safeText(props.modif_geom));
	panelRow("Source", safeText(props.source));
	panelRow("Trace sur le plan de 1910 ?", toYesNo(props.src_p1910));
	panelRow("Trace sur le cadastre de 1842 ?", toYesNo(props.src_c1842));

	const description = safeText(props.description, "");
	const comment = safeText(props.commentaire_st, "");

	if (description) {
		panelDescription.style.display = "block";
		panelDescription.textContent = `Description: ${description}`;
	} else {
		panelDescription.style.display = "none";
	}

	if (comment) {
		panelComment.style.display = "block";
		panelComment.textContent = `Commentaire: ${comment}`;
	} else {
		panelComment.style.display = "none";
	}
}

function resetPanel() {
	panelType.textContent = "Sélectionnez un point sur la carte";
	panelTitle.textContent = "Aucun point sélectionné";
	panelSubtitle.textContent = "Cliquez sur un marqueur pour afficher ses informations.";
	panelMeta.innerHTML = "";
	panelDescription.style.display = "none";
	panelComment.style.display = "none";
}

function clearSelection() {
	if (selectedLayer && defaultStyleByLayer.has(selectedLayer)) {
		selectedLayer.setStyle(defaultStyleByLayer.get(selectedLayer));
	}
	selectedLayer = null;
	resetPanel();
}

function uniqueSortedValues(features, propertyKey) {
	const values = features
		.map((feature) => safeText(feature.properties?.[propertyKey], ""))
		.filter((value) => value.length > 0);

	return Array.from(new Set(values)).sort((a, b) =>
		a.localeCompare(b, "fr", { sensitivity: "base" })
	);
}

function fillSelectOptions(selectElement, values, allLabel) {
	selectElement.innerHTML = "";

	const allOption = document.createElement("option");
	allOption.value = "";
	allOption.textContent = allLabel;
	selectElement.appendChild(allOption);

	values.forEach((value) => {
		const option = document.createElement("option");
		option.value = value;
		option.textContent = value;
		selectElement.appendChild(option);
	});
}

function matchesCurrentFilters(entry) {
	const query = normalizeText(searchInput.value);
	const selectedType = normalizeText(filterType.value);
	const selectedStatus = normalizeText(filterStatus.value);
	const selectedPrecision = normalizeText(filterPrecision.value);

	const hasType = !selectedType || entry.typeValue === selectedType;
	const hasStatus = !selectedStatus || entry.statusValue === selectedStatus;
	const hasPrecision = !selectedPrecision || entry.precisionValue === selectedPrecision;
	const hasQuery = !query || entry.searchValue.includes(query);

	return hasType && hasStatus && hasPrecision && hasQuery;
}

function renderVisibleLayers(zoomToVisible) {
	visibleLayerGroup.clearLayers();

	const visibleEntries = markerEntries.filter(matchesCurrentFilters);
	visibleEntries.forEach((entry) => {
		visibleLayerGroup.addLayer(entry.layer);
	});

	resultsCount.textContent = `${visibleEntries.length} / ${markerEntries.length} points affichés`;

	if (selectedLayer && !visibleLayerGroup.hasLayer(selectedLayer)) {
		clearSelection();
	}

	if (zoomToVisible && visibleEntries.length > 0) {
		const group = L.featureGroup(visibleEntries.map((entry) => entry.layer));
		map.fitBounds(group.getBounds(), { padding: [25, 25] });
	}
}

function selectLayer(layer, feature) {
	if (selectedLayer && defaultStyleByLayer.has(selectedLayer)) {
		selectedLayer.setStyle(defaultStyleByLayer.get(selectedLayer));
	}

	selectedLayer = layer;
	layer.setStyle(selectedMarkerStyle(defaultStyleByLayer.get(layer) || markerStyleFromFeature(feature)));

	updatePanel(feature);
}

fetch("./data/data.geojson")
	.then((response) => {
		if (!response.ok) {
			throw new Error(`Erreur HTTP ${response.status}`);
		}
		return response.json();
	})
	.then((geojson) => {
		const features = geojson.features || [];

		fillSelectOptions(filterType, uniqueSortedValues(features, "type"), "Tous");
		fillSelectOptions(filterStatus, uniqueSortedValues(features, "statut"), "Tous");
		fillSelectOptions(filterPrecision, uniqueSortedValues(features, "modif_geom"), "Toutes");

		const pointsLayer = L.geoJSON(geojson, {
			pointToLayer(feature, latlng) {
				const marker = L.circleMarker(latlng, markerStyleFromFeature(feature));

				defaultStyleByLayer.set(marker, markerStyleFromFeature(feature));
				return marker;
			},
			onEachFeature(feature, layer) {
				const title = safeText(feature.properties?.nom, "Nom non renseigne");
				const kind = typeLabel(feature.properties?.type);
				const altName = safeText(feature.properties?.["alt-name"], "");
				layer.bindTooltip(`${title} (${kind})`, {
					direction: "top",
					opacity: 0.95,
					offset: [0, -6]
				});

				markerEntries.push({
					layer,
					feature,
					typeValue: normalizeText(feature.properties?.type),
					statusValue: normalizeText(feature.properties?.statut),
					precisionValue: normalizeText(feature.properties?.modif_geom),
					searchValue: normalizeText(`${title} ${altName}`)
				});

				layer.on("click", () => {
					selectLayer(layer, feature);
				});
			}
		});

		pointsLayer.eachLayer((layer) => {
			visibleLayerGroup.addLayer(layer);
		});

		renderVisibleLayers(true);
		refreshMarkerColors();

		[searchInput, filterType, filterStatus, filterPrecision].forEach((element) => {
			element.addEventListener("input", () => {
				renderVisibleLayers(false);
			});
			element.addEventListener("change", () => {
				renderVisibleLayers(false);
			});
		});

		[colorMode].forEach((element) => {
			element.addEventListener("input", refreshMarkerColors);
			element.addEventListener("change", refreshMarkerColors);
		});

		resetFiltersButton.addEventListener("click", () => {
			searchInput.value = "";
			filterType.value = "";
			filterStatus.value = "";
			filterPrecision.value = "";
			colorMode.value = "precision";
			refreshMarkerColors();
			renderVisibleLayers(true);
		});
	})
	.catch((error) => {
		panelType.textContent = "Chargement impossible";
		panelTitle.textContent = "Erreur de lecture";
		panelSubtitle.textContent = "Le fichier data.geojson n'a pas pu etre charge.";
		panelMeta.innerHTML = "";
		panelDescription.style.display = "none";
		panelComment.style.display = "none";
		resultsCount.textContent = "0 / 0 points affichés";
		console.error(error);
	});
