import React, { useState, useEffect, useContext } from 'react';
import axios from '../../utils/axios';
import { AuthContext } from '../../context/authContext';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa'; // import star, edit, and trash icons

const StarRating = ({ rating, onRate }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer text-xl ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => onRate(star)}
        />
      ))}
    </div>
  );
};

const ProductReviewSection = ({ productId, user, onDeleteReview }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/reviews/product/${productId}?page=1&limit=10`);
      setReviews(res.data.reviews || []);
      setTotalReviews(res.data.pagination ? res.data.pagination.totalCount : 0);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async () => {
    try {
      if (!rating || !comment) return alert('Rating and comment are required');
      if (!user) return alert('You need to be logged in to submit a review');

      const headers = {
        'Authorization': `Bearer ${user.token}`,
      };

      if (editMode) {
        await axios.put(`/api/reviews/${editMode}`, { rating, comment }, { headers });
        setEditMode(null);
      } else {
        await axios.post('/api/reviews', {
          user_id: user.userId,
          product_id: productId,
          rating,
          comment,
        }, { headers });
      }

      setRating(0);
      setComment('');
      fetchReviews();
    } catch (err) {
      console.error('Error posting review:', err);
      alert('Error posting review, please try again.');
    }
  };

  const handleEdit = (review) => {
    setEditMode(review.id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDelete = async (id) => {
    const result = await window.Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      if (onDeleteReview) {
        await onDeleteReview(id);
      } else {
        try {
          if (!user) return alert('You need to be logged in to delete a review');
          const headers = {
            'Authorization': `Bearer ${user.token}`,
          };
          await axios.delete(`/api/reviews/${id}`, { headers });
          await window.Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
          fetchReviews();
        } catch (err) {
          window.Swal.fire('Error', 'Error deleting review, please try again.', 'error');
          console.error('Error deleting review:', err);
        }
      }
    }
  };

  return (
    <div className="mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Reviews ({totalReviews})</h2>

      {/* Review Form */}
      <div className="mb-4 space-y-2">
        <StarRating rating={rating} onRate={setRating} />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
        >
          {editMode ? 'Update Review' : 'Submit Review'}
        </button>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}

      {reviews.map((review) => (
        <div key={review.id} className="p-4 mb-2 border rounded shadow-sm bg-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">{review.user_name} <span className="text-xs text-gray-400">({review.user_email})</span></p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-sm ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
              </div>
              <p className="mt-1 whitespace-pre-line">{review.comment}</p>
            </div>
            {((user?.role === 'user' && (user.userId === review.user_id || user.id === review.user_id)) || (currentUser && currentUser.id === review.user_id)) && (
              <div className="flex flex-col items-end gap-2 ml-4">
                {/* <button
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                  onClick={() => handleEdit(review)}
                >
                  <FaEdit size={18} />
                </button> */}
                <button
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                  onClick={() => handleDelete(review.id)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            )}
            {(user?.role === 'admin' || currentUser?.role === 'admin') && !((user?.userId === review.user_id || user?.id === review.user_id) || currentUser?.id === review.user_id) && (
              <div className="flex flex-col items-end gap-2 ml-4">
                <button
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                  onClick={() => handleDelete(review.id)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewSection;
