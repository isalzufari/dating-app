const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const urlToBase64 = (url) => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }));

const toRupiah = (number) => {
  const convert = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    currency: "IDR"
  }).format(number)
  return `Rp ${convert}`
}

const ratingToStars = (rating) => {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i key={i} className="bi bi-star-fill" style={{ color: 'yellow' }}></i>)
  }
  return stars;
}

export { toBase64, urlToBase64, toRupiah, ratingToStars };
