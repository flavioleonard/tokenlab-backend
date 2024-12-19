import * as express from "express";
import router from "./routes";
const app = express.default(); // Use express.default()

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
