import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as bootstrap from 'bootstrap'
import toBase64 from '../utils';

const DetailPlace = () => {
  const location = useLocation();
  const namePlace = location.pathname.split('/');
  const place = namePlace[2];

  const [srcImage, setSrcImage] = useState('');
  const [review, setReview] = useState('');
  const [reviewImg, setReviewImg] = useState([]);

  const showImageReview = (e) => {
    setSrcImage(e.target.src);
    new bootstrap.Modal('#showModalImageReview').show();
  }

  const handleFileEvent = async (e) => {
    const file = e.target.files[0]
    const base64Image = await toBase64(file);
    setReviewImg(base64Image);
  }

  const addReview = (e) => {
    console.log(review);
    console.log(reviewImg);
  }

  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <h4><b>Dekhad Gandaria</b></h4>
          <small className='text-muted'>Kby. Baru, Kota Jakarta Selatan</small>
          <p className='mt-3'>"As a hub for people and communities, gathering an array of lifestyle brands and noticeable presence through its dynamic communal spot that anchors on an interactive concept."</p>
          <h5><b>fasilitas</b></h5>
          <ul>
            <li>Stop Kontak</li>
            <li>Wifi</li>
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
            <b> 3.5</b>
          </h2>
          <h5>disekitar</h5>
          <div className="d-flex flex-columnd gap-2">

            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img style={{ width: 120, height: 120, objectFit: 'cover' }} src="https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2022/08/05/279367887_472208658017720_640675-20220805114503.jpg" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h6 className="card-title">TITIK TEMU</h6>
                    <p className="card-text text-truncate">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div>
                      <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                      <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                      <i className="bi bi-star-half" style={{ color: 'yellow' }}></i>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="col-12 col-md-8">
          <div className="d-flex justify-content-between pb-3">
            <h5>reviews</h5>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showModalAddReviewForm">Tulis</button>
          </div>

          <div className="d-flex flex-column gap-2">

            <div className="card shadow">
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

      <div className="modal fade" id="showModalAddReviewForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="mb-3">
                <textarea value={review} onChange={(e) => setReview(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Ceritain pengalaman kamu...'></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Tambah foto</label>
                <input onChange={(e) => handleFileEvent(e)} className="form-control" type="file" accept='image/png' id="formFileMultiple" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={(e) => addReview(e)} type="button" className="btn btn-primary">Tambah</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPlace;
