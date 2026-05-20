const express = require('express');
const cors = require('cors');

const activityRoutes = require('./routes/activityRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/movies', movieRoutes);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`NontonApa Backend running on http://localhost:${PORT}`);
});