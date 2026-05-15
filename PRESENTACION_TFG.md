# PRESENTACIÓN TFG — WaitMate
# Contenido diapositiva por diapositiva

Color corporativo: Naranja #F97316 | Fondo: Blanco o gris muy claro
Fuente recomendada: Inter o Poppins (Google Fonts, gratis)
Duración objetivo: 12-14 minutos de exposición

---

## DIAPOSITIVA 1 — PORTADA

**En pantalla:**
- Logo / nombre: WaitMate
- Subtítulo: Aplicación móvil de carpooling social orientada a eventos
- Nombre: [Tu nombre completo]
- Ciclo: Desarrollo de Aplicaciones Multiplataforma (DAM)
- Curso: 2025-2026
- Tutor: [Nombre del tutor]

**Qué decir:**
"Buenos días. Mi Trabajo de Fin de Grado se llama WaitMate, una aplicación móvil de carpooling social.
A lo largo de esta presentación voy a explicar el problema que resuelve, cómo está construida técnicamente,
las funcionalidades que ofrece y las conclusiones que he sacado del proceso."

**Visual:** Logo de WaitMate grande centrado, fondo naranja degradado o imagen de personas en coche.

---

## DIAPOSITIVA 2 — ÍNDICE

**En pantalla:**
1. Motivación y problema
2. Solución: WaitMate
3. Arquitectura del sistema
4. Tecnologías utilizadas
5. Base de datos
6. Seguridad y autenticación
7. Comunicación en tiempo real
8. Funcionalidades principales
9. Demo
10. Dificultades y aprendizajes
11. Conclusiones y trabajo futuro

**Qué decir:**
"La presentación está organizada en estos once bloques. Empezaré por el contexto del problema,
después la parte técnica, y cerraré con las conclusiones y la demo."

---

## DIAPOSITIVA 3 — MOTIVACIÓN: EL PROBLEMA

**En pantalla:**
- Título: ¿Cuál es el problema?
- Icono coche: Millones de asientos vacíos en cada desplazamiento
- Icono calendario: Eventos masivos generan picos de demanda de transporte
- Icono persona: El usuario no tiene con quién compartir viaje
- Icono euro: El coste individual del transporte es elevado
- Dato destacado (grande, en naranja): "Solo en España se celebran más de 2.000 festivales y 1.500 conciertos al año"

**Qué decir:**
"El problema que identifico es muy concreto: cada año hay millones de personas que quieren asistir a eventos
—conciertos, festivales, partidos, conferencias— pero no tienen con quién compartir el transporte.
Los servicios de carpooling existentes como BlaBlaCar son genéricos: sirven para viajes de larga distancia,
no están pensados para la dimensión social y de evento. El usuario no puede filtrar por evento,
no puede ver quién más va a ese concierto, no hay comunidad. Eso es lo que WaitMate resuelve."

**Visual:** Mapa de España con puntos de eventos, o imagen de festival/concierto con gente.

---

## DIAPOSITIVA 4 — LA SOLUCIÓN: WAITMATE

**En pantalla:**
- Título: WaitMate — Carpooling social para eventos
- Subtítulo: Conecta conductores y pasajeros que van al mismo evento
- 4 bloques con icono:
  - Eventos → Descubre eventos cerca de ti
  - Posts → Publica o encuentra un viaje
  - Chat → Coordínate en tiempo real
  - Valoraciones → Genera confianza entre usuarios

**Qué decir:**
"WaitMate es una aplicación móvil que vincula el carpooling directamente a eventos.
El usuario entra, ve qué eventos hay cerca, entra en uno que le interese,
y puede ver quién ofrece o pide viaje para ese evento.
Contacta, se pone de acuerdo por el chat integrado,
y al terminar puede valorar a la otra persona. Todo dentro de una sola app."

**Visual:** Capturas de pantalla de la app en un mockup de móvil (3 pantallas: Feed, detalle evento, post).

---

## DIAPOSITIVA 5 — ARQUITECTURA DEL SISTEMA

**En pantalla:**
- Título: Arquitectura
- Diagrama en 3 bloques conectados con flechas:

  [App React Native]
       ↓ REST API (HTTP/JSON)    ↓ WebSocket (Socket.io)
  [Backend Node.js / Express]
       ↓ Mongoose ODM            ↓ Cloudinary SDK
  [MongoDB]                  [Cloudinary (imágenes)]

