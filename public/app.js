(function () {
  const AUTHOR_STORAGE_KEY = 'viaje_2027_author_name';

  const STOPS = [
    {
      id: 'madrid-start',
      order: 1,
      name: 'Madrid (Inicio)',
      short: 'MAD',
      country: 'España',
      coords: [-3.7038, 40.4168],
      dates: '30 abr – 2 may',
      nights: 2,
      focus: 'Aclimatación de baja fricción, Madrid de los Austrias y Paseo del Prado (1 de mayo festivo).',
      coffee: 'HanSo Café · Hola Coffee Lagasca',
      fitness: 'Revive (sauna finlandesa + fuerza) · Basic-Fit',
      luggage: 'Check-in 15:00 / consigna de hotel al llegar de MEX.'
    },
    {
      id: 'milan',
      order: 2,
      name: 'Milán',
      short: 'MIL',
      country: 'Italia',
      coords: [9.1882, 45.4637],
      dates: '2 – 4 may',
      nights: 2,
      focus: 'Estación Central monumental, Piazza San Sepolcro (1919), Plaza de Loreto (1945) y Navigli.',
      coffee: 'Cafezal Porta Venezia · Orsonero Coffee',
      fitness: "Gold's Gym / Plus1 Fitness · QC Termemilano (sauna en tranvía)",
      luggage: 'Check-in 15:00 / Check-out 11:00.'
    },
    {
      id: 'roma',
      order: 3,
      name: 'Roma',
      short: 'ROM',
      country: 'Italia',
      coords: [12.4942, 41.8905],
      dates: '4 – 7 may',
      nights: 3,
      focus: 'Coliseo, Foro Romano, Museo Storico della Liberazione (Via Tasso), Distrito EUR y Museos Capitolinos.',
      coffee: 'Faro – Caffè Specialty · Luna by Faro',
      fitness: 'Easy Fit Trastevere (pase diario sin certificado médico)',
      luggage: 'Kipoint Roma Termini si el tren llega antes de las 15:00.'
    },
    {
      id: 'napoles',
      order: 4,
      name: 'Nápoles',
      short: 'NAP',
      country: 'Italia',
      coords: [14.2681, 40.8518],
      dates: '7 – 9 may',
      nights: 2,
      focus: 'Spaccanapoli, Museo Arqueológico Nacional (MANN), Piazza del Plebiscito y Vomero.',
      coffee: 'Espresso napolitano tradicional / barras locales',
      fitness: 'Gimnasios con pase diario en centro/Vomero',
      luggage: 'Check-in 15:00 / Check-out 11:00.'
    },
    {
      id: 'pompeya',
      order: 5,
      name: 'Pompeya (Tránsito)',
      short: 'POM',
      country: 'Italia',
      coords: [14.4869, 40.7508],
      dates: '9 may (AM–PM)',
      nights: 0,
      focus: 'Inmersión arqueológica en el Parque Arqueológico de Pompeya (09:00–13:30) rumbo a Sorrento.',
      coffee: 'Parada breve junto a estación Pompei Scavi',
      fitness: 'Caminata intensa (~6–8 km sobre calzada romana)',
      luggage: 'Depósito gratuito oficial en entrada Porta Marina / consigna en estación.'
    },
    {
      id: 'sorrento',
      order: 6,
      name: 'Sorrento',
      short: 'SOR',
      country: 'Italia',
      coords: [14.3758, 40.6263],
      dates: '9 – 11 may',
      nights: 2,
      focus: 'Acantilados, Marina Piccola, Vallone dei Mulini y día completo de recuperación.',
      coffee: 'Terrazas locales del centro histórico',
      fitness: 'Natación y caminata costera hacia Punta del Capo',
      luggage: 'Check-in 15:00 / Check-out 11:00.'
    },
    {
      id: 'oporto',
      order: 7,
      name: 'Oporto',
      short: 'OPO',
      country: 'Portugal',
      coords: [-8.6110, 41.1496],
      dates: '11 – 14 may',
      nights: 3,
      focus: 'Fundación Serralves (Siza Vieira), Casa da Música (Koolhaas), Palácio da Bolsa y Ribeira.',
      coffee: "Senzu Coffee Roasters · C'alma Coffee Room · 7g Roaster",
      fitness: 'Fitness Hut (TrainAway) · El Spa Meliá Porto (sauna finlandesa)',
      luggage: 'Llegada vespertina directa a habitación; check-out 11:00 el 14 may.'
    },
    {
      id: 'vigo',
      order: 8,
      name: 'Vigo (Transbordo)',
      short: 'VGO',
      country: 'España',
      coords: [-8.7226, 42.2328],
      dates: '14 may (escala)',
      nights: 0,
      focus: 'Enlace ferroviario entre Tren Celta (Vigo Guixar) y AVE/Alvia (Vigo Urzáiz).',
      coffee: 'Pausa rápida entre estaciones (45–60 min margen)',
      fitness: 'Caminata de 15 min entre Guixar y Urzáiz (o 5 min en taxi)',
      luggage: 'Equipaje contigo durante el transbordo.'
    },
    {
      id: 'madrid-end',
      order: 9,
      name: 'Madrid (Cierre)',
      short: 'MAD',
      country: 'España',
      coords: [-3.7038, 40.4168],
      dates: '14 – 15 may',
      nights: 1,
      focus: 'Noche colchón junto a Chamartín / Línea 8 antes del vuelo transatlántico del sábado 15.',
      coffee: 'Desayuno temprano antes de ir a MAD',
      fitness: 'Descanso pre-vuelo intercontinental',
      luggage: 'Traslado a MAD con 3 h de antelación.'
    }
  ];

  const LEGS = [
    {
      id: 'leg-1',
      index: 1,
      from: 'madrid-start',
      to: 'milan',
      date: 'Dom 2 may',
      mode: 'flight',
      modeLabel: 'Vuelo directo (MAD → LIN/MXP)',
      transitTime: '2 h 10 min',
      doorToDoor: '5 h – 5 h 30 min',
      cost: '€62 – €109',
      transitMinutes: 130,
      notes: 'Air Europa (€62) o Iberia (€109) base. Incluye traslado a MAD (35 min), 2 h de seguridad y traslado en Milán (LIN 20 min / MXP €15).'
    },
    {
      id: 'leg-2',
      index: 2,
      from: 'milan',
      to: 'roma',
      date: 'Mar 4 may',
      mode: 'highspeed',
      modeLabel: 'Tren AV Frecciarossa No Stop',
      transitTime: '2 h 50 min',
      doorToDoor: '3 h 45 min',
      cost: '€30 – €55',
      transitMinutes: 170,
      notes: 'Milano Centrale → Roma Termini directo. Tarifas anticipadas en Italo / Trenitalia.'
    },
    {
      id: 'leg-3',
      index: 3,
      from: 'roma',
      to: 'napoles',
      date: 'Vie 7 may',
      mode: 'highspeed',
      modeLabel: 'Tren AV Frecciarossa / Italo',
      transitTime: '1 h 08 min',
      doorToDoor: '1 h 50 min',
      cost: '€15 – €25',
      transitMinutes: 68,
      notes: 'Roma Termini → Napoli Centrale. Sin controles aeroportuarios.'
    },
    {
      id: 'leg-4',
      index: 4,
      from: 'napoles',
      to: 'pompeya',
      date: 'Dom 9 may',
      mode: 'regional',
      modeLabel: 'Tren Circumvesuviana / Campania Exp.',
      transitTime: '40 min',
      doorToDoor: '1 h 00 min',
      cost: '€3.30 – €8',
      transitMinutes: 40,
      notes: 'Salida desde Porta Nolana / Garibaldi hasta Pompei Scavi (junto a Porta Marina).'
    },
    {
      id: 'leg-5',
      index: 5,
      from: 'pompeya',
      to: 'sorrento',
      date: 'Dom 9 may',
      mode: 'regional',
      modeLabel: 'Tren Circumvesuviana / Campania Exp.',
      transitTime: '30 min',
      doorToDoor: '45 min',
      cost: '€4.60 – €7',
      transitMinutes: 30,
      notes: 'Trayecto costero tras recoger el equipaje en la consigna de Pompeya.'
    },
    {
      id: 'leg-6',
      index: 6,
      from: 'sorrento',
      to: 'roma',
      date: 'Mar 11 may',
      mode: 'highspeed',
      modeLabel: 'Trenes Sorrento → Nápoles → Roma FCO',
      transitTime: '2 h 50 min',
      doorToDoor: '3 h 45 min',
      cost: '€34 – €44',
      transitMinutes: 170,
      notes: 'Circumvesuviana a Nápoles (€4.60, 1 h 10 min) + Frecciarossa/Italo a Roma Termini (€15–€25, 1 h 08 min) + Leonardo Express a FCO (€14, 32 min).'
    },
    {
      id: 'leg-7',
      index: 7,
      from: 'roma',
      to: 'oporto',
      date: 'Mar 11 may',
      mode: 'flight',
      modeLabel: 'Vuelo directo (FCO → OPO)',
      transitTime: '3 h 05 min',
      doorToDoor: '5 h 35 min',
      cost: '€50 – €68',
      transitMinutes: 185,
      notes: 'Vuelo directo diario desde Roma Fiumicino con Wizz Air (€50) o Ryanair (€68). Incluye 2 h de seguridad y -1 h de huso horario al llegar a Oporto.'
    },
    {
      id: 'leg-8',
      index: 8,
      from: 'oporto',
      to: 'vigo',
      date: 'Vie 14 may',
      mode: 'regional',
      modeLabel: 'Tren Celta (Campanhã → Vigo Guixar)',
      transitTime: '2 h 20 min',
      doorToDoor: '3 h 15 min',
      cost: '€15 – €25',
      transitMinutes: 140,
      notes: 'Cruce fronterizo por el Miño (+1 h huso al entrar a España) + 15 min a pie o 5 min en taxi a Vigo Urzáiz.'
    },
    {
      id: 'leg-9',
      index: 9,
      from: 'vigo',
      to: 'madrid-end',
      date: 'Vie 14 may',
      mode: 'highspeed',
      modeLabel: 'Tren AVE / Alvia (Vigo → Chamartín)',
      transitTime: '4 h 30 min',
      doorToDoor: '5 h 15 min',
      cost: '€35 – €65',
      transitMinutes: 270,
      notes: 'Tramo de alta velocidad Galicia–Madrid (desde €35.30 anticipado) llegando directo a Chamartín.'
    }
  ];

  const DAYS = [
    { id: 'd1', num: 1, date: 'Vie 30 abr', city: 'Madrid', stopId: 'madrid-start', legId: null, am: 'Aterrizaje en MAD, traslado y paseo suave por Madrid de los Austrias.', pm: 'Café en HanSo Café, caminata por el Retiro y cena temprana.', transit: 'MAD → Centro (35–45 min).', notes: 'Check-in 15:00 / consigna de hotel.' },
    { id: 'd2', num: 2, date: 'Sáb 1 may', city: 'Madrid', stopId: 'madrid-start', legId: null, am: 'Arquitectura exterior: Paseo del Prado y Salamanca (festivo).', pm: 'Hola Coffee Lagasca + fuerza y sauna finlandesa en Revive / Basic-Fit.', transit: 'Metro y caminata (15–25 min).', notes: '1 de mayo festivo: museos cerrados.' },
    { id: 'd3', num: 3, date: 'Dom 2 may', city: 'Madrid → Milán', stopId: 'milan', legId: 'leg-1', am: 'Check-out y traslado a MAD para vuelo directo a Milán.', pm: 'Llegada a Milán, check-in y caminata por los canales de Navigli.', transit: 'Vuelo 2 h 10 min | P2P: 5 h – 5 h 30 min.', notes: 'Volar a Linate (LIN) ahorra tiempo urbano.' },
    { id: 'd4', num: 4, date: 'Lun 3 may', city: 'Milán', stopId: 'milan', legId: null, am: 'Estación Central, Piazza San Sepolcro (1919) y Plaza de Loreto (1945).', pm: "Cafezal Porta Venezia + fuerza en Gold's Gym/Plus1 + sauna en QC Termemilano.", transit: 'Metro M1/M3 (20 min).', notes: 'Reservar QC Termemilano con antelación.' },
    { id: 'd5', num: 5, date: 'Mar 4 may', city: 'Milán → Roma', stopId: 'roma', legId: 'leg-2', am: 'Café en Orsonero Coffee, check-out y Frecciarossa No Stop a Roma.', pm: 'Check-in en Roma y caminata: Panteón, Piazza Navona y Largo Argentina.', transit: 'Tren AV 2 h 50 min | P2P: 3 h 45 min.', notes: 'Consigna en Kipoint Termini si llegas antes de las 15:00.' },
    { id: 'd6', num: 6, date: 'Mié 5 may', city: 'Roma', stopId: 'roma', legId: null, am: 'Coliseo, Foro Romano, Palatino (08:30) y Museo Storico della Liberazione.', pm: 'Café en Faro + fuerza en Easy Fit Trastevere (sin certificado) y cena.', transit: 'Metro B + Tranvía 8 (18–20 min).', notes: 'Reservar Coliseo exactamente 30 días antes.' },
    { id: 'd7', num: 7, date: 'Jue 6 may', city: 'Roma', stopId: 'roma', legId: null, am: 'Distrito racionalista EUR (Palazzo della Civiltà Italiana y ejes).', pm: 'Museos Capitolinos (hasta 19:30), Ara Pacis y café en Luna by Faro.', transit: 'Metro B a EUR Palasport (20 min).', notes: 'Capitolinos abren todos los días.' },
    { id: 'd8', num: 8, date: 'Vie 7 may', city: 'Roma → Nápoles', stopId: 'napoles', legId: 'leg-3', am: 'Mañana ligera (Testaccio / Caracalla), check-out y tren AV a Nápoles.', pm: 'Check-in, Spaccanapoli, Capilla Sansevero, Chiaia y pizza napolitana.', transit: 'Tren AV 1 h 08 min | P2P: 1 h 50 min.', notes: 'Consigna en hotel si llegas al mediodía.' },
    { id: 'd9', num: 9, date: 'Sáb 8 may', city: 'Nápoles', stopId: 'napoles', legId: null, am: 'Museo Arqueológico Nacional (MANN) y Piazza del Plebiscito.', pm: 'Fuerza en gimnasio local (pase diario) y atardecer en Vomero / Sant’Elmo.', transit: 'Metro Línea 1 (15–20 min).', notes: 'MANN abre con horario completo en sábado.' },
    { id: 'd10', num: 10, date: 'Dom 9 may', city: 'Nápoles → Pompeya → Sorrento', stopId: 'pompeya', legId: 'leg-4', am: 'Tren a Pompeya e inmersión arqueológica total (09:00–13:30).', pm: 'Tren a Sorrento, check-in, acantilados y atardecer en Marina Piccola.', transit: 'Tren 40 min + 30 min | P2P total: ~1 h 45 min.', notes: 'Guardar maletas en depósito Porta Marina.' },
    { id: 'd11', num: 11, date: 'Lun 10 may', city: 'Sorrento', stopId: 'sorrento', legId: null, am: 'Mañana sin prisas: centro histórico, Vallone dei Mulini y miradores.', pm: 'Descanso activo: natación, caminata costera a Punta del Capo y cena.', transit: 'A pie o bus SITA local (10–20 min).', notes: 'Día colchón para bajar fatiga.' },
    { id: 'd12', num: 12, date: 'Mar 11 may', city: 'Sorrento → Roma FCO → Oporto', stopId: 'oporto', legId: 'leg-7', am: 'Tren Sorrento–Nápoles–Roma Termini + Leonardo Express a FCO para vuelo directo a Oporto.', pm: 'Llegada a Oporto, check-in y caminata vespertina por Ribeira y Ponte Luís I.', transit: 'Trenes + vuelo 3 h 05 min | P2P: ~7 h 45 min | Est.: €84–€112.', notes: 'Wizz Air €50 / Ryanair €68 directo desde FCO (-1 h huso).' },
    { id: 'd13', num: 13, date: 'Mié 12 may', city: 'Oporto', stopId: 'oporto', legId: null, am: 'Fundación Serralves (Siza Vieira) y visita guiada a Casa da Música (Koolhaas).', pm: 'Senzu Coffee + fuerza en Fitness Hut + sauna finlandesa en El Spa Meliá.', transit: 'Tranvía/bus o Uber (15–25 min).', notes: 'Reservar visita guiada a Casa da Música.' },
    { id: 'd14', num: 14, date: 'Jue 13 may', city: 'Oporto', stopId: 'oporto', legId: null, am: 'Palácio da Bolsa, Iglesia de São Francisco, São Bento y Catedral de la Sé.', pm: "Café en C'alma o 7g Roaster (Gaia) y tarde de lectura en Cedofeita.", transit: 'A pie (3–5 km); cruce a Gaia (15 min).', notes: 'Reservar horario fijo en Palácio da Bolsa.' },
    { id: 'd15', num: 15, date: 'Vie 14 may', city: 'Oporto → Vigo → Madrid', stopId: 'vigo', legId: 'leg-8', am: 'Check-out temprano y Tren Celta de Porto Campanhã a Vigo Guixar.', pm: 'Transbordo en Vigo a Urzáiz y AVE/Alvia a Madrid Chamartín.', transit: 'Celta 2 h 20 min + AVE 4 h 30 min | P2P: ~8 h 30 min.', notes: 'Margen de 45–60 min en Vigo; +1 h huso.' },
    { id: 'd16', num: 16, date: 'Sáb 15 may', city: 'Madrid (Salida)', stopId: 'madrid-end', legId: null, am: 'Traslado al Aeropuerto MAD con 3 h de antelación para vuelo a México.', pm: 'Vuelo transatlántico de regreso.', transit: 'Hotel → MAD (15–30 min en taxi/Metro L8).', notes: 'Check-out 11:00 o antes según vuelo.' }
  ];

  const state = {
    filter: 'all',
    sideTab: 'legs',
    selectedStopId: null,
    selectedLegId: 'leg-1',
    selectedDayId: null,
    hoveredLegId: null,
    playing: false,
    playTimer: null,
    comments: [],
    updates: [],
    commentFilter: 'all',
    commentForceGeneral: false,
    dbAvailable: true
  };

  const stopById = Object.fromEntries(STOPS.map(s => [s.id, s]));

  // ---------------- Map Setup ----------------
  const svg = d3.select('#route-map');
  const mapContainer = document.getElementById('route-map').parentElement;
  const statusEl = document.getElementById('map-status');
  const width = mapContainer.clientWidth || 800;
  const height = mapContainer.clientHeight || 520;

  svg.attr('viewBox', `0 0 ${width} ${height}`);

  const gRoot = svg.append('g');
  const gCountries = gRoot.append('g');
  const gLegs = gRoot.append('g');
  const gLabels = gRoot.append('g');
  const gStops = gRoot.append('g');

  const projection = d3.geoMercator()
    .center([3.5, 42.2])
    .scale(Math.min(width, height) * 2.55)
    .translate([width / 2, height / 2]);

  const pathGen = d3.geoPath().projection(projection);

  function updateZoomVisibility(k) {
    gStops.selectAll('circle.node-dot').attr('r', d => (d.id === 'pompeya' || d.id === 'vigo' ? 5 : 7) / Math.pow(k, 0.55));
    gStops.selectAll('text.node-label')
      .style('font-size', `${10.5 / Math.pow(k, 0.55)}px`)
      .style('opacity', d => {
        if (state.selectedStopId === d.id) return 1;
        if ((d.id === 'pompeya' || d.id === 'sorrento' || d.id === 'vigo') && k < 2.2) return 0;
        return 1;
      });
    gLabels.selectAll('g.time-pill')
      .style('opacity', d => {
        if (state.selectedLegId === d.id || state.hoveredLegId === d.id) return 1;
        if (d.id === 'leg-4' || d.id === 'leg-5') return k >= 5.2 ? 0.95 : 0;
        if (d.id === 'leg-3' || d.id === 'leg-6') return k >= 2.6 ? 0.95 : 0;
        return 0.95;
      });
    gLabels.selectAll('text.pill-text').style('font-size', `${9 / Math.pow(k, 0.6)}px`);
    gLegs.selectAll('path.leg-path').style('stroke-width', d => (state.selectedLegId === d.id || state.hoveredLegId === d.id ? 4 : 2.4) / Math.pow(k, 0.5));
  }

  const zoom = d3.zoom()
    .scaleExtent([0.8, 18])
    .on('zoom', (event) => {
      gRoot.attr('transform', event.transform);
      updateZoomVisibility(event.transform.k);
    });

  svg.call(zoom);

  function curvedArc(p1, p2) {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dr = Math.sqrt(dx * dx + dy * dy) * 1.25;
    return `M${p1[0]},${p1[1]}A${dr},${dr} 0 0,1 ${p2[0]},${p2[1]}`;
  }

  function straightLine(p1, p2) {
    return `M${p1[0]},${p1[1]}L${p2[0]},${p2[1]}`;
  }

  function modeMatchesFilter(mode) {
    if (state.filter === 'all') return true;
    if (state.filter === 'flight') return mode === 'flight';
    return mode === 'highspeed' || mode === 'regional';
  }

  function modeColor(mode) {
    if (mode === 'flight') return '#f59e0b';
    if (mode === 'highspeed') return '#2563eb';
    return '#059669';
  }

  function zoomToBounds(coordsList, paddingFactor = 0.65) {
    const pts = coordsList.map(c => projection(c));
    const xs = pts.map(p => p[0]);
    const ys = pts.map(p => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const dx = Math.max(maxX - minX, 30);
    const dy = Math.max(maxY - minY, 30);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const scale = Math.max(0.9, Math.min(14, paddingFactor / Math.max(dx / width, dy / height)));
    const translate = [width / 2 - scale * cx, height / 2 - scale * cy];
    svg.transition().duration(650).call(
      zoom.transform,
      d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
    );
  }

  const tooltipEl = document.getElementById('map-tooltip');

  function showTooltip(event, htmlText) {
    const rect = mapContainer.getBoundingClientRect();
    tooltipEl.innerHTML = htmlText;
    tooltipEl.classList.remove('hidden');
    const x = Math.min(rect.width - 210, Math.max(10, event.clientX - rect.left + 12));
    const y = Math.min(rect.height - 60, Math.max(10, event.clientY - rect.top - 12));
    tooltipEl.style.left = x + 'px';
    tooltipEl.style.top = y + 'px';
  }

  function hideTooltip() {
    tooltipEl.classList.add('hidden');
  }

  function renderRoute() {
    const k = d3.zoomTransform(svg.node()).k || 1;
    const legsSel = gLegs.selectAll('path.leg-path').data(LEGS, d => d.id);
    legsSel.join(
      enter => enter.append('path')
        .attr('class', 'leg-path')
        .on('click', (event, d) => {
          event.stopPropagation();
          selectLeg(d.id);
        })
        .on('mousemove', (event, d) => {
          state.hoveredLegId = d.id;
          updateZoomVisibility(d3.zoomTransform(svg.node()).k || 1);
          showTooltip(event, `<strong>${stopById[d.from].name} → ${stopById[d.to].name}</strong><br>${d.modeLabel} · ${d.transitTime} (${d.cost})`);
        })
        .on('mouseleave', () => {
          state.hoveredLegId = null;
          updateZoomVisibility(d3.zoomTransform(svg.node()).k || 1);
          hideTooltip();
        }),
      update => update,
      exit => exit.remove()
    )
      .attr('d', d => {
        const p1 = projection(stopById[d.from].coords);
        const p2 = projection(stopById[d.to].coords);
        if (d.mode === 'flight' || d.id === 'leg-6') return curvedArc(p1, p2);
        return straightLine(p1, p2);
      })
      .attr('stroke', d => modeColor(d.mode))
      .attr('stroke-dasharray', d => d.mode === 'flight' ? '6,5' : (d.id === 'leg-6' ? '4,3' : null))
      .classed('dimmed', d => !modeMatchesFilter(d.mode))
      .classed('active-leg', d => state.selectedLegId === d.id);

    const visibleLabels = LEGS.filter(d => modeMatchesFilter(d.mode));
    const labelSel = gLabels.selectAll('g.time-pill').data(visibleLabels, d => d.id);
    const labelEnter = labelSel.enter().append('g').attr('class', 'time-pill');
    labelEnter.append('rect').attr('rx', 4).attr('ry', 4);
    labelEnter.append('text').attr('class', 'pill-text').attr('text-anchor', 'middle').attr('dominant-baseline', 'central');

    labelSel.merge(labelEnter)
      .attr('transform', d => {
        const p1 = projection(stopById[d.from].coords);
        const p2 = projection(stopById[d.to].coords);
        let mx = (p1[0] + p2[0]) / 2;
        let my = (p1[1] + p2[1]) / 2;
        if (d.mode === 'flight') my -= 20;
        if (d.id === 'leg-6') { mx -= 22; my += 6; }
        if (d.id === 'leg-3') { mx += 16; my -= 6; }
        if (d.id === 'leg-4') { mx += 22; my -= 8; }
        if (d.id === 'leg-5') { mx += 24; my += 10; }
        return `translate(${mx}, ${my})`;
      });

    labelSel.merge(labelEnter).select('text.pill-text')
      .text(d => `${d.mode === 'flight' ? '✈' : '🚆'} ${d.transitTime}`)
      .style('font-weight', '600')
      .style('fill', d => state.selectedLegId === d.id ? '#ffffff' : '#1e293b');

    labelSel.merge(labelEnter).each(function (d) {
      const textNode = d3.select(this).select('text').node();
      const bbox = textNode.getBBox();
      d3.select(this).select('rect')
        .attr('x', bbox.x - 5)
        .attr('y', bbox.y - 2.5)
        .attr('width', bbox.width + 10)
        .attr('height', bbox.height + 5)
        .attr('fill', state.selectedLegId === d.id ? '#0f172a' : 'rgba(255,255,255,0.92)')
        .attr('stroke', state.selectedLegId === d.id ? '#0f172a' : '#cbd5e1')
        .attr('stroke-width', 0.8);
    });

    labelSel.exit().remove();

    const uniqueNodes = STOPS.filter(s => s.id !== 'madrid-end');
    const stopSel = gStops.selectAll('g.stop-node').data(uniqueNodes, d => d.id);
    const stopEnter = stopSel.enter().append('g')
      .attr('class', 'stop-node')
      .on('click', (event, d) => {
        event.stopPropagation();
        selectStop(d.id);
      })
      .on('mousemove', (event, d) => {
        showTooltip(event, `<strong>${d.order}. ${d.name}</strong><br>${d.dates}${d.nights > 0 ? ` (${d.nights}n)` : ''}`);
      })
      .on('mouseleave', hideTooltip);

    stopEnter.append('circle').attr('class', 'node-dot');
    stopEnter.append('text').attr('class', 'node-label');

    stopSel.merge(stopEnter)
      .attr('transform', d => {
        const p = projection(d.coords);
        return `translate(${p[0]}, ${p[1]})`;
      });

    stopSel.merge(stopEnter).select('circle.node-dot')
      .attr('fill', d => state.selectedStopId === d.id ? '#2563eb' : (d.nights === 0 ? '#10b981' : '#0f172a'))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    stopSel.merge(stopEnter).select('text.node-label')
      .attr('dx', d => (d.id === 'oporto' || d.id === 'vigo' || d.id === 'roma' || d.id === 'sorrento') ? -9 : 9)
      .attr('dy', d => d.id === 'sorrento' ? 11 : (d.id === 'milan' ? -8 : 4))
      .attr('text-anchor', d => (d.id === 'oporto' || d.id === 'vigo' || d.id === 'roma' || d.id === 'sorrento') ? 'end' : 'start')
      .text(d => d.id === 'madrid-start' ? '1/9. Madrid (MAD)' : `${d.order}. ${d.name.replace(' (Tránsito)', '').replace(' (Transbordo)', '')}`)
      .style('font-weight', '700')
      .style('fill', '#0f172a')
      .style('paint-order', 'stroke')
      .style('stroke', '#ffffff')
      .style('stroke-width', '3px');

    stopSel.exit().remove();
    updateZoomVisibility(k);
  }

  function renderDetailPanel() {
    const el = document.getElementById('detail-content');
    if (state.selectedDayId) {
      const day = DAYS.find(d => d.id === state.selectedDayId);
      el.innerHTML = `
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-900 text-white">Día ${day.num} · ${day.date}</span>
          <span class="text-xs font-semibold text-blue-700">${day.city}</span>
        </div>
        <div class="mt-3 space-y-2 text-xs text-slate-700">
          <div class="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Bloque AM</div>
            <p class="mt-0.5 text-slate-800">${day.am}</p>
          </div>
          <div class="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Bloque PM y Mantenimiento</div>
            <p class="mt-0.5 text-slate-800">${day.pm}</p>
          </div>
          <p><strong>Traslado:</strong> ${day.transit}</p>
          <p><strong>Notas:</strong> ${day.notes}</p>
        </div>
      `;
    } else if (state.selectedLegId) {
      const leg = LEGS.find(l => l.id === state.selectedLegId);
      const fromStop = stopById[leg.from];
      const toStop = stopById[leg.to];
      const badgeCls = leg.mode === 'flight'
        ? 'bg-amber-100 text-amber-800 border-amber-200'
        : (leg.mode === 'highspeed' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200');

      el.innerHTML = `
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${badgeCls}">${leg.modeLabel}</span>
          <span class="text-xs font-semibold text-slate-500">${leg.date}</span>
        </div>
        <h3 class="text-base font-bold text-slate-900 mt-2">${fromStop.name} → ${toStop.name}</h3>
        <div class="grid grid-cols-3 gap-2 mt-3">
          <div class="bg-slate-50 border border-slate-200 rounded-lg p-2">
            <div class="text-[10px] text-slate-500 font-medium">En ruta</div>
            <div class="text-xs sm:text-sm font-bold text-slate-900">${leg.transitTime}</div>
          </div>
          <div class="bg-slate-50 border border-slate-200 rounded-lg p-2">
            <div class="text-[10px] text-slate-500 font-medium">Puerta a puerta</div>
            <div class="text-xs sm:text-sm font-bold text-slate-900">${leg.doorToDoor}</div>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
            <div class="text-[10px] text-emerald-700 font-medium">Costo est.</div>
            <div class="text-xs sm:text-sm font-bold text-emerald-900">${leg.cost}</div>
          </div>
        </div>
        <p class="text-xs text-slate-600 mt-3 leading-relaxed">${leg.notes}</p>
        <div class="mt-3 pt-3 border-t border-slate-100">
          <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">En destino (${toStop.name})</div>
          <p class="text-xs text-slate-700 mt-1"><strong>Foco:</strong> ${toStop.focus}</p>
          <p class="text-xs text-slate-700 mt-1"><strong>Café:</strong> ${toStop.coffee}</p>
          <p class="text-xs text-slate-700 mt-1"><strong>Físico:</strong> ${toStop.fitness}</p>
        </div>
      `;
    } else if (state.selectedStopId) {
      const stop = stopById[state.selectedStopId];
      el.innerHTML = `
        <div class="flex items-center justify-between gap-2">
          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-900 text-white">Parada #${stop.order} · ${stop.country}</span>
          <span class="text-xs font-semibold text-slate-500">${stop.dates} (${stop.nights} noches)</span>
        </div>
        <h3 class="text-base font-bold text-slate-900 mt-2">${stop.name}</h3>
        <div class="mt-3 space-y-1.5 text-xs text-slate-700">
          <p><strong>Historia y Arquitectura:</strong> ${stop.focus}</p>
          <p><strong>Café de especialidad:</strong> ${stop.coffee}</p>
          <p><strong>Gimnasio / Sauna:</strong> ${stop.fitness}</p>
          <p><strong>Equipaje y Hotel:</strong> ${stop.luggage}</p>
        </div>
      `;
    }
  }

  function getOpenCommentCount(targetType, targetId) {
    return state.comments.filter(
      c => c.status === 'open' && c.target_type === targetType && c.target_id === targetId
    ).length;
  }

  function renderLegsList() {
    const container = document.getElementById('legs-list');
    const filtered = LEGS.filter(l => modeMatchesFilter(l.mode));
    container.innerHTML = filtered.map(leg => {
      const fromStop = stopById[leg.from];
      const toStop = stopById[leg.to];
      const isActive = state.selectedLegId === leg.id && !state.selectedDayId;
      const dotColor = leg.mode === 'flight' ? 'bg-amber-500' : (leg.mode === 'highspeed' ? 'bg-blue-600' : 'bg-emerald-600');
      const openCount = getOpenCommentCount('leg', leg.id);
      const countBadge = openCount > 0
        ? `<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}">💬 ${openCount}</span>`
        : '';
      return `
        <button type="button" data-leg-id="${leg.id}" class="leg-item w-full text-left px-3 py-2.5 rounded-lg transition flex items-start justify-between gap-2 ${isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-800'}">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="w-2 h-2 rounded-full shrink-0 ${dotColor}"></span>
              <span class="text-xs font-bold truncate">${leg.index}. ${fromStop.short} → ${toStop.short}</span>
              <span class="text-[11px] ${isActive ? 'text-slate-300' : 'text-slate-400'}">${leg.date}</span>
              ${countBadge}
            </div>
            <div class="text-[11px] mt-0.5 truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}">${leg.modeLabel}</div>
          </div>
          <div class="text-right shrink-0">
            <div class="text-xs font-bold">${leg.transitTime}</div>
            <div class="text-[10px] font-semibold ${isActive ? 'text-emerald-300' : 'text-emerald-700'}">${leg.cost}</div>
          </div>
        </button>
      `;
    }).join('');
  }

  function renderDaysList() {
    const container = document.getElementById('days-list');
    container.innerHTML = DAYS.map(day => {
      const isActive = state.selectedDayId === day.id;
      const openCount = getOpenCommentCount('day', day.id);
      const countBadge = openCount > 0
        ? `<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}">💬 ${openCount}</span>`
        : '';
      return `
        <button type="button" data-day-id="${day.id}" class="day-item w-full text-left px-3 py-2.5 rounded-lg transition ${isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-800'}">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-bold">Día ${day.num} · ${day.date}</span>
              ${countBadge}
            </div>
            <span class="text-[11px] font-semibold ${isActive ? 'text-blue-300' : 'text-blue-700'}">${day.city}</span>
          </div>
          <div class="text-[11px] mt-1 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}">${day.am}</div>
          <div class="text-[10px] mt-0.5 ${isActive ? 'text-slate-400' : 'text-slate-400'}">${day.transit}</div>
        </button>
      `;
    }).join('');
  }

  function renderRouteStrip() {
    const strip = document.getElementById('route-strip');
    const stripItems = [
      { id: 'madrid-start', label: 'MAD (2n)', arrow: '✈' },
      { id: 'milan', label: 'MIL (2n)', arrow: '→' },
      { id: 'roma', label: 'ROM (3n)', arrow: '→' },
      { id: 'napoles', label: 'NAP (2n)', arrow: '→' },
      { id: 'pompeya', label: 'POM', arrow: '→' },
      { id: 'sorrento', label: 'SOR (2n)', arrow: '→' },
      { id: 'roma', label: 'ROM FCO', arrow: '✈' },
      { id: 'oporto', label: 'OPO (3n)', arrow: '→' },
      { id: 'vigo', label: 'VGO', arrow: '→' },
      { id: 'madrid-end', label: 'MAD (1n)', arrow: '' }
    ];
    strip.innerHTML = stripItems.map(item => {
      const active = state.selectedStopId === item.id;
      const arrowHtml = item.arrow ? `<span class="text-slate-400 mx-0.5">${item.arrow}</span>` : '';
      return `<button type="button" data-stop-id="${item.id}" class="strip-stop px-2 py-1 rounded font-medium transition ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${item.label}</button>${arrowHtml}`;
    }).join('');
  }

  function selectDay(dayId) {
    const day = DAYS.find(d => d.id === dayId);
    if (!day) return;
    state.selectedDayId = dayId;
    state.commentForceGeneral = false;
    if (day.legId) {
      state.selectedLegId = day.legId;
      state.selectedStopId = null;
      const leg = LEGS.find(l => l.id === day.legId);
      if (leg) zoomToBounds([stopById[leg.from].coords, stopById[leg.to].coords], 0.52);
    } else {
      state.selectedLegId = null;
      state.selectedStopId = day.stopId;
      const stop = stopById[day.stopId];
      if (stop) zoomToBounds([stop.coords], 0.42);
    }
    renderRoute();
    renderDetailPanel();
    renderLegsList();
    renderDaysList();
    renderRouteStrip();
    syncCommentContextUI();
  }

  function selectLeg(legId, shouldZoom = true) {
    state.selectedLegId = legId;
    state.selectedStopId = null;
    state.selectedDayId = null;
    state.commentForceGeneral = false;
    const leg = LEGS.find(l => l.id === legId);
    if (shouldZoom && leg) {
      zoomToBounds([stopById[leg.from].coords, stopById[leg.to].coords], 0.52);
    }
    renderRoute();
    renderDetailPanel();
    renderLegsList();
    renderDaysList();
    renderRouteStrip();
    syncCommentContextUI();
  }

  function selectStop(stopId) {
    state.selectedStopId = stopId;
    state.selectedLegId = null;
    state.selectedDayId = null;
    state.commentForceGeneral = false;
    const stop = stopById[stopId];
    if (stop) {
      zoomToBounds([stop.coords], 0.4);
    }
    renderRoute();
    renderDetailPanel();
    renderLegsList();
    renderDaysList();
    renderRouteStrip();
    syncCommentContextUI();
  }

  function togglePlay() {
    const btn = document.getElementById('btn-play');
    if (state.playing) {
      clearInterval(state.playTimer);
      state.playing = false;
      btn.textContent = '▶ Recorrer';
      return;
    }
    state.playing = true;
    btn.textContent = '⏸ Pausar';
    let idx = LEGS.findIndex(l => l.id === state.selectedLegId);
    if (idx < 0) idx = 0;
    selectLeg(LEGS[idx].id, true);
    state.playTimer = setInterval(() => {
      idx = (idx + 1) % LEGS.length;
      selectLeg(LEGS[idx].id, true);
    }, 2600);
  }

  // ---------------- Comments & Updates Logic ----------------
  function getSelectionContext() {
    if (state.selectedDayId) {
      const day = DAYS.find(d => d.id === state.selectedDayId);
      if (day) {
        return {
          target_type: 'day',
          target_id: day.id,
          target_label: `Día ${day.num} · ${day.city}`
        };
      }
    }
    if (state.selectedLegId) {
      const leg = LEGS.find(l => l.id === state.selectedLegId);
      if (leg) {
        const fromStop = stopById[leg.from];
        const toStop = stopById[leg.to];
        return {
          target_type: 'leg',
          target_id: leg.id,
          target_label: `Tramo ${leg.index} · ${fromStop.short} → ${toStop.short}`
        };
      }
    }
    if (state.selectedStopId) {
      const stop = stopById[state.selectedStopId];
      if (stop) {
        return {
          target_type: 'stop',
          target_id: stop.id,
          target_label: `Parada #${stop.order} · ${stop.name}`
        };
      }
    }
    return {
      target_type: 'general',
      target_id: null,
      target_label: 'Comentario General'
    };
  }

  function getActiveFormContext() {
    if (state.commentForceGeneral) {
      return {
        target_type: 'general',
        target_id: null,
        target_label: 'Comentario General'
      };
    }
    return getSelectionContext();
  }

  function syncCommentContextUI() {
    const ctx = getActiveFormContext();
    const badge = document.getElementById('comment-context-badge');
    const toggleBtn = document.getElementById('toggle-general-context');

    badge.textContent = ctx.target_label;
    if (state.commentForceGeneral) {
      toggleBtn.textContent = 'Usar selección del mapa';
    } else {
      toggleBtn.textContent = 'Cambiar a General';
    }

    updateCommentCounts();
    if (state.commentFilter === 'current') {
      renderCommentsList();
    }
  }

  function updateCommentCounts() {
    const allCount = state.comments.length;
    const openCount = state.comments.filter(c => c.status === 'open').length;
    const resolvedCount = state.comments.filter(c => c.status === 'resolved').length;
    const sel = getSelectionContext();
    const currentCount = state.comments.filter(
      c => c.target_type === sel.target_type && c.target_id === sel.target_id
    ).length;

    document.getElementById('count-all').textContent = String(allCount);
    document.getElementById('count-open').textContent = String(openCount);
    document.getElementById('count-resolved').textContent = String(resolvedCount);
    document.getElementById('count-current').textContent = String(currentCount);

    document.getElementById('header-open-count').textContent =
      openCount === 1 ? '1 comentario abierto' : `${openCount} comentarios abiertos`;
  }

  function formatDateTime(isoString) {
    if (!isoString) return '';
    try {
      return new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(isoString));
    } catch {
      return String(isoString);
    }
  }

  function setFormFeedback(message, isError = false) {
    const el = document.getElementById('comment-form-feedback');
    if (!message) {
      el.classList.add('hidden');
      el.textContent = '';
      return;
    }
    el.textContent = message;
    el.className = isError
      ? 'text-xs px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200'
      : 'text-xs px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200';
  }

  function renderCommentsList() {
    const listEl = document.getElementById('comments-list');
    const emptyEl = document.getElementById('comments-empty');
    listEl.textContent = '';

    const sel = getSelectionContext();
    const filtered = state.comments.filter(c => {
      if (state.commentFilter === 'open') return c.status === 'open';
      if (state.commentFilter === 'resolved') return c.status === 'resolved';
      if (state.commentFilter === 'current') {
        return c.target_type === sel.target_type && c.target_id === sel.target_id;
      }
      return true;
    });

    if (filtered.length === 0) {
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    const fragment = document.createDocumentFragment();

    filtered.forEach(comment => {
      const isResolved = comment.status === 'resolved';

      const card = document.createElement('article');
      card.className = `border rounded-xl p-3.5 transition ${
        isResolved ? 'bg-slate-50/70 border-slate-200 opacity-85' : 'bg-white border-slate-200 shadow-sm'
      }`;

      // Header row
      const header = document.createElement('div');
      header.className = 'flex items-start justify-between gap-2 flex-wrap';

      const leftMeta = document.createElement('div');
      leftMeta.className = 'flex items-center gap-2 flex-wrap';

      const authorEl = document.createElement('span');
      authorEl.className = 'text-xs font-bold text-slate-900';
      authorEl.textContent = comment.author_name;

      const contextPill = document.createElement('span');
      contextPill.className = 'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700';
      contextPill.textContent = comment.target_label || 'Comentario General';

      const statusPill = document.createElement('span');
      statusPill.className = isResolved
        ? 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800'
        : 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800';
      statusPill.textContent = isResolved ? 'Resuelto' : 'Abierto';

      leftMeta.appendChild(authorEl);
      leftMeta.appendChild(contextPill);
      leftMeta.appendChild(statusPill);

      const dateEl = document.createElement('span');
      dateEl.className = 'text-[11px] text-slate-400';
      dateEl.textContent = formatDateTime(comment.created_at);

      header.appendChild(leftMeta);
      header.appendChild(dateEl);

      // Body text (strictly textContent to prevent XSS)
      const bodyEl = document.createElement('p');
      bodyEl.className = 'mt-2 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed';
      bodyEl.textContent = comment.body;

      // Actions row
      const actions = document.createElement('div');
      actions.className = 'mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap';

      const leftActions = document.createElement('div');
      leftActions.className = 'flex items-center gap-2';

      if (comment.target_type !== 'general' && comment.target_id) {
        const focusBtn = document.createElement('button');
        focusBtn.type = 'button';
        focusBtn.className = 'text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition';
        focusBtn.textContent = 'Enfocar en mapa';
        focusBtn.addEventListener('click', () => {
          if (comment.target_type === 'day') {
            document.getElementById('tab-days').click();
            selectDay(comment.target_id);
          } else if (comment.target_type === 'leg') {
            document.getElementById('tab-legs').click();
            selectLeg(comment.target_id, true);
          } else if (comment.target_type === 'stop') {
            selectStop(comment.target_id);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        leftActions.appendChild(focusBtn);
      }

      const rightActions = document.createElement('div');
      rightActions.className = 'flex items-center gap-2';

      const toggleStatusBtn = document.createElement('button');
      toggleStatusBtn.type = 'button';
      toggleStatusBtn.className = 'px-2.5 py-1 rounded-md text-[11px] font-semibold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition';
      toggleStatusBtn.textContent = isResolved ? 'Reabrir' : 'Marcar resuelto';
      toggleStatusBtn.addEventListener('click', () => toggleCommentStatus(comment.id, isResolved ? 'open' : 'resolved'));

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'px-2 py-1 rounded-md text-[11px] font-semibold text-red-600 hover:bg-red-50 transition';
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', () => deleteComment(comment.id));

      rightActions.appendChild(toggleStatusBtn);
      rightActions.appendChild(deleteBtn);

      actions.appendChild(leftActions);
      actions.appendChild(rightActions);

      card.appendChild(header);
      card.appendChild(bodyEl);
      card.appendChild(actions);

      fragment.appendChild(card);
    });

    listEl.appendChild(fragment);
  }

  function renderUpdatesUI() {
    const latestEl = document.getElementById('latest-update-text');
    const listEl = document.getElementById('updates-list');
    listEl.textContent = '';

    if (!state.dbAvailable) {
      latestEl.textContent = 'Base de datos no conectada. El mapa funciona en modo lectura.';
      return;
    }

    if (state.updates.length === 0) {
      latestEl.textContent = 'Sin cambios registrados todavía.';
      return;
    }

    const latest = state.updates[0];
    latestEl.textContent = `${latest.summary} — ${latest.author_name} (${formatDateTime(latest.created_at)})`;

    const fragment = document.createDocumentFragment();
    state.updates.forEach(item => {
      const li = document.createElement('li');
      li.className = 'border-b border-slate-100 pb-1.5 last:border-b-0';

      const top = document.createElement('div');
      top.className = 'flex items-center justify-between gap-2 text-[11px] text-slate-500';
      const author = document.createElement('strong');
      author.className = 'text-slate-700';
      author.textContent = item.author_name;
      const date = document.createElement('span');
      date.textContent = formatDateTime(item.created_at);
      top.appendChild(author);
      top.appendChild(date);

      const summary = document.createElement('div');
      summary.className = 'text-slate-800 mt-0.5';
      summary.textContent = item.summary;

      li.appendChild(top);
      li.appendChild(summary);
      fragment.appendChild(li);
    });
    listEl.appendChild(fragment);
  }

  function setDbStatus(available) {
    state.dbAvailable = available;
    const pill = document.getElementById('db-status-pill');
    if (available) {
      pill.classList.add('hidden');
    } else {
      pill.classList.remove('hidden');
    }
  }

  async function loadComments() {
    try {
      const res = await fetch('/api/comments');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.comments = Array.isArray(data.comments) ? data.comments : [];
      setDbStatus(true);
      updateCommentCounts();
      renderCommentsList();
      renderLegsList();
      renderDaysList();
    } catch {
      setDbStatus(false);
      updateCommentCounts();
      renderCommentsList();
    }
  }

  async function loadUpdates() {
    try {
      const res = await fetch('/api/updates');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      state.updates = Array.isArray(data.updates) ? data.updates : [];
      setDbStatus(true);
      renderUpdatesUI();
    } catch {
      setDbStatus(false);
      renderUpdatesUI();
    }
  }

  async function toggleCommentStatus(id, nextStatus) {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'No se pudo actualizar el estado');
      }
      await loadComments();
    } catch (err) {
      setFormFeedback(err.message, true);
    }
  }

  async function deleteComment(id) {
    if (!window.confirm('¿Eliminar este comentario de forma permanente?')) return;
    try {
      const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'No se pudo eliminar el comentario');
      }
      await loadComments();
    } catch (err) {
      setFormFeedback(err.message, true);
    }
  }

  // ---------------- Event Listeners ----------------
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => {
        const active = b.dataset.filter === state.filter;
        b.className = `filter-btn px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${active ? 'bg-slate-900 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`;
      });
      const visible = LEGS.filter(l => modeMatchesFilter(l.mode));
      if (visible.length && !visible.some(l => l.id === state.selectedLegId)) {
        state.selectedLegId = visible[0].id;
        state.selectedStopId = null;
        state.selectedDayId = null;
      }
      renderRoute();
      renderLegsList();
      renderDetailPanel();
      syncCommentContextUI();
    });
  });

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.preset;
      if (p === 'full') zoomToBounds(STOPS.map(s => s.coords), 0.72);
      if (p === 'italy') zoomToBounds([stopById['milan'].coords, stopById['roma'].coords, stopById['sorrento'].coords], 0.65);
      if (p === 'campania') zoomToBounds([stopById['napoles'].coords, stopById['pompeya'].coords, stopById['sorrento'].coords], 0.55);
      if (p === 'iberia') zoomToBounds([stopById['oporto'].coords, stopById['vigo'].coords, stopById['madrid-start'].coords], 0.65);
    });
  });

  document.getElementById('tab-legs').addEventListener('click', () => {
    state.sideTab = 'legs';
    document.getElementById('legs-list').classList.remove('hidden');
    document.getElementById('days-list').classList.add('hidden');
    document.getElementById('tab-legs').className = 'side-tab px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-white transition';
    document.getElementById('tab-days').className = 'side-tab px-2.5 py-1 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-200/70 transition';
  });

  document.getElementById('tab-days').addEventListener('click', () => {
    state.sideTab = 'days';
    document.getElementById('days-list').classList.remove('hidden');
    document.getElementById('legs-list').classList.add('hidden');
    document.getElementById('tab-days').className = 'side-tab px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-white transition';
    document.getElementById('tab-legs').className = 'side-tab px-2.5 py-1 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-200/70 transition';
    renderDaysList();
  });

  document.getElementById('legs-list').addEventListener('click', (e) => {
    const btn = e.target.closest('.leg-item');
    if (btn) selectLeg(btn.dataset.legId, true);
  });

  document.getElementById('days-list').addEventListener('click', (e) => {
    const btn = e.target.closest('.day-item');
    if (btn) selectDay(btn.dataset.dayId);
  });

  document.getElementById('route-strip').addEventListener('click', (e) => {
    const btn = e.target.closest('.strip-stop');
    if (btn) selectStop(btn.dataset.stopId);
  });

  document.getElementById('zoom-in').addEventListener('click', () => svg.transition().duration(300).call(zoom.scaleBy, 1.45));
  document.getElementById('zoom-out').addEventListener('click', () => svg.transition().duration(300).call(zoom.scaleBy, 0.7));
  document.getElementById('zoom-reset').addEventListener('click', () => zoomToBounds(STOPS.map(s => s.coords), 0.72));

  document.getElementById('btn-prev').addEventListener('click', () => {
    const cur = LEGS.findIndex(l => l.id === state.selectedLegId);
    const prev = cur <= 0 ? LEGS.length - 1 : cur - 1;
    selectLeg(LEGS[prev].id, true);
  });
  document.getElementById('btn-next').addEventListener('click', () => {
    const cur = LEGS.findIndex(l => l.id === state.selectedLegId);
    const next = (cur + 1) % LEGS.length;
    selectLeg(LEGS[next].id, true);
  });
  document.getElementById('btn-play').addEventListener('click', togglePlay);

  document.getElementById('btn-jump-comment').addEventListener('click', () => {
    state.commentForceGeneral = false;
    syncCommentContextUI();
    document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('comment-body').focus(), 350);
  });

  document.getElementById('toggle-general-context').addEventListener('click', () => {
    state.commentForceGeneral = !state.commentForceGeneral;
    syncCommentContextUI();
  });

  document.querySelectorAll('.comment-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.commentFilter = btn.dataset.commentFilter;
      document.querySelectorAll('.comment-filter-btn').forEach(b => {
        const active = b.dataset.commentFilter === state.commentFilter;
        b.className = `comment-filter-btn px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
          active ? 'bg-slate-900 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
        }`;
      });
      renderCommentsList();
    });
  });

  const authorInput = document.getElementById('comment-author');
  const savedAuthor = localStorage.getItem(AUTHOR_STORAGE_KEY);
  if (savedAuthor) {
    authorInput.value = savedAuthor;
  }
  authorInput.addEventListener('input', () => {
    localStorage.setItem(AUTHOR_STORAGE_KEY, authorInput.value.trim());
  });

  const bodyInput = document.getElementById('comment-body');
  const charCountEl = document.getElementById('comment-char-count');
  bodyInput.addEventListener('input', () => {
    charCountEl.textContent = `${bodyInput.value.length} / 2000`;
  });

  document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    setFormFeedback('');

    const authorName = authorInput.value.trim();
    const body = bodyInput.value.trim();
    if (!authorName || !body) {
      setFormFeedback('Por favor escribe tu nombre y tu comentario.', true);
      return;
    }

    localStorage.setItem(AUTHOR_STORAGE_KEY, authorName);
    const ctx = getActiveFormContext();
    const submitBtn = document.getElementById('comment-submit-btn');
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: authorName,
          target_type: ctx.target_type,
          target_id: ctx.target_id,
          target_label: ctx.target_label,
          body
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Error al guardar el comentario.');
      }

      bodyInput.value = '';
      charCountEl.textContent = '0 / 2000';
      setFormFeedback('Comentario publicado.', false);
      await loadComments();
    } catch (err) {
      setFormFeedback(err.message, true);
    } finally {
      submitBtn.disabled = false;
    }
  });

  document.getElementById('toggle-updates-btn').addEventListener('click', () => {
    document.getElementById('updates-drawer').classList.toggle('hidden');
  });

  document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const summaryInput = document.getElementById('update-summary');
    const summary = summaryInput.value.trim();
    const authorName = authorInput.value.trim() || 'Viajero';
    if (!summary) return;

    try {
      const res = await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author_name: authorName, summary })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'No se pudo publicar la actualización');
      }
      summaryInput.value = '';
      await loadUpdates();
    } catch (err) {
      setFormFeedback(err.message, true);
    }
  });

  // ---------------- Initial Load ----------------
  const ROUTE_ISO = new Set(['724', '620', '380', '250', '756']);
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json')
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(world => {
      statusEl.style.display = 'none';
      const countries = topojson.feature(world, world.objects.countries).features;
      gCountries.selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        .attr('d', pathGen)
        .attr('class', d => ROUTE_ISO.has(String(d.id)) ? 'country-route' : 'country-land');

      renderRoute();
      renderDetailPanel();
      renderLegsList();
      renderDaysList();
      renderRouteStrip();
      syncCommentContextUI();
      zoomToBounds(STOPS.map(s => s.coords), 0.74);
    })
    .catch(() => {
      statusEl.textContent = 'No se pudo cargar el atlas vectorial. Verifica tu conexión a internet e inténtalo de nuevo.';
    });

  loadComments();
  loadUpdates();
})();
