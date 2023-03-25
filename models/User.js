const { Schema, model } = require('mongoose');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
      userName: {
          type: String,
          unique: true,
          requierd: true,
          trim: true
      },
      email: {
          type: String,
          unique: true,
          required: true,
          match: [regexEmail, 'Please use a valid email.']
      },
      thoughts: [
          {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
          }],
      friends: [
          {
              type: Schema.Types.ObjectId,
              ref: 'User'
          }
      ]
  },
  {
      toJSON: {
          getters: true,
          virtuals: true
      }
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
      return `${this.friends.length}`;
  });

const User = model('user', userSchema);

module.exports = User;