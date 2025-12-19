---
description: Complete guide for beginners to add new plot listings
---

# Add New Plot Listing - Complete Guide for Beginners

This guide walks you through adding a new plot listing to TNPlots from scratch. No prior experience needed!

## Prerequisites

✅ Plot details from the seller  
✅ Plot photos (minimum 3, recommended 5-8)  
✅ Computer with Node.js installed  
✅ Access to the TNPlots project folder  

---

## Part 1: Prepare Your Information

### Required Information Checklist

Print this checklist and fill it out before starting:

**Basic Details:**
- [ ] Plot Title (English): _________________________
- [ ] Village Name: _________________________
- [ ] District: _________________________
- [ ] Survey Number: _________________________

**Size & Pricing:**
- [ ] Size in Square Feet: _________________________
- [ ] Size in Cents (optional): _________________________
- [ ] Total Price (₹): _________________________
- [ ] Price per Sqft (₹): _________________________

**Category:** (check one)
- [ ] Residential
- [ ] Agricultural
- [ ] Commercial

**Location:**
- [ ] Latitude: _________________________
- [ ] Longitude: _________________________
- [ ] Distance from Main Road (km): _________________________
- [ ] Road Width (feet): _________________________

**Features:** (check all that apply)
- [ ] Road Access
- [ ] Electricity Available
- [ ] Water Supply
- [ ] Boundary Wall
- [ ] Clear Title/Documents
- [ ] Nearby School
- [ ] Nearby Hospital
- [ ] Public Transport Access

**Contact Information:**
- [ ] Seller Phone: _________________________
- [ ] Seller WhatsApp: _________________________

---

## Part 2: Prepare Your Photos

### Photo Requirements

**Minimum:** 3 photos  
**Recommended:** 5-8 photos  
**Format:** JPG or PNG  
**Size:** Under 5MB each  

### Photo Checklist

Take or collect these photos:
1. **Main/Featured Photo** - Best overview shot of the plot
2. **Entrance/Road Access** - Show how to reach the plot
3. **Boundaries** - Show at least 2 boundary sides
4. **Surroundings** - Nearby landmarks, roads, facilities
5. **Documents** (optional) - Survey map, title papers (if available)

### Organizing Photos

1. Create a folder on your Desktop named: `plot_[village]_[date]`
   - Example: `plot_periyapalayam_2024_01_15`

2. Rename your photos clearly:
   - `1_main_view.jpg` (This will be your featured image)
   - `2_entrance.jpg`
   - `3_boundary_north.jpg`
   - `4_boundary_south.jpg`
   - `5_surroundings.jpg`

> **Important:** The photo named `1_main_view.jpg` will automatically be set as the featured image!

---

## Part 3: Get GPS Coordinates

You need latitude and longitude for the map. Here's how to get them:

### Method 1: Using Google Maps (Easiest)

1. Open Google Maps in your browser: https://maps.google.com
2. Search for the plot location or nearby landmark
3. Right-click on the exact plot location
4. Click "What's here?" at the bottom
5. You'll see coordinates like: `12.9716, 79.8946`
   - First number = Latitude
   - Second number = Longitude
6. Write these down!

### Method 2: Using Your Phone

1. Open Google Maps app
2. Navigate to the plot location
3. Long-press on the plot location
4. A red pin will drop
5. Tap on the coordinates shown at the bottom
6. Copy or write down the numbers

> **Example:** For a plot in Tamil Nadu, coordinates might look like:  
> Latitude: `12.9716`  
> Longitude: `79.8946`

---

## Part 4: Add the Listing

### Step 1: Open Terminal/Command Prompt

**On Mac:**
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

**On Windows:**
- Press `Windows Key`
- Type "cmd"
- Press Enter

### Step 2: Navigate to Project Folder

```bash
cd ~/Desktop/TNPlots
```

> **Tip:** If your project is in a different location, replace the path accordingly.

### Step 3: Start Node.js

```bash
node
```

You should see a `>` prompt. This means you're ready!

### Step 4: Load Required Tools

Copy and paste this exactly:

```javascript
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const prisma = new PrismaClient();

// Configure Cloudinary (credentials already in .env file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('✅ Tools loaded successfully!');
```

Press Enter. You should see: `✅ Tools loaded successfully!`

### Step 5: Get Seller ID

First, we need to find the seller ID. Run this:

```javascript
const sellers = await prisma.seller.findMany({
  select: { id: true, phoneNumber: true, name: true }
});
console.table(sellers);
```

You'll see a table of all sellers. **Write down the ID** of the seller for this plot.

> **If the seller doesn't exist yet**, you'll need to create one first using the seller workflow.

### Step 6: Create the Plot Listing

Now, fill in this template with YOUR information:

