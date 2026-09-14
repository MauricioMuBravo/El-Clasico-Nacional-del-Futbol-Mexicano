/* ==========================================================================
   EL CLÁSICO NACIONAL — script principal
   Todo corre dentro de un único IIFE ("use strict") para no ensuciar el
   scope global de la página. No usa ningún framework: es DOM puro (crea
   elementos con document.createElement / innerHTML) y sintaxis compatible
   con navegadores viejos (var, function, sin arrow functions).

   Estructura de este archivo, de arriba a abajo:
     1. Rutas de imágenes/audio (antes venían embebidas en base64; ahora son
        archivos sueltos en assets/img y assets/audio).
     2. DATA — todos los arreglos con el contenido real del sitio (línea de
        tiempo, leyendas, épocas, cruzados, jugadas, quiz, fuentes).
     3. RENDER — funciones que toman esos arreglos y generan el HTML dentro
        de los contenedores vacíos que dejó index.html.
     4. Lineup builder — la cancha interactiva "Arma tu Once Ideal".
     5. Quiz — lógica de preguntas, puntaje y resultado final.
     6. Audio de estadio — ambiente de fondo con manejo del bloqueo de
        autoplay de los navegadores.
     7. Predicción y Fuentes — los dos bloques finales de la página.
   ========================================================================== */
