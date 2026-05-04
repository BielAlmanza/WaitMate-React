const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1/auth', require('./routes/auth.routes'));
app.use('/v1/users', require('./routes/users.routes'));
app.use('/v1/events', require('./routes/events.routes'));
app.use('/v1/posts', require('./routes/posts.routes'));
app.use('/v1/conversations', require('./routes/chat.routes'));
app.use('/v1/reviews', require('./routes/reviews.routes'));

app.get('/v1/health', (_, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

module.exports = app;
