import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { ratingToStars } from '../../utils';

const Main = ({ authUser }) => {
  const [spots, setSpots] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewAndSpot = async () => {
      const data = await api.getReviewAndSpotLoggedIn()
      setSpots(data.spots);
      setReviews(data.reviews);
    }
    getReviewAndSpot();
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h1 className="h5">review kamu</h1>
              <Link to="/app/reviews" className='btn btn-primary text-light'>semua</Link>
            </div>

            {reviews?.slice(0, 5).map((review, key) => (
              <Link key={key} to={`/place/${review.slug}`} className='text-decoration-none text-dark'>
                <div className="card mb-2">
                  <div className="card-body">
                    <div class="row g-0">
                      <div class="col-4">
                        <img style={{ width: 150, height: 150, objectFit: 'cover' }} className='rounded-start' src={review.image} alt={review.name} />
                      </div>
                      <div class="col-8">
                        <h5 class="card-title">{review.name}</h5>
                        <p class="card-text text-truncate">{review.review}</p>
                        <div>
                          {ratingToStars(review.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h1 className="h5">tempat</h1>
              <Link to={`/app/places`} className='btn btn-primary text-light'>semua</Link>
            </div>

            {authUser?.status > 0 ? spots?.slice(0, 5).map((spot, key) => (
              <Link key={key} to={`/place/${spot.slug}`} className='text-decoration-none text-dark'>

                <div class="card mb-2">
                  <div class="row g-0">
                    <div class="col-4">
                      <img src={spot.image} style={{ width: 150, height: 150, objectFit: 'cover' }} class="img-fluid rounded-start" alt={spot.name} />
                    </div>
                    <div class="col-8">
                      <div class="card-body">
                        <h5 class="card-title">{spot.name}</h5>
                        <p class="card-text text-truncate">{spot.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )) : <p>Anda belum bisa menambahkan tempat! <a href='#/'>verifikasi?</a></p>}

          </div>
        </div>
      </div>
    </div >
  )
}

export default Main