- Leyenda de flechas:
  - Línea sólida: Peticiones REST
  - Línea discontinua: Tiempo real

**Qué decir:**
"La arquitectura es de tres capas. El frontend es una app React Native que corre en iOS y Android.
Se comunica con el backend por dos vías: HTTP REST para las operaciones normales de datos,
y WebSocket mediante Socket.io para el chat en tiempo real.
El backend es Node.js con Express, organizado en patrón MVC.
Los datos se guardan en MongoDB. Las imágenes van a Cloudinary, un servicio cloud,
para no cargar el servidor con ficheros binarios."

**Visual:** El diagrama descrito arriba, limpio, con los logos de cada tecnología.

---

## DIAPOSITIVA 6 — TECNOLOGÍAS UTILIZADAS

**En pantalla:**
- Título: Stack tecnológico
- Dos columnas:

  FRONTEND                          BACKEND
  React Native 0.85               Node.js + Express
  TypeScript                       MongoDB + Mongoose
  React Navigation                 Socket.io
  Axios                            JWT + bcrypt
  Context API                      Cloudinary
  AsyncStorage                     Multer

- Abajo: "Lenguaje principal: JavaScript/TypeScript — Stack: MERN adaptado a mobile"

**Qué decir:**
"En el frontend uso React Native, que permite desarrollar para iOS y Android con un único codebase en JavaScript.
Lo complemento con TypeScript para tipado estático, que reduce errores en tiempo de compilación.
Para la navegación, React Navigation. Para las peticiones HTTP, Axios con interceptores personalizados.
En el backend, Node.js con Express, MongoDB con Mongoose como ODM,
y Socket.io para el tiempo real. La autenticación con JWT y bcrypt.
Las imágenes se almacenan en Cloudinary."

**Visual:** Logos de cada tecnología en un grid, coloreados.

---

## DIAPOSITIVA 7 — BASE DE DATOS: MODELOS

**En pantalla:**
- Título: Modelos de datos en MongoDB
- 5 tarjetas (una por modelo):

  USER
  name, email, password (hash)
  avatar, bio, phone
  verificationStatus
  tripsCompleted, averageRating
  refreshToken

  EVENT
  title, description, category
  location (GeoJSON Point)
  date, image, creator

  POST
  author, event (ref)
  type: offer | request
  seats, price, origin
  departureDate, preferences
  likes[], comments[], joinedUsers[]
  status: open | full | closed

  CONVERSATION + MESSAGE
  participants[], lastMessage
  senderId, text, timestamp

  REVIEW
  reviewer, reviewed
  rating (1-5), text
  punctuality, cleanliness
  comfort, communication

**Qué decir:**
"Tengo cinco modelos principales en MongoDB. User guarda los datos del usuario con la contraseña hasheada.
Event representa los eventos con una localización en formato GeoJSON para búsquedas geoespaciales.
Post es el núcleo del sistema: puede ser de tipo 'offer' o 'request', tiene asientos, precio, preferencias,
y un array de usuarios que se han unido —cuando ese array llega al número de asientos, el status pasa a 'full' automáticamente.
Conversation y Message gestionan el chat. Review almacena las valoraciones con puntuación general y por categorías."

**Visual:** Las 5 tarjetas con colores diferenciados, flechas mostrando las relaciones (Post → User, Post → Event, etc.).

---

## DIAPOSITIVA 8 — SEGURIDAD: AUTENTICACIÓN JWT

**En pantalla:**
- Título: Autenticación con JWT
- Diagrama de flujo en 5 pasos:

  1. Login → credenciales verificadas con bcrypt
  2. Servidor genera Access Token (7 días) + Refresh Token (30 días)
  3. Cliente guarda tokens en AsyncStorage
  4. Cada petición → Axios interceptor añade token al header
  5. Middleware verifica firma JWT → extrae userId → req.user

- Recuadro destacado (naranja):
  "Contraseñas: bcrypt con 10 salt rounds
   Tokens: firmados con clave secreta del servidor
   Autorización: verificación de propietario en cada acción"

