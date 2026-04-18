import { supabase } from '@/lib/supabase';

/**
 * Extracts a region from an image, converts it to WebP, and uploads it to Supabase immediately.
 * @param imageElement - The HTMLImageElement containing the original image.
 * @param cropDetails - Details about the transformation (scale and position relative to the 1:1 container).
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
    // 1. Create a canvas with the size of our normalizer container (e.g. 500x500 for a 1:1 ratio)
    const canvas = document.createElement('canvas');
    canvas.width = containerSize;
    canvas.height = containerSize;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return reject(new Error('Failed to create canvas context'));
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw the image according to the transformation
    // Note: react-rnd provides x, y, width, height for the image *within* the container.
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

    // 3. Export to WebP (80% quality)
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          return reject(new Error('Canvas to Blob conversion failed'));
        }

        try {
          // 4. Upload to Supabase Storage
          const uniqueFileName = `${fileName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.webp`;
          const filePath = `product-images/${uniqueFileName}`;

          const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, blob, {
              contentType: 'image/webp',
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            throw uploadError;
          }

          // 5. Get Public URL
          const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(filePath);

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
