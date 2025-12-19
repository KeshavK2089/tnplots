import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
}

export async function uploadImage(
    file: File | string,
    folder: string = 'tnplots'
): Promise<UploadResult> {
    try {
        let uploadSource: string;

        if (typeof file === 'string') {
            uploadSource = file;
        } else {
            // Convert File to base64
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            uploadSource = `data:${file.type};base64,${buffer.toString('base64')}`;
        }

        const result = await cloudinary.uploader.upload(uploadSource, {
            folder,
            transformation: [
                { quality: 'auto', fetch_format: 'auto' },
                { width: 1200, height: 800, crop: 'limit' },
            ],
        });

        return {
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image');
    }
}

export async function deleteImage(publicId: string): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete image');
    }
}

export function getOptimizedImageUrl(
    publicId: string,
    options: {
        width?: number;
        height?: number;
        quality?: number | 'auto';
        format?: 'auto' | 'webp' | 'jpg' | 'png';
    } = {}
): string {
    const { width, height, quality = 'auto', format = 'auto' } = options;

    const transformations = [];

    if (width || height) {
        transformations.push({ width, height, crop: 'fill' });
    }

    transformations.push({ quality, fetch_format: format });

    return cloudinary.url(publicId, { transformation: transformations });
}
