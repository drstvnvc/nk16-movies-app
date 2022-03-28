import React, { useState } from 'react';
import PostService from '../services/PostService';

function AddComment({ postId, addNewCommentCallback }) {
  const [newComment, setNewComment] = useState({ text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await PostService.addComment(newComment, postId);

    if (data) {
      addNewCommentCallback(data);
    }

    setNewComment({ text: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newComment.text}
          onChange={({ target }) => setNewComment({ text: target.value })}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
export default AddComment;
