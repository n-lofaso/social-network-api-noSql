const { Thought, User} = require('../models');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getOneThought(req, res) {
    Thought.findOne({ _id: req.params._id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: `No thought with that id.` })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: `No user with that ID was found.`,
            })
          : res.json(`Thought posted!`)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `No thought with this ID was found.` })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params._id })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `No thought with this ID was found.` })
          : User.findOneAndUpdate(
              { thoughts: req.params._id },
              { $pull: { thoughts: req.params._id } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: `No user found with this ID.`,
            })
          : res.json({ message: `Thought successfully deleted!` })
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params._id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `No thought with this ID was found` })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params._id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: `No thought found with this ID.` })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};