// # Configurazione
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// # Middlewares
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// # Rotte
const pagesRouter = require("./routers/pages");
const postsRouter = require("./routers/posts");

app.use("/", pagesRouter);
app.use("/posts", postsRouter);

// # Errors
app.use(errorsHandler);
app.use(notFound);

// # Listening
app.listen(port, () => {
  console.log(`"Server del mio blog" listening on port ${port}`);
});
