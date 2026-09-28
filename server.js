const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Everything in public/ is served as-is. Milestone 3 adds API routes above this.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Team project listening on http://localhost:${port}`);
});
