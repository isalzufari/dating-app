import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import toBase64 from '../utils';

import { Rating } from 'react-simple-star-rating';
import api from '../utils/api';

const DetailPlace = () => {
  const location = useLocation();
  const namePlace = location.pathname.split('/');
  const slug = namePlace[2];

  const [srcImage, setSrcImage] = useState('');
  const [review, setReview] = useState('');
  const [reviewImg, setReviewImg] = useState([]);
  const [rating, setRating] = useState(0);
  const [spot, setSpot] = useState([]);

  useEffect(() => {
    onSpotBySlug(slug);
  }, [slug]);

  const onSpotBySlug = async (slug) => {
    const data = await api.getSpotBySlug({ slug });
    setSpot(data);
    // console.log(data);
  }

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

  const addReview = async ({ reviewImg, rating, review }) => {
    const { id: id_spot } = spot;
    console.log(id_spot);

    const data = await api.addReview({ id_spot, image: reviewImg, rating, review })

    const { status } = data;

    if (status === 'success') {
      setReview('');
      setReviewImg('');
      setRating('');
      // new bootstrap.Modal('#showModalImageReview').hide();
    }
  }

  const handleRating = (rate) => {
    setRating(rate);
    console.log(rating);
  }

  const ratingToStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>)
    }
    return stars;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/place?regions=${spot?.location?.region_id}`} className='text-decoration-none'>{spot?.location?.region}</Link></li>
          <li className="breadcrumb-item active" aria-current="page"><Link to="/locations/kebayoran-baru" className='text-decoration-none'>{spot?.location?.area}</Link></li>
        </ol>
      </nav>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <h4><b>{spot.name}</b></h4>
          <small className='text-muted'>
            <i className="bi bi-geo-alt"></i>
            {' '}{spot?.location?.area}, {spot?.location?.region}
          </small>
          <p className='mt-3'>{spot.desc}</p>
          <h5><b>fasilitas</b></h5>
          <ul>
            {spot?.facilities?.map((facility, key) => (
              <li key={key}>{facility.name}</li>
            ))}
          </ul>
        </div>

        <div className="col-12 col-md-6">
          <img src='https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2022/08/05/279367887_472208658017720_640675-20220805114503.jpg' className="img-fluid rounded" alt="..." style={{ height: 380, width: 600, objectFit: 'cover' }} />
        </div>
      </div>

      <h4 className='mt-3'><b>review</b></h4>

      <div className="row mt-3">

        <div className="col-12 col-md-4">
          <h5>overall rating</h5>
          <h2>
            <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
            <b> {spot.rating}</b>
          </h2>
          <h5>disekitar</h5>

          {spot?.arounds?.map((around) => (
            <div className={`card mb-3 ${around.rating > 4 && 'shadow'}`}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img style={{ width: 150, objectFit: 'cover' }} src={around.image} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <Link to={`/place/${around.slug}`} className="card-title">{around.name}</Link>
                    <p className="card-text text-truncate">{around.desc}</p>
                    <div>{ratingToStars(around.rating)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="col-12 col-md-8">
          <div className="d-flex justify-content-between pb-3">
            <h5>reviews</h5>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showModalAddReviewForm">Tulis</button>
          </div>

          <div className="d-flex flex-column gap-2">

            {!spot?.reviews?.length > 0 ?
              <>
                <p className='text-center'>Belum ada review</p>
              </>
              : spot?.reviews?.map((review, key) => (
                <div key={key} className={`card ${review.status === 1 && 'shadow'}`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="hstack gap-3">
                        <img src="https://lh3.googleusercontent.com/a-/ACB-R5RXtL16zjSdqZBXI1KPzv9Ury-8Jf4-n4s_zVN8iw=w36-h36-p-c0x00000000-rp-mo-ba3-br100" alt="" />
                        <div className="vstack">
                          <span>{review.name}</span>
                          <div>
                            {ratingToStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="hstack">
                        {review.status > 0 &&
                          <span className="shadow-sm badge rounded-pill text-bg-light">
                            <div className="hstack gap-3">
                              <span>Verified</span>
                              <i className="bi bi-patch-check-fill" style={{ color: 'red' }}></i>
                            </div>
                          </span>
                        }
                      </div>
                    </div>
                    <p className='mt-3'>
                      {review.review}
                    </p>
                    <div className="d-flex flex-wrap flex-row align-items-stretch gap-1">
                      <img onClick={(e) => showImageReview(e)} style={{ width: 150, height: 150, objectFit: 'cover', cursor: 'pointer' }} className='rounded' src={review.image} alt={spot.review} />
                    </div>
                  </div>
                </div>
              ))}

            {/* <div className="card shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="hstack gap-3">
                    <img className='rounded-circle' style={{ width: 40, height: 40, objectFit: 'cover' }} src="https://asset.tabloidbintang.com/files/indah-kusuma-2-ari.jpg" alt="" />
                    <div className="vstack">
                      <span>Indah Kusuma</span>
                      <div>
                        <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                        <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                        <i className="bi bi-star-half" style={{ color: 'yellow' }}></i>
                      </div>
                    </div>
                  </div>
                  <div className="hstack">
                    <span className="shadow-sm badge rounded-pill text-bg-light">
                      <div className="hstack gap-3">
                        <span>Verified</span>
                        <i className="bi bi-patch-check-fill" style={{ color: 'red' }}></i>
                      </div>
                    </span>
                  </div>
                </div>
                <p className='mt-3'>
                  This place is really suitable for meetings or casual hanging out, but for WFC it might be a bit uncomfortable. The food and drink menu is a bit pricey but ok. For the photobooth it was not ok because the camera lens was dirty so there were smudges on the physical photos.
                </p>
                <div className="d-flex flex-wrap flex-row align-items-stretch gap-1">
                  <img onClick={(e) => showImageReview(e)} style={{ width: 150, height: 150, objectFit: 'cover', cursor: 'pointer' }} className='rounded' src="https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2022/08/05/292005621_1360417934369270_67628-20220805114512.jpg" alt="" />
                  <img onClick={(e) => showImageReview(e)} style={{ width: 150, height: 150, objectFit: 'cover', cursor: 'pointer' }} className='rounded' src="https://assets-pergikuliner.com/V7KSJyD5OxmZrvS6XK5ayJusAaA=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/2546194/picture-1656670662.jpg" alt="" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="hstack gap-3">
                    <img src="https://lh3.googleusercontent.com/a-/ACB-R5RXtL16zjSdqZBXI1KPzv9Ury-8Jf4-n4s_zVN8iw=w36-h36-p-c0x00000000-rp-mo-ba3-br100" alt="" />
                    <div className="vstack">
                      <span>Faishal Zufari</span>
                      <div>
                        <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                        <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                        <i className="bi bi-star-half" style={{ color: 'yellow' }}></i>
                      </div>
                    </div>
                  </div>
                  <div className="hstack">
                    <span className="shadow-sm badge rounded-pill text-bg-light">
                      <div className="hstack gap-3">
                        <span>Verified</span>
                        <i className="bi bi-patch-check-fill" style={{ color: 'red' }}></i>
                      </div>
                    </span>
                  </div>
                </div>
                <p className='mt-3'>
                  This place is really suitable for meetings or casual hanging out, but for WFC it might be a bit uncomfortable. The food and drink menu is a bit pricey but ok. For the photobooth it was not ok because the camera lens was dirty so there were smudges on the physical photos.
                </p>
                <div className="d-flex flex-wrap flex-row align-items-stretch gap-1">
                  <img onClick={(e) => showImageReview(e)} style={{ width: 150, height: 150, objectFit: 'cover', cursor: 'pointer' }} className='rounded' src="https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2022/08/05/292005621_1360417934369270_67628-20220805114512.jpg" alt="" />
                  <img onClick={(e) => showImageReview(e)} style={{ width: 150, height: 150, objectFit: 'cover', cursor: 'pointer' }} className='rounded' src="https://assets-pergikuliner.com/V7KSJyD5OxmZrvS6XK5ayJusAaA=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/2546194/picture-1656670662.jpg" alt="" />
                </div>
              </div>
            </div> */}

          </div>
        </div>

      </div>

      {/* Modal */}

      <div className="modal fade" id="showModalImageReview" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <img className='img-fluid' src={srcImage} alt="" />
          </div>
        </div>
      </div>

      <div className="modal fade" id="showModalAddReviewForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="mb-3 text-center">
                <Rating
                  onClick={handleRating}
                />
              </div>
              <div className="mb-3">
                <textarea value={review} onChange={(e) => setReview(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Ceritain pengalaman kamu...'></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Tambah foto</label>
                <input onChange={(e) => handleFileEvent(e)} className="form-control" type="file" accept='image/png, image/jpeg' id="formFileMultiple" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={() => addReview({ reviewImg, rating, review })} type="button" className="btn btn-primary">Tambah</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPlace;
