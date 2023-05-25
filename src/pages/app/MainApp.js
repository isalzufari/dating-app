import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as bootstrap from 'bootstrap'

const Main = () => {

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h1 className="h5">review kamu</h1>
              <Link to="/app/reviews" className='btn btn-primary text-light'>semua</Link>
            </div>

            <Link to='/place/dekhad-gandaria' className='text-decoration-none text-dark'>
              <div className="card">
                <div className="card-body">
                  <div className="hstack gap-3">
                    <img style={{ width: 100, height: 100, objectFit: 'cover' }} className='rounded' src="https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2022/08/05/292005621_1360417934369270_67628-20220805114512.jpg" alt="" />
                    <div>
                      <h5 class="card-title">Dekhad Gandaria</h5>
                      <p class="card-text text-truncate">Ini komentar</p>
                      <div>
                        <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                        <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                        <i className="bi bi-star-half" style={{ color: 'yellow' }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

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

            <Link to='/place/dekhad-gandaria' className='text-decoration-none text-dark'>
              <div className="card">
                <div className="card-body">
                  <div className="hstack gap-3">
                    <img style={{ width: 100, height: 100, objectFit: 'cover' }} className='rounded' src="https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2022/08/05/292005621_1360417934369270_67628-20220805114512.jpg" alt="" />
                    <div>
                      <h5 class="card-title">Dekhad Gandaria</h5>
                      <p class="card-text text-truncate">"As a hub for people and communities"</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Main