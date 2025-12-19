import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { phoneNumber: '9876543210' },
        update: {},
        create: {
            phoneNumber: '9876543210',
            whatsappNumber: '9876543210',
            name: 'TNPlots Admin',
            email: 'admin@tnplots.com',
            password: hashedPassword,
            role: 'admin',
            isVerified: true,
        },
    });

    console.log('✅ Created admin user:', admin.name);

    // Create a seller user
    const seller = await prisma.user.upsert({
        where: { phoneNumber: '9876543211' },
        update: {},
        create: {
            phoneNumber: '9876543211',
            whatsappNumber: '9876543211',
            name: 'Rajesh Kumar',
            role: 'seller',
            isVerified: true,
            trustScore: 85,
        },
    });

    console.log('✅ Created seller user:', seller.name);

    // Create sample plots
    const samplePlots = [
        {
            titleEn: 'Premium Residential Plot in Cheyyar',
            titleTa: 'செய்யாறில் சிறந்த குடியிருப்பு நிலம்',
            descriptionEn: 'Excellent residential plot located in a prime area of Cheyyar. Clear title, ready for construction. Close to schools, hospitals, and main road.',
            descriptionTa: 'செய்யாறின் முதன்மை பகுதியில் அமைந்துள்ள சிறந்த குடியிருப்பு நிலம். தெளிவான உரிமை, கட்டுமானத்திற்கு தயார். பள்ளிகள், மருத்துவமனைகள் மற்றும் பிரதான சாலைக்கு அருகில்.',
            category: 'residential',
            village: 'Cheyyar',
            surveyNumber: '123/45',
            latitude: 12.6608,
            longitude: 79.5431,
            sizeSqft: 2400,
            sizeCents: 5.5,
            totalPrice: 1200000,
            pricePerSqft: 500,
            isNegotiable: true,
            status: 'active',
            verificationStatus: 'approved',
            isFeatured: true,
            amenities: ['water', 'electricity', 'road_access'],
            publishedAt: new Date(),
        },
        {
            titleEn: 'Agricultural Land with Borewell',
            titleTa: 'துளை கிணறு கொண்ட விவசாய நிலம்',
            descriptionEn: 'Fertile agricultural land with existing borewell and water supply. Suitable for cultivation of various crops. Peaceful location away from city.',
            descriptionTa: 'தற்போதுள்ள துளை கிணறு மற்றும் நீர் விநியோகத்துடன் கூடிய வளமான விவசாய நிலம். பல்வேறு பயிர்களை சாகுபடி செய்ய ஏற்றது. நகரத்திலிருந்து விலகிய அமைதியான இடம்.',
            category: 'agricultural',
            village: 'Kilpennathur',
            surveyNumber: '456/78',
            latitude: 12.6500,
            longitude: 79.5500,
            sizeSqft: 43560,
            sizeCents: 100,
            totalPrice: 2500000,
            pricePerSqft: 57,
            isNegotiable: true,
            status: 'active',
            verificationStatus: 'approved',
            isFeatured: false,
            amenities: ['borewell', 'fencing', 'water'],
            publishedAt: new Date(),
        },
        {
            titleEn: 'Commercial Plot Near Highway',
            titleTa: 'நெடுஞ்சாலை அருகே வர்த்தக நிலம்',
            descriptionEn: 'Prime commercial plot located near NH-48. Excellent visibility and accessibility. Perfect for retail shops, showrooms, or warehouses.',
            descriptionTa: 'NH-48 க்கு அருகில் அமைந்துள்ள முதன்மை வர்த்தக நிலம். சிறந்த பார்வை மற்றும் அணுகல். சில்லறை கடைகள், காட்சி அறைகள் அல்லது கிடங்குகளுக்கு ஏற்றது.',
            category: 'commercial',
            village: 'Cheyyar',
            surveyNumber: '789/12',
            latitude: 12.6650,
            longitude: 79.5480,
            sizeSqft: 5000,
            sizeCents: 11.5,
            totalPrice: 5000000,
            pricePerSqft: 1000,
            isNegotiable: false,
            status: 'active',
            verificationStatus: 'approved',
            isFeatured: true,
            amenities: ['electricity', 'road_access', 'commercial_area'],
            publishedAt: new Date(),
        },
    ];

    for (const plotData of samplePlots) {
        const plot = await prisma.plot.create({
            data: {
                ...plotData,
                sellerId: seller.id,
            },
        });

        // Add sample images (placeholder URLs)
        await prisma.plotImage.createMany({
            data: [
                {
                    plotId: plot.id,
                    cloudinaryUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
                    cloudinaryPublicId: 'sample_1',
                    isFeatured: true,
                    displayOrder: 0,
                },
                {
                    plotId: plot.id,
                    cloudinaryUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
                    cloudinaryPublicId: 'sample_2',
                    isFeatured: false,
                    displayOrder: 1,
                },
            ],
        });

        console.log(`✅ Created plot: ${plot.titleEn}`);
    }

    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
