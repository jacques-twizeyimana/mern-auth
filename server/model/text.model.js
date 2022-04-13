const mongoose = require("mongoose");

var textSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 1000,
      minlength: 10,
      default:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum voluptatum quisquam voluptatibus expedita excepturi autem aperiam minus deserunt laborum illum. Velit deserunt rerum, dolorum hic autem nobis odit? Accusamus, et?",
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Text = mongoose.model("text", textSchema);

module.exports = Text;
