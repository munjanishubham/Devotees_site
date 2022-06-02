const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  appointments: [
    {
      pandit: {
        type: Schema.Types.ObjectId,
        ref: "pandits",
      },
      bookingId: {
        type: Number,
      },
      devoteename: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      status: {
        type: String,
      },
      mobile: {
        type: Number,
      },
      date: {
        type: Date,
      },
      description: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