(function(){
  "use strict";

  /* ---------------- Escudos y sonidos ---------------- */
  var CREST_AME = "assets/img/crest_ame.png";
  var CREST_CHI = "assets/img/crest_chi.png";
  var SOUND_AME = "assets/audio/sound_ame.mp3";
  var SOUND_CHI = "assets/audio/sound_chi.mp3";
  var SOUND_STADIUM = "assets/audio/sound_stadium.mp3";

  /* ---------------- Fotos de leyendas (Club América) ---------------- */
  var PHOTO_BLANCO = "assets/img/photo_blanco.jpg";
  var PHOTO_HENRYMARTIN = "assets/img/photo_henrymartin.jpg";
  var PHOTO_SANTOS = "assets/img/photo_santos.jpg";
  var PHOTO_BORJA = "assets/img/photo_borja.jpg";
  var PHOTO_ZELADA = "assets/img/photo_zelada.jpg";
  var PHOTO_ORTEGA = "assets/img/photo_ortega.jpg";
  var PHOTO_ZAGUEPADRE = "assets/img/photo_zaguepadre.jpg";
  var PHOTO_ZAGUEHIJO = "assets/img/photo_zaguehijo.jpg";
  var PHOTO_REINOSO = "assets/img/photo_reinoso.jpg";
  var PHOTO_RECORDGARZA = "assets/img/photo_recordgarza.jpg";
  var PHOTO_JUANHERNANDEZ = "assets/img/photo_juanhernandez.jpg";
  var PHOTO_TENA = "assets/img/photo_tena.jpg";
  var PHOTO_PICHOJOS = "assets/img/photo_pichojos.jpg";
  var PHOTO_FIDALGO = "assets/img/photo_fidalgo.jpg";
  var PHOTO_LAYUN = "assets/img/photo_layun.jpg";

  /* ---------------- Fotos de leyendas (Chivas Guadalajara) ---------------- */
  var PHOTO_C_TUBO = "assets/img/photo_c_tubo.jpg";
  var PHOTO_C_CALDERON = "assets/img/photo_c_calderon.jpg";
  var PHOTO_C_SEPULVEDA = "assets/img/photo_c_sepulveda.jpg";
  var PHOTO_C_QUIRARTE = "assets/img/photo_c_quirarte.jpg";
  var PHOTO_C_SALCIDO = "assets/img/photo_c_salcido.jpg";
  var PHOTO_C_VILLEGAS = "assets/img/photo_c_villegas.jpg";
  var PHOTO_C_MORALES = "assets/img/photo_c_morales.jpg";
  var PHOTO_C_GALINDO = "assets/img/photo_c_galindo.jpg";
  var PHOTO_C_RAMONRAMIREZ = "assets/img/photo_c_ramonramirez.jpg";
  var PHOTO_C_CHAVAREYES = "assets/img/photo_c_chavareyes.jpg";
  var PHOTO_C_ELCHALE = "assets/img/photo_c_elchale.jpg";
  var PHOTO_C_OMARBRAVO = "assets/img/photo_c_omarbravo.jpg";
  var PHOTO_C_CHICHARITO = "assets/img/photo_c_chicharito.jpg";
  var PHOTO_C_BOFOBAUTISTA = "assets/img/photo_c_bofobautista.jpg";
  var PHOTO_C_HORMIGA = "assets/img/photo_c_hormiga.jpg";
  var PHOTO_C_OSWALDOSANCHEZ = "assets/img/photo_c_oswaldosanchez.jpg";
  var PHOTO_C_VENADOMEDINA = "assets/img/photo_c_venadomedina.jpg";
  var PHOTO_MUNOZ = "assets/img/photo_munoz.jpg";
  var PHOTO_OCHOA = "assets/img/photo_ochoa.jpg";

  /* ---------------- Fotos de plantel completo por época (sección "Épocas") ---------------- */
  var ERA_E60 = "assets/img/era_e60.jpg";
  var ERA_E74 = "assets/img/era_e74.jpg";
  var ERA_E86 = "assets/img/era_e86.jpg";
  var ERA_E94 = "assets/img/era_e94.jpg";
  var ERA_E2003 = "assets/img/era_e2003.jpg";
  var ERA_E2013 = "assets/img/era_e2013.jpg";
  var ERA_ETRI = "assets/img/era_etri.jpg";
  var ERA_C_1949 = "assets/img/era_c_1949.jpg";
  var ERA_C_87 = "assets/img/era_c_87.jpg";
  var ERA_C_97 = "assets/img/era_c_97.jpg";
  var ERA_C_2004 = "assets/img/era_c_2004.jpg";
  var ERA_C_2010 = "assets/img/era_c_2010.jpg";
  var ERA_C_2017 = "assets/img/era_c_2017.jpg";
  var ERA_C_2026 = "assets/img/era_c_2026.jpg";
  var ERA_C_2006 = "assets/img/era_c_2006.jpg";
  /* ==========================================================================
     2. DATA — contenido del sitio
     ========================================================================== */

  /* Línea de tiempo de la sección "Historia" (01). Cada hito: año, club
     protagonista ("ame"/"chi", define el color del punto y la fecha en CSS),
     título y texto. Se recorre en orden en RENDER: timeline, más abajo. */
  var timeline = [
    {year:"1906", club:"chi", title:"Fundación de Chivas", body:"El belga Edgar Everaert funda el club el 8 de mayo, con un grupo de aficionados tapatíos."},
    {year:"1916", club:"ame", title:"Fundación del Club América", body:"Rafael Garza \"Récord\" funda al América el 12 de octubre en la Ciudad de México."},
    {year:"1926", club:"ame", title:"Primeros duelos documentados", body:"En una gira de América por Guadalajara se disputan tres partidos; el primero, el 10 de octubre, termina 1-1."},
    {year:"1943", club:"chi", title:"Primer partido oficial", body:"Copa México, 1 de agosto: Guadalajara vence 1-0 al América."},
    {year:"1944", club:"ame", title:"Primer duelo de liga y primera goleada", body:"El 16 de enero, Guadalajara gana 3-1 en el Parque Oblatos. Un mes después, el 20 de febrero, América responde con un contundente 7-2."},
    {year:"1959", club:"ame", title:"Nace \"el Clásico\"", body:"Tras vencer 2-0, el técnico Fernando Marcos declara que ir a Guadalajara \"es rutina\". Chivas contesta con otro 2-0 semanas más tarde: la rivalidad moderna queda sellada."},
    {year:"1981", club:"ame", title:"América se rebautiza \"Águilas\"", body:"Bajo la presidencia de Emilio Díez Barroso, el club adopta el apodo y estrena su himno oficial esa misma temporada."},
    {year:"1983-84", club:"ame", title:"La única final de Liga entre ambos", body:"Ida 2-2; América se corona con un global de 5-3, con atajada de penal de Héctor Zelada incluida."},
    {year:"2018", club:"ame", title:"Récord de asistencia", body:"El 1 de octubre, 74,765 aficionados llenan el Azteca: la mayor entrada del Clásico en la era post-remodelación."},
    {year:"2026", club:"chi", title:"El Clásico más reciente", body:"Clausura 2026, 14 de febrero: Chivas 1-0 América, gol de Armando \"La Hormiga\" González — sexta victoria consecutiva del Rebaño."}
  ];

  /* Fotos usadas por el arreglo `crossovers` (sección 05, "Cruzados"). Cada jugador
     que vistió ambas camisetas trae dos fotos (una por club); se agrupan aquí en
     pares AME/CHI en el mismo orden en que aparecen dentro de `crossovers`. */
  var PHOTO_CROSS_ORIBE_AME = "assets/img/photo_cross_oribe_ame.jpg";
  var PHOTO_CROSS_ORIBE_CHI = "assets/img/photo_cross_oribe_chi.jpg";
  var PHOTO_CROSS_OSWALDO_AME = "assets/img/photo_cross_oswaldo_ame.jpg";
  var PHOTO_CROSS_OSWALDO_CHI = "assets/img/photo_cross_oswaldo_chi.jpg";

  var PHOTO_CROSS_RAMON_AME = "assets/img/photo_cross_ramon_ame.jpg";
  var PHOTO_CROSS_RAMON_CHI = "assets/img/photo_cross_ramon_chi.jpg";

  var PHOTO_CROSS_COTA_CHI = "assets/img/photo_cross_cota_chi.jpg";
  var PHOTO_CROSS_COTA_AME = "assets/img/photo_cross_cota_ame.jpg";

  var PHOTO_CROSS_PELAEZ_AME = "assets/img/photo_cross_pelaez_ame.jpg";
  var PHOTO_CROSS_PELAEZ_CHI = "assets/img/photo_cross_pelaez_chi.jpg";
  var PHOTO_CROSS_JOELSANCHEZ_CHI = "assets/img/photo_cross_joelsanchez_chi.jpg";
  var PHOTO_CROSS_JOELSANCHEZ_AME = "assets/img/photo_cross_joelsanchez_ame.jpg";
  var PHOTO_CROSS_MENDOZA_CHI = "assets/img/photo_cross_mendoza_chi.jpg";
  var PHOTO_CROSS_MENDOZA_AME = "assets/img/photo_cross_mendoza_ame.jpg";
  var PHOTO_CROSS_REYNA_AME = "assets/img/photo_cross_reyna_ame.jpg";
  var PHOTO_CROSS_REYNA_CHI = "assets/img/photo_cross_reyna_chi.jpg";
  var PHOTO_CROSS_MAZA_CHI = "assets/img/photo_cross_maza_chi.jpg";
  var PHOTO_CROSS_MAZA_AME = "assets/img/photo_cross_maza_ame.jpg";
  var PHOTO_CROSS_HERMOSILLO_AME = "assets/img/photo_cross_hermosillo_ame.jpg";
  var PHOTO_CROSS_HERMOSILLO_CHI = "assets/img/photo_cross_hermosillo_chi.jpg";
  var PHOTO_CROSS_AGUIRRE_AME = "assets/img/photo_cross_aguirre_ame.jpg";
  var PHOTO_CROSS_AGUIRRE_CHI = "assets/img/photo_cross_aguirre_chi.jpg";
  var PHOTO_CROSS_MOLINA_AME = "assets/img/photo_cross_molina_ame.jpg";
  var PHOTO_CROSS_MOLINA_CHI = "assets/img/photo_cross_molina_chi.jpg";

  var PHOTO_CROSS_VAZQUEZ_CHI = "assets/img/photo_cross_vazquez_chi.jpg";
  var PHOTO_CROSS_VAZQUEZ_AME = "assets/img/photo_cross_vazquez_ame.jpg";

  /* Fotos del arreglo `plays` (sección 06, "Jugadas"): una por partido/jugada. */
  var PHOTO_PLAY_1944 = "assets/img/photo_play_1944.jpg";

  var PHOTO_PLAY_1959A = "assets/img/photo_play_1959a.jpg";
  var PHOTO_PLAY_1959B = "assets/img/photo_play_1959b.jpg";

  var PHOTO_PLAY_1982 = "assets/img/photo_play_1982.jpg";
  var PHOTO_PLAY_1983 = "assets/img/photo_play_1983.jpg";
  var PHOTO_PLAY_1993 = "assets/img/photo_play_1993.jpg";
  var PHOTO_PLAY_1996 = "assets/img/photo_play_1996.jpg";
  var PHOTO_PLAY_2005 = "assets/img/photo_play_2005.jpg";

  var PHOTO_PLAY_2016 = "assets/img/photo_play_2016.jpg";
  var PHOTO_PLAY_2020 = "assets/img/photo_play_2020.jpg";
  var PHOTO_PLAY_2026 = "assets/img/photo_play_2026.jpg";

  /* Más pares de fotos de "Cruzados" (agregados después de la tanda inicial de arriba). */
  var PHOTO_CROSS_MARQUEZLUGO_AME = "assets/img/photo_cross_marquezlugo_ame.jpg";
  var PHOTO_CROSS_MARQUEZLUGO_CHI = "assets/img/photo_cross_marquezlugo_chi.jpg";

  var PHOTO_CROSS_CALDERON_CHI = "assets/img/photo_cross_calderon_chi.jpg";
  var PHOTO_CROSS_CALDERON_AME = "assets/img/photo_cross_calderon_ame.jpg";

  var PHOTO_CROSS_ZENDEJAS_CHI = "assets/img/photo_cross_zendejas_chi.jpg";
  var PHOTO_CROSS_ZENDEJAS_AME = "assets/img/photo_cross_zendejas_ame.jpg";

  /* Fotos de mascotas (sección 08, "Cultura"), mapeadas más abajo por atributo
     data-mascot en RENDER: mascotas. */
  var PHOTO_MASCOT_AME_AGUI = "assets/img/photo_mascot_ame_agui.jpg";
  var PHOTO_MASCOT_AME_CELESTE = "assets/img/photo_mascot_ame_celeste.jpg";
  var PHOTO_MASCOT_AME_NEW = "assets/img/photo_mascot_ame_new.jpg";
  var PHOTO_MASCOT_CHI_FIGHTER = "assets/img/photo_mascot_chi_fighter.jpg";
  var PHOTO_MASCOT_CHI_LOCA = "assets/img/photo_mascot_chi_loca.jpg";
  var PHOTO_MASCOT_CHI_RASTA = "assets/img/photo_mascot_chi_rasta.jpg";

  /* Leyendas del Club América (sección 03 y también usadas en el lineup builder, sección 07).
     Campos de cada objeto:
       name  — nombre a mostrar
       mono  — iniciales, respaldo si no hay foto (ver .legend-mono en el CSS)
       photo — ruta de la foto (opcional)
       role  — texto libre de posición/apodo mostrado en la tarjeta
       pos   — posición en código corto (GK/DF/FB/MF/FW) usada para ordenar y agrupar
       stats — cifras con el club, se muestra en el reverso de la tarjeta y en el tooltip del pool
       bio   — texto biográfico, reverso de la tarjeta */
  var legendsAmerica = [
    {name:"Héctor Zelada", mono:"HZ", photo:PHOTO_PICHOJOS, role:"Portero", pos:"GK", stats:"294 PJ · 0 GOL · 1978–1987", bio:"Considerado el mejor portero en la historia del club; campeón del mundo con Argentina en 1986."},
    {name:"Guillermo Ochoa", mono:"GO", role:"Portero", pos:"GK", photo:PHOTO_OCHOA, stats:"357 PJ (Liga, 2 etapas) · 0 GOL · 2003–2011 y 2019–2023", bio:"Formado en la cantera azulcrema; uno de los porteros mexicanos más queridos de su generación, con varias Copas del Mundo disputadas."},
    {name:"Moisés Muñoz", mono:"MM", role:"Portero", pos:"GK", photo:PHOTO_MUNOZ, stats:"~175 PJ (aprox.) · 1 GOL · 2011–2016", bio:"Recordado para siempre por su gol en tiempo de compensación y su atajada de penales para el título 11."},
    {name:"Alfredo Tena", mono:"AT", photo:PHOTO_JUANHERNANDEZ, role:"Defensa central · \"Capitán Furia\"", pos:"DF", stats:"603 PJ · 34 GOL · 1974–1991", bio:"Segundo lugar histórico en partidos jugados con el club. Anotó el gol decisivo en la \"Final del Siglo\" ante Chivas, 1983-84."},
    {name:"Rafael \"Récord\" Garza", mono:"RG", photo:PHOTO_RECORDGARZA, role:"Defensa central · fundador", pos:"DF", stats:"c. 1917–1928 · cifras no documentadas", bio:"Fundó el club el 12 de octubre de 1916 y jugó como defensa en su etapa inicial; el futbol mexicano de esos años no dejó estadísticas públicas confiables de partidos o goles."},
    {name:"Mario \"Pichojos\" Pérez", mono:"MP", photo:PHOTO_REINOSO, role:"Lateral izquierdo", pos:"FB", stats:"1970–1978 · cifras no documentadas", bio:"Considerado el mejor lateral izquierdo del futbol mexicano de su época; campeón de Liga en 1970-71 y 1975-76."},
    {name:"Juan Hernández", mono:"JH", photo:PHOTO_ZAGUEHIJO, role:"Lateral derecho", pos:"FB", stats:"260 PJ · 13 GOL · 1988–1996 y 1998", bio:"Llegó del Necaxa y destacó por su juego ofensivo por la banda; campeón de Liga y de Concacaf (1990-91 y 1992-93)."},
    {name:"Cuauhtémoc Blanco", mono:"CB", role:"Volante de ataque", pos:"MF", photo:PHOTO_BLANCO, stats:"397 PJ · 125 GOL · 1992–2007 y 2015-16 (varias etapas)", bio:"Máximo ídolo histórico del club en cuatro etapas distintas; segundo goleador de todos los tiempos del América en todas las competiciones."},
    {name:"Carlos Reinoso", mono:"CR", photo:PHOTO_ZELADA, role:"Mediocampista · \"El Maestro\"", pos:"MF", stats:"364 PJ · 95 GOL · 1970–1979", bio:"Chileno llegado en 1970; extranjero con más partidos en la historia del club, con dos ligas y una Copa México como jugador."},
    {name:"Cristóbal Ortega", mono:"CO", photo:PHOTO_ORTEGA, role:"Mediocampista de contención", pos:"MF", stats:"711 PJ (récord del club) · GOL no documentados · 1974–1991", bio:"Récord absoluto de partidos con el América, con 6 títulos de Liga en esa etapa."},
    {name:"Luis Roberto Alves \"Zague\"", mono:"LA", photo:PHOTO_TENA, role:"Delantero", pos:"FW", stats:"~490 PJ · 188 GOL (récord del club) · 1985–1998 (2 etapas)", bio:"Máximo goleador histórico del América, hijo del también delantero azulcrema José Alves \"Zague\"; padre e hijo compartieron el mismo apodo."},
    {name:"Enrique Borja", mono:"EB", photo:PHOTO_BORJA, role:"Delantero", pos:"FW", stats:"191 PJ · 99 GOL · 1969–1977", bio:"Llegó de Pumas en un fichaje muy polémico y fue campeón de goleo en su segunda campaña con el América."},
    {name:"Henry Martín", mono:"HM", role:"Delantero · \"La Bomba\"", pos:"FW", photo:PHOTO_HENRYMARTIN, stats:"274 PJ · 101 GOL (Liga MX) · 2017–actualidad", bio:"Máximo referente ofensivo del plantel actual y cuatro títulos de Liga MX con el club; cifras en aumento por seguir activo."},
    {name:"Antonio Carlos Santos", mono:"AS", photo:PHOTO_SANTOS, role:"Delantero", pos:"FW", stats:"1987–1992 y 1993–1994 · cifras no documentadas", bio:"Brasileño ofensivo, Balón de Oro 1987-88, que ganó 8 títulos en dos etapas con el América."},
    {name:"José Alves \"Zague\"", mono:"JZ", photo:PHOTO_ZAGUEPADRE, role:"Delantero · \"El Lobo Solitario\"", pos:"FW", stats:"299 PJ · ~102 GOL · 1961–1969", bio:"Delantero brasileño llegado en 1961; primer extranjero en ser campeón de goleo del club (1965-66). Padre de Luis Roberto Alves \"Zague\"."},
    {name:"Álvaro Fidalgo", mono:"AF", photo:PHOTO_FIDALGO, role:"Mediocampista de contención", pos:"MF", stats:"196 PJ (Liga MX) · 20 GOL · 2021–2026", bio:"Español naturalizado mexicano; motor del mediocampo en la etapa de los Tricampeones (2023-24) y tres veces campeón de Liga MX antes de fichar por el Real Betis en 2026."},
    {name:"Miguel Layún", mono:"ML", photo:PHOTO_LAYUN, role:"Lateral derecho · mediocampista", pos:"FB", stats:"210 PJ · 16 GOL · 2009–2015 y 2021–2023", bio:"Formado en la cantera azulcrema y jugador muy versátil; mundialista con México en 2014 y 2018, se retiró como campeón de Liga MX con el América en el Apertura 2023."}
  ];

  /* Leyendas de Chivas Guadalajara — mismos campos que `legendsAmerica`. */
  var legendsChivas = [
    {name:"Jaime \"Tubo\" Gómez", mono:"JG", photo:PHOTO_C_TUBO, role:"Portero", pos:"GK", stats:"300+ PJ (aprox.) · 0 GOL · 1949–1964", bio:"Guardameta de la época dorada rojiblanca; siete campeonatos de Liga bajo los tres postes."},
    {name:"Ignacio \"Cuate\" Calderón", mono:"IC", photo:PHOTO_C_CALDERON, role:"Portero", pos:"GK", stats:"300+ PJ (aprox.) · 0 GOL · 1962–1974", bio:"Tres títulos de Liga y presencia habitual con la Selección Mexicana."},
    {name:"Guillermo \"Tigre\" Sepúlveda", mono:"GS", photo:PHOTO_C_SEPULVEDA, role:"Defensa central", pos:"DF", stats:"200+ PJ (aprox.) · GOL no documentados · 1953–1966", bio:"Seis títulos de Liga y dos Mundiales con México como defensa central del Rebaño."},
    {name:"Fernando Quirarte", mono:"FQ", photo:PHOTO_C_QUIRARTE, role:"Defensa central · líbero", pos:"DF", stats:"274 PJ · 20 GOL · 1973–1987", bio:"Titular indiscutible entre 1976 y 1987; campeón de Liga en 1986-87 y mundialista con dos goles en México 1986."},
    {name:"Carlos Salcido", mono:"CS", photo:PHOTO_C_SALCIDO, role:"Defensa · lateral izquierdo y central", pos:"DF", stats:"213 PJ · 4 GOL · 2001–2006 y 2014–2018", bio:"Campeón de Liga en el Clausura 2017; multicampeón y mundialista en 2006, 2010 y 2014."},
    {name:"José \"Jamaicón\" Villegas", mono:"JV", photo:PHOTO_C_VILLEGAS, role:"Lateral izquierdo", pos:"FB", stats:"428 PJ · 0 GOL · 1953–1971", bio:"Ocho títulos de Liga y 21 trofeos totales, uno de los futbolistas con más campeonatos en la historia del club."},
    {name:"Ramón Morales", mono:"RM", photo:PHOTO_C_MORALES, role:"Lateral derecho · extremo", pos:"FB", stats:"378 PJ · 65 GOL · 1999–2010", bio:"Jugó de lateral, volante y extremo; símbolo de la institución en esa década."},
    {name:"Benjamín Galindo", mono:"BG", photo:PHOTO_C_GALINDO, role:"Mediocampista", pos:"MF", stats:"305 PJ · 91 GOL · 1986–1994 y 2000–2001", bio:"Campeón de Liga en el Verano de 1997, referente creativo del Rebaño en los 90."},
    {name:"Ramón Ramírez", mono:"RR", photo:PHOTO_C_RAMONRAMIREZ, role:"Mediocampista", pos:"MF", stats:"232 PJ · 27 GOL · 1994–1998 y 2002–2004", bio:"Campeón de Liga en 1997. En 1999 también vistió la playera del América."},
    {name:"Salvador \"Chava\" Reyes", mono:"SR", photo:PHOTO_C_CHAVAREYES, role:"Delantero", pos:"FW", stats:"PJ no documentados · 154 GOL · 1952–1967", bio:"Siete títulos de Liga y tres Mundiales con la Selección. Máximo goleador histórico del Clásico Nacional, con 13 tantos ante América."},
    {name:"Héctor \"El Chale\" Hernández", mono:"HH", photo:PHOTO_C_ELCHALE, role:"Delantero", pos:"FW", stats:"c. 1958–1968 · cifras no documentadas", bio:"Delantero de la década del \"Campeonísimo\"; siete títulos de Liga MX con el Rebaño."},
    {name:"Omar Bravo", mono:"OB", photo:PHOTO_C_OMARBRAVO, role:"Delantero", pos:"FW", stats:"382 PJ · 160 GOL (récord del club) · 2001–2008, 2009-10 y 2013–2017", bio:"Máximo goleador histórico de Chivas, en tres etapas distintas con el club."},
    {name:"Javier \"Chicharito\" Hernández", mono:"CH", photo:PHOTO_C_CHICHARITO, role:"Delantero", pos:"FW", stats:"99 PJ · 29 GOL · 2006–2010 y 2024–2025", bio:"Formado en la cantera rojiblanca antes de convertirse en el mexicano con más goles en Europa; volvió al Rebaño en 2024."},
    {name:"Adolfo \"Bofo\" Bautista", mono:"AB", photo:PHOTO_C_BOFOBAUTISTA, role:"Delantero", pos:"FW", stats:"168 PJ · 45 GOL · 2004–2007 y 2010–2011", bio:"Delantero tan talentoso como carismático, ídolo de la afición tapatía."},
    {name:"Armando \"La Hormiga\" González", mono:"AG", photo:PHOTO_C_HORMIGA, role:"Delantero", pos:"FW", stats:"29 GOL con el primer equipo · PJ aún sin consolidar · 2024–2026", bio:"Estrella emergente del Rebaño; goleador del torneo 2025 y autor del gol en el Clásico de 2026."},
    {name:"Oswaldo Sánchez", mono:"OS", photo:PHOTO_C_OSWALDOSANCHEZ, role:"Portero", pos:"GK", stats:"272 PJ · 0 GOL · 1999–2006", bio:"Salió de la cantera del América y se convirtió en el portero histórico e ídolo del Rebaño; capitán y mundialista con México en tres Copas del Mundo."},
    {name:"Alberto \"Venado\" Medina", mono:"AM", photo:PHOTO_C_VENADOMEDINA, role:"Delantero", pos:"FW", stats:"324 PJ · 51 GOL · 2000–2012", bio:"Delantero de Culiacán que hizo dupla ofensiva con Omar Bravo; pieza clave en el título del Apertura 2006, el primero del club en nueve años."}
  ];

  /* Agrupa a las leyendas de arriba por generación (sección 04, "Épocas").
     `note` es opcional: solo la usa la primera época del América para explicar el hueco de
     documentación entre los fundadores y la siguiente leyenda registrada. */
  var erasAmerica = [
    {years:"1917–1928", title:"Los fundadores", note:"Rafael \"Récord\" Garza fundó el club en 1916. Entre su retiro y la siguiente leyenda documentada de esta lista pasan más de tres décadas sin registros claros.", players:[
      {name:"Rafael \"Récord\" Garza", role:"Defensa · fundador"}
    ]},
    {years:"1961–1977", title:"Generación 60-70", players:[
      {name:"José Alves \"Zague\"", role:"Delantero"},
      {name:"Enrique Borja", role:"Delantero"},
      {name:"Mario \"Pichojos\" Pérez", role:"Lateral"},
      {name:"Carlos Reinoso", role:"Mediocampista"}
    ]},
    {years:"1974–1998", title:"La era de Zague", players:[
      {name:"Héctor Zelada", role:"Portero"},
      {name:"Alfredo Tena", role:"Defensa"},
      {name:"Cristóbal Ortega", role:"Mediocampista"},
      {name:"Juan Hernández", role:"Lateral"},
      {name:"Luis Roberto Alves \"Zague\"", role:"Delantero"},
      {name:"Antonio Carlos Santos", role:"Delantero"},
      {name:"Cuauhtémoc Blanco", role:"Mediocampista"}
    ]},
    {years:"2000–2016", title:"Cambio de milenio", players:[
      {name:"Cuauhtémoc Blanco", role:"Mediocampista"},
      {name:"Guillermo Ochoa", role:"Portero"},
      {name:"Moisés Muñoz", role:"Portero"}
    ]},
    {years:"2017–actualidad", title:"Actualidad", players:[
      {name:"Henry Martín", role:"Delantero"},
      {name:"Guillermo Ochoa", role:"Portero"}
    ]}
  ];

  var erasChivas = [
    {years:"1949–1971", title:"El Campeonísimo", players:[
      {name:"Jaime \"Tubo\" Gómez", role:"Portero"},
      {name:"Ignacio \"Cuate\" Calderón", role:"Portero"},
      {name:"Guillermo \"Tigre\" Sepúlveda", role:"Defensa"},
      {name:"José \"Jamaicón\" Villegas", role:"Lateral"},
      {name:"Salvador \"Chava\" Reyes", role:"Delantero"},
      {name:"Héctor \"El Chale\" Hernández", role:"Delantero"}
    ]},
    {years:"1973–1998", title:"Generación 70-90", players:[
      {name:"Fernando Quirarte", role:"Defensa"},
      {name:"Benjamín Galindo", role:"Mediocampista"},
      {name:"Ramón Ramírez", role:"Mediocampista"}
    ]},
    {years:"1999–2010", title:"Década dorada", players:[
      {name:"Ramón Morales", role:"Lateral"},
      {name:"Carlos Salcido", role:"Defensa"},
      {name:"Ramón Ramírez", role:"Mediocampista"},
      {name:"Omar Bravo", role:"Delantero"},
      {name:"Javier \"Chicharito\" Hernández", role:"Delantero"},
      {name:"Adolfo \"Bofo\" Bautista", role:"Delantero"}
    ]},
    {years:"2010–2026", title:"2010s a hoy", players:[
      {name:"Carlos Salcido", role:"Defensa"},
      {name:"Omar Bravo", role:"Delantero"},
      {name:"Adolfo \"Bofo\" Bautista", role:"Delantero"},
      {name:"Javier \"Chicharito\" Hernández", role:"Delantero"},
      {name:"Armando \"La Hormiga\" González", role:"Delantero"}
    ]}
  ];

  /* Carrete de fotos de plantel completo por década (también en "Épocas", debajo de las eras). */
  var teamPhotosAmerica = [
    {src:ERA_E60, year:"Años 60", label:"El plantel azulcrema de los años 60."},
    {src:ERA_E74, year:"1974", label:"Con Tena, Borja, Ortega, Reinoso y Pérez juntos en la foto oficial."},
    {src:ERA_E86, year:"1986", label:"La era de la playera con \"V\", a mitad de los 80."},
    {src:ERA_E94, year:"1994", label:"El uniforme de rombos, con Cuauhtémoc Blanco ya en el plantel."},
    {src:ERA_E2003, year:"2003", label:"Plantel de inicios de los 2000, con el Coca-Cola y la Águila Celeste presentes."},
    {src:ERA_E2013, year:"2013", label:"El América de la etapa Bimbo, ya en el estadio Azteca moderno."},
    {src:ERA_ETRI, year:"2023–2025", label:"La era del Tricampeonato con André Jardine en la banca."}
  ];

  var teamPhotosChivas = [
    {src:ERA_C_1949, year:"1949–1971", label:"El plantel de la era del Campeonísimo."},
    {src:ERA_C_87, year:"1987", label:"El Rebaño de finales de los 80."},
    {src:ERA_C_97, year:"1997", label:"Plantel de mediados de los 90, con el patrocinio Mexlub."},
    {src:ERA_C_2004, year:"2004", label:"Chivas de inicios de los 2000, con las mascotas del club en la foto."},
    {src:ERA_C_2006, year:"2006", label:"El plantel campeón del Apertura 2006."},
    {src:ERA_C_2010, year:"2010", label:"El Rebaño de inicios de la década de 2010."},
    {src:ERA_C_2017, year:"2017", label:"Plantel campeón de Liga MX del Apertura 2017."},
    {src:ERA_C_2026, year:"2026", label:"El plantel actual, con varios elementos convocados a Selección Nacional."}
  ];

  /* Jugadores que vistieron ambas camisetas (sección 05, "Cruzados").
       from   — "a" si salió de América hacia Chivas, "c" si fue al revés (Chivas → América);
                controla colores y el orden de las dos fotos en `photos`.
       route  — texto "Club origen → Club destino" que se muestra en el chip de la tarjeta.
       photos — [fotoDeSalida, fotoDeLlegada], en ese orden. */
  var crossovers = [
    {name:"Oribe Peralta", from:"a", route:"América → Chivas", year:"2019", body:"Ídolo azulcrema y medallista de oro olímpico con México en Londres 2012, cerró su carrera con el Rebaño.", photos:[PHOTO_CROSS_ORIBE_AME, PHOTO_CROSS_ORIBE_CHI]},
    {name:"Oswaldo Sánchez", from:"a", route:"América → Chivas", year:"1999", body:"Salió de la cantera americanista y se convirtió en portero histórico e ídolo de Chivas.", photos:[PHOTO_CROSS_OSWALDO_AME, PHOTO_CROSS_OSWALDO_CHI]},
    {name:"Ramón Ramírez", from:"c", route:"Chivas → América", year:"1999", body:"Mediocampista querido en ambas aficiones, pieza clave en los 90.", photos:[PHOTO_CROSS_RAMON_CHI, PHOTO_CROSS_RAMON_AME]},
    {name:"Rodolfo Cota", from:"c", route:"Chivas → América", year:"2024", body:"Portero campeón con Chivas en el Clausura 2017; tras su paso por León, llegó al América en 2024 como el segundo guardameta en vestir ambas camisetas.", photos:[PHOTO_CROSS_COTA_CHI, PHOTO_CROSS_COTA_AME]},
    {name:"Ricardo Peláez", from:"a", route:"América → Chivas", year:"1998", body:"Delantero y después directivo, cruzó de la capital a Guadalajara a fin de siglo.", photos:[PHOTO_CROSS_PELAEZ_AME, PHOTO_CROSS_PELAEZ_CHI]},
    {name:"Joel Sánchez", from:"c", route:"Chivas → América", year:"1999", body:"Uno de varios traspasos directos entre ambos clubes en la década de los noventa.", photos:[PHOTO_CROSS_JOELSANCHEZ_CHI, PHOTO_CROSS_JOELSANCHEZ_AME]},
    {name:"Jesús Mendoza", from:"c", route:"Chivas → América", year:"2000", body:"Completó el llamado \"puente\" de fichajes entre Guadalajara y la capital en ese periodo.", photos:[PHOTO_CROSS_MENDOZA_CHI, PHOTO_CROSS_MENDOZA_AME]},
    {name:"Javier Aguirre", from:"a", route:"América → Chivas", year:"1987", body:"Campeón con América en 1983-84; cerró su carrera de jugador en Chivas antes de convertirse en uno de los técnicos mexicanos más reconocidos en el mundo.", photos:[PHOTO_CROSS_AGUIRRE_AME, PHOTO_CROSS_AGUIRRE_CHI]},
    {name:"Carlos Hermosillo", from:"a", route:"América → Chivas", year:"2001", body:"Uno de los máximos goleadores históricos de la Liga MX; cerró su carrera en Chivas en 2001 tras pasar por América, Atlante y Cruz Azul.", photos:[PHOTO_CROSS_HERMOSILLO_AME, PHOTO_CROSS_HERMOSILLO_CHI]},
    {name:"Jesús Molina", from:"a", route:"América → Chivas", year:"2019", body:"Mediocampista de cantera americanista; en 2019 fichó por Chivas, donde llegó a ser capitán del equipo.", photos:[PHOTO_CROSS_MOLINA_AME, PHOTO_CROSS_MOLINA_CHI]},
    {name:"Ángel Reyna", from:"a", route:"América → Chivas", year:"2014", body:"Campeón de goleo con América en el Clausura 2011; en 2014 llegó a Chivas, aunque las lesiones limitaron su paso por Guadalajara.", photos:[PHOTO_CROSS_REYNA_AME, PHOTO_CROSS_REYNA_CHI]},
    {name:"Francisco Javier \"Maza\" Rodríguez", from:"c", route:"Chivas → América", year:"2013", body:"El primer jugador campeón tanto con Chivas (2006) como con América (2013), en un fichaje que rompió con la tradición histórica del Rebaño.", photos:[PHOTO_CROSS_MAZA_CHI, PHOTO_CROSS_MAZA_AME]},
    {name:"Enrique Vázquez del Mercado", from:"c", route:"Chivas → América", year:"1969", body:"Uno de los traspasos directos más antiguos documentados entre ambos clubes.", photos:[PHOTO_CROSS_VAZQUEZ_CHI, PHOTO_CROSS_VAZQUEZ_AME]},
    {name:"Rafael Márquez Lugo", from:"a", route:"América → Chivas", year:"2012", body:"Delantero que llegó a préstamo al América en 2008; encontró su mejor momento como goleador de Chivas entre 2012 y 2014.", photos:[PHOTO_CROSS_MARQUEZLUGO_AME, PHOTO_CROSS_MARQUEZLUGO_CHI]},
    {name:"Cristian \"Chicote\" Calderón", from:"c", route:"Chivas → América", year:"2024", body:"Lateral izquierdo y autor de goles históricos ante el América con la playera de Chivas; en 2024 fichó por las Águilas, con quienes se coronó bicampeón.", photos:[PHOTO_CROSS_CALDERON_CHI, PHOTO_CROSS_CALDERON_AME]},
    {name:"Alejandro Zendejas", from:"c", route:"Chivas → América", year:"2022", body:"Debutó con Chivas en 2016; desde su llegada al América en 2022 se consolidó como una de sus figuras y repitió la hazaña del \"Maza\" Rodríguez de ser campeón con ambos clubes.", photos:[PHOTO_CROSS_ZENDEJAS_CHI, PHOTO_CROSS_ZENDEJAS_AME]}
  ];

  /* Carrete de partidos/jugadas memorables (sección 06, "Jugadas"), en orden cronológico.
     `club` marca de qué lado se cuenta/celebra la jugada (color del borde superior de la tarjeta). */
  var plays = [
    {score:"7-2", date:"20 feb 1944", club:"ame", title:"La primera goleada", body:"América arrolla a Guadalajara apenas un mes después de su primer duelo de liga.", photo:PHOTO_PLAY_1944},
    {score:"2-0", date:"5 ago 1959", club:"ame", title:"\"Eso es rutina\"", body:"La frase de Fernando Marcos tras este triunfo detona la rivalidad tal como la conocemos.", photo:PHOTO_PLAY_1959A},
    {score:"2-0", date:"12 nov 1959", club:"chi", title:"La respuesta rojiblanca", body:"Semanas después, Chivas responde en la cancha a la provocación americanista.", photo:PHOTO_PLAY_1959B},
    {score:"0-3", date:"1982-83", club:"chi", title:"La batalla campal", body:"Semifinal ganada por Chivas en el Azteca, con una trifulca de más de diez minutos al final del partido.", photo:PHOTO_PLAY_1982},
    {score:"5-3", date:"1983-84", club:"ame", title:"La única final entre ambos", body:"Ida 2-2; América se corona campeón en el marcador global, con atajada de penal de Zelada.", photo:PHOTO_PLAY_1983},
    {score:"4-3", date:"1993-94", club:"ame", title:"El partido de los 90", body:"En el Jalisco, un joven Cuauhtémoc Blanco anota el gol decisivo ante Kalusha y Ramón Ramírez.", photo:PHOTO_PLAY_1993},
    {score:"5-0", date:"Invierno 1996", club:"chi", title:"La goleada que costó un puesto", body:"Chivas humilla al América; Ricardo La Volpe pierde la dirección técnica azulcrema tras el resultado.", photo:PHOTO_PLAY_1996},
    {score:"3-3", date:"Clausura 2005", club:"chi", title:"Un partido de antología", body:"Golazo de Héctor Reynoso, doblete de Paco Palencia y atajada decisiva de Guillermo Ochoa.", photo:PHOTO_PLAY_2005},
    {score:"0-3", date:"27 ago 2016", club:"chi", title:"El Centenario arruinado", body:"En pleno festejo por los 100 años del club, Chivas opaca la fiesta americanista en el Azteca con un doblete de Isaac \"Conejo\" Brizuela.", photo:PHOTO_PLAY_2016},
    {score:"1-0", date:"26 nov 2020", club:"chi", title:"El Chicotazo", body:"Cristian \"Chicote\" Calderón sentencia la ida de cuartos de final con un disparo de media distancia que Ochoa no puede detener.", photo:PHOTO_PLAY_2020},
    {score:"1-0", date:"Clausura 2026", club:"chi", title:"El más reciente", body:"Gol de Armando \"La Hormiga\" González; sexta victoria consecutiva de Chivas en el torneo.", photo:PHOTO_PLAY_2026}
  ];

  /* Preguntas del quiz (sección 10). `correct` es el índice (base 0) dentro de `opts`. */
  var quiz = [
    {q:"¿En qué año se fundó Chivas?", opts:["1906","1916","1943","1959"], correct:0},
    {q:"¿Cuál fue el resultado del primer partido oficial entre ambos, en la Copa México de 1943?", opts:["7-2 América","1-0 Guadalajara","3-3","2-0 América"], correct:1},
    {q:"¿Quién es el máximo goleador histórico del Clásico Nacional?", opts:["Cuauhtémoc Blanco","Omar Bravo","Salvador Reyes","Luis \"Zague\" Alves"], correct:2},
    {q:"En el historial acumulado a 2025, ¿quién tiene más victorias?", opts:["Chivas","Están empatados","América","Nunca se han enfrentado"], correct:2},
    {q:"¿Quién impulsó el cambio de imagen a \"Águilas\" en 1981?", opts:["Jorge Vergara","Emilio Díez Barroso","Guillermo Cañedo","Emilio Azcárraga"], correct:1},
    {q:"La única final de Liga MX entre América y Chivas se jugó en la temporada...", opts:["1993-94","1996","1983-84","2005"], correct:2},
    {q:"¿Cómo se llama la mascota histórica de Chivas?", opts:["Rebaño Feroz","Chiva Loca","El Tapatío","Cabrito"], correct:1},
    {q:"¿Qué distingue históricamente a Chivas de todos los demás clubes de la Liga MX?", opts:["Nunca jugar de visitante en lunes","Alinear solo jugadores nacidos en México","No tener patrocinador en el uniforme","Jugar siempre los domingos"], correct:1}
  ];

  /* Fuentes periodísticas citadas en el pie de página (footer > #sources). */
  var sources = [
    {t:"Historial completo (FutDados)", u:"https://futdados.com/mx/historial-america-vs-chivas/"},
    {t:"Quién ha ganado más Clásicos (Olympics.com)", u:"https://www.olympics.com/es/noticias/quien-ganado-mas-clasicos-america-chivas-historial"},
    {t:"Origen de la rivalidad (sopitas.com)", u:"https://www.sopitas.com/deportes/primeros-duelos-america-vs-chivas-asi-nacio-rivalidad/"},
    {t:"Partidos más memorables (TUDN)", u:"https://www.tudn.com/futbol/liga-mx/clasico-america-vs-chivas-los-partidos-mas-memorables-de-la-historia"},
    {t:"Máximo goleador del Clásico (Azteca Jalisco)", u:"https://www.aztecajalisco.com/deportes/maximo-goleador-del-clasico-nacional-el-record-historico-que-america-y-chivas"},
    {t:"Jugadores en Chivas y América (ClaroSports)", u:"https://www.clarosports.com/futbol/liga-mx/futbolistas-que-han-jugado-en-chivas-y-america-en-la-historia-del-futbol-mexicano/"},
    {t:"10 ídolos del América (90min)", u:"https://www.90min.com/es/posts/los-10-maximos-idolos-en-la-historia-del-america"},
    {t:"Chivas cumple 120 años (Infobae)", u:"https://www.infobae.com/mexico/deportes/2026/05/08/chivas-cumple-120-anos-historia-titulos-y-leyendas-del-club-mas-mexicano-del-futbol/"},
    {t:"Resultado Clausura 2026 (El Universal)", u:"https://www.eluniversal.com.mx/deportes/chivas-derrota-al-america-en-el-clasico-nacional-y-consigue-su-sexta-victoria-consecutiva/"},
    {t:"Títulos de Liga del América (Bolavip)", u:"https://bolavip.com/mx/ligamx/cuantos-titulos-de-liga-mx-tiene-america-en-su-historia"},
    {t:"Origen del apodo \"Águilas\" (Infobae)", u:"https://www.infobae.com/mexico/2023/12/17/por-que-al-club-america-le-dicen-aguilas-este-el-origen-del-famoso-apodo-del-equipo-azulcrema/"},
    {t:"Himno del América (Águilas Monumental)", u:"https://americamonumental.bolavip.com/noticias/Himno-del-America-Quien-lo-escribio-y-que-dice-la-letra-20220712-0015.html"},
    {t:"Himno de Chivas (Wikipedia)", u:"https://es.wikipedia.org/wiki/Himno_del_Club_Deportivo_Guadalajara"},
    {t:"Récord de asistencia (Excélsior)", u:"https://www.excelsior.com.mx/adrenalina/america-y-chivas-rompen-record-de-asistencia/1268707"},
    {t:"Capacidad Estadio Akron", u:"https://estadioakron.mx/Infraestructura"}
  ];

  /* ==========================================================================
     3. RENDER — vuelca cada arreglo de arriba dentro de su contenedor en el HTML
     ========================================================================== */

  /* ---------------- RENDER: línea de tiempo (sección 01) ---------------- */
  var tlEl = document.getElementById("timeline");
  timeline.forEach(function(item){
    var div = document.createElement("div");
    div.className = "t-item " + (item.club === "chi" ? "chi" : "ame");
    div.innerHTML = "<div class='t-date mono'>" + item.year + "</div><h3>" + item.title + "</h3><p>" + item.body + "</p>";
    tlEl.appendChild(div);
  });

  /* ---------------- RENDER: tarjetas de leyendas (sección 03) ---------------- */
  /* Ordena cada lista de leyendas por grupo de posición (porteros → defensas → medios →
     delanteros) e inserta una etiqueta de grupo (.legend-group-label) cada vez que cambia.
     Si un grupo termina con un número impar de tarjetas, la última se marca como .legend-solo
     para que el CSS la centre ocupando el ancho completo de la fila (ver .card-grid en styles.css). */
  var legendPosRank = {GK:0, DF:1, FB:1, MF:2, FW:3};
  var legendPosLabel = {GK:"Porteros", DF:"Defensas", FB:"Defensas", MF:"Medios", FW:"Delanteros"};
  function renderLegends(list, containerId, club){
    var el = document.getElementById(containerId);
    var sorted = list.slice().sort(function(a, b){
      var ra = legendPosRank.hasOwnProperty(a.pos) ? legendPosRank[a.pos] : 9;
      var rb = legendPosRank.hasOwnProperty(b.pos) ? legendPosRank[b.pos] : 9;
      return ra - rb;
    });
    var lastGroup = null;
    var cardsInGroup = 0;
    var lastBtn = null;
    sorted.forEach(function(l, i){
      var group = legendPosLabel.hasOwnProperty(l.pos) ? legendPosLabel[l.pos] : "Otros";
      if (group !== lastGroup){
        // Cambio de grupo: si el grupo anterior cerró con número impar de tarjetas,
        // la última se vuelve "solo" (ocupa la fila completa, centrada) antes de seguir.
        if (lastBtn && cardsInGroup % 2 === 1){ lastBtn.classList.add("legend-solo"); }
        var labelEl = document.createElement("div");
        labelEl.className = "legend-group-label";
        labelEl.textContent = group;
        el.appendChild(labelEl);
        lastGroup = group;
        cardsInGroup = 0;
      }
      cardsInGroup++;
      // Cada leyenda es un <button> con dos caras internas (frente/reverso) que
      // se voltean en 3D solo con CSS al alternar la clase .flipped (ver styles.css).
      var btn = document.createElement("button");
      btn.className = "legend-card";
      btn.type = "button";
      btn.setAttribute("data-club", club);
      btn.setAttribute("aria-pressed", "false");
      var frontMedia = l.photo
        ? "<img class='legend-photo' src='" + l.photo + "' alt='" + l.name + "'>"
        : "<span class='legend-mono'>" + l.mono + "</span>";
      btn.innerHTML =
        "<span class='legend-inner'>" +
          "<span class='legend-face legend-front'>" +
            frontMedia +
            "<span class='legend-name'>" + l.name + "</span>" +
            "<span class='legend-role'>" + l.role + "</span>" +
            "<span class='legend-hint'>toca para ver bio</span>" +
          "</span>" +
          "<span class='legend-face legend-back'>" +
            "<span class='legend-stats'>" + l.stats + "</span>" +
            "<span class='legend-bio'>" + l.bio + "</span>" +
          "</span>" +
        "</span>";
      btn.addEventListener("click", function(){
        var flipped = btn.classList.toggle("flipped");
        btn.setAttribute("aria-pressed", flipped ? "true" : "false");
      });
      el.appendChild(btn);
      lastBtn = btn;
      // Si la última tarjeta de todas cierra un grupo impar, también se marca "solo".
      if (i === sorted.length - 1 && cardsInGroup % 2 === 1){ btn.classList.add("legend-solo"); }
    });
  }
  renderLegends(legendsAmerica, "legends-america", "america");
  renderLegends(legendsChivas, "legends-chivas", "chivas");

  /* ---------------- RENDER: planteles por época y álbum de fotos (sección 04) ---------------- */
  function renderEras(list, containerId){
    var el = document.getElementById(containerId);
    list.forEach(function(era){
      var card = document.createElement("div");
      card.className = "era-card";
      var playersHtml = era.players.map(function(p){
        return "<span class='era-player'>" + p.name + "<small>" + p.role + "</small></span>";
      }).join("");
      card.innerHTML =
        "<div class='era-years mono'>" + era.years + "</div>" +
        "<h4 class='era-title'>" + era.title + "</h4>" +
        (era.note ? "<p class='era-note'>" + era.note + "</p>" : "") +
        "<div class='era-players'>" + playersHtml + "</div>";
      el.appendChild(card);
    });
  }
  renderEras(erasAmerica, "eras-america");
  renderEras(erasChivas, "eras-chivas");

  function renderTeamPhotos(list, containerId){
    var el = document.getElementById(containerId);
    if(!el) return;
    list.forEach(function(p){
      var card = document.createElement("div");
      card.className = "team-photo-card";
      // loading="lazy": el navegador solo descarga la imagen cuando está por entrar
      // en pantalla, para no cargar de una vez las ~15 fotos de plantel de esta sección.
      card.innerHTML =
        "<img src='" + p.src + "' alt='Plantel del América, " + p.year + "' loading='lazy'>" +
        "<div class='team-photo-cap'><b>" + p.year + "</b>" + p.label + "</div>";
      el.appendChild(card);
    });
  }
  renderTeamPhotos(teamPhotosAmerica, "team-photos-america");
  renderTeamPhotos(teamPhotosChivas, "team-photos-chivas");

  /* ---------------- RENDER: escudos oficiales ---------------- */
  /* Cualquier <img data-crest="ame"> o <img data-crest="chi"> en toda la página (topbar, hero,
     encabezados de columna, cultura, lineup toggle...) recibe aquí su src real. Así el HTML no
     tiene que repetir la ruta del escudo decenas de veces. */
  document.querySelectorAll("img[data-crest]").forEach(function(img){
    img.src = img.getAttribute("data-crest") === "ame" ? CREST_AME : CREST_CHI;
  });

  /* ---------------- RENDER: mascotas (sección 08) ---------------- */
  /* Mismo patrón que los escudos: los <img data-mascot="..."> del HTML se llenan aquí
     buscando la clave en este pequeño diccionario. */
  var mascotPhotos = {
    "ame-agui": PHOTO_MASCOT_AME_AGUI,
    "ame-celeste": PHOTO_MASCOT_AME_CELESTE,
    "ame-new": PHOTO_MASCOT_AME_NEW,
    "chi-fighter": PHOTO_MASCOT_CHI_FIGHTER,
    "chi-loca": PHOTO_MASCOT_CHI_LOCA,
    "chi-rasta": PHOTO_MASCOT_CHI_RASTA
  };
  document.querySelectorAll("img[data-mascot]").forEach(function(img){
    var key = img.getAttribute("data-mascot");
    if(mascotPhotos[key]) img.src = mascotPhotos[key];
  });

  /* "El volado de siempre": tocar la moneda del hero pausa/reanuda su giro (la animación
     misma vive en CSS, aquí solo se alterna la clase .paused). */
  var heroCoin = document.getElementById("hero-coin");
  if(heroCoin){
    heroCoin.addEventListener("click", function(){
      heroCoin.classList.toggle("paused");
    });
  }

  /* ---------------- RENDER: cruzados (sección 05) ---------------- */
  /* Por cada jugador con dos fotos, arma un botón con dos <img> superpuestas en 3D
     (misma técnica de flip que las legend-cards, pero circular): la foto "de salida" al
     frente y la "de llegada" detrás, pre-rotada 180°. Al tocar el botón se alterna .flipped
     y también se actualiza el texto de ayuda (cross-photo-hint) y el aria-label, para que
     siempre digan con qué club se vería la foto si se vuelve a tocar. */
  var crossEl = document.getElementById("cross-grid");
  crossovers.forEach(function(c){
    var div = document.createElement("div");
    div.className = "cross-card";
    var photosHtml = "";
    if(c.photos && c.photos.length === 2){
      var startClass = c.from === "a" ? "cross-photo-ame" : "cross-photo-chi";
      var endClass = c.from === "a" ? "cross-photo-chi" : "cross-photo-ame";
      var startClubName = c.from === "a" ? "América" : "Chivas";
      var endClubName = c.from === "a" ? "Chivas" : "América";
      photosHtml =
        "<button class='cross-photo-flip' type='button' data-start-club='" + startClubName + "' data-end-club='" + endClubName + "' aria-label='Toca para ver la foto con " + endClubName + "'>" +
          "<span class='cross-photo-inner'>" +
            "<img class='cross-photo-face " + startClass + "' src='" + c.photos[0] + "' alt=''>" +
            "<img class='cross-photo-face cross-photo-back " + endClass + "' src='" + c.photos[1] + "' alt=''>" +
          "</span>" +
        "</button>" +
        "<span class='cross-photo-hint'>👆 toca la foto para verlo con " + endClubName + "</span>";
    }
    div.innerHTML =
      photosHtml +
      "<span class='cross-chip'><span class='" + (c.from === "a" ? "from-a" : "from-c") + "'>" + c.route + "</span> · " + c.year + "</span>" +
      "<h3>" + c.name + "</h3><p>" + c.body + "</p>";
    crossEl.appendChild(div);
  });
  crossEl.querySelectorAll(".cross-photo-flip").forEach(function(btn){
    btn.addEventListener("click", function(){
      btn.classList.toggle("flipped");
      var isFlipped = btn.classList.contains("flipped");
      var startClub = btn.getAttribute("data-start-club");
      var endClub = btn.getAttribute("data-end-club");
      // Si ya está volteado, el próximo toque regresa a la foto de salida (startClub);
      // si no, el próximo toque muestra la de llegada (endClub). El texto/aria-label
      // siempre anuncia el club que SE VERÍA al volver a tocar, no el que se ve ahora.
      var nextClub = isFlipped ? startClub : endClub;
      btn.setAttribute("aria-label", "Toca para ver la foto con " + nextClub);
      var hint = btn.nextElementSibling;
      if(hint && hint.classList.contains("cross-photo-hint")){
        hint.textContent = "👆 toca la foto para verlo con " + nextClub;
      }
    });
  });

  /* ---------------- RENDER: carrete de jugadas (sección 06) ---------------- */
  var reelEl = document.getElementById("reel");
  plays.forEach(function(p){
    var div = document.createElement("div");
    div.className = "play-card " + (p.club === "chi" ? "chi" : "");
    div.innerHTML =
      (p.photo ? "<img class='play-photo' src='" + p.photo + "' alt=''>" : "") +
      "<div class='play-date'>" + p.date + "</div>" +
      "<div class='play-score mono'>" + p.score + "</div>" +
      "<div class='play-title'>" + p.title + "</div>" +
      "<div class='play-body'>" + p.body + "</div>";
    reelEl.appendChild(div);
  });

  /* ==========================================================================
     4. LINEUP BUILDER — cancha interactiva "Arma tu Once Ideal" (sección 07)
     ========================================================================== */

  /* Formación fija en 3-3-4-1 de arriba (ataque) hacia abajo (portería):
       rows[0] = 3 delanteros, rows[1] = 3 medios, rows[2] = 4 defensas, rows[3] = 1 portero.
     No es una formación real de futbol (un 3-3-4-1 no existe como táctica): se eligió nada
     más para tener espacio suficiente y repartir a las leyendas disponibles por posición. */
  var rows = [3,3,4,1]; // top (far/attack) to bottom (near/own goal): delanteros, medios, defensas, portero
  var rowLabels = ["Delanteros","Medios","Defensas","Portero"];
  var posGroupOrder = ["GK","DF","MF","FW"]; // orden en que se listan los grupos en el pool
  var posGroupLabel = {GK:"Porteros", DF:"Defensas", MF:"Medios", FW:"Delanteros"};
  function posGroupOf(pos){ return pos === "FB" ? "DF" : pos; } // los laterales (FB) se agrupan visualmente con los defensas centrales
  function tipFor(l){ return l.stats + " — " + l.bio; } // texto del tooltip (data-tip) al pasar el mouse sobre un chip del pool

  /* Estado en memoria de la cancha: 11 casillas por club (por índice de posición dentro de
     `rows`, aplanado en orden: 0-2 delanteros, 3-5 medios, 6-9 defensas, 10 portero), cada una
     con el nombre de la leyenda colocada o null si está vacía. `celebrated` evita repetir el
     sonido/mensaje de festejo si ya se completaron los 11 puestos. */
  var state = {
    america: {slots:new Array(11).fill(null), celebrated:false},
    chivas: {slots:new Array(11).fill(null), celebrated:false}
  };
  var activeClub = "america"; // club actualmente mostrado en la cancha (cambia con .lineup-toggle)
  var selectedChip = null;    // nombre de la leyenda elegida en el pool, en espera de tocar un puesto

  var pitchEl = document.getElementById("pitch");
  var poolEl = document.getElementById("pool");
  var noteEl = document.getElementById("lineup-note");
  var toastEl = document.getElementById("lineup-toast");
  var replayBtn = document.getElementById("lineup-replay");
  replayBtn.addEventListener("click", function(){ playClubSound(activeClub); });

  /* Sonido de celebración al completar la alineación (uno distinto por club). */
  var soundAme = new Audio(SOUND_AME);
  var soundChi = new Audio(SOUND_CHI);
  function playClubSound(club){
    try{
      var snd = club === "america" ? soundAme : soundChi;
      snd.currentTime = 0;
      var p = snd.play();
      if(p && p.catch){ p.catch(function(){ /* autoplay bloqueado por el navegador, sin problema */ }); }
    } catch(e){ /* Audio no disponible, seguimos sin sonido */ }
  }

  function legendsFor(club){ return club === "america" ? legendsAmerica : legendsChivas; }
  function findLegend(club, name){
    var list = legendsFor(club);
    for(var i=0;i<list.length;i++){ if(list[i].name === name) return list[i]; }
    return null;
  }

  /* Construye desde cero el contenido de #pitch: una fila (.pitch-group) por cada elemento de
     `rows`, con su etiqueta (Delanteros/Medios/...) y sus botones .slot (uno por puesto).
     Un puesto ocupado muestra el círculo con la foto de la leyenda y su nombre debajo; uno
     vacío solo muestra un "+". Al terminar, llama a drawPitchMarkings() para redibujar las
     líneas de la cancha según el tamaño real que acaba de quedar. */
  function buildPitch(){
    pitchEl.innerHTML = "";
    pitchEl.setAttribute("data-active-club", activeClub); // el CSS usa este atributo para pintar los puestos ocupados con los colores del club activo
    var slotIndex = 0;
    rows.forEach(function(count, rowIdx){
      var groupEl = document.createElement("div");
      groupEl.className = "pitch-group";
      var labelEl = document.createElement("div");
      labelEl.className = "pitch-row-label";
      labelEl.textContent = rowLabels[rowIdx];
      groupEl.appendChild(labelEl);
      var rowEl = document.createElement("div");
      rowEl.className = "pitch-row";
      for(var i=0;i<count;i++){
        // IIFE para capturar el valor correcto de `idx` en el listener de click de cada botón
        // (si solo usáramos slotIndex directo, todos los botones terminarían compartiendo el
        // último valor del contador al momento de hacer click).
        (function(idx){
          var slot = document.createElement("button");
          slot.type = "button";
          slot.className = "slot";
          slot.setAttribute("data-idx", idx);
          var occupant = state[activeClub].slots[idx];
          if(occupant){
            slot.classList.add("filled");
            var occLegend = findLegend(activeClub, occupant);
            var photoHtml = occLegend && occLegend.photo
              ? "<img class='slot-photo' src='" + occLegend.photo + "' alt=''>"
              : "";
            slot.innerHTML = "<span class='slot-content'><span class='slot-badge'>" + photoHtml + "</span><span class='slot-name'>" + occupant + "</span></span>";
            if(occLegend){ slot.title = tipFor(occLegend); } // tooltip nativo del navegador con stats + bio
          } else {
            slot.innerHTML = "<span class='slot-content'><span class='slot-badge'>+</span></span>";
          }
          slot.addEventListener("click", function(){ onSlotClick(idx); });
          rowEl.appendChild(slot);
        })(slotIndex);
        slotIndex++;
      }
      groupEl.appendChild(rowEl);
      pitchEl.appendChild(groupEl);
    });
    drawPitchMarkings();
  }

  /* Dibuja las líneas de la cancha (línea de medio campo, círculo central, áreas grande/chica,
     arcos de penal y de esquina) como un <svg> insertado dentro de #pitch.

     Por qué se calcula en JS en vez de ser una imagen de fondo fija: el alto de cada fila
     (.pitch-group) varía según cuántas líneas ocupa el nombre más largo colocado en ella, y
     en pantallas angostas los círculos de jugador se encogen (ver clamp() en .slot dentro de
     styles.css). Una sola imagen de fondo con proporciones fijas se desalinea apenas cambia
     cualquiera de esas dos cosas. Aquí, en cambio, se miden las posiciones reales ya renderizadas
     (offsetTop/offsetHeight, que no se ven afectados por el rotateX() de la cancha, a diferencia
     de getBoundingClientRect()) y se arma un SVG con viewBox exacto a esas medidas — así las
     líneas siempre caen donde deben, sea cual sea el tamaño de pantalla o el estado de la cancha.

     Se vuelve a llamar cada vez que buildPitch() reconstruye la cancha, y también al cambiar
     el tamaño de la ventana (ver el listener de "resize" más abajo). */
  function drawPitchMarkings(){
    var groups = pitchEl.querySelectorAll(".pitch-group");
    if(groups.length < 4) return; // seguridad: si la cancha aún no tiene las 4 filas, no dibuja nada
    var delanterosRow = groups[0].querySelector(".pitch-row");
    var mediosGroup = groups[1];
    var defensasGroup = groups[2];
    var porteroGroup = groups[3];
    var porteroRow = porteroGroup.querySelector(".pitch-row");

    var pitchW = pitchEl.offsetWidth;
    var pitchH = pitchEl.offsetHeight;
    if(!pitchW || !pitchH) return;

    // Puntos de referencia verticales tomados del layout real ya renderizado.
    var delRowBottom = delanterosRow.offsetTop + delanterosRow.offsetHeight;
    var mediosBottom = mediosGroup.offsetTop + mediosGroup.offsetHeight;
    var defensasTop = defensasGroup.offsetTop;
    var halfwayY = (mediosBottom + defensasTop) / 2; // línea de medio campo: a la mitad del hueco entre medios y defensas
    var porteroLabelTop = porteroGroup.offsetTop;
    var porteroRowBottom = porteroRow.offsetTop + porteroRow.offsetHeight;

    var topBoxTop = 8;
    var topBoxBottom = delRowBottom + 20;      // el área grande de arriba envuelve la fila de delanteros
    var bottomBoxBottom = pitchH - 8;
    var bottomBoxTop = porteroLabelTop - 12;   // el área grande de abajo envuelve la etiqueta+fila del portero

    // Anchos de las áreas y el círculo central, todos proporcionales al ancho real de la cancha.
    var boxHalfW = pitchW * 0.30;
    var cx = pitchW / 2;
    var boxLeft = cx - boxHalfW;
    var boxRight = cx + boxHalfW;
    var sixHalfW = pitchW * 0.14;
    var sixLeft = cx - sixHalfW;
    var sixRight = cx + sixHalfW;
    var sixDepth = Math.min(24, (topBoxBottom - topBoxTop) * 0.4);
    var arcR = Math.max(18, pitchW * 0.16);
    // El radio del círculo central se limita también por el espacio real disponible entre
    // medios y defensas, para que nunca se encime con esas filas en pantallas muy angostas.
    var circleR = Math.min(Math.max(26, pitchW * 0.09), (defensasTop - mediosBottom) / 2 + 34);
    var lineColor = "rgba(244,239,228,0.4)";

    var svg =
      "<svg class='pitch-markings' viewBox='0 0 " + pitchW + " " + pitchH + "' preserveAspectRatio='none' aria-hidden='true'>" +
      "<g fill='none' stroke='" + lineColor + "' stroke-width='1.5'>" +
        "<line x1='" + (pitchW*0.04) + "' y1='" + halfwayY + "' x2='" + (pitchW*0.96) + "' y2='" + halfwayY + "'/>" + /* línea de medio campo */
        "<circle cx='" + cx + "' cy='" + halfwayY + "' r='" + circleR + "'/>" + /* círculo central */
        "<circle cx='" + cx + "' cy='" + halfwayY + "' r='2.5' fill='" + lineColor + "'/>" + /* punto central */
        "<rect x='" + boxLeft + "' y='" + topBoxTop + "' width='" + (boxRight-boxLeft) + "' height='" + (topBoxBottom-topBoxTop) + "'/>" + /* área grande de arriba */
        "<rect x='" + sixLeft + "' y='" + topBoxTop + "' width='" + (sixRight-sixLeft) + "' height='" + sixDepth + "'/>" + /* área chica de arriba */
        "<path d='M " + (cx-arcR) + " " + topBoxBottom + " A " + arcR + " " + arcR + " 0 0 1 " + (cx+arcR) + " " + topBoxBottom + "'/>" + /* arco del área de arriba */
        "<rect x='" + boxLeft + "' y='" + bottomBoxTop + "' width='" + (boxRight-boxLeft) + "' height='" + (bottomBoxBottom-bottomBoxTop) + "'/>" + /* área grande de abajo (portería) */
        "<rect x='" + sixLeft + "' y='" + (bottomBoxBottom-sixDepth) + "' width='" + (sixRight-sixLeft) + "' height='" + sixDepth + "'/>" + /* área chica de abajo */
        "<path d='M " + (cx-arcR) + " " + bottomBoxTop + " A " + arcR + " " + arcR + " 0 0 0 " + (cx+arcR) + " " + bottomBoxTop + "'/>" + /* arco del área de abajo */
        "<path d='M " + (pitchW*0.02) + " " + (pitchH*0.02+16) + " A 14 14 0 0 0 " + (pitchW*0.02+16) + " " + (pitchH*0.02) + "'/>" + /* arco de esquina sup. izq. */
        "<path d='M " + (pitchW*0.98-16) + " " + (pitchH*0.02) + " A 14 14 0 0 0 " + (pitchW*0.98) + " " + (pitchH*0.02+16) + "'/>" + /* arco de esquina sup. der. */
        "<path d='M " + (pitchW*0.98) + " " + (pitchH*0.98-16) + " A 14 14 0 0 0 " + (pitchW*0.98-16) + " " + (pitchH*0.98) + "'/>" + /* arco de esquina inf. der. */
        "<path d='M " + (pitchW*0.02+16) + " " + (pitchH*0.98) + " A 14 14 0 0 0 " + (pitchW*0.02) + " " + (pitchH*0.98-16) + "'/>" + /* arco de esquina inf. izq. */
      "</g></svg>";

    var old = pitchEl.querySelector(".pitch-markings");
    if(old) old.remove();
    pitchEl.insertAdjacentHTML("afterbegin", svg); // "afterbegin" para que quede detrás de las filas de puestos (z-order por orden en el DOM)
  }

  /* Construye la "banca" (#pool): todas las leyendas del club activo, agrupadas por posición.
     Las ya colocadas en la cancha aparecen tachadas (.used) y no se pueden volver a elegir;
     tocar una leyenda libre la marca como "seleccionada" (resaltada) en espera de que el
     usuario toque un puesto vacío en la cancha (ver onSlotClick). */
  function buildPool(){
    poolEl.innerHTML = "";
    var used = state[activeClub].slots.filter(Boolean);
    var list = legendsFor(activeClub);
    posGroupOrder.forEach(function(groupKey){
      var groupPlayers = list.filter(function(l){ return posGroupOf(l.pos) === groupKey; });
      if(!groupPlayers.length) return;
      var labelEl = document.createElement("div");
      labelEl.className = "pool-group-label";
      labelEl.textContent = posGroupLabel[groupKey];
      poolEl.appendChild(labelEl);
      groupPlayers.forEach(function(l){
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip";
        var chipPhotoHtml = l.photo ? "<img class='chip-photo' src='" + l.photo + "' alt=''>" : "";
        chip.innerHTML = chipPhotoHtml + "<span>" + l.name + "</span>";
        chip.setAttribute("data-tip", tipFor(l)); // el CSS muestra este texto como tooltip al pasar el mouse (ver .chip[data-tip]:hover::after)
        var isUsed = used.indexOf(l.name) !== -1;
        if(isUsed){ chip.classList.add("used"); }
        if(selectedChip === l.name){ chip.classList.add("selected"); }
        chip.addEventListener("click", function(){
          if(isUsed) return;
          // Tocar el chip ya seleccionado lo deselecciona; tocar otro libre lo selecciona.
          selectedChip = (selectedChip === l.name) ? null : l.name;
          buildPool();
        });
        poolEl.appendChild(chip);
      });
    });
  }

  /* Click en un puesto de la cancha:
       - si ya tenía a alguien, lo quita (y cancela el estado de "festejado", por si el
         usuario deshace una alineación ya completa);
       - si está vacío y hay una leyenda seleccionada en el pool, la coloca ahí;
       - si está vacío y no hay nada seleccionado, solo muestra un aviso. */
  function onSlotClick(idx){
    var st = state[activeClub];
    if(st.slots[idx]){
      st.slots[idx] = null;
      st.celebrated = false;
      render();
      return;
    }
    if(selectedChip){
      st.slots[idx] = selectedChip;
      selectedChip = null;
      render();
      checkCompletion();
    } else {
      toastEl.textContent = "Primero elige una leyenda de la lista de abajo.";
      setTimeout(function(){ toastEl.textContent = ""; }, 2200);
    }
  }

  /* Revisa si los 11 puestos ya están llenos y, si es la primera vez para este club,
     dispara el sonido de celebración, muestra el botón "Escuchar otra vez" y un mensaje. */
  function checkCompletion(){
    var st = state[activeClub];
    var filled = st.slots.filter(Boolean).length;
    if(filled === 11 && !st.celebrated){
      st.celebrated = true;
      playClubSound(activeClub);
      replayBtn.hidden = false;
      toastEl.textContent = activeClub === "america"
        ? "¡Alineación completa! Suenan las Águilas 🦅"
        : "¡Alineación completa! Arriba las Chivas 🐐";
      setTimeout(function(){ toastEl.textContent = ""; }, 3400);
    }
  }

  /* Punto único de re-render: reconstruye cancha + banca y actualiza el texto de ayuda
     ("Cancha del América: 17 leyendas disponibles para 11 puestos..."). Se llama después de
     cualquier cambio de estado (colocar/quitar jugador, cambiar de club, limpiar cancha). */
  function render(){
    buildPitch();
    buildPool();
    replayBtn.hidden = !state[activeClub].celebrated;
    var total = legendsFor(activeClub).length;
    var bench = total - 11;
    var benchTxt = bench > 0 ? ("tendrás que dejar a " + bench + " en la banca") : "siempre queda un hueco libre";
    noteEl.textContent = (activeClub === "america" ? "Cancha del América: " : "Cancha de Chivas: ") +
      total + " leyendas disponibles para 11 puestos — " + benchTxt + ". Completa la alineación y escucha qué pasa.";
  }

  /* Botones "América"/"Chivas": cambian el club activo (cada uno guarda su propia cancha) y
     limpian cualquier selección pendiente del pool antes de volver a dibujar. */
  document.querySelectorAll(".lineup-toggle button").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll(".lineup-toggle button").forEach(function(b){
        b.classList.remove("active");
        b.setAttribute("aria-selected","false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected","true");
      activeClub = btn.getAttribute("data-club");
      selectedChip = null;
      render();
    });
  });

  document.getElementById("lineup-reset").addEventListener("click", function(){
    state[activeClub].slots = new Array(11).fill(null);
    state[activeClub].celebrated = false;
    selectedChip = null;
    render();
  });

  render(); // primer dibujado de la cancha al cargar la página

  /* Redibuja solo las líneas de la cancha (no hace falta reconstruir todo) cuando cambia el
     tamaño de la ventana. El debounce de 150ms evita recalcular en cada pixel mientras el
     usuario arrastra el borde de la ventana. */
  var pitchResizeTimer = null;
  window.addEventListener("resize", function(){
    clearTimeout(pitchResizeTimer);
    pitchResizeTimer = setTimeout(drawPitchMarkings, 150);
  });

  /* ==========================================================================
     5. QUIZ (sección 10) — una pregunta a la vez, con puntaje y resultado final
     ========================================================================== */
  var quizBox = document.getElementById("quiz-box");
  var qIndex = 0, score = 0, answered = false;

  /* Dibuja la pregunta actual (quiz[qIndex]) con sus opciones como botones. */
  function renderQuestion(){
    answered = false;
    var item = quiz[qIndex];
    quizBox.innerHTML =
      "<div class='quiz-progress'><span>PREGUNTA " + (qIndex+1) + " / " + quiz.length + "</span><span>PUNTAJE: " + score + "</span></div>" +
      "<div class='quiz-q'>" + item.q + "</div>" +
      "<div class='quiz-opts'></div>" +
      "<div class='quiz-next'></div>";
    var optsEl = quizBox.querySelector(".quiz-opts");
    item.opts.forEach(function(opt, i){
      var b = document.createElement("button");
      b.type = "button";
      b.className = "quiz-opt";
      b.textContent = opt;
      b.addEventListener("click", function(){ answerQuestion(i); });
      optsEl.appendChild(b);
    });
  }

  /* Marca la opción correcta en verde y, si el usuario falló, también la elegida en naranja;
     deshabilita todas las opciones y agrega el botón para pasar a la siguiente pregunta
     (o ver el resultado final, si era la última). */
  function answerQuestion(i){
    if(answered) return; // evita registrar una segunda respuesta a la misma pregunta
    answered = true;
    var item = quiz[qIndex];
    var opts = quizBox.querySelectorAll(".quiz-opt");
    opts.forEach(function(b, idx){
      b.disabled = true;
      if(idx === item.correct) b.classList.add("correct");
      else if(idx === i) b.classList.add("wrong");
    });
    if(i === item.correct) score++;
    var nextWrap = quizBox.querySelector(".quiz-next");
    var nextBtn = document.createElement("button");
    nextBtn.className = "btn primary";
    nextBtn.type = "button";
    nextBtn.textContent = (qIndex === quiz.length - 1) ? "Ver resultado" : "Siguiente";
    nextBtn.addEventListener("click", function(){
      qIndex++;
      if(qIndex >= quiz.length){ renderResult(); }
      else { renderQuestion(); }
    });
    nextWrap.appendChild(nextBtn);
    quizBox.querySelector(".quiz-progress").innerHTML =
      "<span>PREGUNTA " + (qIndex+1) + " / " + quiz.length + "</span><span>PUNTAJE: " + score + "</span>";
  }

  /* Texto del veredicto final según el puntaje obtenido (de 0 a quiz.length). */
  function verdictFor(s){
    if(s <= 3) return "Vas de refuerzo en el Clásico";
    if(s <= 6) return "Ya juegas de titular";
    return "Eres cronista del Clásico";
  }

  /* Pantalla de resultado final: puntaje, veredicto y botones para reintentar o copiar un
     texto resumen (con clipboard API moderna y, si no está disponible, un respaldo con
     document.execCommand("copy") sobre un <textarea> oculto). */
  function renderResult(){
    var text = "Saqué " + score + "/" + quiz.length + " en el quiz del Clásico Nacional 🦅🐐";
    quizBox.innerHTML =
      "<div class='quiz-result'>" +
        "<p class='eyebrow'>RESULTADO FINAL</p>" +
        "<div class='score mono'>" + score + "/" + quiz.length + "</div>" +
        "<div class='verdict'>" + verdictFor(score) + "</div>" +
        "<div style='display:flex;gap:.6rem;flex-wrap:wrap;justify-content:center;margin-top:.4rem;'>" +
          "<button class='btn primary' id='quiz-copy' type='button'>Copiar resultado</button>" +
          "<button class='btn' id='quiz-retry' type='button'>Reintentar</button>" +
        "</div>" +
        "<div class='quiz-toast' id='quiz-toast'></div>" +
      "</div>";
    document.getElementById("quiz-retry").addEventListener("click", function(){
      qIndex = 0; score = 0; renderQuestion();
    });
    document.getElementById("quiz-copy").addEventListener("click", function(){
      var toast = document.getElementById("quiz-toast");
      function done(ok){ toast.textContent = ok ? "Copiado ✓" : "No se pudo copiar automáticamente."; setTimeout(function(){ toast.textContent=""; }, 2500); }
      try{
        if(navigator.clipboard && window.isSecureContext){
          navigator.clipboard.writeText(text).then(function(){ done(true); }).catch(function(){ fallback(); });
        } else { fallback(); }
      } catch(e){ fallback(); }
      function fallback(){
        try{
          var ta = document.createElement("textarea");
          ta.value = text; ta.style.position="fixed"; ta.style.opacity="0";
          document.body.appendChild(ta); ta.focus(); ta.select();
          var ok = document.execCommand("copy");
          document.body.removeChild(ta);
          done(ok);
        } catch(e){ done(false); }
      }
    });
  }

  renderQuestion(); // dibuja la primera pregunta al cargar la página

  /* ==========================================================================
     6. Audio de estadio — ambiente de fondo automático, sin botón (sección global)
     ========================================================================== */
  var soundStadium = new Audio(SOUND_STADIUM);
  soundStadium.loop = true; // el clip dura unos 17s; en loop se escucha como ambiente continuo
  var stadiumAutoTried = false;

  function playStadium(){
    try{
      soundStadium.currentTime = 0;
      var p = soundStadium.play();
      if(p && p.catch){ p.catch(function(){ /* el navegador bloqueó el autoplay; se activará con la primera interacción */ }); }
    } catch(e){ /* Audio no disponible, seguimos sin sonido */ }
  }

  // Intento de reproducir el ambiente del estadio en cuanto se abre la página.
  playStadium();

  // La mayoría de navegadores bloquean el audio con sonido hasta que hay una
  // interacción del usuario. En cuanto detectamos la primera (clic, toque,
  // scroll o tecla) en cualquier parte de la página, lo intentamos una sola vez más
  // — así el usuario lo escucha automáticamente, sin necesidad de ningún botón.
  function stadiumAutoOnFirstInteraction(){
    if(stadiumAutoTried) return;
    stadiumAutoTried = true;
    if(soundStadium.paused){ playStadium(); }
    ["pointerdown","touchstart","keydown","scroll"].forEach(function(evt){
      document.removeEventListener(evt, stadiumAutoOnFirstInteraction);
    });
  }
  ["pointerdown","touchstart","keydown","scroll"].forEach(function(evt){
    document.addEventListener(evt, stadiumAutoOnFirstInteraction, { once:true, passive:true });
  });

  /* ==========================================================================
     7. Predicción (sección 11) y Fuentes (footer)
     ========================================================================== */
  var predictBox = document.getElementById("predict-box");
  var predictResultEl = document.getElementById("predict-result");
  var predictMessages = {
    america: "Le vas al Águila. Ya te imaginas el festejo en el Azteca — ojalá se cumpla.",
    empate: "Le tienes fe al reparto de puntos. Un Clásico así también deja sabor a poco.",
    chivas: "Le vas al Rebaño. Con cantera pura sí se puede, dices tú."
  };
  if(predictBox && predictResultEl){
    var predictOpts = predictBox.querySelectorAll(".predict-opt");
    predictOpts.forEach(function(btn){
      btn.addEventListener("click", function(){
        predictOpts.forEach(function(b){ b.classList.remove("picked"); });
        btn.classList.add("picked");
        var pick = btn.getAttribute("data-pick");
        predictResultEl.textContent = predictMessages[pick] || "";
        // Mismo sonido de festejo que se usa al completar el Once Ideal (playClubSound,
        // definida en la sección 4). "Empate" no tiene sonido propio, así que se queda callado.
        if(pick === "america" || pick === "chivas"){ playClubSound(pick); }
      });
    });
  }

  /* ---------------- Fuentes ---------------- */
  /* Genera los enlaces del pie de página a partir del arreglo `sources` de más arriba. */
  var srcEl = document.getElementById("sources");
  sources.forEach(function(s, i){
    var a = document.createElement("a");
    a.href = s.u; a.target = "_blank"; a.rel = "noopener";
    a.textContent = s.t;
    srcEl.appendChild(a);
  });

})();
