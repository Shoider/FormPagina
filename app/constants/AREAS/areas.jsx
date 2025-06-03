// SEGUNDO NIVEL - ÁREA DE ADSCRIPCIÓN 
const areas = [

    {
        unidad: "Dirección General",
        nombre:"Dirección General"
    },
    ///HAY 7 DE SUBDIRECCIÓN--- ADMINISTRACIÓN
    {
        unidad: "Subdirección General de Administración",
        nombre:"Subdirección General de Administración"
    },
    {
        unidad: "Subdirección General de Administración",
        nombre:"Gerencia de Personal "
    },
    {
        unidad: "Subdirección General de Administración",
        nombre:"Gerencia de Recursos Financieros "
    },
    {
        unidad: "Subdirección General de Administración",
        nombre:"Gerencia de Recursos Materiales "
    },
    {
        unidad: "Subdirección General de Administración",
        nombre:"Gerencia de Tecnología de la Información y Comunicaciones"
    },
    {
        unidad: "Subdirección General de Administración",
        nombre:"Gerencia de Innovación y Fortalecimiento Institucional"
    },
    {
        unidad: "Subdirección General de Administración",
        nombre:"Coordinación de Atención a Organismos Fiscalizadores"
    },
          
    ///HAY--- DE 
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de lo Contencioso "
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Procedimientos Administrativos "
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Descentralización y de Transparencia y Acceso a la Información Pública"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Subdirección General de Planeación "
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Cooperación Internacional"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Planificación Hídrica"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Coordinación Interinstitucional"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Subdirección General Técnica"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Aguas Subterráneas"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Aguas Superficiales e Ingeniería de Ríos"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia del Consultivo Técnico"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Ingeniería y Asuntos Binacionales del Agua"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Calidad del Agua"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Coordinación General del Servicio Meteorológico Nacional"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Redes de Observación y Telemática "
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Meteorología y Climatología"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Coordinación General de Recaudación y Fiscalización"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Coordinación General de Comunicación y Cultura del Agua"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Coordinación General de Atención de Emergencias y Consejos de Cuenca"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Protección a la Infraestructura y Atención de Emergencias"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Gerencia de Consejos de Cuenca"
    },
    {
        unidad: "Subdirección General de Administración del Agua",
        nombre:"Coordinación General de Proyectos Especiales de Abastecimiento y Saneamiento"
    },

    ///HAY --- DE
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Gerencia de Ingeniería"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Gerencia de Construcción"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Gerencia de Agua Potable y Saneamiento"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección General del Organismo de Cuenca"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección de Administración"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección de Administración del Agua"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección del Registro Público de Derechos de Agua"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección de Asuntos Jurídicos"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección de Infraestructura Hidroagrícola"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección de Agua Potable, Drenaje y Saneamiento"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección de Planeación"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección Técnica"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección de Recaudación y Fiscalización"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Coordinación de Atención a Emergencias y Consejos de Cuenca"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Subdirección de Comunicación y Cultura del Agua"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Centro de Meteorología Regional"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección Local Aguascalientes"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Subdirección de Administración del Agua"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Subdirección de Infraestructura Hidroagrícola"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Subdirección de Agua Potable, Drenaje y Saneamiento"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Subdirección Técnica"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Subdirección de Consejos de Cuenca, Gestión Social y Atención a Emergencias"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Subdirección de Recaudación y Fiscalización"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Subdirección de Enlace Administrativo"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Unidad Jurídica"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Área de Comunicación y Atención Social e Institucional"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Centro de Previsión Meteorológica"
    },
    {
        unidad: "Subdirección General de Infraestructura Hidroagrícola",
        nombre:"Dirección Local Baja California Sur"
    },
    
    ///HAY -- DE
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Campeche"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Coahuila"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Colima"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Chihuahua"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Durango"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Guanajuato"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Guerrero"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Hidalgo"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Estado de México"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Michoacán"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Nayarit"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Puebla"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Querétaro"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Quintana Roo"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local San Luis Potosí"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Tabasco"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Tlaxcala"
    },
    {
        unidad: "Subdirección General de Agua Potable, Drenaje y Saneamiento",
        nombre:"Dirección Local Zacatecas"
    },

    ///HAY -- DE
    {
        unidad: "Subdirección General Jurídica",
        nombre:"Subdirección General Jurídica"
    },
    {
        unidad: "Subdirección General Jurídica",
        nombre:"Gerencia de lo Consultivo"
    },
    {
        unidad: "Subdirección General Jurídica",
        nombre:"Gerencia de lo Contencioso"
    },
    {
        unidad: "Subdirección General Jurídica",
        nombre:"Gerencia de Procedimientos Administrativos"
    },
    {
        unidad: "Subdirección General Jurídica",
        nombre:"Gerencia de Descentralización y de Transparencia y Acceso a la Información Pública"
    },

    /// HAY --- DE
    {
        unidad: "Subdirección General de Planeación",
        nombre:"Subdirección General de Planeación"
    },
    ///hay de
    {
        unidad: "Subdirección General Técnica",
        nombre:""
    },
    {
        unidad: "Coordinación General del Servicio Meteorológico Nacional",
        nombre:""
    },
    {
        unidad: "Coordinación General de Recaudación y Fiscalización",
        nombre:""
    },
    {
        unidad: "Coordinación General de Comunicación y Cultura del Agua",
        nombre:""
    },
    {
        unidad: "Coordinación General de Atención de Emergencias y Consejos de Cuenca",
        nombre:""
    },
    {
        unidad: "Coordinación General de Proyectos Especiales de Abastecimiento y Saneamiento",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Península de Baja California",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Noroeste",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Pacífico Norte",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Balsas",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Pacífico Sur",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Río Bravo",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Cuencas Centrales del Norte",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Lerma Santiago Pacífico",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Golfo Norte",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Golfo Centro",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Frontera Sur",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Península de Yucatán",
        nombre:""
    },
    {
        unidad: "Organismos de Cuenca Aguas del Valle de México",
        nombre:""
    },
    {
        unidad: "Dirección Local Aguascalientes",
        nombre:""
    },
    {
        unidad: "Dirección Local Baja California Sur",
        nombre:""
    },
    {
        unidad: "Dirección Local Campeche",
        nombre:""
    },
    {
        unidad: "Dirección Local Coahuila",
        nombre:""
    },
    {
        unidad: "Dirección Local Colima",
        nombre:""
    },
    {
        unidad: "Dirección Local Chihuahua",
        nombre:""
    },
    {
        unidad: "Dirección Local Durango",
        nombre:""
    },
    {
        unidad: "Dirección Local Guanajuato",
        nombre:""
    },
    {
        unidad: "Dirección Local Guerrero",
        nombre:""
    },
    {
        unidad: "Dirección Local Hidalgo",
        nombre:""
    },
    {
        unidad: "Dirección Local Estado de México",
        nombre:""
    },
    {
        unidad: "Dirección Local Michoacán",
        nombre:""
    },
    {
        unidad: "Dirección Local Nayarit",
        nombre:""
    },
    {
        unidad: "Dirección Local Puebla",
        nombre:""
    },
    {
        unidad: "Dirección Local Querétaro",
        nombre:""
    },
    {
        unidad: "Dirección Local Quintana Roo",
        nombre:""
    },
    {
        unidad: "Dirección Local San Luis Potosí",
        nombre:""
    },
    {
        unidad: "Dirección Local Tabasco",
        nombre:""
    },
    {
        unidad: "Dirección Local Tlaxcala",
        nombre:""
    },
    {
        unidad: "Dirección Local Zacatecas",
        nombre:""
    },
];

export default areas;