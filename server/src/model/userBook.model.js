import mongoose from "mongoose";
const { Schema } = mongoose;

const userBookSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    category: {
      type: String,
      enum: ["to_read", "reading", "read"],
      default: "to_read",
    },
    // Optionally, add notes, rating, dateAdded, etc.
  },
  { timestamps: true }
);

const UserBook = mongoose.model("UserBook", userBookSchema);

export default UserBook;
