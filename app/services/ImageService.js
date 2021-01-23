export const ImageService = {
    async loadImage(url){
        return new Promise((resolve, reject) => {
            const imageElement = new Image();
            imageElement.onload = () => {
                resolve(url);
            }
            imageElement.onerror = () => {
                reject(url);
            }
            imageElement.src = url;
        })
    },
    async loadImageAll(urlList){
        return Promise.all( urlList.map(ImageService.loadImage) )
    }
}