```javascript
const newPlot = await prisma.plot.create({
  data: {
    // BASIC INFORMATION (Fill these in!)
    titleEn: 'YOUR PLOT TITLE HERE',  // Example: 'Premium Residential Plot near Main Road'
    village: 'VILLAGE NAME',           // Example: 'Periyapalayam'
    district: 'DISTRICT NAME',         // Example: 'Tiruvannamalai'
    state: 'Tamil Nadu',               // Keep this as is
    surveyNumber: 'SURVEY NUMBER',     // Example: 'Survey/123/456'
    
    // SIZE & PRICING (Use numbers only, no commas!)
    sizeSqft: 2400,                    // Example: 2400
    sizeCents: 0.055,                  // Optional, Example: 0.055
    totalPrice: 1200000,               // Example: 1200000 (12 lakhs)
    pricePerSqft: 500,                 // Example: 500
    
    // CATEGORY (Choose one: residential, agricultural, commercial)
    category: 'residential',
    
    // LOCATION (Use the GPS coordinates you found!)
    latitude: 12.9716,                 // YOUR latitude
    longitude: 79.8946,                // YOUR longitude
    distanceFromMainRoad: 0.5,         // In kilometers
    roadWidth: 20,                     // In feet
    
    // FEATURES (Set to true or false)
    features: {
      roadAccess: true,
      electricity: true,
      waterSupply: false,
      boundaryWall: true,
      clearTitle: true,
      nearbySchool: true,
      nearbyHospital: false,
      publicTransport: true
    },
    
    // STATUS (Keep these as default)
    status: 'active',
    verificationStatus: 'approved',
    isFeatured: false,
    
    // SELLER (Replace with the seller ID from Step 5!)
    sellerId: 'PUT_SELLER_ID_HERE',
    
    // PUBLISH DATE
    publishedAt: new Date()
  }
});

console.log('✅ Plot created! ID:', newPlot.id);
console.log('Keep this ID for uploading photos!');
```

**Important:** 
- Replace ALL CAPS text with your actual data
- Use the seller ID from Step 5
- Don't use commas in numbers (1200000 not 1,200,000)

Press Enter. You should see: `✅ Plot created! ID: [some-id]`

**WRITE DOWN THIS ID!** You'll need it for uploading photos.

---

## Part 5: Upload Photos

### Step 1: Upload Each Photo

For **each photo** you prepared, run this command. Replace the parts in ALL CAPS:

```javascript
// Upload photo (run this for EACH photo)
const result = await cloudinary.uploader.upload(
  '/PATH/TO/YOUR/PHOTO/1_main_view.jpg',  // Change this path for each photo!
  {
    folder: 'tnplots',
    transformation: [
      { width: 1200, height: 800, crop: 'limit' },
      { quality: 'auto:good' }
    ]
  }
);

// Save to database
const image = await prisma.plotImage.create({
  data: {
    plotId: 'YOUR_PLOT_ID_FROM_STEP_6',  // The ID you wrote down!
    url: result.secure_url,
    publicId: result.public_id,
    displayOrder: 0,  // Change this: 0 for first photo, 1 for second, 2 for third, etc.
    isFeatured: true  // Set to true ONLY for the main photo, false for others
  }
});

console.log('✅ Photo uploaded:', image.displayOrder);
```

**For the first photo (1_main_view.jpg):**
- `displayOrder: 0`
- `isFeatured: true`

**For subsequent photos:**
- `displayOrder: 1, 2, 3, 4...` (increment for each)
- `isFeatured: false`

### Step 2: Verify Upload

After uploading all photos, check them:

```javascript
const plotWithImages = await prisma.plot.findUnique({
  where: { id: 'YOUR_PLOT_ID' },
  include: { images: { orderBy: { displayOrder: 'asc' } } }
});

console.log(`✅ Total photos uploaded: ${plotWithImages.images.length}`);
console.table(plotWithImages.images.map(img => ({
  order: img.displayOrder,
  featured: img.isFeatured,
  url: img.url.substring(0, 50) + '...'
})));
```

You should see all your photos listed!

---

## Part 6: Verify Your Listing

### Step 1: Exit Node

```javascript
await prisma.$disconnect();
process.exit();
```

### Step 2: Check the Website

1. Make sure the dev server is running:
   ```bash
   npm run dev
   ```

2. Open your browser and go to: `http://localhost:3000/plots`

3. Look for your new listing!

4. Click on it to see:
   - ✅ All photos appear
   - ✅ Map shows correct location
   - ✅ All details are correct
   - ✅ WhatsApp button works

---

## Troubleshooting

### "Cannot find seller ID"
**Solution:** You need to create the seller first. Ask your supervisor for help or use the seller creation workflow.

### "Photo upload failed"
**Possible causes:**
- File path is wrong (use absolute path like `/Users/yourname/Desktop/plot_photos/1_main_view.jpg`)
- Photo is too large (compress it first)
- No internet connection

### "Plot doesn't show on website"
**Check:**
- `status` should be `'active'`
- `verificationStatus` should be `'approved'`
- Refresh the page (Cmd+R or Ctrl+R)

### "Map doesn't show"
**Check:**
- Latitude and longitude are valid numbers
- Latitude is between -90 and 90
- Longitude is between -180 and 180

---

## Quick Reference Card

**Start Node:**
```bash
cd ~/Desktop/TNPlots
node
```

**Load Tools:**
```javascript
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const prisma = new PrismaClient();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

**Exit Node:**
```javascript
await prisma.$disconnect();
process.exit();
```

---

## Need Help?

If you're stuck:
1. Check the troubleshooting section above
2. Ask your supervisor
3. Take screenshots of any error messages
4. Note exactly which step you're on

**Remember:** Take your time, double-check your information, and don't hesitate to ask questions!

Good luck! 🎉