**Qué decir:**
"La autenticación funciona así: el usuario hace login, verifico la contraseña con bcrypt contra el hash en base de datos.
Si es correcta, genero dos tokens JWT: un access token que dura 7 días con el ID del usuario,
y un refresh token de 30 días que se guarda en la base de datos para poder invalidarlo.
El cliente guarda ambos en AsyncStorage. A partir de ahí, cada petición HTTP pasa por un interceptor de Axios
que añade automáticamente el token al header Authorization.
En el servidor, el middleware de autenticación verifica la firma del token —si alguien lo modifica, la firma no coincide y se rechaza.
Para la autorización, cuando alguien intenta borrar un post, comparo el autor del post con el userId del token:
si no coinciden, devuelvo 403 Forbidden."

**Visual:** El diagrama de flujo con iconos de candado, flechas numeradas.

---

## DIAPOSITIVA 9 — COMUNICACIÓN EN TIEMPO REAL: SOCKET.IO

**En pantalla:**
- Título: Chat en tiempo real con Socket.io
- Diagrama de secuencia:

  Usuario A                Servidor              Usuario B
     |                        |                      |
     |-- join(conversaciónId)→|                      |
     |-- message(texto) ─────→|                      |
     |                        |→ MongoDB.create()    |
     |                        |→ updateLastMessage   |
     |                        |→ emit(mensaje) ─────→|
     |                        |                      |

- Recuadro informativo:
  "WebSocket: conexión persistente bidireccional
   vs. Polling: petición cada N segundos
   → Socket.io: mensajes instantáneos, sin carga innecesaria"

**Qué decir:**
"Para el chat uso Socket.io sobre WebSocket. Cuando el usuario abre una conversación,
el cliente emite el evento 'join' con el ID de la conversación y se une a una sala virtual en el servidor.
Cuando envía un mensaje, el servidor lo recibe por WebSocket, lo guarda en MongoDB,
actualiza el lastMessage de la conversación para que aparezca en la lista de chats,
y hace broadcast a todos los participantes de esa sala.
La ventaja frente a polling HTTP es que el servidor solo envía datos cuando hay algo nuevo,
sin que el cliente tenga que preguntar constantemente."

**Visual:** El diagrama de secuencia descrito. Queda muy técnico y profesional.

---

## DIAPOSITIVA 10 — FUNCIONALIDADES: FEED Y EVENTOS

**En pantalla:**
- Título: Funcionalidades — Descubrimiento de eventos
- Captura de FeedScreen (o mockup)
- Puntos clave al lado:
  - Filtro por categoría: Conciertos, Deportes, Festivales, Teatro, Conferencias
  - Ordenación por proximidad geográfica (índice 2dsphere en MongoDB)
  - Búsqueda de eventos cercanos en radio configurable
  - Navegación a detalle de evento con un toque
  - Creación de eventos con imagen (Cloudinary)

**Qué decir:**
"La pantalla principal es el feed de eventos. El usuario puede filtrar por categorías.
Si tiene activada la geolocalización, los eventos se ordenan por proximidad usando un índice geoespacial 2dsphere de MongoDB,
que permite buscar en un radio sin calcular distancias manualmente en el código.
Desde aquí puede entrar al detalle de cualquier evento y ver los posts de viaje asociados a ese evento."

**Visual:** Mockup de móvil con la pantalla del feed a la izquierda, bullets a la derecha.

---

## DIAPOSITIVA 11 — FUNCIONALIDADES: POSTS Y CARPOOLING

**En pantalla:**
- Título: Funcionalidades — Sistema de viajes compartidos
- Dos columnas:

  OFERTA (conductor)              SOLICITUD (pasajero)
  Número de asientos              Busca conductor
  Precio por persona              Indica origen/destino
  Preferencias (música,           Fecha y hora de salida
  mascotas, fumar)                Se une al viaje
  Estado: open/full/closed

- Flujo: Publicar → Likes & comentarios → Unirse → Status "full"

