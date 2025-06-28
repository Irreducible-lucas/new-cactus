import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePostReviewMutation } from "../redux/features/reviews/reviewApi";

interface PostAReviewProps {
  isModalOpen: boolean;
  handleClose: () => void;
  refetchReviews: () => void;
}

const PostAReview: React.FC<PostAReviewProps> = ({
  isModalOpen,
  handleClose,
  refetchReviews,
}) => {
  const { id: productId } = useParams<{ id: string }>();
  const { user } = useSelector((state: any) => state.auth);

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const [postReview, { isLoading }] = usePostReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) return alert("Please log in first.");
    if (!comment.trim() || rating === 0)
      return alert("Please enter both rating and comment.");
    if (!productId) return alert("Invalid product. Please try again.");

    const newReview = {
      comment: comment.trim(),
      rating,
      userId: user._id,
      productId, // ✅ now guaranteed to be string
    };

    try {
      await postReview(newReview).unwrap();
      alert("Review posted successfully!");
      setComment("");
      setRating(0);
      refetchReviews();
      handleClose();
    } catch (error: any) {
      alert(error?.data?.message || "Error submitting review.");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Post a Review
        </h2>

        {/* Star Rating */}
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-3xl text-yellow-500"
            >
              {rating >= star ? "★" : "☆"}
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-3 rounded mb-4 min-h-[100px]"
          placeholder="Write your review here..."
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white ${
              isLoading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
