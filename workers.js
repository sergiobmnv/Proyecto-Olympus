
self.onmessage = async function (e) {
    const imageUrls = e.data;

    try {
        const loadedImages = await Promise.all(
            imageUrls.map(async (url) => {
                const response = await fetch(url);
                const blob = await response.blob();
                return URL.createObjectURL(blob); // Crea un URL para mostrar la imagen
            })
        );

        self.postMessage({ success: true, images: loadedImages });
    } catch (error) {
        self.postMessage({ success: false, error: error.message });
    }
};