**Qué decir:**
"El sistema de posts tiene dos tipos: oferta y solicitud.
Un conductor publica una oferta indicando cuántos asientos tiene libres, el precio, el origen, la fecha,
y las preferencias del viaje.
Un pasajero puede buscar viajes o publicar una solicitud si no encuentra ninguno que le cuadre.
Cuando alguien se une a un viaje, se añade a la lista de pasajeros.
Cuando la lista llega al número de asientos, el post pasa automáticamente a estado 'full'
y ya no acepta más incorporaciones. También hay likes y comentarios para la interacción social."

**Visual:** Capturas o mockups de CreatePostScreen y PostDetailScreen.

---

## DIAPOSITIVA 12 — FUNCIONALIDADES: CHAT Y VALORACIONES

**En pantalla:**
- Título: Funcionalidades — Confianza entre usuarios
- Izquierda: CHAT EN TIEMPO REAL
  - Lista de conversaciones con último mensaje
  - Contador de mensajes no leídos (BadgeContext)
  - Mensajes instantáneos por WebSocket
- Derecha: SISTEMA DE VALORACIONES
  - Puntuación global de 1 a 5 estrellas
  - 4 categorías: Puntualidad, Limpieza, Comodidad, Comunicación
  - Comentario de texto libre
  - Perfil muestra media y número de valoraciones

**Qué decir:**
"Una vez que el usuario ha encontrado un viaje y se ha unido, puede coordinar los detalles por el chat integrado.
El chat funciona en tiempo real, con contador de no leídos que se refleja en el tab de mensajes.
Para generar confianza en la plataforma, después del viaje se puede valorar al otro usuario
con una puntuación de 1 a 5 en cuatro categorías: puntualidad, limpieza, comodidad y comunicación.
Esas valoraciones aparecen en el perfil público del usuario y sirven para que el resto decida si viajar con esa persona."

**Visual:** Capturas o mockups de ConversationScreen y MyReviewsScreen, y la sección de valoraciones del perfil.

---

## DIAPOSITIVA 13 — DEMO EN VIVO

**En pantalla:**
- Título: Demostración
- Flujo a demostrar (lista visible):
  1. Login en la aplicación
  2. Feed de eventos — filtrar por categoría
  3. Entrar en un evento — ver posts de viaje
  4. Crear un post de oferta de viaje
  5. Chat entre usuarios en tiempo real
  6. Ver perfil con valoraciones

**Qué decir:**
"Ahora voy a mostrar la aplicación funcionando. [HACER LA DEMO]"

**Visual:** Fondo simple con el logo de WaitMate. Pantalla limpia para no distraer durante la demo.

---

## DIAPOSITIVA 14 — DIFICULTADES Y APRENDIZAJES

**En pantalla:**
- Título: Dificultades encontradas y soluciones
- Tabla con 3 columnas: Dificultad | Causa | Solución aplicada

  Linking de libs nativas | react-native-vector-icons requiere config en Android/iOS | Configuración manual en archivos nativos
  URL en emulador Android | localhost no apunta al PC host | Usar 10.0.2.2 como alias de localhost
  Sincronía chat + DB + socket | 3 operaciones deben ejecutarse juntas | Try-catch + operaciones secuenciales en el handler
  _id vs id en MongoDB | MongoDB usa _id, el frontend espera id | Interceptor de Axios que normaliza recursivamente
  Tokens JWT expirados | Peticiones fallan con 401 sin aviso claro | Interceptor de respuesta detecta 401 y redirige a login

**Qué decir:**
"Estas son las cinco dificultades técnicas más significativas que encontré.
La más formativa fue la del campo _id de MongoDB: el frontend esperaba 'id' en todos los objetos,
pero MongoDB devuelve '_id'. La solución fue crear un interceptor en Axios que recorre recursivamente
todos los objetos de cada respuesta y renombra el campo, de forma centralizada para toda la app.
Si lo resolviera caso a caso en cada componente, tendría el mismo mapeo repetido en 20 sitios."

**Visual:** La tabla con colores alternos por fila. Destacar la fila de _id vs id en naranja.

---

## DIAPOSITIVA 15 — CONCLUSIONES

