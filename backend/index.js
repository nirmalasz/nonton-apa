const express = require('express');
const cors = require('cors');

const activityRoutes = require('./routes/activityRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/activity', activityRoutes);
app.use('/api/recommendations', recommendationRoutes);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`NontonApa Backend running on http://localhost:${PORT}`);
});