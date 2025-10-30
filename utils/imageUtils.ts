export const applyWatermark = (baseImageBase64: string, watermarkImageBase64: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const baseImage = new Image();
    baseImage.src = `data:image/png;base64,${baseImageBase64}`;
    baseImage.onload = () => {
      const watermarkImage = new Image();
      watermarkImage.src = `data:image/png;base64,${watermarkImageBase64}`;
      watermarkImage.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = baseImage.width;
        canvas.height = baseImage.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context'));
        }

        // Draw base image
        ctx.drawImage(baseImage, 0, 0);

        // Calculate watermark size and position
        const padding = canvas.width * 0.05; // 5% padding
        const maxWatermarkWidth = canvas.width * 0.2; // Max 20% of canvas width
        const maxWatermarkHeight = canvas.height * 0.2; // Max 20% of canvas height
        
        let watermarkWidth = watermarkImage.width;
        let watermarkHeight = watermarkImage.height;

        if (watermarkWidth > maxWatermarkWidth) {
          watermarkHeight = (maxWatermarkWidth / watermarkWidth) * watermarkHeight;
          watermarkWidth = maxWatermarkWidth;
        }
        if (watermarkHeight > maxWatermarkHeight) {
          watermarkWidth = (maxWatermarkHeight / watermarkHeight) * watermarkWidth;
          watermarkHeight = maxWatermarkHeight;
        }
        
        const x = canvas.width - watermarkWidth - padding;
        const y = canvas.height - watermarkHeight - padding;

        // Draw watermark
        ctx.globalAlpha = 0.8; // Set opacity
        ctx.drawImage(watermarkImage, x, y, watermarkWidth, watermarkHeight);
        
        // Resolve with new image
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl.split(',')[1]);
      };
      watermarkImage.onerror = (err) => reject(err);
    };
    baseImage.onerror = (err) => reject(err);
  });
};
