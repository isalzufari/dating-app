import React from 'react'
import { Link } from 'react-router-dom'

const Places = () => {
  return (
    <>
      <div className="d-flex justify-content-between pb-3">
        <h4>spot</h4>
        <button type="button" class="btn btn-primary">
          tambah
        </button>
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
              <div className="col-12 col-md-3">
                <img src='https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2022/08/05/279367887_472208658017720_640675-20220805114503.jpg' className="img-fluid rounded" alt="..." style={{ height: 280, width: 600, objectFit: 'cover' }} />
              </div>

              <div className='col-12 col-md-8'>
                <h4><b>Dekhad Gandaria</b></h4>
                <small className='text-muted'>Kby. Baru, Kota Jakarta Selatan</small>
                <p className='mt-3'>"As a hub for people and communities, gathering an array of lifestyle brands and noticeable presence through its dynamic communal spot that anchors on an interactive concept."</p>
                <p>review</p>
                <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                <b> 3.5</b>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Places;
