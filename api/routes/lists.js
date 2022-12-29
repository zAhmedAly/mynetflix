const router = require("express").Router();
const List = require("../models/List");
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  console.log(typeQuery, genreQuery);
  let lists = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        lists = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
          // { $sort: { creaedAt: 1 } },
        ]);
      } else {
        lists = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
          // { $sort: { creaedAt: 1 } },
        ]);
      }
    } else {
      lists = await List.aggregate([
        { $sample: { size: 10 } },
        // { $sort: { creaedAt: 1 } },
      ]);
    }

    const newLists = await Promise.all(
      lists.map(async (list) => {
        let movieDetails = [];
        movieDetails = await Promise.all(
          list.content.map(async (movieId) => {
            return await Movie.findById(movieId);
          })
        );
        return { ...list, content: movieDetails };
      })
    );

    res.status(200).json(newLists);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
