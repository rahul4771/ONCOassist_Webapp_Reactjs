import React, { useState } from 'react';
import { useSaveUpvoteMutation } from "../../api/upvoteApi";
import { FaHeart } from 'react-icons/fa';

export function UpvoteButton() {
  const [upvoteData, setUpvoteData] = useState({ postId: 1 });
  const [saveUpvote, { isLoading, isSuccess, isError }] = useSaveUpvoteMutation();

  const handleUpvote = async () => {
    try {
      await saveUpvote(upvoteData).unwrap();
    } catch (err) {
      console.error('Failed to save upvote: ', err);
    }
  };

  return (
    <div>
      <button onClick={handleUpvote} disabled={isLoading}>
        <FaHeart className="me-1" /> () </button>
      {isSuccess && <p>Upvote saved!</p>}
      {isError && <p>Error saving upvote.</p>}
    </div>
  );
}

export default UpvoteButton;
