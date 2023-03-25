const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return `${this.reactions.length}`;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
