module.exports = {
    cutDownImg(img) {
        if (img.indexOf('https://cloud-minapp-30668.cloud.ifanrusercontent.com/') > -1) {
            return img + '!/both/240x240'
        }
        return img;
    },
    backImg(img) {
        return img.replace("!/both/240x240","")
    }
}