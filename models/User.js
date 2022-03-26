const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      // data Validation
      required: true,
      // Validation
      trim: true,
    },
    // Thoughts Array Field needed for Virtual
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  // tells User Model (Schema) to use Virtuals
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// Virtual to get total count of thoughts and reactions on retrieval
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.reduce((total, thought) => total + thought.replies.length + 1, 0);
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
  