/**
 * Optimizes a Cloudinary URL by injecting transformation commands (f_auto, q_auto, sizes).
 * Falls back safely to the original URL if it's not a recognizable Cloudinary URL.
 *
 * @param {string} url - The original Cloudinary secure_url
 * @param {number} width - The target width to scale to
 * @param {number} height - The target height (optional)
 * @returns {string} The optimized URL
 */
export const getOptimizedCloudinaryUrl = (url, width, height) => {
    if (!url || typeof url !== 'string') return url;

    // We only inject if it's a structural Cloudinary URL with an "/upload/" segment
    if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
        return url;
    }

    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;

    const base = parts[0];
    const path = parts[1];

    // Build the transformation string
    let transformations = ['f_auto', 'q_auto:good'];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push('c_limit'); // Ensures we don't upscale

    const transformString = transformations.join(',');

    return `${base}/upload/${transformString}/${path}`;
};
