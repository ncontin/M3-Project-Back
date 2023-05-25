const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Comment = require("../models/Comment.model");

const router = express.Router();

// POST /api/comments
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { content, spotId } = req.body;
    const userId = req.payload.userId; //

    const comment = await Comment.create({
      content,
      spot: spotId,
      user_id: userId,
    });

    res.status(201).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// GET /api/comments/:id
router.get("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;

    // Find the comment by its ID
    const comment = await Comment.find({ spot: commentId }).populate("user_id");
    console.log(comment);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// PUT /api/comments/:id
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;
    const userId = req.payload.userId; // Assuming you have a valid payload with the authenticated user's ID

    // Find the comment by its ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    if (comment.user_id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update the comment's content
    comment.content = content;
    await comment.save();

    res.status(200).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// DELETE /api/comments/:id
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.payload.userId; // Assuming you have a valid payload with the authenticated user's ID

    // Find the comment by its ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    if (comment.user_id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete the comment
    await comment.delete();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
