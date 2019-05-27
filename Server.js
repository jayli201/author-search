const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");

app.get("/book", (req, res) => {
  axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        req.query.title.toLowerCase()
    )
    .then(response => {
      const data = response.data.items[0].volumeInfo;
      const author = data.authors;
      const image = data.imageLinks.thumbnail;
      console.log(author, image);
      res.send({ author: author, image: image });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
