const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/task', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
