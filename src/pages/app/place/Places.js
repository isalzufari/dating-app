import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../utils/api';
import { toBase64, urlToBase64 } from '../../../utils';

const Places = () => {
  const [spots, setSpots] = useState([]);
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [labels, setLabels] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [addSpot, setAddSpot] = useState({
    name: '',
    image: '',
    desc: '',
    price: '',
    facility: [],
    id_label: 0,
    id_location: 0,
  });

  useEffect(() => {
    const getSpots = async () => {
      const spots = await api.getSpotsLoggedIn();
      const regions = await api.getRegion();
      const facilities = await api.getFacilities();
      const labels = await api.getLabelSpot();
      console.log(spots);
      setRegions(regions);
      setSpots(spots);
      setFacilities(facilities)
      setLabels(labels);
    }
    getSpots();
  }, []);

  const onHandleChangeRegion = async ({ id_region: id }) => {
    if (!Number(id)) return;
    const areas = await api.getAreaByIdRegion({ id })
    setAreas(areas);
  }

  const handleFileEvent = async (e) => {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 1048576) {
      alert("File is to big");
    }
    const file = e.target.files[0];
    const base64Image = await toBase64(file);
    setAddSpot({ ...addSpot, image: base64Image });
  }

  const onHandleDelete = async ({ id_spot }) => {
    const data = await api.deleteSpot({ id_spot });

    const { status } = data;

    if (status === 'success') {
      alert(status);
    }
  }

  const onHandleAdd = async () => {
    const { name, image, desc, price, facility, id_location, id_label } = addSpot;
    const data = await api.addSpot({ name, image, desc, price, facility, id_location, id_label })

    const { status } = data;

    if (status === 'success') {
      alert(status);
    }
  }

  const onUpdateModal = async ({ spot }) => {
    setAddSpot({
      ...spot,
      image: await urlToBase64(spot.image),
      facility: [],
    });
    console.log(addSpot);
  }

  const updateSpot = async () => {
    console.log(addSpot);
    const { id: id_spot, name, image, desc, price, facility, id_location, id_label } = addSpot;
    console.log({ id_spot, name, image, desc, price, facility, id_location, id_label });

    const data = await api.editSpot({ id_spot, name, image, desc, price, facility, id_location, id_label });

    const { status, message } = data;

    if (status === 'success') {
      alert(message);
      setAddSpot({
        name: '',
        image: '',
        desc: '',
        price: '',
        facility: [],
        id_label: 0,
        id_location: 0,
      });
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between pb-3">
        <h4>spot</h4>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showModalAddSpotForm">
          tambah
        </button>
      </div>

      <div className="d-flex flex-column gap-2">

        {spots?.map((spot, key) => (
          <div key={key} className="card shadow">
            <div className="card-body">


              <div className="row">
                <div className="col-4 col-md-2">
                  <img src={spot.image} className="img-fluid rounded" alt={spot.name} style={{ height: 180, width: '-webkit-fill-available', objectFit: 'cover' }} />
                </div>

                <div className='col-8 col-md-10'>
                  <div className="d-flex justify-content-between">
                    <Link to={`/place/${spot.slug}`} className='h5'><b>{spot.name}</b></Link>
                    <div className='d-flex gap-2'>
                      <button onClick={() => onUpdateModal({ spot })} className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#showModalUpdateSpotForm">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button onClick={() => onHandleDelete({ id_spot: spot.id })} className='btn btn-danger'>
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                  <p><small className='text-muted'>{spot.region}, {spot.area}</small></p>
                  <p>{spot.desc}</p>
                  <span className='h6'>review</span>
                  <div className="d-flex gap-3">
                    <div className="gap-3">
                      <i className="bi bi-star-fill" style={{ color: 'yellow' }}></i>
                      <b> {spot.rating}</b>
                    </div>
                    <div className="gap-3">
                      <i class="bi bi-people-fill"></i>
                      <b> {spot.totalReview}</b>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>

      <div className="modal fade" id="showModalAddSpotForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="mb-3">
                <input value={addSpot.name} onChange={(e) => setAddSpot({ ...addSpot, name: e.target.value })} type='text' className="form-control" id="exampleFormControlTextarea1" placeholder='nama' />
              </div>
              <div className="mb-3">
                <textarea value={addSpot.desc} onChange={(e) => setAddSpot({ ...addSpot, desc: e.target.value })} type='text' className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='deskripsi'></textarea>
              </div>
              <div class="row g-3 mb-3">
                <div class="col">
                  <input value={addSpot.price} onChange={(e) => setAddSpot({ ...addSpot, price: Number(e.target.value) })} type="number" min={0} class="form-control" placeholder="harga" aria-label="First name" />
                </div>
                <div class="col">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                      Fasilitas
                    </button>
                    <ul class="dropdown-menu">
                      {facilities?.map((facility, key) => (
                        <li key={key} className='dropdown-item'>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={facility.id} id="flexCheckDefault"
                              onChange={(e) => setAddSpot({
                                ...addSpot,
                                facility: e.target.checked ? [...addSpot.facility, Number(e.target.value)]
                                  : [...addSpot.facility.filter((f) => f !== Number(e.target.value))]
                              })}
                            />
                            <label class="form-check-label" for="flexCheckDefault">
                              {facility.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div class="col">
                  <select onChange={(e) => setAddSpot({ ...addSpot, id_label: Number(e.target.value) ? Number(e.target.value) : 0 })} class="form-select" aria-label="Default select example">
                    <option selected>Label</option>
                    {labels.map((label, key) => (
                      <option key={key} value={label.id}>{label.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="row g-3 mb-3">
                <div class="col">
                  <select onChange={(e) => onHandleChangeRegion({ id_region: e.target.value })} class="form-select" aria-label="Default select example">
                    <option selected>Daerah</option>
                    {regions?.map((region, key) => (
                      <option key={key} value={region.id_region}>{region.name}</option>
                    ))}
                  </select>
                </div>
                <div class="col">
                  <select disabled={!areas?.length > 0} onChange={(e) => setAddSpot({ ...addSpot, id_location: Number(e.target.value) ? Number(e.target.value) : 0 })} class="form-select" aria-label="Default select example">
                    <option selected>Area</option>
                    {areas?.map((area, key) => (
                      <option key={key} value={area.id_location}>{area.area}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Ubah foto</label>
                <input onChange={(e) => handleFileEvent(e)} className="form-control" type="file" accept='image/png, image/jpeg' id="formFileMultiple" />
              </div>
              <div className="mb-3">
                <img style={{ height: 200, width: '-webkit-fill-available', objectFit: 'cover' }} className='img-fluid rounded shadow' src={addSpot.image} alt={addSpot.name} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={onHandleAdd} type="button" className="btn btn-primary">Tambah</button>
            </div>
          </div>
        </div>
      </div >

      <div className="modal fade" id="showModalUpdateSpotForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="mb-3">
                <input value={addSpot.name} onChange={(e) => setAddSpot({ ...addSpot, name: e.target.value })} type='text' className="form-control" id="exampleFormControlTextarea1" placeholder='nama' />
              </div>
              <div className="mb-3">
                <textarea value={addSpot.desc} onChange={(e) => setAddSpot({ ...addSpot, desc: e.target.value })} type='text' className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='deskripsi'></textarea>
              </div>
              <div class="row g-3 mb-3">
                <div class="col">
                  <input value={addSpot.price} onChange={(e) => setAddSpot({ ...addSpot, price: Number(e.target.value) })} type="number" min={0} class="form-control" placeholder="harga" aria-label="First name" />
                </div>
                <div class="col">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                      Fasilitas
                    </button>
                    <ul class="dropdown-menu">
                      {facilities?.map((facility, key) => (
                        <li key={key} className='dropdown-item'>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={facility.id} id="flexCheckDefault"
                              onChange={(e) => setAddSpot({
                                ...addSpot,
                                facility: e.target.checked ? [...addSpot.facility, Number(e.target.value)]
                                  : [...addSpot.facility.filter((f) => f !== Number(e.target.value))]
                              })}
                            />
                            <label class="form-check-label" for="flexCheckDefault">
                              {facility.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div class="col">
                  <select onChange={(e) => setAddSpot({ ...addSpot, id_label: Number(e.target.value) ? Number(e.target.value) : 0 })} class="form-select" aria-label="Default select example">
                    <option selected>Label</option>
                    {labels.map((label, key) => (
                      <option key={key} value={label.id}>{label.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="row g-3 mb-3">
                <div class="col">
                  <select onChange={(e) => onHandleChangeRegion({ id_region: e.target.value })} class="form-select" aria-label="Default select example">
                    <option selected>{addSpot?.region}</option>
                    {regions?.map((region, key) => (
                      <option key={key} value={region.id_region}>{region.name}</option>
                    ))}
                  </select>
                </div>
                <div class="col">
                  <select disabled={!areas?.length > 0} onChange={(e) => setAddSpot({ ...addSpot, id_location: Number(e.target.value) ? Number(e.target.value) : 0 })} class="form-select" aria-label="Default select example">
                    <option selected>{addSpot?.area}</option>
                    {areas?.map((area, key) => (
                      <option key={key} value={area.id_location}>{area.area}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Ubah foto</label>
                <input onChange={(e) => handleFileEvent(e)} className="form-control" type="file" accept='image/png, image/jpeg' id="formFileMultiple" />
              </div>
              <div className="mb-3">
                <img style={{ height: 200, width: '-webkit-fill-available', objectFit: 'cover' }} className='img-fluid rounded shadow' src={addSpot.image} alt={addSpot.name} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={updateSpot} type="button" className="btn btn-primary">Tambah</button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Places;
