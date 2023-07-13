import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { toRupiah } from '../utils';

const Place = () => {
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [spots, setSpots] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [idRegionByParams, setIdRegion] = useState();

  useEffect(() => {
    const idRegion = searchParams.get('regions');
    setIdRegion(Number(idRegion));
    onArea(idRegion);
    onSpotsByRegion(idRegion);
    onSpots();
    onRegion();
  }, [idRegionByParams]);

  const onRegion = async () => {
    const data = await api.getRegion();
    setRegions(data);
  }

  const onArea = async (id) => {
    if (!Number(id)) {
      onSpots();
      return;
    };
    const spots = await api.getSpotsByIdRegion({ id })
    setSpots(spots);
    const data = await api.getAreaByIdRegion({ id });
    setAreas(data);
  }

  const onSpots = async () => {
    const data = await api.getSpots();
    setSpots(data);
  }

  const onSpotsByArea = async (id) => {
    if (!Number(id)) {
      onSpots();
      return;
    };
    const data = await api.getSpotsByIdArea({ id });
    setSpots(data);
  }

  const onSpotsByRegion = async (id) => {
    if (!Number(id)) {
      onSpots();
      return;
    };
    const data = await api.getSpotsByIdRegion({ id });
    setSpots(data);
  }

  return (
    <>
      {/* Search Bar */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div class="row g-3">
            <div class="col-sm">
              <label class="visually-hidden" for="autoSizingSelect">Preference</label>
              <select onChange={((e) => onArea(e.target.value))} class="form-select" id="autoSizingSelect">
                <option selected>Daerah</option>
                {regions.map((region, key) => (
                  <option
                    key={key}
                    selected={region.id_region === idRegionByParams}
                    value={region.id_region}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div class="col-sm">
              <label class="visually-hidden" for="autoSizingSelect">Preference</label>
              <select onChange={((e) => onSpotsByArea(e.target.value))} class="form-select" id="autoSizingSelect">
                <option selected>Area</option>
                {areas.map((area, key) => (
                  <option key={key} value={area.id_location}>{area.area}</option>
                ))}
              </select>
            </div>

            {/* <div class="col-sm">
              <label class="visually-hidden" for="autoSizingSelect">Preference</label>
              <select class="form-select" id="autoSizingSelect">
                <option selected>Pilih</option>
                <option value="1">Kulineran</option>
                <option value="2">Mall</option>
                <option value="3">Cafe</option>
                <option value="3">Taman</option>
                <option value="3">Perpus</option>
              </select>
            </div> */}
          </div>
        </div>
      </div >

      {/* <h4 className='mb-3'>Tempat Populer</h4> */}


      {!spots?.length > 0 ?
        <>
          <p className='text-center h5 mt-5'>Spot belum ada</p>
          <p className='text-center'> mau tambah spot? <Link to="/app/login">login</Link></p>
        </>
        :
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5" >
          {spots.map((spot, key) => (
            <div key={key} className='col mb-3'>
              <Link to={`/place/${spot.slug}`} className='text-decoration-none text-dark'>
                <div className="card position-relative">
                  {spot.label !== "" &&
                    <span style={{ left: 85 + '%' }} class="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                      {spot.label}
                    </span>
                  }
                  <img src={spot.image} class="card-img" alt={spot.name} style={{ objectFit: 'cover', height: 180 }} />
                  <div className="card-body">
                    <small className='float-end'>
                      {spot.area}{' '}
                      <i className="bi bi-geo-alt"></i>
                    </small>
                    <h5 className="h6 card-title text-truncate"><b>{spot.name}</b></h5>
                    <p className="card-text text-truncate">{spot.desc}</p>
                    <span className='float-end'>
                      <small>dari </small>
                      <span className='badge text-bg-danger'>{toRupiah(spot.price)}</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div >
      }

      {/* <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
          <Link to='/place/dekhad-gandaria' className='text-decoration-none text-dark'>
            <div className="card position-relative">
              <span style={{ left: 85 + '%' }} class="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                Trendsetter
                <span class="visually-hidden">unread messages</span>
              </span>
              <img src="https://lh3.googleusercontent.com/p/AF1QipPIZ_dkQQt-PalTvzgcEVY0xr-yT7V4B6KMBX7x=s680-w680-h510" class="card-img" alt="..." style={{ objectFit: 'cover', height: 180 }} />
              <div className="card-body">
                <small className='float-end'>
                  Kby Baru{' '}
                  <i className="bi bi-geo-alt"></i>
                </small>
                <h5 className="card-title">Dekhad Gandaria</h5>
                <p className="card-text text-truncate">As a hub for people and communities, gathering an array of lifestyle brands and noticeable presence through its dynamic communal spot that anchors on an interactive concept.</p>
                <p className='float-end'>
                  <small>dari </small>
                  <span className='badge text-bg-danger'>IDR 25.000 - 100.000</span>
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
          <Link to='/place/dekhad-gandaria' className='text-decoration-none text-dark'>
            <div className="card position-relative">
              <span style={{ left: 85 + '%' }} class="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                Hidden Gem
                <span class="visually-hidden">unread messages</span>
              </span>
              <img src="https://asset.kompas.com/crops/3sSP6Iz49CG1GWMdfSiqwtOcAsA=/0x15:656x343/780x390/data/photo/2022/11/16/6374712c933fa.png" class="card-img" alt="..." style={{ objectFit: 'cover', height: 180 }} />
              <div className="card-body">
                <small className='float-end'>
                  Fatmawati{' '}
                  <i className="bi bi-geo-alt"></i>
                </small>
                <h5 className="card-title">Sore Izakaya</h5>
                <p className="card-text text-truncate">Japanese izakaya style restaurant.</p>
                <p className='float-end'>
                  <small>dari </small>
                  <span className='badge text-bg-danger'>IDR 35.000 - 150.000</span>
                </p>
              </div>
            </div>
          </Link>
        </div> */}



      {/* <h4 className='my-3'>Tempat Populer di Kota</h4>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card text-bg-dark">
            <img src="https://cdn-brilio-net.akamaized.net/community/thumbnail/2022/02/08/image_1644323885_6202642d49e8f.jpg" class="card-img" alt="..." />
            <div className="card-img-overlay">
              <h5 className="card-title">Jakarta Selatan</h5>
              <p className="card-text">Jakarta Selatan adalah salah satu dari lima Kota Administrasi di DKI Jakarta. Di sebelah Utara, Jakarta Selatan berbatasan dengan Jakarta Barat dan Jakarta Pusat</p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Place;
