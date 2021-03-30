const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "Adding partials",
    entry_id: 3,
    user_id: 1
  },
  {
    comment_text: "Comment being added here",
    entry_id: 1,
    user_id: 4
  },
  {
    comment_text: "Are we adding this to the blog?",
    entry_id: 4,
    user_id: 2
  },
  {
    comment_text: "Ok, comment added. Now what?",
    entry_id: 4,
    user_id: 3
  },
  {
    comment_text: "Have you ever scuba dived?",
    entry_id: 5,
    user_id: 5
  },
  {
    comment_text: "This is a compelling and challenging project",
    entry_id: 5,
    user_id: 4
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;