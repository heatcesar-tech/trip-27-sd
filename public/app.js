(function () {
  const AUTHOR_STORAGE_KEY = 'viaje_2027_author_name';
  const DARK_MODE_STORAGE_KEY = 'viaje_2027_dark_mode';

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
      focus: 'Llegada de CDMX (vuelo 30 abr 23:00 → MAD 1 may ~17:00), Gran Vía (Casa del Libro, Primark), opción nocturna y Paseo del Prado.',
      coffee: 'HanSo Café · Hola Coffee Lagasca',
      fitness: 'Revive (sauna finlandesa + fuerza) · Basic-Fit',
      luggage: 'Llegada vespertina directa a check-in el 1 de mayo.'
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
      focus: 'Noche colchón junto a Chamartín / Línea 8 antes del vuelo transatlántico del sábado 15 a las 13:00.',
      coffee: 'Desayuno temprano antes de ir a MAD (~09:00)',
      fitness: 'Descanso pre-vuelo intercontinental',
      luggage: 'Traslado a MAD a las 09:00–09:30 (3 h antes del vuelo de las 13:00).'
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
      notes: 'Opciones vuelo (Liz): 12:30 PM (~$1,193 MXN, mejor tarifa), 09:55 AM (~$1,770 MXN) o 08:50 AM (~$2,108 MXN). Air Europa / Iberia. Incluye traslado a MAD (35 min), 2 h de seguridad y traslado en Milán.'
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

  // Hourly 24h schedule builder helpers
  function blk(start, end, category, title, detail) {
    return { start, end, category, title, detail };
  }

  const DAYS = [
    {
      id: 'd1', num: 1, date: 'Vie 30 abr', city: 'CDMX → Vuelo nocturno a Madrid', stopId: 'madrid-start', legId: null,
      am: 'Día de cierre en Ciudad de México y revisión final de equipaje/documentos.',
      pm: 'Traslado al AICM (19:30), documentación y despegue a Madrid a las 23:00.',
      transit: 'AICM → MAD (vuelo directo nocturno, salida 23:00).', notes: 'Dormir en el avión (~10.5 h de vuelo, +8 h huso horario).',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en CDMX', 'Última noche completa antes de viajar.'),
        blk('07:30', '09:00', 'meal', 'Desayuno tranquilo en CDMX', 'Hidratación y comida ligera.'),
        blk('09:00', '14:00', 'rest', 'Cierre de pendientes y empaque final', 'Verificar pasaporte, tarjetas, adaptador europeo y reservas.'),
        blk('14:00', '15:30', 'meal', 'Comida previa al viaje', 'Comida balanceada antes de ir al aeropuerto.'),
        blk('15:30', '19:30', 'rest', 'Descanso y ducha antes de salir', 'Reposar antes de la noche en avión.'),
        blk('19:30', '23:00', 'transit', 'Traslado a AICM, seguridad y abordaje', 'Llegar 3 h antes para vuelo internacional de las 23:00.'),
        blk('23:00', '24:00', 'sleep', 'Despegue CDMX → Madrid (23:00)', 'Cena ligera a bordo y preparar antifaz/tapones para dormir.')
      ]
    },
    {
      id: 'd2', num: 2, date: 'Sáb 1 may', city: 'Madrid (Llegada ~17:00)', stopId: 'madrid-start', legId: null,
      am: 'Vuelo nocturno CDMX → MAD (descanso y desayuno a bordo).',
      pm: 'Aterrizaje ~17:00, check-in, Gran Vía (Casa del Libro + Primark), cena y antrito nocturno opcional (Lalo).',
      transit: 'MAD → Centro (35–45 min en taxi o Metro L8).', notes: '1 de mayo festivo: El Escorial y bibliotecas públicas pasan al sábado 15 de mayo (día completo en Madrid).',
      timeline: [
        blk('00:00', '08:00', 'sleep', 'Sueño a bordo (CDMX → MAD)', 'Descanso nocturno durante el cruce atlántico.'),
        blk('08:00', '16:30', 'transit', 'Tramo diurno en vuelo y llegada', 'Desayuno en avión, lectura/películas y descenso a Madrid.'),
        blk('16:30', '18:30', 'transit', 'Aterrizaje MAD (~17:00) y traslado al hotel', 'Migración, equipaje y check-in directo en centro/Gran Vía.'),
        blk('18:30', '20:30', 'activity', 'Gran Vía: Casa del Libro + Primark', 'Compras rápidas (Lalo) y parada literaria (Liz) en horario vespertino.'),
        blk('20:30', '22:00', 'meal', 'Cena en Madrid centro', 'Tapas o cena tranquila para celebrar la llegada.'),
        blk('22:00', '24:00', 'rest', 'Antrito nocturno opcional (Lalo) / Descanso', 'Quien quiera sale de fiesta por Madrid; opción de dormir temprano.')
      ]
    },
    {
      id: 'd3', num: 3, date: 'Dom 2 may', city: 'Madrid → Milán', stopId: 'milan', legId: 'leg-1',
      am: 'Desayuno y traslado a MAD para vuelo directo 12:30 PM (~$1,193 MXN, opción Liz).',
      pm: 'Llegada a Milán (~14:40), check-in, Café y caminata por los canales de Navigli.',
      transit: 'Vuelo 12:30 PM (2 h 10 min) | P2P: 5 h – 5 h 30 min.', notes: 'Opciones Liz: 12:30 PM ($1,193), 9:55 AM ($1,770) o 8:50 AM ($2,108). Con 12:30 PM se duerme mejor tras la noche en Madrid.',
      timeline: [
        blk('00:00', '08:00', 'sleep', 'Sueño nocturno en Madrid', '8 horas de descanso (clave si hubo salida nocturna).'),
        blk('08:00', '09:30', 'meal', 'Desayuno y check-out', 'Café en HanSo / hotel y cierre de maletas.'),
        blk('09:30', '15:00', 'transit', 'Traslado a MAD + Vuelo 12:30 PM → Milán', 'Seguridad en MAD (10:15) y vuelo directo 12:30–14:40.'),
        blk('15:00', '16:30', 'meal', 'Traslado en Milán y comida ligera', 'Llegada al centro/hotel y almuerzo rápido.'),
        blk('16:30', '18:00', 'rest', 'Check-in y descanso post-vuelo', 'Ducha y reposo de 60–90 min.'),
        blk('18:00', '20:00', 'activity', 'Caminata por canales de Navigli', 'Paseo vespertino arquitectónico y ambiente local.'),
        blk('20:00', '21:30', 'meal', 'Cena en Navigli', 'Cena estilo lombardo.'),
        blk('21:30', '23:00', 'rest', 'Regreso y descanso nocturno', 'Paseo de vuelta y preparación del lunes.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Milán', 'Primera noche en Italia.')
      ]
    },
    {
      id: 'd4', num: 4, date: 'Lun 3 may', city: 'Milán', stopId: 'milan', legId: null,
      am: 'Estación Central, Piazza San Sepolcro (1919) y Plaza de Loreto (1945).',
      pm: "Cafezal Porta Venezia + fuerza en Gold's Gym/Plus1 + sauna en QC Termemilano.",
      transit: 'Metro M1/M3 (20 min).', notes: 'Reservar QC Termemilano con antelación.',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en Milán', 'Descanso completo de 8 h 30 min.'),
        blk('07:30', '08:30', 'meal', 'Desayuno en Milán', 'Desayuno energético antes de caminar.'),
        blk('08:30', '13:00', 'activity', 'Circuito histórico-arquitectónico', 'Estación Central, Piazza San Sepolcro y Plaza de Loreto.'),
        blk('13:00', '14:30', 'meal', 'Comida en Porta Venezia', 'Pausa de almuerzo sentado.'),
        blk('14:30', '16:00', 'rest', 'Café en Cafezal y reposo', 'Tiempo de lectura y descanso de pies.'),
        blk('16:00', '18:00', 'rest', "Gimnasio (Gold's Gym / Plus1)", 'Sesión de fuerza en Milán.'),
        blk('18:00', '20:30', 'rest', 'QC Termemilano (Sauna en tranvía)', 'Circuito termal y relajación profunda.'),
        blk('20:30', '22:00', 'meal', 'Cena post-termas', 'Cena ligera cerca de Porta Romana.'),
        blk('22:00', '23:00', 'rest', 'Empaque ligero para tren a Roma', 'Dejar maleta lista.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Milán', 'Descanso reparador.')
      ]
    },
    {
      id: 'd5', num: 5, date: 'Mar 4 may', city: 'Milán → Roma', stopId: 'roma', legId: 'leg-2',
      am: 'Café en Orsonero Coffee, check-out y Frecciarossa No Stop a Roma.',
      pm: 'Check-in en Roma y caminata: Panteón, Piazza Navona y Largo Argentina.',
      transit: 'Tren AV 2 h 50 min | P2P: 3 h 45 min.', notes: 'Consigna en Kipoint Termini si llegas antes de las 15:00.',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en Milán', 'Descanso previo al tren a Roma.'),
        blk('07:30', '09:00', 'meal', 'Desayuno y Orsonero Coffee', 'Café de especialidad y check-out.'),
        blk('09:00', '13:00', 'transit', 'Frecciarossa No Stop (MIL → ROM)', 'Tren de alta velocidad directo (2 h 50 min + traslados).'),
        blk('13:00', '14:30', 'meal', 'Comida cerca de Roma Termini / Centro', 'Almuerzo al llegar a Roma.'),
        blk('14:30', '16:30', 'rest', 'Check-in y descanso en hotel', 'Acomodo en habitación y pausa de hidratación.'),
        blk('16:30', '19:30', 'activity', 'Panteón, Piazza Navona y Largo Argentina', 'Caminata arquitectónica al atardecer.'),
        blk('19:30', '21:30', 'meal', 'Cena romana', 'Pasta clásica en centro histórico o Trastevere.'),
        blk('21:30', '23:00', 'rest', 'Regreso tranquilo al hotel', 'Preparar entradas del Coliseo para mañana.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Roma', 'Dormir bien antes del bloque arqueológico.')
      ]
    },
    {
      id: 'd6', num: 6, date: 'Mié 5 may', city: 'Roma', stopId: 'roma', legId: null,
      am: 'Coliseo, Foro Romano, Palatino (08:30) y Museo Storico della Liberazione.',
      pm: 'Café en Faro + fuerza en Easy Fit Trastevere (sin certificado) y cena.',
      transit: 'Metro B + Tranvía 8 (18–20 min).', notes: 'Reservar Coliseo exactamente 30 días antes.',
      timeline: [
        blk('00:00', '07:00', 'sleep', 'Sueño nocturno en Roma', 'Descanso antes de entrada temprana al Coliseo.'),
        blk('07:00', '08:00', 'meal', 'Desayuno temprano', 'Desayuno sólido para caminata intensa.'),
        blk('08:00', '12:30', 'activity', 'Coliseo, Foro Romano y Palatino', 'Visita principal de arqueología clásica.'),
        blk('12:30', '14:00', 'meal', 'Comida cerca de Monti / San Giovanni', 'Pausa para comer y descansar piernas.'),
        blk('14:00', '15:30', 'activity', 'Museo Storico della Liberazione', 'Visita en Via Tasso.'),
        blk('15:30', '17:00', 'rest', 'Café en Faro y descanso', 'Café de especialidad y pausa de media tarde.'),
        blk('17:00', '19:00', 'rest', 'Fuerza en Easy Fit Trastevere', 'Entrenamiento sin certificado médico + ducha.'),
        blk('19:00', '21:00', 'meal', 'Cena en Trastevere', 'Cena relajada tras el entrenamiento.'),
        blk('21:00', '23:00', 'rest', 'Paseo nocturno y descanso', 'Regreso al hotel y reposo.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Roma', 'Recuperación muscular.')
      ]
    },
    {
      id: 'd7', num: 7, date: 'Jue 6 may', city: 'Roma', stopId: 'roma', legId: null,
      am: 'Distrito racionalista EUR (Palazzo della Civiltà Italiana y ejes).',
      pm: 'Museos Capitolinos (hasta 19:30), Ara Pacis y café en Luna by Faro.',
      transit: 'Metro B a EUR Palasport (20 min).', notes: 'Capitolinos abren todos los días.',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en Roma', '8.5 horas de sueño.'),
        blk('07:30', '08:30', 'meal', 'Desayuno en Roma', 'Desayuno tranquilo.'),
        blk('08:30', '12:30', 'activity', 'Distrito racionalista EUR', 'Metro B a EUR Palasport y recorrido arquitectónico.'),
        blk('12:30', '14:00', 'meal', 'Comida de regreso al centro', 'Almuerzo ligero antes de museos.'),
        blk('14:00', '15:30', 'rest', 'Siesta / descanso de mediodía', 'Pausa para evitar fatiga de museo.'),
        blk('15:30', '19:00', 'activity', 'Museos Capitolinos y Ara Pacis', 'Visita vespertina sin prisas.'),
        blk('19:00', '20:00', 'meal', 'Café en Luna by Faro', 'Pausa de tarde-noche.'),
        blk('20:00', '21:30', 'meal', 'Cena en Roma', 'Última cena en Roma.'),
        blk('21:30', '23:00', 'rest', 'Preparar equipaje para Nápoles', 'Empaque rápido.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Roma', 'Descanso nocturno.')
      ]
    },
    {
      id: 'd8', num: 8, date: 'Vie 7 may', city: 'Roma → Nápoles', stopId: 'napoles', legId: 'leg-3',
      am: 'Mañana ligera (Testaccio / Caracalla), check-out y tren AV a Nápoles.',
      pm: 'Check-in, Spaccanapoli, Capilla Sansevero, Chiaia y pizza napolitana.',
      transit: 'Tren AV 1 h 08 min | P2P: 1 h 50 min.', notes: 'Consigna en hotel si llegas al mediodía.',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en Roma', 'Descanso completo.'),
        blk('07:30', '08:30', 'meal', 'Desayuno y check-out', 'Dejar maletas listas.'),
        blk('08:30', '11:00', 'activity', 'Mañana ligera: Testaccio / Caracalla', 'Paseo sin sobrecarga.'),
        blk('11:00', '13:00', 'transit', 'Tren AV a Nápoles (1 h 08 min)', 'Roma Termini → Napoli Centrale.'),
        blk('13:00', '14:30', 'meal', 'Comida en Nápoles', 'Primer espresso y almuerzo napolitano.'),
        blk('14:30', '16:30', 'rest', 'Check-in y descanso en hotel', 'Instalación y reposo.'),
        blk('16:30', '19:30', 'activity', 'Spaccanapoli, Sansevero y Chiaia', 'Recorrido por el centro histórico.'),
        blk('19:30', '21:30', 'meal', 'Pizza napolitana auténtica', 'Cena tradicional en centro histórico.'),
        blk('21:30', '23:00', 'rest', 'Regreso y descanso', 'Bajar ritmo nocturno.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Nápoles', 'Primera noche en Campania.')
      ]
    },
    {
      id: 'd9', num: 9, date: 'Sáb 8 may', city: 'Nápoles', stopId: 'napoles', legId: null,
      am: 'Museo Arqueológico Nacional (MANN) y Piazza del Plebiscito.',
      pm: 'Fuerza en gimnasio local (pase diario) y atardecer en Vomero / Sant’Elmo.',
      transit: 'Metro Línea 1 (15–20 min).', notes: 'MANN abre con horario completo en sábado.',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en Nápoles', 'Descanso reparador.'),
        blk('07:30', '08:30', 'meal', 'Desayuno + espresso napolitano', 'Arranque de mañana.'),
        blk('08:30', '13:00', 'activity', 'MANN y Piazza del Plebiscito', 'Colección arqueológica clave previa a Pompeya.'),
        blk('13:00', '14:30', 'meal', 'Comida en centro / Toledo', 'Almuerzo pausado.'),
        blk('14:30', '16:30', 'rest', 'Descanso de mediodía', 'Pausa en hotel para recargar energía.'),
        blk('16:30', '18:00', 'rest', 'Gimnasio local (pase diario)', 'Sesión de fuerza en centro o Vomero.'),
        blk('18:00', '20:00', 'activity', 'Atardecer en Vomero / Castel Sant’Elmo', 'Vistas panorámicas de la bahía y Vesubio.'),
        blk('20:00', '22:00', 'meal', 'Cena en Vomero o Chiaia', 'Cena tranquila de sábado.'),
        blk('22:00', '23:00', 'rest', 'Empaque para Pompeya y Sorrento', 'Dejar todo listo para salir temprano.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Nápoles', 'Dormir bien antes de Pompeya.')
      ]
    },
    {
      id: 'd10', num: 10, date: 'Dom 9 may', city: 'Nápoles → Pompeya → Sorrento', stopId: 'pompeya', legId: 'leg-4',
      am: 'Tren a Pompeya e inmersión arqueológica total (09:00–13:30).',
      pm: 'Tren a Sorrento, check-in, acantilados y atardecer en Marina Piccola.',
      transit: 'Tren 40 min + 30 min | P2P total: ~1 h 45 min.', notes: 'Guardar maletas en depósito Porta Marina.',
      timeline: [
        blk('00:00', '07:00', 'sleep', 'Sueño nocturno en Nápoles', '7 horas de descanso.'),
        blk('07:00', '08:00', 'meal', 'Desayuno y check-out', 'Llevar agua y calzado cómodo.'),
        blk('08:00', '09:00', 'transit', 'Tren a Pompei Scavi (40 min)', 'Incluye dejar equipaje en depósito Porta Marina.'),
        blk('09:00', '13:30', 'activity', 'Parque Arqueológico de Pompeya', 'Inmersión de 4.5 h (~6–8 km de caminata).'),
        blk('13:30', '14:30', 'meal', 'Comida rápida junto a estación', 'Almuerzo e hidratación tras Pompeya.'),
        blk('14:30', '15:30', 'transit', 'Tren a Sorrento (30 min)', 'Recoger equipaje y trayecto costero.'),
        blk('15:30', '17:30', 'rest', 'Check-in y descanso profundo', 'Ducha y reposo obligatorio tras caminata.'),
        blk('17:30', '19:30', 'activity', 'Acantilados y Marina Piccola', 'Paseo suave al atardecer.'),
        blk('19:30', '21:30', 'meal', 'Cena costera en Sorrento', 'Cena relajada con vista al mar.'),
        blk('21:30', '23:00', 'rest', 'Tiempo libre nocturno', 'Bajar pulsaciones.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Sorrento', 'Descanso sin despertador temprano.')
      ]
    },
    {
      id: 'd11', num: 11, date: 'Lun 10 may', city: 'Sorrento', stopId: 'sorrento', legId: null,
      am: 'Mañana sin prisas: centro histórico, Vallone dei Mulini y miradores.',
      pm: 'Descanso activo: natación, caminata costera a Punta del Capo y cena.',
      transit: 'A pie o bus SITA local (10–20 min).', notes: 'Día colchón para bajar fatiga.',
      timeline: [
        blk('00:00', '08:30', 'sleep', 'Sueño largo en Sorrento', 'Día de recuperación: 9+ horas de descanso.'),
        blk('08:30', '09:30', 'meal', 'Desayuno sin prisas', 'Café en terraza local.'),
        blk('09:30', '12:30', 'activity', 'Centro histórico y Vallone dei Mulini', 'Paseo ligero por miradores.'),
        blk('12:30', '14:30', 'meal', 'Comida mediterránea pausada', 'Sobremesa tranquila.'),
        blk('14:30', '16:30', 'rest', 'Siesta / lectura en hotel', 'Recuperación total del sistema nervioso.'),
        blk('16:30', '19:00', 'rest', 'Natación y caminata a Punta del Capo', 'Descanso activo en la costa.'),
        blk('19:00', '21:00', 'meal', 'Cena temprana en Sorrento', 'Preparar energía para el traslado a Oporto.'),
        blk('21:00', '22:30', 'rest', 'Empaque completo para vuelo FCO → OPO', 'Todo listo antes de dormir.'),
        blk('22:30', '24:00', 'sleep', 'Sueño nocturno en Sorrento', 'Dormir temprano para salida del martes.')
      ]
    },
    {
      id: 'd12', num: 12, date: 'Mar 11 may', city: 'Sorrento → Roma FCO → Oporto', stopId: 'oporto', legId: 'leg-7',
      am: 'Tren Sorrento–Nápoles–Roma Termini + Leonardo Express a FCO para vuelo directo a Oporto.',
      pm: 'Llegada a Oporto, check-in y caminata vespertina por Ribeira y Ponte Luís I.',
      transit: 'Trenes + vuelo 3 h 05 min | P2P: ~7 h 45 min | Est.: €84–€112.', notes: 'Wizz Air €50 / Ryanair €68 directo desde FCO (-1 h huso).',
      timeline: [
        blk('00:00', '06:30', 'sleep', 'Sueño nocturno en Sorrento', 'Descanso previo al día largo de enlace.'),
        blk('06:30', '07:30', 'meal', 'Desayuno y check-out', 'Café rápido y salida a estación.'),
        blk('07:30', '11:30', 'transit', 'Trenes Sorrento → Nápoles → Roma FCO', 'Circumvesuviana + Frecciarossa + Leonardo Express.'),
        blk('11:30', '13:00', 'meal', 'Comida en aeropuerto Fiumicino', 'Almuerzo antes del embarque.'),
        blk('13:00', '17:30', 'transit', 'Vuelo directo FCO → Oporto (3 h 05 min)', 'Incluye seguridad y cambio de huso (-1 h).'),
        blk('17:30', '19:00', 'rest', 'Check-in y descanso en Oporto', 'Llegada directa a habitación y ducha.'),
        blk('19:00', '20:30', 'activity', 'Caminata por Ribeira y Ponte Luís I', 'Primer contacto visual con el Duero.'),
        blk('20:30', '22:00', 'meal', 'Cena en Oporto', 'Cena portuguesa tranquila.'),
        blk('22:00', '23:00', 'rest', 'Desconexión nocturna', 'Reposo tras día de tránsito.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Oporto', 'Primera noche en Portugal.')
      ]
    },
    {
      id: 'd13', num: 13, date: 'Mié 12 may', city: 'Oporto', stopId: 'oporto', legId: null,
      am: 'Fundación Serralves (Siza Vieira) y visita guiada a Casa da Música (Koolhaas).',
      pm: 'Senzu Coffee + fuerza en Fitness Hut + sauna finlandesa en El Spa Meliá.',
      transit: 'Tranvía/bus o Uber (15–25 min).', notes: 'Reservar visita guiada a Casa da Música.',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en Oporto', '8.5 horas de sueño.'),
        blk('07:30', '08:30', 'meal', 'Desayuno en Oporto', 'Desayuno completo.'),
        blk('08:30', '13:00', 'activity', 'Fundación Serralves y Casa da Música', 'Arquitectura contemporánea (Siza Vieira y Koolhaas).'),
        blk('13:00', '14:30', 'meal', 'Comida en Boavista', 'Almuerzo cerca de Casa da Música.'),
        blk('14:30', '16:00', 'rest', 'Senzu Coffee y pausa', 'Café de especialidad y descanso.'),
        blk('16:00', '18:00', 'rest', 'Fuerza en Fitness Hut (TrainAway)', 'Sesión de entrenamiento.'),
        blk('18:00', '20:00', 'rest', 'Sauna finlandesa en El Spa Meliá', 'Recuperación térmica.'),
        blk('20:00', '22:00', 'meal', 'Cena en Oporto', 'Cena rica en proteína.'),
        blk('22:00', '23:00', 'rest', 'Descanso nocturno', 'Lectura y cierre del día.'),
        blk('23:00', '24:00', 'sleep', 'Sueño nocturno en Oporto', 'Descanso profundo.')
      ]
    },
    {
      id: 'd14', num: 14, date: 'Jue 13 may', city: 'Oporto', stopId: 'oporto', legId: null,
      am: 'Palácio da Bolsa, Iglesia de São Francisco, São Bento y Catedral de la Sé.',
      pm: "Café en C'alma o 7g Roaster (Gaia) y tarde de lectura en Cedofeita.",
      transit: 'A pie (3–5 km); cruce a Gaia (15 min).', notes: 'Reservar horario fijo en Palácio da Bolsa.',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en Oporto', 'Descanso completo.'),
        blk('07:30', '08:30', 'meal', 'Desayuno en Oporto', 'Arranque relajado.'),
        blk('08:30', '13:00', 'activity', 'Palácio da Bolsa, São Francisco, São Bento y Sé', 'Circuito histórico a pie por el centro.'),
        blk('13:00', '14:30', 'meal', 'Comida en Ribeira / Gaia', 'Almuerzo junto al río Duero.'),
        blk('14:30', '16:00', 'meal', "Café en C'alma o 7g Roaster", 'Degustación de café de especialidad.'),
        blk('16:00', '19:00', 'rest', 'Tarde de lectura y paseo en Cedofeita', 'Ritmo lento para cerrar Portugal.'),
        blk('19:00', '21:00', 'meal', 'Cena de despedida en Oporto', 'Cena temprana para madrugar el viernes.'),
        blk('21:00', '22:30', 'rest', 'Empaque para Tren Celta + AVE', 'Dejar maleta lista.'),
        blk('22:30', '24:00', 'sleep', 'Sueño nocturno en Oporto', 'Dormir temprano para tren matutino.')
      ]
    },
    {
      id: 'd15', num: 15, date: 'Vie 14 may', city: 'Oporto → Vigo → Madrid', stopId: 'vigo', legId: 'leg-8',
      am: 'Check-out temprano y Tren Celta de Porto Campanhã a Vigo Guixar.',
      pm: 'Transbordo en Vigo a Urzáiz y AVE/Alvia a Madrid Chamartín.',
      transit: 'Celta 2 h 20 min + AVE 4 h 30 min | P2P: ~8 h 30 min.', notes: 'Margen de 45–60 min en Vigo; +1 h huso.',
      timeline: [
        blk('00:00', '06:45', 'sleep', 'Sueño nocturno en Oporto', 'Descanso previo al retorno ferroviario.'),
        blk('06:45', '07:45', 'meal', 'Desayuno y traslado a Campanhã', 'Check-out y llegada con margen a estación.'),
        blk('07:45', '11:15', 'transit', 'Tren Celta (Oporto → Vigo Guixar)', '2 h 20 min de trayecto (+1 h huso al entrar a España).'),
        blk('11:15', '12:30', 'meal', 'Transbordo y comida en Vigo', 'Caminata/taxi a Urzáiz y almuerzo rápido.'),
        blk('12:30', '17:30', 'transit', 'AVE / Alvia (Vigo → Madrid Chamartín)', '4 h 30 min de alta velocidad; tiempo de lectura/reposo en tren.'),
        blk('17:30', '19:30', 'rest', 'Check-in junto a Chamartín y descanso', 'Noche colchón sin desplazamientos largos.'),
        blk('19:30', '21:00', 'meal', 'Cena tranquila en Madrid', 'Cena ligera pre-vuelo.'),
        blk('21:00', '22:30', 'rest', 'Organizar documentos y equipaje final', 'Pasaporte, tarjetas de embarque y descanso.'),
        blk('22:30', '24:00', 'sleep', 'Sueño nocturno en Madrid', 'Última noche antes del regreso a México.')
      ]
    },
    {
      id: 'd16', num: 16, date: 'Sáb 15 may', city: 'Madrid (Salida 13:00)', stopId: 'madrid-end', legId: null,
      am: 'Desayuno temprano, check-out y traslado al Aeropuerto MAD (09:30) para vuelo de las 13:00.',
      pm: 'Vuelo transatlántico Madrid → CDMX (13:00 – ~21:00) y llegada a casa.',
      transit: 'Hotel → MAD (15–30 min en taxi/Metro L8) · Vuelo 13:00.', notes: 'Llegar a MAD a las 10:00 (3 h antes). Nota bibliotecas (El Escorial / Escuela de Minas): requieren medio día libre en Madrid si se adelanta 1 día la llegada.',
      timeline: [
        blk('00:00', '07:30', 'sleep', 'Sueño nocturno en Madrid', 'Descanso completo tras el día de trenes.'),
        blk('07:30', '09:00', 'meal', 'Desayuno temprano y check-out', 'Último café en Madrid y cierre final de equipaje.'),
        blk('09:00', '13:00', 'transit', 'Traslado a MAD (09:30), seguridad y embarque', 'Llegar 3 h antes (10:00) para vuelo internacional de las 13:00.'),
        blk('13:00', '21:00', 'transit', 'Vuelo transatlántico Madrid → CDMX (13:00)', 'Hidratación, estiramientos y comidas a bordo.'),
        blk('21:00', '22:30', 'rest', 'Llegada a CDMX y descompresión', 'Traslado a casa y cena ligera.'),
        blk('22:30', '24:00', 'sleep', 'Sueño de recuperación en casa', 'Cierre del circuito Europa 2027.')
      ]
    }
  ];

  const ICON_PATHS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sleep: '<path d="M2 12h20M2 17v-5a2 2 0 0 1 2-2h4v2h8a2 2 0 0 1 2 2v3M6 10V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3"/>',
    meal: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    rest: '<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    transit: '<rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16M8 17l-2 4M16 17l2 4M8.5 14h.01M15.5 14h.01"/>',
    activity: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>'
  };

  function createIconEl(name, cls = 'w-3.5 h-3.5') {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('viewBox', '0 0 24 24');
    svgEl.setAttribute('fill', 'none');
    svgEl.setAttribute('stroke', 'currentColor');
    svgEl.setAttribute('stroke-width', '1.8');
    svgEl.setAttribute('stroke-linecap', 'round');
    svgEl.setAttribute('stroke-linejoin', 'round');
    svgEl.setAttribute('class', cls);
    svgEl.innerHTML = ICON_PATHS[name] || '';
    return svgEl;
  }

  const SCHED_CATEGORIES = {
    sleep: { label: 'Dormir', icon: 'sleep', bar: 'bg-[#5856D6]', badge: 'bg-[#5856D6]/12 text-[#5856D6] dark:text-[#A5A4F3] border-[#5856D6]/25' },
    meal: { label: 'Comer', icon: 'meal', bar: 'bg-[#FF9500]', badge: 'bg-[#FF9500]/12 text-[#B25000] dark:text-[#FF9F0A] border-[#FF9500]/25' },
    rest: { label: 'Descanso', icon: 'rest', bar: 'bg-[#34C759]', badge: 'bg-[#34C759]/12 text-[#1E7E34] dark:text-[#30D158] border-[#34C759]/25' },
    transit: { label: 'Traslado', icon: 'transit', bar: 'bg-[#007AFF]', badge: 'bg-[#007AFF]/12 text-[#007AFF] dark:text-[#0A84FF] border-[#007AFF]/25' },
    activity: { label: 'Actividad', icon: 'activity', bar: 'bg-[#AF52DE]', badge: 'bg-[#AF52DE]/12 text-[#8944AB] dark:text-[#BF5AF2] border-[#AF52DE]/25' }
  };

  const state = {
    filter: 'all',
    sideTab: 'legs',
    selectedStopId: null,
    selectedLegId: 'leg-1',
    selectedDayId: null,
    scheduleDayId: 'd1',
    scheduleCategory: 'all',
    hoveredLegId: null,
    playing: false,
    playTimer: null,
    comments: [],
    updates: [],
    commentFilter: 'all',
    commentForceGeneral: false,
    dbAvailable: true,
    darkMode: document.documentElement.classList.contains('dark')
  };

  const stopById = Object.fromEntries(STOPS.map(s => [s.id, s]));

  // ---------------- Theme Toggle ----------------
  function syncThemeButton() {
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    icon.textContent = '';
    if (state.darkMode) {
      icon.appendChild(createIconEl('sun', 'w-3.5 h-3.5 text-[#FF9F0A]'));
      label.textContent = 'Modo claro';
    } else {
      icon.appendChild(createIconEl('moon', 'w-3.5 h-3.5 text-[#5856D6]'));
      label.textContent = 'Modo nocturno';
    }
  }

  function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    document.documentElement.classList.toggle('dark', state.darkMode);
    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(state.darkMode));
    syncThemeButton();
    renderRoute();
    renderTiles(d3.zoomTransform(svg.node()));
  }

  syncThemeButton();
  document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);

  // ---------------- Map Setup ----------------
  const POIS = [
    { id: 'poi-chamartin', name: 'Madrid Chamartín', coords: [-3.6825, 40.4721] },
    { id: 'poi-granvia', name: 'Gran Vía · Casa del Libro / Primark', coords: [-3.7042, 40.4201] },
    { id: 'poi-milcentrale', name: 'Milano Centrale', coords: [9.2041, 45.4859] },
    { id: 'poi-navigli', name: 'Navigli', coords: [9.1764, 45.4519] },
    { id: 'poi-termini', name: 'Roma Termini', coords: [12.5018, 41.9009] },
    { id: 'poi-coliseo', name: 'Coliseo & Foro Romano', coords: [12.4922, 41.8902] },
    { id: 'poi-eur', name: 'Distrito EUR', coords: [12.4653, 41.8339] },
    { id: 'poi-napcentrale', name: 'Napoli Centrale', coords: [14.2725, 40.8529] },
    { id: 'poi-mann', name: 'Museo MANN', coords: [14.2504, 40.8534] },
    { id: 'poi-pompeya', name: 'Porta Marina · Pompeya', coords: [14.4829, 40.7489] },
    { id: 'poi-sorrento', name: 'Marina Piccola · Sorrento', coords: [14.3755, 40.6295] },
    { id: 'poi-campanha', name: 'Porto Campanhã', coords: [-8.5856, 41.1489] },
    { id: 'poi-serralves', name: 'Fundación Serralves', coords: [-8.6596, 41.1597] },
    { id: 'poi-casamusica', name: 'Casa da Música', coords: [-8.6307, 41.1589] },
    { id: 'poi-vigo', name: 'Vigo Guixar / Urzáiz', coords: [-8.7128, 42.2384] }
  ];

  const svg = d3.select('#route-map');
  const mapContainer = document.getElementById('route-map').parentElement;
  const statusEl = document.getElementById('map-status');
  let width = mapContainer.clientWidth || 800;
  let height = mapContainer.clientHeight || 560;

  svg.attr('viewBox', `0 0 ${width} ${height}`);

  const gRoot = svg.append('g');
  const gCountries = gRoot.append('g');
  const gTiles = gRoot.append('g').style('pointer-events', 'none');
  const gLegs = gRoot.append('g');
  const gLabels = gRoot.append('g');
  const gPois = gRoot.append('g');
  const gStops = gRoot.append('g');

  const projection = d3.geoMercator()
    .center([3.5, 42.2])
    .scale(Math.min(width, height) * 2.55)
    .translate([width / 2, height / 2]);

  const pathGen = d3.geoPath().projection(projection);

  function lon2tile(lon, z) {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, z));
  }
  function lat2tile(lat, z) {
    const clamped = Math.max(-85, Math.min(85, lat));
    const rad = (clamped * Math.PI) / 180;
    return Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * Math.pow(2, z));
  }
  function tile2lon(x, z) {
    return (x / Math.pow(2, z)) * 360 - 180;
  }
  function tile2lat(y, z) {
    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }

  function renderTiles(transform) {
    const k = (transform && transform.k) || 1;
    if (k < 2.2) {
      gTiles.style('opacity', 0).selectAll('image').remove();
      return;
    }

    const opacity = Math.min(0.95, (k - 2.2) / 1.4);
    gTiles.style('opacity', opacity);

    const worldPx = 2 * Math.PI * projection.scale() * k;
    let z = Math.max(5, Math.min(18, Math.round(Math.log2(worldPx / 256))));

    const pTL = transform.invert([0, 0]);
    const pBR = transform.invert([width, height]);
    const llTL = projection.invert(pTL);
    const llBR = projection.invert(pBR);
    if (!llTL || !llBR) return;

    let xMin = lon2tile(llTL[0], z);
    let xMax = lon2tile(llBR[0], z);
    let yMin = lat2tile(llTL[1], z);
    let yMax = lat2tile(llBR[1], z);

    while ((xMax - xMin + 1) * (yMax - yMin + 1) > 48 && z > 5) {
      z -= 1;
      xMin = lon2tile(llTL[0], z);
      xMax = lon2tile(llBR[0], z);
      yMin = lat2tile(llTL[1], z);
      yMax = lat2tile(llBR[1], z);
    }

    gTiles.style('filter', state.darkMode
      ? 'invert(92%) hue-rotate(180deg) brightness(0.95) contrast(0.92)'
      : 'none');

    const maxIdx = Math.pow(2, z) - 1;
    const tiles = [];
    for (let x = Math.max(0, xMin); x <= Math.min(maxIdx, xMax); x++) {
      for (let y = Math.max(0, yMin); y <= Math.min(maxIdx, yMax); y++) {
        tiles.push({ x, y, z, key: `${z}-${x}-${y}` });
      }
    }

    const tileSel = gTiles.selectAll('image.map-tile').data(tiles, d => d.key);
    tileSel.join(
      enter => enter.append('image')
        .attr('class', 'map-tile')
        .attr('preserveAspectRatio', 'none')
        .attr('href', d => `/api/tiles/${d.z}/${d.x}/${d.y}.png`),
      update => update,
      exit => exit.remove()
    )
      .attr('x', d => projection([tile2lon(d.x, d.z), tile2lat(d.y, d.z)])[0])
      .attr('y', d => projection([tile2lon(d.x, d.z), tile2lat(d.y, d.z)])[1])
      .attr('width', d => {
        const p0 = projection([tile2lon(d.x, d.z), tile2lat(d.y, d.z)]);
        const p1 = projection([tile2lon(d.x + 1, d.z), tile2lat(d.y + 1, d.z)]);
        return Math.max(0.1, p1[0] - p0[0]);
      })
      .attr('height', d => {
        const p0 = projection([tile2lon(d.x, d.z), tile2lat(d.y, d.z)]);
        const p1 = projection([tile2lon(d.x + 1, d.z), tile2lat(d.y + 1, d.z)]);
        return Math.max(0.1, p1[1] - p0[1]);
      });
  }

  function resizeMap() {
    const nextW = mapContainer.clientWidth;
    const nextH = mapContainer.clientHeight;
    if (!nextW || !nextH || (nextW === width && nextH === height)) return;
    width = nextW;
    height = nextH;
    svg.attr('viewBox', `0 0 ${width} ${height}`);
    projection
      .scale(Math.min(width, height) * 2.55)
      .translate([width / 2, height / 2]);
    gCountries.selectAll('path').attr('d', pathGen);
    renderRoute();
    renderTiles(d3.zoomTransform(svg.node()));
  }

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => resizeMap());
    ro.observe(mapContainer);
  } else {
    window.addEventListener('resize', resizeMap);
  }

  function stopLabelOffset(d) {
    const dx = (d.id === 'oporto' || d.id === 'vigo' || d.id === 'roma' || d.id === 'sorrento') ? -9 : 9;
    const dy = d.id === 'sorrento' ? 11 : (d.id === 'milan' ? -8 : 4);
    return { dx, dy };
  }

  function legPillPosition(d, k) {
    const p1 = projection(stopById[d.from].coords);
    const p2 = projection(stopById[d.to].coords);
    let mx = (p1[0] + p2[0]) / 2;
    let my = (p1[1] + p2[1]) / 2;
    let ox = 0;
    let oy = 0;
    if (d.mode === 'flight') oy -= 18;
    if (d.id === 'leg-6') { ox -= 20; oy += 6; }
    if (d.id === 'leg-3') { ox += 14; oy -= 6; }
    if (d.id === 'leg-4') { ox += 18; oy -= 8; }
    if (d.id === 'leg-5') { ox += 20; oy += 10; }
    return { x: mx + ox / k, y: my + oy / k };
  }

  /**
   * Scales all map primitives by 1/k so dots, labels, lines, and time-pill cards
   * maintain a crisp, constant screen size at any zoom level.
   */
  function updateZoomVisibility(k) {
    const safeK = Math.max(k || 1, 0.5);

    gCountries.selectAll('path')
      .style('stroke-width', `${0.8 / safeK}px`);

    gStops.selectAll('circle.node-dot')
      .attr('r', d => (d.id === 'pompeya' || d.id === 'vigo' ? 4.8 : 6.5) / safeK)
      .attr('stroke-width', 2 / safeK);

    gStops.selectAll('text.node-label')
      .attr('dx', d => stopLabelOffset(d).dx / safeK)
      .attr('dy', d => stopLabelOffset(d).dy / safeK)
      .style('font-size', `${10.5 / safeK}px`)
      .style('stroke-width', `${3.2 / safeK}px`)
      .style('opacity', d => {
        if (state.selectedStopId === d.id) return 1;
        if ((d.id === 'pompeya' || d.id === 'sorrento' || d.id === 'vigo') && safeK < 2.2) return 0;
        return 1;
      });

    gLabels.selectAll('g.time-pill')
      .attr('transform', d => {
        const pos = legPillPosition(d, safeK);
        return `translate(${pos.x}, ${pos.y}) scale(${1 / safeK})`;
      })
      .style('opacity', d => {
        if (state.selectedLegId === d.id || state.hoveredLegId === d.id) return 1;
        if (d.id === 'leg-4' || d.id === 'leg-5') return safeK >= 5.0 ? 0.96 : 0;
        if (d.id === 'leg-3' || d.id === 'leg-6') return safeK >= 2.5 ? 0.96 : 0;
        return 0.96;
      });

    gPois.style('opacity', safeK >= 4 ? 1 : 0);
    gPois.selectAll('g.poi-node')
      .attr('transform', d => {
        const p = projection(d.coords);
        return `translate(${p[0]}, ${p[1]}) scale(${1 / safeK})`;
      });

    gLegs.selectAll('path.leg-path')
      .style('stroke-width', d => (state.selectedLegId === d.id || state.hoveredLegId === d.id ? 3.6 : 2.2) / safeK)
      .attr('stroke-dasharray', d => {
        if (d.mode === 'flight') return `${6 / safeK},${5 / safeK}`;
        if (d.id === 'leg-6') return `${4 / safeK},${3 / safeK}`;
        return null;
      });
  }

  const zoom = d3.zoom()
    .scaleExtent([0.8, 120])
    .on('zoom', (event) => {
      gRoot.attr('transform', event.transform);
      updateZoomVisibility(event.transform.k);
      renderTiles(event.transform);
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
    if (mode === 'highspeed') return '#3b82f6';
    return '#10b981';
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
    const isDark = state.darkMode;

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
      .classed('dimmed', d => !modeMatchesFilter(d.mode))
      .classed('active-leg', d => state.selectedLegId === d.id);

    const visibleLabels = LEGS.filter(d => modeMatchesFilter(d.mode));
    const labelSel = gLabels.selectAll('g.time-pill').data(visibleLabels, d => d.id);
    const labelEnter = labelSel.enter().append('g').attr('class', 'time-pill');
    labelEnter.append('rect').attr('rx', 6).attr('ry', 6);
    labelEnter.append('text').attr('class', 'pill-text').attr('text-anchor', 'middle').attr('dominant-baseline', 'central');

    labelSel.merge(labelEnter).select('text.pill-text')
      .text(d => `${d.mode === 'flight' ? '✈' : '🚆'} ${d.transitTime}`)
      .style('font-size', '9.5px')
      .style('font-weight', '600')
      .style('fill', d => {
        if (state.selectedLegId === d.id) return '#ffffff';
        return isDark ? '#f1f5f9' : '#0f172a';
      });

    labelSel.merge(labelEnter).each(function (d) {
      const textNode = d3.select(this).select('text').node();
      const bbox = textNode.getBBox();
      const isSelected = state.selectedLegId === d.id;
      d3.select(this).select('rect')
        .attr('x', bbox.x - 6)
        .attr('y', bbox.y - 3)
        .attr('width', bbox.width + 12)
        .attr('height', bbox.height + 6)
        .attr('fill', isSelected ? '#2563eb' : (isDark ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.88)'))
        .attr('stroke', isSelected ? '#3b82f6' : (isDark ? 'rgba(255,255,255,0.16)' : '#cbd5e1'))
        .attr('stroke-width', 0.9);
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
      .attr('fill', d => state.selectedStopId === d.id ? '#3b82f6' : (d.nights === 0 ? '#10b981' : (isDark ? '#f8fafc' : '#0f172a')))
      .attr('stroke', isDark ? '#0f172a' : '#ffffff');

    stopSel.merge(stopEnter).select('text.node-label')
      .attr('text-anchor', d => (d.id === 'oporto' || d.id === 'vigo' || d.id === 'roma' || d.id === 'sorrento') ? 'end' : 'start')
      .text(d => d.id === 'madrid-start' ? '1/9. Madrid (MAD)' : `${d.order}. ${d.name.replace(' (Tránsito)', '').replace(' (Transbordo)', '')}`)
      .style('font-weight', '700')
      .style('fill', isDark ? '#f8fafc' : '#0f172a')
      .style('paint-order', 'stroke')
      .style('stroke', isDark ? '#0b1120' : '#ffffff');

    stopSel.exit().remove();

    // Render city-level POIs (visible on zoom-in k >= 4)
    const poiSel = gPois.selectAll('g.poi-node').data(POIS, d => d.id);
    const poiEnter = poiSel.enter().append('g')
      .attr('class', 'poi-node')
      .style('pointer-events', 'none');
    poiEnter.append('circle').attr('r', 3.5).attr('stroke', '#ffffff').attr('stroke-width', 1.2);
    poiEnter.append('text')
      .attr('dx', 6)
      .attr('dy', 3)
      .style('font-size', '9.5px')
      .style('font-weight', '600');

    poiSel.merge(poiEnter).select('circle')
      .attr('fill', '#AF52DE')
      .attr('stroke', isDark ? '#0f172a' : '#ffffff');
    poiSel.merge(poiEnter).select('text')
      .text(d => d.name)
      .style('fill', isDark ? '#e2e8f0' : '#1e293b')
      .style('paint-order', 'stroke')
      .style('stroke', isDark ? '#0b1120' : '#ffffff')
      .style('stroke-width', '2.5px');
    poiSel.exit().remove();

    updateZoomVisibility(k);
  }

  function renderDetailPanel() {
    const el = document.getElementById('detail-content');
    if (state.selectedDayId) {
      const day = DAYS.find(d => d.id === state.selectedDayId);
      el.innerHTML = `
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900">Día ${day.num} · ${day.date}</span>
          <span class="text-xs font-semibold text-blue-600 dark:text-blue-400">${day.city}</span>
        </div>
        <div class="mt-3 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div class="glass-subtle rounded-xl p-2.5">
            <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Bloque AM</div>
            <p class="mt-0.5 text-slate-800 dark:text-slate-100">${day.am}</p>
          </div>
          <div class="glass-subtle rounded-xl p-2.5">
            <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Bloque PM y Mantenimiento</div>
            <p class="mt-0.5 text-slate-800 dark:text-slate-100">${day.pm}</p>
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
        ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30'
        : (leg.mode === 'highspeed' ? 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border-blue-500/30' : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30');

      el.innerHTML = `
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeCls}">${leg.modeLabel}</span>
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">${leg.date}</span>
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white mt-2">${fromStop.name} → ${toStop.name}</h3>
        <div class="grid grid-cols-3 gap-2 mt-3">
          <div class="glass-subtle rounded-xl p-2">
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">En ruta</div>
            <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">${leg.transitTime}</div>
          </div>
          <div class="glass-subtle rounded-xl p-2">
            <div class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Puerta a puerta</div>
            <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">${leg.doorToDoor}</div>
          </div>
          <div class="glass-subtle rounded-xl p-2 border-emerald-500/20">
            <div class="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Costo est.</div>
            <div class="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200">${leg.cost}</div>
          </div>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">${leg.notes}</p>
        <div class="mt-3 pt-3 border-t border-slate-200/60 dark:border-white/10">
          <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">En destino (${toStop.name})</div>
          <p class="text-xs text-slate-700 dark:text-slate-300 mt-1"><strong>Foco:</strong> ${toStop.focus}</p>
          <p class="text-xs text-slate-700 dark:text-slate-300 mt-1"><strong>Café:</strong> ${toStop.coffee}</p>
          <p class="text-xs text-slate-700 dark:text-slate-300 mt-1"><strong>Físico:</strong> ${toStop.fitness}</p>
        </div>
      `;
    } else if (state.selectedStopId) {
      const stop = stopById[state.selectedStopId];
      el.innerHTML = `
        <div class="flex items-center justify-between gap-2">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900">Parada #${stop.order} · ${stop.country}</span>
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">${stop.dates} (${stop.nights} noches)</span>
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white mt-2">${stop.name}</h3>
        <div class="mt-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
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
      const dotColor = leg.mode === 'flight' ? 'bg-amber-500' : (leg.mode === 'highspeed' ? 'bg-blue-500' : 'bg-emerald-500');
      const openCount = getOpenCommentCount('leg', leg.id);
      const countBadge = openCount > 0
        ? `<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-blue-500 text-white' : 'bg-blue-500/15 text-blue-700 dark:text-blue-300'}">💬 ${openCount}</span>`
        : '';
      return `
        <button type="button" data-leg-id="${leg.id}" class="leg-item w-full text-left px-3 py-2.5 rounded-xl transition flex items-start justify-between gap-2 ${isActive ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' : 'hover:bg-white/60 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'}">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="w-2 h-2 rounded-full shrink-0 ${dotColor}"></span>
              <span class="text-xs font-bold truncate">${leg.index}. ${fromStop.short} → ${toStop.short}</span>
              <span class="text-[11px] ${isActive ? 'text-slate-300 dark:text-slate-500' : 'text-slate-400'}">${leg.date}</span>
              ${countBadge}
            </div>
            <div class="text-[11px] mt-0.5 truncate ${isActive ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}">${leg.modeLabel}</div>
          </div>
          <div class="text-right shrink-0">
            <div class="text-xs font-bold">${leg.transitTime}</div>
            <div class="text-[10px] font-semibold ${isActive ? 'text-emerald-300 dark:text-emerald-700' : 'text-emerald-600 dark:text-emerald-400'}">${leg.cost}</div>
          </div>
        </button>
      `;
    }).join('');
  }

  function parseMinutes(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  }

  function formatDuration(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} h`;
    return `${h} h ${m} min`;
  }

  function buildDayScheduleCard(day) {
    const wrapper = document.createElement('div');
    wrapper.className = 'glass-panel mx-1.5 mt-1 mb-2 rounded-2xl p-2.5 space-y-2 animate-apple-in shadow-[0_14px_30px_-8px_rgba(0,0,0,0.20)] dark:shadow-[0_18px_36px_-8px_rgba(0,0,0,0.75)] ring-1 ring-[#007AFF]/20';

    // 1. Compact summary info (Traslado + Notas, since AM/PM already show in detail card)
    const infoBox = document.createElement('div');
    infoBox.className = 'space-y-1 text-[10px] leading-snug text-[#3A3A3C] dark:text-[#D1D1D6]';

    [
      ['Traslado', day.transit],
      ['Notas', day.notes]
    ].forEach(([label, val]) => {
      const row = document.createElement('div');
      const strong = document.createElement('strong');
      strong.className = 'text-[#1D1D1F] dark:text-white';
      strong.textContent = `${label}: `;
      const span = document.createElement('span');
      span.textContent = val;
      row.appendChild(strong);
      row.appendChild(span);
      infoBox.appendChild(row);
    });
    wrapper.appendChild(infoBox);

    // 2. 24h Bar + Totals
    const totals = { sleep: 0, meal: 0, rest: 0, transit: 0, activity: 0 };
    const barWrap = document.createElement('div');
    barWrap.className = 'space-y-1 pt-1.5 border-t border-black/5 dark:border-white/10';

    const barEl = document.createElement('div');
    barEl.className = 'w-full h-2 rounded-full overflow-hidden flex bg-black/5 dark:bg-white/10';

    day.timeline.forEach(block => {
      const dur = Math.max(0, parseMinutes(block.end) - parseMinutes(block.start));
      totals[block.category] = (totals[block.category] || 0) + dur;

      const seg = document.createElement('div');
      const catMeta = SCHED_CATEGORIES[block.category];
      seg.className = `${catMeta.bar} h-full border-r border-white/30 dark:border-black/40 last:border-r-0 transition-opacity`;
      seg.style.width = `${(dur / 1440) * 100}%`;
      seg.title = `${block.start}–${block.end} · ${catMeta.label}: ${block.title}`;
      if (state.scheduleCategory !== 'all' && state.scheduleCategory !== block.category) {
        seg.style.opacity = '0.2';
      }
      barEl.appendChild(seg);
    });
    barWrap.appendChild(barEl);

    const ticks = document.createElement('div');
    ticks.className = 'flex justify-between text-[8.5px] font-medium tabular-nums text-[#8E8E93]';
    ['00:00', '06:00', '12:00', '18:00', '24:00'].forEach(t => {
      const s = document.createElement('span');
      s.textContent = t;
      ticks.appendChild(s);
    });
    barWrap.appendChild(ticks);

    // Summary pills
    const pillsRow = document.createElement('div');
    pillsRow.className = 'flex flex-wrap gap-1 pt-0.5';
    Object.entries(SCHED_CATEGORIES).forEach(([catKey, meta]) => {
      if (totals[catKey] <= 0) return;
      const pill = document.createElement('span');
      pill.className = `inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${meta.badge}`;
      pill.appendChild(createIconEl(meta.icon, 'w-2.5 h-2.5'));
      const txt = document.createElement('span');
      txt.textContent = `${meta.label} ${formatDuration(totals[catKey])}`;
      pill.appendChild(txt);
      pillsRow.appendChild(pill);
    });
    barWrap.appendChild(pillsRow);
    wrapper.appendChild(barWrap);

    // 3. Category filter chips
    const filterRow = document.createElement('div');
    filterRow.className = 'segmented-track flex items-center gap-0.5 flex-wrap';
    [
      ['all', 'Todo'],
      ['sleep', 'Dormir'],
      ['meal', 'Comer'],
      ['rest', 'Descanso'],
      ['transit', 'Traslado'],
      ['activity', 'Actividad']
    ].forEach(([catKey, label]) => {
      const active = state.scheduleCategory === catKey;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `apple-btn px-2 py-0.5 rounded-full text-[9.5px] transition ${
        active
          ? 'font-semibold bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-sm'
          : 'font-medium text-[#6E6E73] dark:text-[#98989D]'
      }`;
      btn.textContent = label;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.scheduleCategory = catKey;
        renderDaysList();
      });
      filterRow.appendChild(btn);
    });
    wrapper.appendChild(filterRow);

    // 4. Compact scrollable hourly timeline blocks
    const blocksWrap = document.createElement('div');
    blocksWrap.className = 'space-y-1 max-h-[190px] overflow-y-auto custom-scroll pr-0.5';
    const visibleBlocks = day.timeline.filter(b =>
      state.scheduleCategory === 'all' || b.category === state.scheduleCategory
    );

    visibleBlocks.forEach(block => {
      const catMeta = SCHED_CATEGORIES[block.category];
      const dur = Math.max(0, parseMinutes(block.end) - parseMinutes(block.start));

      const row = document.createElement('div');
      row.className = 'rounded-xl bg-white/75 dark:bg-black/35 border border-black/5 dark:border-white/10 px-2.5 py-1.5 flex items-start justify-between gap-2';

      const left = document.createElement('div');
      left.className = 'min-w-0';

      const top = document.createElement('div');
      top.className = 'flex items-center gap-1.5 flex-wrap';

      const timeEl = document.createElement('span');
      timeEl.className = 'text-[10px] font-semibold tabular-nums text-[#1D1D1F] dark:text-white';
      timeEl.textContent = `${block.start}–${block.end}`;

      const badge = document.createElement('span');
      badge.className = `inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-semibold border ${catMeta.badge}`;
      badge.appendChild(createIconEl(catMeta.icon, 'w-2.5 h-2.5'));
      const bTxt = document.createElement('span');
      bTxt.textContent = catMeta.label;
      badge.appendChild(bTxt);

      top.appendChild(timeEl);
      top.appendChild(badge);

      const title = document.createElement('div');
      title.className = 'text-[10.5px] font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5 leading-tight';
      title.textContent = block.title;

      const detail = document.createElement('div');
      detail.className = 'text-[9.5px] text-[#6E6E73] dark:text-[#98989D] mt-0.5 leading-snug';
      detail.textContent = block.detail;

      left.appendChild(top);
      left.appendChild(title);
      left.appendChild(detail);

      const durEl = document.createElement('span');
      durEl.className = 'shrink-0 text-[9.5px] font-semibold tabular-nums text-[#8E8E93]';
      durEl.textContent = formatDuration(dur);

      row.appendChild(left);
      row.appendChild(durEl);
      blocksWrap.appendChild(row);
    });

    wrapper.appendChild(blocksWrap);
    return wrapper;
  }

  function renderDaysList() {
    const container = document.getElementById('days-list');
    container.textContent = '';

    DAYS.forEach(day => {
      const isActive = state.selectedDayId === day.id;
      const isExpanded = state.expandedDayId === day.id;
      const openCount = getOpenCommentCount('day', day.id);

      const itemWrap = document.createElement('div');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.dayId = day.id;
      btn.className = `day-item apple-btn w-full text-left px-3 py-2.5 rounded-xl transition ${
        isActive
          ? 'bg-[#1D1D1F] text-white dark:bg-[#F5F5F7] dark:text-[#1D1D1F] shadow-sm'
          : 'hover:bg-white/60 dark:hover:bg-white/5 text-[#1D1D1F] dark:text-[#F5F5F7]'
      }`;

      const top = document.createElement('div');
      top.className = 'flex items-center justify-between gap-2';

      const leftTop = document.createElement('div');
      leftTop.className = 'flex items-center gap-1.5 min-w-0';

      const dayTitle = document.createElement('span');
      dayTitle.className = 'text-xs font-bold';
      dayTitle.textContent = `Día ${day.num} · ${day.date}`;
      leftTop.appendChild(dayTitle);

      if (openCount > 0) {
        const cBadge = document.createElement('span');
        cBadge.className = `inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
          isActive ? 'bg-[#007AFF] text-white' : 'bg-[#007AFF]/15 text-[#007AFF] dark:text-[#0A84FF]'
        }`;
        cBadge.textContent = `${openCount}`;
        leftTop.appendChild(cBadge);
      }

      const rightTop = document.createElement('div');
      rightTop.className = 'flex items-center gap-1.5 shrink-0';

      const citySpan = document.createElement('span');
      citySpan.className = `text-[11px] font-semibold truncate max-w-[130px] ${
        isActive ? 'text-[#64D2FF] dark:text-[#007AFF]' : 'text-[#007AFF] dark:text-[#0A84FF]'
      }`;
      citySpan.textContent = day.city;

      const chev = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      chev.setAttribute('viewBox', '0 0 24 24');
      chev.setAttribute('fill', 'none');
      chev.setAttribute('stroke', 'currentColor');
      chev.setAttribute('stroke-width', '2');
      chev.setAttribute('stroke-linecap', 'round');
      chev.setAttribute('stroke-linejoin', 'round');
      chev.setAttribute('class', `w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`);
      chev.innerHTML = '<path d="m6 9 6 6 6-6"/>';

      rightTop.appendChild(citySpan);
      rightTop.appendChild(chev);

      top.appendChild(leftTop);
      top.appendChild(rightTop);

      const amEl = document.createElement('div');
      amEl.className = `text-[11px] mt-1 line-clamp-1 ${
        isActive ? 'text-white/75 dark:text-black/70' : 'text-[#6E6E73] dark:text-[#98989D]'
      }`;
      amEl.textContent = day.am;

      btn.appendChild(top);
      btn.appendChild(amEl);
      itemWrap.appendChild(btn);

      if (isExpanded) {
        itemWrap.appendChild(buildDayScheduleCard(day));
      }

      container.appendChild(itemWrap);
    });
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
      const arrowHtml = item.arrow ? `<span class="text-[#8E8E93] mx-0.5">${item.arrow}</span>` : '';
      return `<button type="button" data-stop-id="${item.id}" class="strip-stop apple-btn px-2.5 py-1 rounded-full font-medium transition ${active ? 'bg-[#007AFF] text-white shadow-sm' : 'glass-subtle text-[#1D1D1F] dark:text-[#F5F5F7]'}">${item.label}</button>${arrowHtml}`;
    }).join('');
  }

  function selectDay(dayId, toggleAccordion = true) {
    const day = DAYS.find(d => d.id === dayId);
    if (!day) return;
    if (toggleAccordion) {
      state.expandedDayId = state.expandedDayId === dayId ? null : dayId;
    } else {
      state.expandedDayId = dayId;
    }
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
    const sel = getSelectionContext();
    const badge = document.getElementById('comment-context-badge');
    const toggleBtn = document.getElementById('toggle-general-context');
    const navCtx = document.getElementById('nav-active-context');
    const navSchedDay = document.getElementById('nav-sched-day');

    badge.textContent = ctx.target_label;
    toggleBtn.textContent = state.commentForceGeneral ? 'Usar selección del mapa' : 'Cambiar a General';
    if (navCtx) navCtx.textContent = sel.target_label;
    if (navSchedDay) {
      const schedDay = DAYS.find(d => d.id === state.scheduleDayId);
      navSchedDay.textContent = schedDay ? `D${schedDay.num}` : 'D1';
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

    document.getElementById('header-open-count').textContent = String(openCount);
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
      ? 'text-xs px-3 py-2 rounded-xl bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30'
      : 'text-xs px-3 py-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30';
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
      card.className = `glass-subtle rounded-2xl p-3.5 transition ${
        isResolved ? 'opacity-75' : ''
      }`;

      const header = document.createElement('div');
      header.className = 'flex items-start justify-between gap-2 flex-wrap';

      const leftMeta = document.createElement('div');
      leftMeta.className = 'flex items-center gap-2 flex-wrap';

      const authorEl = document.createElement('span');
      authorEl.className = 'text-xs font-bold text-slate-900 dark:text-white';
      authorEl.textContent = comment.author_name;

      const contextPill = document.createElement('span');
      contextPill.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200';
      contextPill.textContent = comment.target_label || 'Comentario General';

      const statusPill = document.createElement('span');
      statusPill.className = isResolved
        ? 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
        : 'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300';
      statusPill.textContent = isResolved ? 'Resuelto' : 'Abierto';

      leftMeta.appendChild(authorEl);
      leftMeta.appendChild(contextPill);
      leftMeta.appendChild(statusPill);

      const dateEl = document.createElement('span');
      dateEl.className = 'text-[11px] text-slate-400';
      dateEl.textContent = formatDateTime(comment.created_at);

      header.appendChild(leftMeta);
      header.appendChild(dateEl);

      const bodyEl = document.createElement('p');
      bodyEl.className = 'mt-2 text-xs text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed';
      bodyEl.textContent = comment.body;

      const actions = document.createElement('div');
      actions.className = 'mt-3 pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-2 flex-wrap';

      const leftActions = document.createElement('div');
      leftActions.className = 'flex items-center gap-2';

      if (comment.target_type !== 'general' && comment.target_id) {
        const focusBtn = document.createElement('button');
        focusBtn.type = 'button';
        focusBtn.className = 'text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline transition';
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
      toggleStatusBtn.className = 'px-2.5 py-1 rounded-full text-[11px] font-semibold glass-subtle text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/80 transition';
      toggleStatusBtn.textContent = isResolved ? 'Reabrir' : 'Marcar resuelto';
      toggleStatusBtn.addEventListener('click', () => toggleCommentStatus(comment.id, isResolved ? 'open' : 'resolved'));

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'px-2.5 py-1 rounded-full text-[11px] font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition';
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
      latestEl.textContent = 'Base de datos no conectada. Mapa y cronograma activos en modo lectura.';
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
      li.className = 'border-b border-slate-200/60 dark:border-white/10 pb-1.5 last:border-b-0';

      const top = document.createElement('div');
      top.className = 'flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400';
      const author = document.createElement('strong');
      author.className = 'text-slate-700 dark:text-slate-200';
      author.textContent = item.author_name;
      const date = document.createElement('span');
      date.textContent = formatDateTime(item.created_at);
      top.appendChild(author);
      top.appendChild(date);

      const summary = document.createElement('div');
      summary.className = 'text-slate-800 dark:text-slate-200 mt-0.5';
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
        b.className = `filter-btn apple-btn px-3 py-1 rounded-full text-xs transition ${
          active ? 'font-semibold bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-sm' : 'font-medium text-[#6E6E73] dark:text-[#98989D]'
        }`;
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
    document.getElementById('tab-legs').className = 'side-tab apple-btn px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-sm';
    document.getElementById('tab-days').className = 'side-tab apple-btn px-3 py-1 rounded-full text-xs font-medium text-[#6E6E73] dark:text-[#98989D]';
  });

  document.getElementById('tab-days').addEventListener('click', () => {
    state.sideTab = 'days';
    document.getElementById('days-list').classList.remove('hidden');
    document.getElementById('legs-list').classList.add('hidden');
    document.getElementById('tab-days').className = 'side-tab apple-btn px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-sm';
    document.getElementById('tab-legs').className = 'side-tab apple-btn px-3 py-1 rounded-full text-xs font-medium text-[#6E6E73] dark:text-[#98989D]';
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

  function stepActiveElement(delta) {
    if (state.selectedDayId) {
      const cur = DAYS.findIndex(d => d.id === state.selectedDayId);
      const next = (cur + delta + DAYS.length) % DAYS.length;
      selectDay(DAYS[next].id);
      return;
    }
    const cur = LEGS.findIndex(l => l.id === state.selectedLegId);
    const base = cur < 0 ? 0 : cur;
    const next = (base + delta + LEGS.length) % LEGS.length;
    selectLeg(LEGS[next].id, true);
  }
  document.getElementById('nav-prev').addEventListener('click', () => stepActiveElement(-1));
  document.getElementById('nav-next').addEventListener('click', () => stepActiveElement(1));

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
        b.className = `comment-filter-btn apple-btn px-3 py-1 rounded-full text-xs transition ${
          active ? 'font-semibold bg-white dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-white shadow-sm' : 'font-medium text-[#6E6E73] dark:text-[#98989D]'
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
