import { phpApi } from '@/lib/api';

/**
 * Extracts a region from an image, converts it to WebP, and uploads it via PHP backend.
 * @param imageElement - The HTMLImageElement containing the original image.
 * @param cropDetails - Details about the transformation.
 * @param containerSize - The size of the canvas container.
 * @param fileName - Optional base name for the file.
 * @returns A Promise resolving to the public URL of the uploaded image.
 */
export const processAndUploadImage = async (
  imageElement: HTMLImageElement,
  cropDetails: { width: number; height: number; x: number; y: number },
  containerSize: number,
  fileName: string = 'product_image'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = containerSize;
    canvas.height = containerSize;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return reject(new Error('Failed to create canvas context'));
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      imageElement,
      0,
      0,
      imageElement.naturalWidth,
      imageElement.naturalHeight,
      cropDetails.x,
      cropDetails.y,
      cropDetails.width,
      cropDetails.height
    );

    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          return reject(new Error('Canvas to Blob conversion failed'));
        }

        try {
          const uniqueFileName = `${fileName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.webp`;
          const file = new File([blob], uniqueFileName, { type: 'image/webp' });
          const token = localStorage.getItem('admin_token') || 'temp-token';
          const publicUrl = await phpApi.uploadImage(file, token);

          resolve(publicUrl);
        } catch (error) {
          reject(error);
        }
      },
      'image/webp',
      0.8 // 80% quality
    );
  });
};
