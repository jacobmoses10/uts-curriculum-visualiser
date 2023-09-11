import app from "./app.js";
import "./env.js"

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server listening on ${PORT}`)
);