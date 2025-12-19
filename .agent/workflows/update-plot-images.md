---
description: Update plot pictures and images
---

# Update Plot Pictures Workflow

This workflow guides you through updating plot images using direct database access and Cloudinary.

## Prerequisites

- Access to Cloudinary account (credentials in `.env`)
- Database access (Prisma)
- Plot ID you want to update

## Step 1: Upload New Images to Cloudinary

// turbo
```bash
# Start Node REPL for script execution
node
```

## Step 2: Upload and Link Images

```javascript
const cloudinary = require('cloudinary').v2;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Configure Cloudinary (credentials from .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload a single image
async function uploadPlotImage(plotId, imagePath, displayOrder = 0) {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'tnplots',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });
    
    // Create database record
    const image = await prisma.plotImage.create({
      data: {
        plotId: plotId,
        url: result.secure_url,
        publicId: result.public_id,
        displayOrder: displayOrder
      }
    });
    
    console.log('Image uploaded:', image);
    return image;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

// Example: Upload image for plot
await uploadPlotImage('PLOT_ID_HERE', '/path/to/image.jpg', 0);
```

## Step 3: Update Existing Image URLs

```javascript
// Update an existing image URL
async function updatePlotImage(imageId, newImagePath) {
  const existingImage = await prisma.plotImage.findUnique({
    where: { id: imageId }
  });
  
  if (existingImage) {
    // Delete old image from Cloudinary
    await cloudinary.uploader.destroy(existingImage.publicId);
    
    // Upload new image
    const result = await cloudinary.uploader.upload(newImagePath, {
      folder: 'tnplots',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });
    
    // Update database
    const updated = await prisma.plotImage.update({
      where: { id: imageId },
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });
    
    console.log('Image updated:', updated);
    return updated;
  }
}

// Example usage
await updatePlotImage('IMAGE_ID_HERE', '/path/to/new-image.jpg');
```

## Step 4: Reorder Images

```javascript
// Change display order of images
async function reorderPlotImages(plotId, imageOrderArray) {
  // imageOrderArray should be like: [{id: 'img1', order: 0}, {id: 'img2', order: 1}]
  
  for (const item of imageOrderArray) {
    await prisma.plotImage.update({
      where: { id: item.id },
      data: { displayOrder: item.order }
    });
  }
  
  console.log('Images reordered successfully');
}

// Example
await reorderPlotImages('PLOT_ID', [
  { id: 'img1_id', order: 0 },
  { id: 'img2_id', order: 1 },
  { id: 'img3_id', order: 2 }
]);
```

## Step 5: Delete Image

```javascript
async function deletePlotImage(imageId) {
  const image = await prisma.plotImage.findUnique({
    where: { id: imageId }
  });
  
  if (image) {
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);
    
    // Delete from database
    await prisma.plotImage.delete({
      where: { id: imageId }
    });
    
    console.log('Image deleted successfully');
  }
}

// Example
await deletePlotImage('IMAGE_ID_HERE');
```

## Step 6: Exit REPL

```javascript
// Close Prisma connection and exit
await prisma.$disconnect();
process.exit();
```

## Quick Reference

**List all images for a plot:**
```javascript
const images = await prisma.plotImage.findMany({
  where: { plotId: 'PLOT_ID' },
  orderBy: { displayOrder: 'asc' }
});
console.table(images);
```

**Bulk upload multiple images:**
```javascript
const imagePaths = ['/path/1.jpg', '/path/2.jpg', '/path/3.jpg'];
for (let i = 0; i < imagePaths.length; i++) {
  await uploadPlotImage('PLOT_ID', imagePaths[i], i);
}
```
