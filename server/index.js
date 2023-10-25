import app from "./app.js";
import "./env.js"

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server listening on ${PORT}`)
);