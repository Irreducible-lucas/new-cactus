import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "../assets";
import { useGetReviewsByProductIdQuery } from "../redux/features/reviews/reviewApi";
import RatingStar from "./RatingStar";
import PostAReview from "./PostAreview";
import { formatDate } from "../util/formatDate/formatDate";

const ReviewCard = () => {
  const { id: productId } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: productReview = [],
    isLoading,
    refetch,
  } = useGetReviewsByProductIdQuery(productId!, {
    skip: !productId,
  });

  return (
    <div className="my-10 bg-white p-8 w-full">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Customer Reviews
      </h3>

      {isLoading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : productReview.length > 0 ? (
        <div className="space-y-6">
          {productReview.map((review: any, index: number) => (
            <div key={index} className="flex gap-4 items-start border-b pb-4">
              <img
                src={Avatar}
                alt="user avatar"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">
                    {review.userId?.username}
                  </p>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.updatedAt)}
                  </span>
                </div>
                <div className="mt-1">
                  <RatingStar rating={review.rating} />
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No reviews yet. Be the first to comment!
        </p>
      )}

      <div className="mt-10">
        <button
          className="px-6 py-3 bg-red-500 text-white rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add a Review
        </button>
      </div>

      <PostAReview
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        refetchReviews={refetch}
      />
    </div>
  );
};

export default ReviewCard;
