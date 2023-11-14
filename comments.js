// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');

// Create comment
router.post('/', function (req, res) {
  var comment = new Comment(req.body);
  comment.save(function (err, comment) {
    if (err) {
      return res.status(500).json(err);
    }
    Post.findById(comment.post, function (err, post) {
      if (err) {
        return res.status(500).json(err);
      }
      post.comments.push(comment._id);
      post.save(function (err, post) {
        if (err) {
          return res.status(500).json(err);
        }
        res.json(comment);
      });
    });
  });
});

// Update comment
router.put('/:id', function (req, res) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function (err, comment) {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(comment);
  });
});

// Delete comment
router.delete('/:id', function (req, res) {
  Comment.findByIdAndRemove(req.params.id, function (err, comment) {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(comment);
  });
});

// Get comment
router.get('/:id', function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(comment);
  });
});

// Get all comments
router.get('/', function (req, res) {
  Comment.find(function (err, comments) {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(comments);
  });
});

module.exports = router;