**En pantalla:**
- Título: Conclusiones
- 5 puntos en verde con check:
  ✓ App funcional completa: frontend, backend, base de datos y tiempo real
  ✓ Aplicación de conocimientos del ciclo: arquitectura MVC, REST, seguridad, mobile
  ✓ Uso de tecnologías demandadas en el mercado: React Native, Node.js, MongoDB
  ✓ Sistema de autenticación seguro con JWT y bcrypt
  ✓ Comunicación en tiempo real con WebSocket / Socket.io

- Frase destacada (naranja, grande):
  "WaitMate cubre el ciclo completo de una aplicación real:
   problema → diseño → implementación → pruebas → resultado"

**Qué decir:**
"Como conclusión, WaitMate es una aplicación funcional y completa que abarca todo el stack:
frontend móvil multiplataforma, backend REST, base de datos con queries geoespaciales,
tiempo real con WebSocket, y seguridad con JWT.
Ha sido un proyecto exigente que me ha permitido aplicar y conectar todos los módulos del ciclo
de forma práctica, enfrentándome a problemas reales que tienen soluciones reales."

---

## DIAPOSITIVA 16 — TRABAJO FUTURO

**En pantalla:**
- Título: Líneas de mejora y trabajo futuro
- Lista con iconos:
  → Notificaciones push (Firebase Cloud Messaging) — infraestructura de preferencias ya preparada
  → Pasarela de pago integrada — pantalla de PaymentScreen ya diseñada
  → Access tokens de vida corta (15 min) con refresh automático
  → Tests de integración del API con Supertest
  → Panel de administración web para gestión de eventos
  → Capa de servicios separada de los controladores en el backend

**Qué decir:**
"El proyecto tiene varias líneas de mejora identificadas.
Las más importantes son las notificaciones push —ya tengo el modelo de preferencias preparado en el usuario—
y la integración de pagos, para la que ya existe la pantalla diseñada.
A nivel técnico, reduciría la vida de los access tokens de JWT a 15 minutos con refresco automático,
que es más seguro sin impactar en la experiencia del usuario.
Y añadiría tests de integración del API desde el inicio en un próximo proyecto."

**Visual:** Timeline horizontal con las mejoras ordenadas por prioridad.

---

## DIAPOSITIVA 17 — CIERRE / PREGUNTAS

**En pantalla:**
- Logo WaitMate grande centrado
- "Gracias por su atención"
- Debajo, pequeño:
  - GitHub: [tu usuario si quieres mostrarlo]
  - Tecnologías: React Native · Node.js · MongoDB · Socket.io

**Qué decir:**
"Muchas gracias. Quedo a disposición del tribunal para responder cualquier pregunta."

**Visual:** Misma portada pero más limpia. Fondo naranja suave o imagen bonita.

---

# NOTAS PARA EL DISEÑO EN POWERPOINT

## Paleta de colores recomendada
- Naranja principal: #F97316
- Naranja claro (fondo secciones): #FFF7ED
- Texto oscuro: #1C1917
- Texto secundario: #78716C
- Verde checks: #16A34A
- Blanco: #FFFFFF

## Estructura visual recomendada por tipo de diapositiva
- Portada: fondo naranja, texto blanco, logo grande
- Contenido normal: fondo blanco, título en naranja, bullets en gris oscuro
- Diagramas: fondo gris muy claro (#F5F5F4), elementos en blanco con sombra
- Citas/destacados: bloque naranja claro con texto naranja oscuro

## Tipografía
- Título de diapositiva: Poppins Bold, 32-36pt
- Subtítulos: Poppins SemiBold, 20-24pt
- Bullets: Inter Regular, 16-18pt
- Notas de código (si las pones): Fira Code, 14pt, fondo gris

## Orden y número de diapositivas
1. Portada
2. Índice
3. Motivación / Problema
4. La solución: WaitMate
5. Arquitectura del sistema
6. Tecnologías utilizadas
7. Base de datos: modelos
8. Seguridad: autenticación JWT
9. Tiempo real: Socket.io
10. Funcionalidades: Feed y eventos
11. Funcionalidades: Posts y carpooling
12. Funcionalidades: Chat y valoraciones
13. Demo en vivo
14. Dificultades y aprendizajes
15. Conclusiones
16. Trabajo futuro
17. Cierre / Preguntas

TOTAL: 17 diapositivas — tiempo estimado: 12-14 minutos hablando a ritmo normal
