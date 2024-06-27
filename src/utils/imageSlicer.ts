
export async function sliceImageIntoUrls(imageUrl: string): Promise<string[]> {
    try {
        const response = await fetch(imageUrl, { 
            cache: 'no-store', // Forces the request to bypass the cache and re-fetch
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const imageBlob = await response.blob();

        const img = new Image();
        img.src = URL.createObjectURL(imageBlob);

        return new Promise((resolve, reject) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                if (!ctx) {
                  reject(new Error('Image loading error'));
                  return
                }

                ctx.drawImage(img, 0, 0);

                const squareWidth = img.width / 2;
                const squareHeight = img.height / 2;
                const urls: string[] = new Array(4).fill(null);

                let loaded = 0;
                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        const index = i * 2 + j;  // Calculate the index based on the row and column
                        const squareCanvas = document.createElement('canvas');
                        squareCanvas.width = squareWidth;
                        squareCanvas.height = squareHeight;
                        const squareCtx = squareCanvas.getContext('2d');
                        if (!squareCtx) {
                          reject(new Error('Image loading error'));
                          return
                        }
                        squareCtx.drawImage(canvas, j * squareWidth, i * squareHeight, squareWidth, squareHeight, 0, 0, squareWidth, squareHeight);

                        squareCanvas.toBlob((blob) => {
                            if (blob) {
                              urls[index] = URL.createObjectURL(blob);  // Place the URL in the correct order
                              loaded++;
                              if (loaded === 4) {
                                  resolve(urls);
                              }
                            }
                        }, 'image/png');
                    }
                }

                URL.revokeObjectURL(img.src);
            };

            img.onerror = () => {
                reject(new Error('Image loading error'));
            };
        });
    } catch (error) {
        console.error('Failed to slice image:', error);
        return Promise.reject(error);
    }
}
