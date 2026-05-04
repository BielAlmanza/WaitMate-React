require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./src/models/User');
const Event = require('./src/models/Event');
const Post = require('./src/models/Post');
const Review = require('./src/models/Review');
const Conversation = require('./src/models/Conversation');
const Message = require('./src/models/Message');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Conectado a MongoDB');

  // Limpiar colecciones
  await Promise.all([
    User.deleteMany({}),
    Event.deleteMany({}),
    Post.deleteMany({}),
    Review.deleteMany({}),
    Conversation.deleteMany({}),
    Message.deleteMany({}),
  ]);
  console.log('Colecciones limpiadas');

  // Usuarios demo
  const password = await bcrypt.hash('password123', 10);

  const [biel, ana, carlos, maria] = await User.insertMany([
    {
      name: 'Biel Almanza',
      email: 'biel@waitmate.com',
      password,
      verificationStatus: 'verified',
      tripsCompleted: 12,
      averageRating: 4.8,
      reviewCount: 10,
      bio: 'Conductor habitual a conciertos y festivales de Barcelona.',
      phone: '+34 612 345 678',
    },
    {
      name: 'Ana García',
      email: 'ana@waitmate.com',
      password,
      verificationStatus: 'verified',
      tripsCompleted: 7,
      averageRating: 4.6,
      reviewCount: 6,
      bio: 'Me encanta compartir coche a festivales de música.',
    },
    {
      name: 'Carlos López',
      email: 'carlos@waitmate.com',
      password,
      verificationStatus: 'pending',
      tripsCompleted: 3,
      averageRating: 4.2,
      reviewCount: 3,
      bio: 'Aficionado al fútbol y los conciertos.',
    },
    {
      name: 'María Sanz',
      email: 'maria@waitmate.com',
      password,
      verificationStatus: 'verified',
      tripsCompleted: 20,
      averageRating: 4.9,
      reviewCount: 18,
      bio: 'Conductora de confianza, puntual y amable.',
    },
  ]);
  console.log('Usuarios creados');

  // Eventos
  const [primavera, clasico, sonar, nba, coldplay] = await Event.insertMany([
    {
      title: 'Primavera Sound 2026',
      description: 'El festival de música independiente más importante de Barcelona. Tres días de conciertos en el Parc del Fòrum.',
      category: 'Festivales',
      location: 'Parc del Fòrum, Barcelona',
      coordinates: { lat: 41.4036, lng: 2.2219 },
      date: new Date('2026-06-04'),
      creator: biel._id,
      rideCount: 3,
    },
    {
      title: 'Clásico FC Barcelona vs Real Madrid',
      description: 'El partido más esperado de la temporada. Lleno total en el Estadi Olímpic.',
      category: 'Deportes',
      location: 'Estadi Olímpic Lluís Companys, Barcelona',
      coordinates: { lat: 41.3644, lng: 2.1570 },
      date: new Date('2026-05-20'),
      creator: carlos._id,
      rideCount: 2,
    },
    {
      title: 'Sónar 2026',
      description: 'Festival internacional de música avanzada, creatividad y tecnología.',
      category: 'Festivales',
      location: 'Fira Barcelona, L\'Hospitalet de Llobregat',
      coordinates: { lat: 41.3579, lng: 2.1303 },
      date: new Date('2026-06-18'),
      creator: ana._id,
      rideCount: 1,
    },
    {
      title: 'NBA Paris Game 2026',
      description: 'Partido oficial de la NBA en Europa. Golden State Warriors vs Miami Heat.',
      category: 'Deportes',
      location: 'Accor Arena, París',
      coordinates: { lat: 48.8394, lng: 2.3780 },
      date: new Date('2026-01-23'),
      creator: maria._id,
      rideCount: 1,
    },
    {
      title: 'Coldplay Music of the Spheres Tour',
      description: 'La gira más espectacular de Coldplay llega al Estadi Olímpic de Barcelona.',
      category: 'Conciertos',
      location: 'Estadi Olímpic Lluís Companys, Barcelona',
      coordinates: { lat: 41.3644, lng: 2.1570 },
      date: new Date('2026-07-12'),
      creator: biel._id,
      rideCount: 2,
    },
  ]);
  console.log('Eventos creados');

  // Posts (ofertas y solicitudes de viaje)
  const [p1, p2, p3, p4, p5] = await Post.insertMany([
    {
      author: biel._id,
      event: primavera._id,
      type: 'offer',
      description: 'Salgo desde Gràcia el jueves 4 de junio a las 17:00. Tengo 3 plazas libres. Música suave y viaje tranquilo.',
      seats: 3,
      price: 8,
      origin: 'Gràcia, Barcelona',
      destination: 'Parc del Fòrum, Barcelona',
      departureDate: new Date('2026-06-04T17:00:00'),
      preferences: { music: true, pets: false, smoking: false },
      status: 'open',
    },
    {
      author: maria._id,
      event: primavera._id,
      type: 'offer',
      description: 'Salgo desde Sants a las 16:30. 2 plazas disponibles. Acepto mascotas pequeñas.',
      seats: 2,
      price: 6,
      origin: 'Sants, Barcelona',
      destination: 'Parc del Fòrum, Barcelona',
      departureDate: new Date('2026-06-04T16:30:00'),
      preferences: { music: true, pets: true, smoking: false },
      status: 'open',
    },
    {
      author: ana._id,
      event: clasico._id,
      type: 'request',
      description: 'Busco plaza desde Sant Andreu para el clásico. Pago mi parte del combustible.',
      seats: 1,
      price: 0,
      origin: 'Sant Andreu, Barcelona',
      destination: 'Estadi Olímpic Lluís Companys, Barcelona',
      departureDate: new Date('2026-05-20T18:00:00'),
      status: 'open',
    },
    {
      author: carlos._id,
      event: coldplay._id,
      type: 'offer',
      description: 'Tengo furgoneta y 4 plazas libres. Salgo desde Badalona a las 19:00.',
      seats: 4,
      price: 10,
      origin: 'Badalona',
      destination: 'Estadi Olímpic Lluís Companys, Barcelona',
      departureDate: new Date('2026-07-12T19:00:00'),
      preferences: { music: true, pets: false, smoking: false },
      status: 'open',
    },
    {
      author: maria._id,
      event: sonar._id,
      type: 'offer',
      description: 'Voy al Sónar los tres días. Ofrezco 2 plazas ida y vuelta cada día desde Eixample.',
      seats: 2,
      price: 7,
      origin: 'Eixample, Barcelona',
      destination: 'Fira Barcelona, L\'Hospitalet',
      departureDate: new Date('2026-06-18T14:00:00'),
      preferences: { music: true, pets: false, smoking: false },
      status: 'open',
    },
  ]);
  console.log('Posts creados');

  // Valoraciones
  await Review.insertMany([
    {
      reviewer: ana._id,
      reviewed: biel._id,
      post: p1._id,
      rating: 5,
      comment: 'Conductor excelente, puntual y muy agradable. Repetiré seguro.',
      categories: { punctuality: 5, cleanliness: 5, comfort: 5, communication: 5 },
    },
    {
      reviewer: carlos._id,
      reviewed: biel._id,
      rating: 4,
      comment: 'Buen viaje, música agradable y conducción tranquila.',
      categories: { punctuality: 4, cleanliness: 5, comfort: 4, communication: 4 },
    },
    {
      reviewer: biel._id,
      reviewed: maria._id,
      post: p2._id,
      rating: 5,
      comment: 'María es una conductora de 10. Super limpio el coche y muy puntual.',
      categories: { punctuality: 5, cleanliness: 5, comfort: 5, communication: 5 },
    },
  ]);
  console.log('Valoraciones creadas');

  // Conversación y mensajes de ejemplo
  const conv = await Conversation.create({
    participants: [biel._id, ana._id],
    event: primavera._id,
    tripTitle: 'Primavera Sound 2026',
    lastMessage: '¡Perfecto, nos vemos allí!',
    lastMessageAt: new Date(),
    unreadCount: { [biel._id.toString()]: 0, [ana._id.toString()]: 1 },
  });

  await Message.insertMany([
    { conversation: conv._id, senderId: ana._id, text: 'Hola! ¿Sigues con plazas para el Primavera?', createdAt: new Date(Date.now() - 1000 * 60 * 30) },
    { conversation: conv._id, senderId: biel._id, text: 'Sí, quedan 2 plazas. Salgo a las 17:00 desde Gràcia.', createdAt: new Date(Date.now() - 1000 * 60 * 20) },
    { conversation: conv._id, senderId: ana._id, text: '¡Perfecto, nos vemos allí!', createdAt: new Date(Date.now() - 1000 * 60 * 5) },
  ]);
  console.log('Conversación y mensajes creados');

  console.log('\n✓ Seed completado. Credenciales de acceso:');
  console.log('  biel@waitmate.com   / password123  (verificado, 12 viajes)');
  console.log('  ana@waitmate.com    / password123  (verificado, 7 viajes)');
  console.log('  carlos@waitmate.com / password123  (pendiente, 3 viajes)');
  console.log('  maria@waitmate.com  / password123  (verificado, 20 viajes)');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
