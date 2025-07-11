// SEGUNDO NIVEL - ÁREA DE ADSCRIPCIÓN
const areas = {
  "Dirección General": ["Dirección General",
    "Dirección General del Proyecto Ecológico del Lago de Texcoco",
  ],
  "Subdirección General de Administración": [
    "Subdirección General de Administración",
    "Gerencia de Personal",
    "Gerencia de Recursos Financieros",
    "Gerencia de Recursos Materiales",
    "Gerencia de Tecnología de la Información y Comunicaciones",
    "Gerencia de Innovación y Fortalecimiento Institucional",
    "Coordinación de Atención a Organismos Fiscalizadores",
  ],
  "Subdirección General de Administración del Agua": [
    "Subdirección General de Administración del Agua",
    "Gerencia de Servicios a Usuarios",
    "Gerencia del Registro Público de Derechos de Agua",
    "Gerencia de Inspección y Medición",
    "Gerencia de Calificación de Infracciones, Análisis y Evaluación",
    "Gerencia de Regulación y Bancos del Agua",
  ],
  "Subdirección General de Infraestructura Hidroagrícola": [
    "Subdirección General de Infraestructura Hidroagrícola",
    "Gerencia de Construcción de Infraestructura Hidroagrícola",
    "Gerencia de Proyectos de Infraestructura Hidroagrícola",
    "Gerencia de Unidades de Riego",
    "Gerencia de Infraestructura de Protección en Ríos y de Distritos de Temporal",
    "Gerencia de Distritos de Riego",
  ],
  "Subdirección General de Agua Potable, Drenaje y Saneamiento": [
    "Subdirección General de Agua Potable, Drenaje y Saneamiento",
    "Gerencia de Potabilización y Tratamiento",
    "Gerencia de Estudios y Proyectos de Agua Potable y Redes de Alcantarillado",
    "Gerencia de Fortalecimiento de Organismos Operadores",
    "Gerencia de Programas Federales de Agua Potable y Saneamiento",
    "Gerencia de Normatividad",
    "Gerencia de Infraestructura Hidráulica Pluvial",
  ],
  "Subdirección General Jurídica": [
    "Subdirección General Jurídica",
    "Gerencia de lo Consultivo",
    "Gerencia de lo Contencioso",
    "Gerencia de Procedimientos Administrativos",
    "Gerencia de Descentralización y de Transparencia y Acceso a la Información Pública",
  ],
  "Subdirección General de Planeación": [
    "Subdirección General de Planeación",
    "Gerencia de Cooperación Internacional",
    "Gerencia de Planificación Hídrica",
    "Gerencia de Coordinación Interinstitucional",
  ],
  "Subdirección General Técnica": [
    "Subdirección General Técnica",
    "Gerencia de Aguas Subterráneas",
    "Gerencia de Aguas Superficiales e Ingeniería de Ríos",
    "Gerencia del Consultivo Técnico",
    "Gerencia de Ingeniería y Asuntos Binacionales del Agua",
    "Gerencia de Calidad del Agua",
  ],
  "Coordinación General del Servicio Meteorológico Nacional": [
    "Coordinación General del Servicio Meteorológico Nacional",
    "Gerencia de Redes de Observación y Telemática",
    "Gerencia de Meteorología y Climatología",
  ],
  "Coordinación General de Recaudación y Fiscalización": [
    "Coordinación General de Recaudación y Fiscalización",
  ],
  "Coordinación General de Comunicación y Cultura del Agua": [
    "Coordinación General de Comunicación y Cultura del Agua",
  ],
  "Coordinación General de Atención de Emergencias y Consejos de Cuenca": [
    "Coordinación General de Atención de Emergencias y Consejos de Cuenca",
    "Gerencia de Protección a la Infraestructura y Atención de Emergencias",
    "Gerencia de Consejos de Cuenca ",
  ],
  "Coordinación General de Proyectos Especiales de Abastecimiento y Saneamiento":
    [
      "Coordinación General de Proyectos Especiales de Abastecimiento y Saneamiento",
      "Gerencia de Ingeniería",
      "Gerencia de Construcción",
      "Gerencia de Agua Potable y Saneamiento",
    ],
  "Organismos de Cuenca Península de Baja California": [
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
  ],
  "Organismos de Cuenca Noroeste": [
    "Dirección General del Organismo de Cuenca",
    "Dirección de Administración",
    "Dirección de Administración del Agua ",
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
  ],
  "Organismos de Cuenca Pacífico Norte": [
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
  ],
  "Organismos de Cuenca Balsas": [
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
  ],
  "Organismos de Cuenca Pacífico Sur": [
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
  ],
  "Organismos de Cuenca Río Bravo": [
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
  ],
  "Organismos de Cuenca Cuencas Centrales del Norte": [
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
  ],
  "Organismos de Cuenca Lerma Santiago Pacífico": [
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
  ],
  "Organismos de Cuenca Golfo Norte": [
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
  ],
  "Organismos de Cuenca Golfo Centro": [
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
  ],
  "Organismos de Cuenca Frontera Sur": [
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
  ],
  "Organismos de Cuenca Península de Yucatán": [
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
  ],
  "Organismos de Cuenca Aguas del Valle de México": [
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
  ],
  "Dirección Local Aguascalientes": [
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
  ],
  "Dirección Local Baja California Sur": [
    "Dirección Local Baja California Sur",
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
  ],
  "Dirección Local Campeche": [
    "Dirección Local Campeche",
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
  ],
  "Dirección Local Coahuila": [
    "Dirección Local Coahuila",
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
  ],
  "Dirección Local Colima": [
    "Dirección Local Colima",
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
  ],
  "Dirección Local Chihuahua": [
    "Dirección Local Chihuahua",
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
  ],
  "Dirección Local Durango": [
    "Dirección Local Durango",
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
  ],
  "Dirección Local Guanajuato": [
    "Dirección Local Guanajuato",
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
  ],
  "Dirección Local Guerrero": [
    "Dirección Local Guerrero",
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
  ],
  "Dirección Local Hidalgo": [
    "Dirección Local Hidalgo",
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
  ],
  "Dirección Local Estado de México": [
    "Dirección Local Estado de México",
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
  ],
  "Dirección Local Michoacán": [
    "Dirección Local Michoacán",
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
  ],
  "Dirección Local Nayarit": [
    "Dirección Local Nayarit",
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
  ],
  "Dirección Local Puebla": [
    "Dirección Local Puebla",
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
  ],
  "Dirección Local Querétaro": [
    "Dirección Local Querétaro",
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
  ],
  "Dirección Local Quintana Roo": [
    "Dirección Local Quintana Roo",
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
  ],
  "Dirección Local San Luis Potosí": [
    "Dirección Local San Luis Potosí",
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
  ],
  "Dirección Local Tabasco": [
    "Dirección Local Tabasco",
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
  ],
  "Dirección Local Tlaxcala": [
    "Dirección Local Tlaxcala",
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
  ],
  "Dirección Local Zacatecas": [
    "Dirección Local Zacatecas",
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
  ],
};

export default areas;
