const isBase64 = require('is-base64');
const base64Img = require('base64-img');

const base64ToImg = async (imageBase64) => {
  return new Promise((resolve, reject) => {
    if (!isBase64(imageBase64, { mimeRequired: true })) {
      throw new InvariantError('Review gagal ditambahkan: Invalid base64')
    }

    base64Img.img(imageBase64, './public/images', Date.now(), async (err, filepath) => {
      if (err) {
        reject(err);
        throw new InvariantError('Review gagal ditambahkan: base64Img')
      }

      const filename = filepath.split("\\").pop().split("/").pop();
      resolve(filename);
    });
  })
}

module.exports = {
  base64ToImg
}