import React, { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import { toBase64, urlToBase64, ratingToStars } from '../../../utils';
import { Rating } from 'react-simple-star-rating';

const Reviews = () => {
  const [srcImage, setSrcImage] = useState('');
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewImg, setReviewImg] = useState('');

  const [reviewOnUpdate, setReviewOnUpdate] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await api.getReviewsLoggedIn()
      console.log(data);
      setReviews(data);
    }
    getReviews();
  }, []);

  const showImageReview = (e) => {
    setSrcImage(e.target.src);
    new bootstrap.Modal('#showModalImageReview').show();
  }

  const handleFileEvent = async (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0]
    const base64Image = await toBase64(file);
    setReviewImg(base64Image);
  }

  const handleRating = (rate) => {
    setRating(rate);
    console.log(rating);
  }

  const onDelete = async ({ id_review, id_spot }) => {
    console.log(id_review, id_spot);


    const data = await api.deleteReview({ id_review, id_spot });

    const { status } = data;

    if (status === 'success') {
      const deleteReviews = reviews.filter((review) => review.id_review !== id_review);
      setReviews(deleteReviews);
    }
  }

  const onUpdateModal = async (review) => {
    const { rating, review: reviews, image } = review;
    const base64Image = await urlToBase64(image);
    setReviewOnUpdate(review);
    setRating(rating);
    setReview(reviews);
    setReviewImg(base64Image);
  }

  const updateReview = async () => {
    const { id_review, id_spot } = reviewOnUpdate;
    if (!id_review && !id_spot && !reviewImg && !rating && !review) return;
    const data = await api.updateReview({ id_review, id_spot, image: reviewImg, rating, review });

    console.log(data);

    const { status } = data;

    if (status === 'success') {
      setReview('');
      setReviewImg('');
      setRating('');
      new bootstrap.Modal('#showModalUpdateReviewForm').hide();
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between pb-3">
        <h4>reviews</h4>
      </div>

      <div className="d-flex flex-column gap-2">

        {reviews?.map((review, key) => (
          <div className="card shadow">
            <div className="card-body">

              <div className="d-flex justify-content-between">
                <Link to={`/place/${review.slug}`}><b>{review.name}</b></Link>
                <div className='d-flex gap-2'>
                  <button onClick={() => onUpdateModal(review)} className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#showModalUpdateReviewForm">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button onClick={() => onDelete({ id_review: review.id_review, id_spot: review.id_spot })} className='btn btn-danger'>
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-2 mb-3">
                  <div className="d-flex gap-1">
                    <img onClick={(e) => showImageReview(e)} style={{ width: 150, height: 150, objectFit: 'cover', cursor: 'pointer' }} className='rounded' src={review.image} alt={review.name} />
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  {ratingToStars(review.rating)}
                  <p className='mt-3'>
                    {review.review}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
      {/* Modal */}

      <div className="modal fade" id="showModalImageReview" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <img className='img-fluid' src={srcImage} alt="" />
          </div>
        </div>
      </div>

      <div className="modal fade" id="showModalUpdateReviewForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="mb-3 text-center">
                <Rating
                  onClick={handleRating}
                  initialValue={rating}
                />
              </div>
              <div className="mb-3">
                <textarea value={review} onChange={(e) => setReview(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Ceritain pengalaman kamu...'></textarea>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-4">
                    <img style={{ height: 200, objectFit: 'cover' }} className='img-fluid rounded shadow' src={reviewImg} alt="" />
                  </div>
                  <div className="col-8">
                    <label htmlFor="formFileMultiple" className="form-label">Ubah foto</label>
                    <input onChange={(e) => handleFileEvent(e)} className="form-control" type="file" accept='image/png, image/jpeg' id="formFileMultiple" />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={() => updateReview()} type="button" className="btn btn-primary">Ubah</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reviews