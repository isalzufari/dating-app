import React from 'react'

const DetailLocation = () => {
  return (
    <>
      <div class="card">
        <img style={{ height: 300, objectFit: 'cover' }} src="https://bay.cove.sg/storage/media/2015/conversions/hero-kebayoran-baru-large.jpg" class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">Kebayoran Baru</h5>
          <p class="card-text">Kawasan ini dikenal dengan Blok M, kawasan yang ramai dengan sektor perumahan dan komersial yang tidak pernah berhenti hidup</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 col-md-4">
          <img style={{ height: 300, objectFit: 'cover' }} src="https://lh3.googleusercontent.com/gps-proxy/AE4_-5FoKPx2KFCIqSyCBZo9cn25tB560ZKxy81YtvMhrizpfljUF7xWPaec1gAn22_Pfu1jnLIJCfmhbi5Na41zgfMl_8F5mUPCIEeQ_y0RWiHZdrdKF6auExFhJeHNlAC3vuSPixPvG-KuSEqU9PYQf6VZ8R-CSFXayiHR_P56715SKuLvcrqGqZG8=w408-h272-k-no" className='img-fluid rounded' alt="..." />
        </div>
        <div className="col-12 col-md-8">
          <p><b>Rumah bagi kawasan perumahan dan komersial paling ramai di Jakarta Selatan, Blok M.</b></p>
          <p>Kebayoran Baru terdiri dari kawasan hunian yang terstruktur, pusat perbelanjaan, kawasan bisnis, dan didukung dengan fasilitas umum. Di daerah ini juga terdapat banyak lembaga pemerintahan penting, membuat kawasan ini sangat menarik untuk ditinggali.</p>
          <p>Area ini didukung oleh banyak tempat untuk berkunjung, mulai dari Pasar Mayestik, tempat toko tekstil dan penjahit, Pasar Taman Puring tempat toko sepatu dan pakaian, hingga karaoke, lounge, dan tempat makan lokal. Memiliki terminal bus dengan jalur yang melayani kota, lokasi strategis ini akan menjamin waktu tempuh yang singkat ke berbagai wilayah di Jakarta dan pusat bisnis.</p>
        </div>
      </div>
    </>
  )
}

export default DetailLocation;
