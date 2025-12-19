#!/bin/bash

# Final fix - push to GitHub and let Vercel redeploy

cd /Users/keshavkotteswaran/Desktop/TNPlots

echo "Adding all changes..."
git add .

echo "Committing fixes..."
git commit -m "Fix all Prisma schema errors: reviewedAt, submittedAt, seller model, PlotImage fields"

echo "Pushing to GitHub..."
git push

echo ""
echo "✅ All fixes pushed!"
echo ""
echo "Vercel will automatically redeploy in ~2 minutes."
echo "Watch at: https://vercel.com/dashboard"
