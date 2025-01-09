// # Configurazione
const connection = require("../data/db");

// # Rotte
// *index
function index(req, res) {
  const sql = `SELECT * FROM blog.posts`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
}

// *show
function show(req, res) {
  // id richiesto
  const id = parseInt(req.params.id);

  // errore
  if (isNaN(id)) {
    const err = new Error("Id not valid");
    err.code = 400;
    throw err;
  }

  // post con id richiesto
  const selectedPost = posts.find((post) => post.id === id);

  // errore
  if (!selectedPost) {
    const err = new Error("id not found");
    err.code = 404;
    throw err;
  }

  // res.json(`Post con id: ${id}`)
  res.json(selectedPost);
}

// *store
function create(req, res) {
  // id auto gen
  const id = posts.at(-1).id + 1;

  // dati in arrivo
  const { title, author, content, image, category, pubblished } = req.body;

  // errore
  if (
    !title ||
    !author ||
    !content ||
    !category
    // !tags ||
    // !Array.isArray(tags) ||
    // !tags.length
  ) {
    const err = new Error("missing or invalid param");
    err.code = 400;
    throw err;
  }

  // log
  console.log(`// new data //`);

  const newPost = {
    id,
    title,
    author,
    content,
    image,
    category,
    // tags,
    pubblished,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
}

// *update
function update(req, res) {
  // id richiesto
  const id = parseInt(req.params.id);

  // errore
  if (isNaN(id)) {
    const err = new Error("id not valid");
    err.code = 400;
    throw err;
  }

  // post con id richiesto
  const selectedPost = posts.find((post) => post.id === id);

  // errore
  if (!selectedPost) {
    const err = new Error("id not found");
    err.code = 404;
    throw err;
  }

  // dati in arrivo
  const { title, author, content, image, category, pubblished } = req.body;

  // errore
  if (
    !title ||
    !author ||
    !content ||
    !category
    // !tags ||
    // !Array.isArray(tags) ||
    // !tags.length
  ) {
    const err = new Error("missing or invalid param");
    err.code = 400;
    throw err;
  }

  // log
  console.log(`// modified data //`);
  console.log({ title, author, content, image, category, pubblished });

  // modified data
  selectedPost.title = title;
  selectedPost.author = author;
  selectedPost.content = content;
  selectedPost.image = image;
  selectedPost.category = category;
  selectedPost.pubblished = pubblished;
  // selectedPost.tags = tags;

  // res.json(`Modifica interamente il post con id: ${id}`);
  res.json(selectedPost);
}

// *modify
function modify(req, res) {
  // id richiesto
  const id = parseInt(req.params.id);

  // errore
  if (isNaN(id)) {
    const err = new Error("id not valid");
    err.code = 400;
    throw err;
  }

  // post con id richiesto
  const selectedPost = posts.find((post) => post.id === id);

  // errore
  if (!selectedPost) {
    const err = new Error("id not found");
    err.code = 404;
    throw err;
  }

  // dati in arrivo
  const { title, author, content, image, category, pubblished } = req.body;

  // modified title
  if (title) {
    selectedPost.title = title;
    console.log(`// modified data //`);
    console.log({ title });
  }

  // modified author
  else if (author) {
    selectedPost.author = author;
    console.log(`// modified data //`);
    console.log({ author });
  }

  // modified content
  else if (content) {
    selectedPost.content = content;
    console.log(`// modified data //`);
    console.log({ content });
  }

  // modified image
  else if (image) {
    selectedPost.image = image;
    console.log(`// modified data //`);
    console.log({ image });
  }

  // modified category
  else if (category) {
    selectedPost.category = category;
    console.log(`// modified data //`);
    console.log({ category });
  }

  // modified pubblished
  else if (pubblished || !pubblished) {
    selectedPost.pubblished = pubblished;
    console.log(`// modified data //`);
    console.log({ pubblished });
  }

  // modified tags
  // else if (tags && Array.isArray(tags)) {
  //   selectedPost.tags = tags;
  //   console.log(`// modified data //`);
  //   console.log({ tags });
  // }

  // error
  else {
    const err = new Error("missing or invalid param");
    err.code = 400;
    throw err;
  }

  // res.json(`Modifica parzialmente il post con id: ${id}`);
  res.json(selectedPost);
}

// *destroy
function destroy(req, res) {
  // id richiesto
  const id = parseInt(req.params.id);

  // errore
  if (isNaN(id)) {
    const err = new Error("id not valid");
    err.code = 400;
    throw err;
  }

  // post con id richiesto e suo indice
  const selectedPost = posts.find((post) => post.id === id);
  const postIndex = posts.indexOf(selectedPost);

  // errore
  if (!selectedPost) {
    const err = new Error("id not found");
    err.code = 404;
    throw err;
  }

  posts.splice(postIndex, 1);
  console.log(`// deleted element id: ${id} //`);
  console.log(posts);

  res.json(posts);
  res.sendStatus(204);
}

module.exports = { index, show, create, update, modify, destroy };
