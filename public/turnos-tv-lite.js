(function () {
  "use strict";

  var get = function (id) { return document.getElementById(id); };
  var backend = document.querySelector('meta[name="turnos-backend"]').content;
  var slugMatch = /^\/turnos\/tv-lite\/([^/]+)\/?$/.exec(window.location.pathname);
  var connection = get("connection");
  var notice = get("notice");
  var panel = get("current-panel");
  var audio = get("audio");
  var audioStatus = get("audio-status");
  var synth;
  var audioEnabled = false;
  var previousCalls = null;

  function setText(element, value) {
    if (element.firstChild && element.firstChild.nodeValue === value) return;
    if (element.firstChild) element.removeChild(element.firstChild);
    element.appendChild(document.createTextNode(value));
  }

  function formatModule(turn) {
    var name = turn.moduloName || turn.moduloCode;
    if (!name) return "";
    return /^(m[oó]dulo|ventanilla|consultorio|sala)/i.test(name) ? name : "Módulo " + name;
  }

  function showAudioError() {
    audioEnabled = false;
    audio.disabled = false;
    setText(audio, "Activar audio");
    setText(audioStatus, "No se pudo reproducir la voz. Los llamados seguirán en pantalla.");
    cancelAudio();
  }

  function cancelAudio() {
    if (typeof synth.cancel === "function") synth.cancel();
  }

  function announce(text, onEnd, onError) {
    try {
      var utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = "es-CO";
      utterance.rate = 0.9;
      utterance.onend = onEnd;
      utterance.onerror = function (event) {
        if (event.error !== "canceled" && event.error !== "interrupted") onError();
      };
      synth.speak(utterance);
    } catch (_error) {
      onError();
    }
  }

  function testAudio() {
    audio.disabled = true;
    setText(audioStatus, "Reproduciendo prueba de voz…");
    var timer = window.setTimeout(function () { finish(false); }, 10000);
    function finish(success) {
      if (!timer) return;
      window.clearTimeout(timer);
      timer = null;
      if (!success) return showAudioError();
      audioEnabled = true;
      audio.disabled = false;
      setText(audio, "Desactivar audio");
      setText(audioStatus, "Anuncios de voz activados.");
    }
    announce("Prueba de audio. Los turnos se anunciarán por este dispositivo.",
      function () { finish(true); }, function () { finish(false); });
  }

  function setupAudio() {
    synth = window.speechSynthesis;
    if (!synth || typeof synth.speak !== "function" ||
      typeof window.SpeechSynthesisUtterance !== "function") {
      setText(audioStatus, "Este navegador no admite anuncios de voz.");
      return;
    }
    audio.disabled = false;
    audio.onclick = function () {
      if (!audioEnabled) return testAudio();
      audioEnabled = false;
      cancelAudio();
      setText(audio, "Activar audio");
      setText(audioStatus, "Anuncios de voz desactivados.");
    };
  }

  function detectCalls(turns) {
    var current = {};
    var detected = [];
    for (var index = 0; index < turns.length; index++) {
      var turn = turns[index];
      var key = "turn-" + turn.turnoId;
      current[key] = turn.calledAt || "";
      if (previousCalls && turn.status === "LLAMADO" &&
        current[key] !== previousCalls[key]) detected.push(turn);
    }
    previousCalls = current;
    return detected;
  }

  function renderCurrent(turn) {
    var calling = turn && turn.status === "LLAMADO";
    if (!calling) panel.className = "panel";
    if (calling && panel.className === "panel") panel.className = "panel calling";
    setText(get("ticket"), turn ? turn.ticketCode : "—");
    setText(get("call-status"), calling ? "Llamando" : turn ? "En atención" : "Sala de espera");
    setText(get("module"), turn && formatModule(turn) || "Por favor, esté atento a su llamado");
  }

  function renderUpcoming(turns) {
    var list = get("upcoming-list");
    var fragment = document.createDocumentFragment();
    for (var index = 0; index < turns.length && index < 5; index++) {
      var item = document.createElement("li");
      setText(item, turns[index].ticketCode);
      fragment.appendChild(item);
    }
    while (list.firstChild) list.removeChild(list.firstChild);
    list.appendChild(fragment);
    var empty = get("upcoming-empty");
    setText(empty, "No hay turnos próximos");
    empty.style.display = turns.length ? "none" : "";
  }

  function renderRecentCalls(calls) {
    var list = get("recent-calls-list");
    var fragment = document.createDocumentFragment();
    for (var index = 0; index < calls.length && index < 5; index++) {
      var call = calls[index];
      var item = document.createElement("li");
      var code = document.createElement("strong");
      var destination = document.createElement("span");
      setText(code, call.ticketCode);
      setText(destination, call.moduloName ||
        (call.moduloCode ? "Módulo " + call.moduloCode : "Módulo no informado"));
      item.appendChild(code);
      item.appendChild(destination);
      fragment.appendChild(item);
    }
    while (list.firstChild) list.removeChild(list.firstChild);
    list.appendChild(fragment);
    var empty = get("recent-calls-empty");
    setText(empty, "No hay llamados recientes");
    empty.style.display = calls.length ? "none" : "";
  }

  function showCalls(calls) {
    if (!calls.length) return;
    panel.className = "panel calling";
    // Fuerza un nuevo ciclo de animación solo ante un llamado o rellamado.
    panel.getBoundingClientRect();
    panel.className = "panel calling ringing";
    for (var index = calls.length - 1; audioEnabled && index >= 0; index--) {
      var turn = calls[index];
      var destination = formatModule(turn) || "el módulo de atención";
      announce("Turno " + turn.ticketCode.replace(/-/g, " ") + ", pasar a " + destination,
        null, showAudioError);
    }
  }

  function renderState(state) {
    var calls = detectCalls(state.activeTurns);
    var highlight = calls[0] || state.activeTurns[0];
    if (!calls.length) {
      for (var index = 0; index < state.activeTurns.length; index++) {
        if (state.activeTurns[index].status === "LLAMADO") {
          highlight = state.activeTurns[index];
          break;
        }
      }
    }
    setText(get("sede"), state.headquarter.name || "Sede de atención");
    renderCurrent(highlight);
    renderUpcoming(state.upcomingTurns);
    renderRecentCalls(Array.isArray(state.recentCalls) ? state.recentCalls : []);
    setText(connection, "Actualizado");
    connection.className = "connection";
    notice.style.display = "none";
    showCalls(calls);
  }

  function showConnectionError(message) {
    connection.className = "connection offline";
    setText(connection, previousCalls ? "Información desactualizada" : "Sin datos de turnos");
    setText(notice, message);
    notice.style.display = "";
  }

  function handleResponse(request) {
    if (request.status !== 200) {
      showConnectionError(request.status === 404 ? "Sede no encontrada o no habilitada."
        : "No se pudo consultar el estado de turnos. Volveremos a intentar.");
      return;
    }
    try {
      var state = JSON.parse(request.responseText);
      if (!state || !state.headquarter || !Array.isArray(state.activeTurns) ||
        !Array.isArray(state.upcomingTurns)) throw new Error("Estado de turnos incompleto.");
      renderState(state);
    } catch (_error) {
      showConnectionError("No se pudo leer el estado de turnos. Volveremos a intentar.");
    }
  }

  function poll(url) {
    var request = new XMLHttpRequest();
    var deadline = window.setTimeout(function () {
      request.onreadystatechange = null;
      request.abort();
      retry();
    }, 10000);
    function retry() {
      showConnectionError("No se pudo conectar con el servicio de turnos. Volveremos a intentar.");
      window.setTimeout(function () { poll(url); }, 5000);
    }
    try {
      request.open("GET", url + "?_=" + new Date().getTime(), true);
      request.onreadystatechange = function () {
        if (request.readyState !== 4) return;
        request.onreadystatechange = null;
        window.clearTimeout(deadline);
        handleResponse(request);
        window.setTimeout(function () { poll(url); }, 5000);
      };
      request.send(null);
    } catch (_error) {
      request.onreadystatechange = null;
      window.clearTimeout(deadline);
      retry();
    }
  }

  function start() {
    if (!slugMatch) return showConnectionError("Abra el enlace de TV correspondiente a su sede.");
    if (!backend || backend === "%VITE_URL_BACKEND%") {
      return showConnectionError("No se configuró la dirección del servicio de turnos.");
    }
    if (!window.XMLHttpRequest || !window.JSON || !Array.isArray) {
      return showConnectionError("Este navegador no puede consultar el estado de turnos.");
    }
    setupAudio();
    poll(backend.replace(/\/+$/, "") + "/api/v1/turnos/tv/" + slugMatch[1] + "/estado");
  }

  start();
}());
