import React, { useState } from 'react';
import * as bootstrap from 'bootstrap';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [srcImage, setSrcImage] = useState('');

  const showImageReview = (e) => {
    setSrcImage(e.target.src);
    new bootstrap.Modal('#showModalImageReview').show();
  }

  return (
    <>
      <div className="d-flex justify-content-between pb-3">
        <h4>reviews</h4>
      </div>

      <div className="d-flex flex-column gap-2">

        <div className="card shadow">
          <div className="card-body">

            <div className="d-flex justify-content-between">
              <Link to='/place/dekhad-gandaria'><b>Dekhad Gandaria</b></Link>
              <button className='btn btn-danger'>
                <i class="bi bi-trash3"></i>
              </button>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mb-3">
                <div className="d-flex gap-1">
                  <img onClick={(e) => showImageReview(e)} style={{ width: 150, height: 150, objectFit: 'cover', cursor: 'pointer' }} className='rounded' src="https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2022/08/05/292005621_1360417934369270_67628-20220805114512.jpg" alt="" />
                  <img onClick={(e) => showImageReview(e)} style={{ width: 150, height: 150, objectFit: 'cover', cursor: 'pointer' }} className='rounded' src="https://assets-pergikuliner.com/V7KSJyD5OxmZrvS6XK5ayJusAaA=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/2546194/picture-1656670662.jpg" alt="" />
                </div>
              </div>
              <div className="col-12 col-md-8">
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
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="modal fade" id="showModalImageReview" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <img className='img-fluid' src={srcImage} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Reviews