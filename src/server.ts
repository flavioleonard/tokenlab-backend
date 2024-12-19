import * as express from "express";
import cors from "cors"; // Importa o pacote cors
import router from "./routes";
const app = express.default(); // Use express.default()

app.use(cors({
  origin: "http://localhost:5173", // Permite o frontend acessar a API
  methods: ["GET", "POST", "PATCH", "DELETE"], // Permite métodos específicos
}));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
