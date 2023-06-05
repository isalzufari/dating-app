import React, { useState } from 'react';
import { urlToBase64, toBase64 } from '../../utils';
import api from '../../utils/api';

const Profile = ({ authUser, signOut }) => {
  const [updateAuth, setUpdateAuth] = useState({
    name: '',
    image: '',
    old_password: '',
    new_password: ''
  });

  const handleFileEvent = async (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0]
    const base64Image = await toBase64(file);
    setUpdateAuth({ ...updateAuth, image: base64Image });
  }

  const handleUpdateProfile = async () => {
    setUpdateAuth({
      ...updateAuth,
      name: updateAuth.name ? updateAuth.name : authUser.name,
      image: updateAuth.image ? updateAuth.image : await urlToBase64(authUser.image)
    });
    const { name, image, old_password, new_password } = updateAuth;
    if (!old_password.length && !new_password.length) return alert("password belum diisi");

    const updatedProfile = await api.updateProfile({ name, image, old_password, new_password });

    const { status, message } = updatedProfile;

    if (status !== 'success') {
      return alert(message);
    }

    alert(message);
    setUpdateAuth({
      name: updateAuth.name,
      image: updateAuth.image,
      old_password: '',
      new_password: ''
    });
  }

  const handleDeleteProfile = async () => {
    const { old_password } = updateAuth;
    if (!old_password) return alert('password belum diisi');

    const deletedProfile = await api.softDeleteProfile({ old_password });

    const { status, message } = deletedProfile;

    if (status !== 'success') {
      return alert(message);
    }

    alert(message);
    setUpdateAuth({ ...updateAuth, old_password: '' });
    if (window.confirm("refresh browser?")) {
      window.location.reload();
    }
    signOut();
    window.location.reload();
    // const myModal = new bootstrap.Modal('#showModalDelete');
    // myModal.hide()

    // const myModalEl = document.getElementById('showModalDelete')
    // myModalEl.addEventListener('hide.bs.modal', event => {
    //   alert('tutup')
    // })

    // var myModalEl = document.getElementById('showModalDelete');
    // var modal = bootstrap.Modal.getInstance(myModalEl);
    // modal.hide();
  }

  return (
    <>
      <div className='row shadow p-5 rounded'>
        <div className="col-3">
          <img className='img-fluid rounded' style={{ height: 200, width: '-webkit-fill-available', objectFit: 'cover' }} src={updateAuth.image ? updateAuth.image : authUser.image} alt={authUser.name} />
          <div className='mt-3'>
            <label htmlFor="formUploadImage" className="form-label">Ubah foto</label>
            <input onChange={(e) => handleFileEvent(e)} className="form-control form-control-sm" type="file" accept='image/png, image/jpeg' id="formUploadImage" />
          </div>
        </div>
        <div className="col-9 mt-3">
          <div className='d-flex justify-content-between'>
            <p>Verifikasi: {' '}
              <span class={`badge text-bg-${authUser.status > 0 ? 'success' : 'warning'}`}>
                {authUser.status > 0 ? 'terverifikasi' : 'belum terverifikasi'}
              </span>
            </p>
            {/* <button className='btn btn-primary'>Verifikasi</button> */}
          </div>
          <div className="mb-3">
            <input onChange={(e) => setUpdateAuth({ ...updateAuth, name: e.target.value })} value={updateAuth.name ? updateAuth.name : authUser.name} type='text' className="form-control" placeholder='nama' />
          </div>
          <div className="mb-3">
            <input value={authUser.email} type='text' className="form-control" disabled />
          </div>
          <div className="mb-3">
            <input onChange={(e) => setUpdateAuth({ ...updateAuth, old_password: e.target.value })} value={updateAuth.old_password} type='text' className="form-control" placeholder='password lama' />
          </div>
          <div className="mb-3">
            <input onChange={(e) => setUpdateAuth({ ...updateAuth, new_password: e.target.value })} value={updateAuth.new_password} type='text' className="form-control" placeholder='password baru' />
          </div>
          <div className="mb-3">
            <div className='d-flex gap-2 justify-content-end'>
              <button onClick={() => handleUpdateProfile()} className='btn btn-warning'>
                <i class="bi bi-pencil-square"></i>
              </button>
              <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#showModalDelete">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div >

      <div className="modal fade" id="showModalDelete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="mb-3">
                <input onChange={(e) => setUpdateAuth({ ...updateAuth, old_password: e.target.value })} value={updateAuth.old_password} type='text' className="form-control" placeholder='password lama' />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={() => handleDeleteProfile()} type="button" className="btn btn-primary">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile