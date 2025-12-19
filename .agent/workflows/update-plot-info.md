---
description: Update plot information and details
---

# Update Plot Information Workflow

This workflow shows how to update plot information using Prisma Client and Node.js scripts.

## Prerequisites

- Database access (Prisma)
- Node.js environment
- Plot ID you want to update

## Step 1: Start Node REPL

// turbo
```bash
node
```

## Step 2: Initialize Prisma Client

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```

## Step 3: Find Plot by ID or Criteria

```javascript
// Find plot by ID
const plot = await prisma.plot.findUnique({
  where: { id: 'PLOT_ID_HERE' },
  include: { images: true, seller: true }
});
console.log(plot);

// Find plot by survey number
const plotBySurvey = await prisma.plot.findFirst({
  where: { surveyNumber: 'SURVEY_NUMBER' }
});

// List all plots
const allPlots = await prisma.plot.findMany({
  select: { id: true, title: true, surveyNumber: true, village: true },
  take: 20
});
console.table(allPlots);
```

## Step 4: Update Basic Plot Information

```javascript
// Update plot details
const updated = await prisma.plot.update({
  where: { id: 'PLOT_ID_HERE' },
  data: {
    title: 'Updated Plot Title',
    description: 'Updated detailed description of the plot',
    totalPrice: 1500000, // in rupees
    pricePerSqft: 500,
    sizeSqft: 3000,
    sizeAcres: 0.069,
    village: 'Village Name',
    district: 'District Name',
    state: 'Tamil Nadu',
    surveyNumber: 'Survey/123/456',
    category: 'residential', // residential, agricultural, commercial
  }
});

console.log('Plot updated:', updated);
```

## Step 5: Update Plot Features

```javascript
// Update amenities and features
const withFeatures = await prisma.plot.update({
  where: { id: 'PLOT_ID_HERE' },
  data: {
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
    roadWidth: 20, // in feet
    distanceFromMainRoad: 0.5, // in km
  }
});

console.log('Features updated:', withFeatures);
```

## Step 6: Update Plot Status

```javascript
// Change plot status
await prisma.plot.update({
  where: { id: 'PLOT_ID_HERE' },
  data: {
    status: 'active', // active, sold, pending
    isFeatured: true, // Set to true to feature on homepage
    verificationStatus: 'approved' // draft, pending, approved
  }
});
```

## Step 7: Update Location Coordinates

```javascript
// Update GPS coordinates for map display
await prisma.plot.update({
  where: { id: 'PLOT_ID_HERE' },
  data: {
    latitude: 12.9716,
    longitude: 77.5946
  }
});
```

## Step 8: Create New Plot

```javascript
const newPlot = await prisma.plot.create({
  data: {
    title: 'Premium Residential Plot',
    description: 'Spacious plot perfect for building your dream home',
    sizeSqft: 2400,
    sizeAcres: 0.055,
    totalPrice: 1200000,
    pricePerSqft: 500,
    village: 'Village Name',
    district: 'District Name',
    state: 'Tamil Nadu',
    surveyNumber: 'Survey/789/012',
    category: 'residential',
    status: 'active',
    verificationStatus: 'approved',
    isFeatured: false,
    features: {
      roadAccess: true,
      electricity: true,
      waterSupply: true,
      boundaryWall: false,
      clearTitle: true,
      nearbySchool: true,
      nearbyHospital: true,
      publicTransport: true
    },
    roadWidth: 30,
    distanceFromMainRoad: 0.2,
    sellerId: 'SELLER_ID_HERE', // Get from seller table
    publishedAt: new Date()
  }
});

console.log('New plot created:', newPlot);
```

## Step 9: Bulk Update Multiple Plots

```javascript
// Update multiple plots at once
const bulkUpdate = await prisma.plot.updateMany({
  where: {
    village: 'Old Village Name'
  },
  data: {
    village: 'New Village Name'
  }
});

console.log(`Updated ${bulkUpdate.count} plots`);
```

## Step 10: Delete Plot (Use with Caution)

```javascript
// Soft delete - change status to inactive
await prisma.plot.update({
  where: { id: 'PLOT_ID_HERE' },
  data: { status: 'inactive' }
});

// Hard delete - permanently removes plot and images
await prisma.plot.delete({
  where: { id: 'PLOT_ID_HERE' }
});
```

## Step 11: Exit REPL

```javascript
await prisma.$disconnect();
process.exit();
```

## Quick Reference Commands

**Get plot count by category:**
```javascript
const counts = await prisma.plot.groupBy({
  by: ['category'],
  _count: true,
  where: { status: 'active' }
});
console.table(counts);
```

**Find featured plots:**
```javascript
const featured = await prisma.plot.findMany({
  where: { isFeatured: true, status: 'active' },
  select: { id: true, title: true, totalPrice: true }
});
console.table(featured);
```

**Search plots by village:**
```javascript
const results = await prisma.plot.findMany({
  where: {
    village: { contains: 'search term', mode: 'insensitive' }
  }
});
console.table(results);
```

**Get plots in price range:**
```javascript
const plotsInRange = await prisma.plot.findMany({
  where: {
    totalPrice: { gte: 500000, lte: 2000000 }
  },
  orderBy: { totalPrice: 'asc' }
});
console.table(plotsInRange);
```
