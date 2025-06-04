// SEGUNDO NIVEL - ÁREA DE ADSCRIPCIÓN
const areas = {
  "Dirección General": [
    "Dirección General"
  ],
  "Subdirección General de Administración": [
    "Subdirección General de Administración",
    "Gerencia de Personal",
    "Gerencia de Recursos Financieros",
    "Gerencia de Recursos Materiales",
    "Gerencia de Tecnología de la Información y Comunicaciones",
    "Gerencia de Innovación y Fortalecimiento Institucional",
    "Coordinación de Atención a Organismos Fiscalizadores"
  ],
  "Subdirección General de Administración del Agua": [
    "Gerencia de lo Contencioso",
    "Gerencia de Procedimientos Administrativos",
    "Gerencia de Descentralización y de Transparencia y Acceso a la Información Pública",
    "Subdirección General de Planeación",
    "Gerencia de Cooperación Internacional",
    "Gerencia de Planificación Hídrica",
    "Gerencia de Coordinación Interinstitucional",
    "Subdirección General Técnica",
    "Gerencia de Aguas Subterráneas",
    "Gerencia de Aguas Superficiales e Ingeniería de Ríos",
    "Gerencia del Consultivo Técnico",
    "Gerencia de Ingeniería y Asuntos Binacionales del Agua",
    "Gerencia de Calidad del Agua",
    "Coordinación General del Servicio Meteorológico Nacional",
    "Gerencia de Redes de Observación y Telemática",
    "Gerencia de Meteorología y Climatología",
    "Coordinación General de Recaudación y Fiscalización",
    "Coordinación General de Comunicación y Cultura del Agua",
    "Coordinación General de Atención de Emergencias y Consejos de Cuenca",
    "Gerencia de Protección a la Infraestructura y Atención de Emergencias",
    "Gerencia de Consejos de Cuenca",
    "Coordinación General de Proyectos Especiales de Abastecimiento y Saneamiento"
  ],
  "Subdirección General de Infraestructura Hidroagrícola": [
    "Gerencia de Ingeniería",
    "Gerencia de Construcción",
    "Gerencia de Agua Potable y Saneamiento",
    "Dirección General del Organismo de Cuenca",
    "Dirección de Administración",
    "Dirección de Administración del Agua",
    "Dirección del Registro Público de Derechos de Agua",
    "Dirección de Asuntos Jurídicos",
    "Dirección de Infraestructura Hidroagrícola",
    "Dirección de Agua Potable, Drenaje y Saneamiento",
    "Dirección de Planeación",
    "Dirección Técnica",
    "Dirección de Recaudación y Fiscalización",
    "Coordinación de Atención a Emergencias y Consejos de Cuenca",
    "Subdirección de Comunicación y Cultura del Agua",
    "Centro de Meteorología Regional",
    "Dirección Local Aguascalientes",
    "Subdirección de Administración del Agua",
    "Subdirección de Infraestructura Hidroagrícola",
    "Subdirección de Agua Potable, Drenaje y Saneamiento",
    "Subdirección Técnica",
    "Subdirección de Consejos de Cuenca, Gestión Social y Atención a Emergencias",
    "Subdirección de Recaudación y Fiscalización",
    "Subdirección de Enlace Administrativo",
    "Unidad Jurídica",
    "Área de Comunicación y Atención Social e Institucional",
    "Centro de Previsión Meteorológica",
    "Dirección Local Baja California Sur"
  ],
  "Subdirección General de Agua Potable, Drenaje y Saneamiento": [
    "Dirección Local Campeche",
    "Dirección Local Coahuila",
    "Dirección Local Colima",
    "Dirección Local Chihuahua",
    "Dirección Local Durango",
    "Dirección Local Guanajuato",
    "Dirección Local Guerrero",
    "Dirección Local Hidalgo",
    "Dirección Local Estado de México",
    "Dirección Local Michoacán",
    "Dirección Local Nayarit",
    "Dirección Local Puebla",
    "Dirección Local Querétaro",
    "Dirección Local Quintana Roo",
    "Dirección Local San Luis Potosí",
    "Dirección Local Tabasco",
    "Dirección Local Tlaxcala",
    "Dirección Local Zacatecas"
  ],
  "Subdirección General Jurídica": [
    "Subdirección General Jurídica",
    "Gerencia de lo Consultivo",
    "Gerencia de lo Contencioso",
    "Gerencia de Procedimientos Administrativos",
    "Gerencia de Descentralización y de Transparencia y Acceso a la Información Pública"
  ],
  "Subdirección General de Planeación": [
    "Subdirección General de Planeación"
  ],
  "Subdirección General Técnica": [
    ""
  ],
  "Coordinación General del Servicio Meteorológico Nacional": [
    ""
  ],
  "Coordinación General de Recaudación y Fiscalización": [
    ""
  ],
  "Coordinación General de Comunicación y Cultura del Agua": [
    ""
  ],
  "Coordinación General de Atención de Emergencias y Consejos de Cuenca": [
    ""
  ],
  "Coordinación General de Proyectos Especiales de Abastecimiento y Saneamiento": [
    ""
  ],
  "Organismos de Cuenca Península de Baja California": [
    ""
  ],
  "Organismos de Cuenca Noroeste": [
    ""
  ],
  "Organismos de Cuenca Pacífico Norte": [
    ""
  ],
  "Organismos de Cuenca Balsas": [
    ""
  ],
  "Organismos de Cuenca Pacífico Sur": [
    ""
  ],
  "Organismos de Cuenca Río Bravo": [
    ""
  ],
  "Organismos de Cuenca Cuencas Centrales del Norte": [
    ""
  ],
  "Organismos de Cuenca Lerma Santiago Pacífico": [
    ""
  ],
  "Organismos de Cuenca Golfo Norte": [
    ""
  ],
  "Organismos de Cuenca Golfo Centro": [
    ""
  ],
  "Organismos de Cuenca Frontera Sur": [
    ""
  ],
  "Organismos de Cuenca Península de Yucatán": [
    ""
  ],
  "Organismos de Cuenca Aguas del Valle de México": [
    ""
  ],
  "Dirección Local Aguascalientes": [
    ""
  ],
  "Dirección Local Baja California Sur": [
    ""
  ],
  "Dirección Local Campeche": [
    ""
  ],
  "Dirección Local Coahuila": [
    ""
  ],
  "Dirección Local Colima": [
    ""
  ],
  "Dirección Local Chihuahua": [
    ""
  ],
  "Dirección Local Durango": [
    ""
  ],
  "Dirección Local Guanajuato": [
    ""
  ],
  "Dirección Local Guerrero": [
    ""
  ],
  "Dirección Local Hidalgo": [
    ""
  ],
  "Dirección Local Estado de México": [
    ""
  ],
  "Dirección Local Michoacán": [
    ""
  ],
  "Dirección Local Nayarit": [
    ""
  ],
  "Dirección Local Puebla": [
    ""
  ],
  "Dirección Local Querétaro": [
    ""
  ],
  "Dirección Local Quintana Roo": [
    ""
  ],
  "Dirección Local San Luis Potosí": [
    ""
  ],
  "Dirección Local Tabasco": [
    ""
  ],
  "Dirección Local Tlaxcala": [
    ""
  ],
  "Dirección Local Zacatecas": [
    ""
  ]
};

export default areas;