/**
 * Contenido real de IN2AI, compartido por las tres propuestas de landing.
 * Cambiando esto se actualizan las tres páginas a la vez.
 */

export const services = [
  {
    roman: 'I',
    name: 'Data Driven',
    text: 'Ayudamos a las empresas a convertirse en Data Driven y a centrar su proceso de toma de decisión en base a hechos, y no a subjetividades e intuiciones.',
    tags: ['Auditoría de datos', 'Métricas', 'Cuadros de mando'],
    icon: 'M4 20h16M6 20V10m5 10V4m5 16V8m5 12v-6',
  },
  {
    roman: 'II',
    name: 'Machine Learning / Deep Learning',
    text: 'Modelamos los datos para desarrollar predicciones, clasificaciones o detectar características que nos ayuden en la toma de decisiones.',
    tags: ['Predicción', 'Clasificación', 'Series temporales'],
    icon: 'M5 4h14v16H5zM8 9h8M8 13h5M8 17h3',
  },
  {
    roman: 'III',
    name: 'Visión Artificial',
    text: 'Usamos modelos para trabajar con datos en formato imagen o vídeo: detección, conteo, inspección de línea y control de calidad.',
    tags: ['Detección', 'Segmentación', 'Inspección'],
    icon: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Zm10 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  },
  {
    roman: 'IV',
    name: 'Procesamiento de Lenguaje Natural',
    text: 'Usamos modelos para trabajar con datos en formato texto y lenguaje natural: extracción, resumen, clasificación y búsqueda semántica.',
    tags: ['NLP', 'Extracción', 'Búsqueda semántica'],
    icon: 'M4 5h16v10H9l-5 4V5Zm4 5h8M8 7h5',
  },
  {
    roman: 'V',
    name: 'Inteligencia Artificial Generativa',
    text: 'Exploramos soluciones innovadoras en la intersección de la inteligencia artificial y la creatividad humana: RAG, agentes y asistentes sobre tu propia documentación.',
    tags: ['RAG', 'Agentes', 'Asistentes'],
    icon: 'M12 3a3 3 0 0 1 3 3v1h1a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a3 3 0 0 1 3-3h1V6a3 3 0 0 1 3-3Z',
  },
];

export const products = {
  asm2: {
    name: 'ASM2',
    url: 'https://asm2.in2ai.com/',
    kicker: 'Producto propio',
    claim: 'El chat que conoce la documentación de tu empresa',
    text: 'Un RAG empresarial que se despliega en los servidores de la propia empresa. Eliges qué carpetas de OneDrive, Google Drive, Dropbox o SharePoint quieres indexar, y tus empleados preguntan por chat: procedimientos, convenios, contratos o el manual de esa máquina que nadie encuentra.',
    points: [
      'Se despliega en tu infraestructura: los documentos no salen de tu red',
      'Conectores para OneDrive, Google Drive, Dropbox y SharePoint',
      'Respeta los permisos de cada carpeta: cada empleado ve lo que le corresponde',
      'Cada respuesta cita el documento y la página exactos',
    ],
    tags: ['On-premise', 'RAG', 'Multiconector'],
  },
  mecopia: {
    name: 'Mecopia',
    url: 'https://mecopia.ai/',
    kicker: 'Producto propio',
    claim: 'Un gemelo digital que se ocupa de tu papeleo',
    text: 'Mecopia aprende de tus datos y trabaja por ti: encuentra ofertas de empleo que encajan con tu perfil real, revisa tu factura de la luz y detecta lo que estás pagando de más, y te propone el siguiente paso concreto en cada gestión.',
    points: [
      'Ofertas de empleo filtradas por encaje real con tu perfil',
      'Revisión de facturas: potencia, tarifa y consumo',
      'Acciones concretas, no informes que nadie lee',
      'Tus datos son tuyos y puedes borrarlos cuando quieras',
    ],
    tags: ['Gemelo digital', 'Empleo', 'Energía'],
  },
};

export const privacy = [
  {
    t: 'Despliegue en tu casa',
    d: 'ASM2 y los productos a medida se instalan en tu servidor o tu nube privada. Los documentos nunca salen de tu red.',
  },
  {
    t: 'Sin entrenar con tus datos',
    d: 'Tu información no alimenta ningún modelo. Se usa para responderte y nada más.',
  },
  {
    t: 'Permisos heredados',
    d: 'El índice respeta los permisos de las carpetas de origen. Nadie accede por el chat a lo que no vería en su unidad de red.',
  },
  {
    t: 'GDPR y AI Act por diseño',
    d: 'Contemplados en la arquitectura desde el primer sprint, no parcheados antes de salir a producción.',
  },
];
