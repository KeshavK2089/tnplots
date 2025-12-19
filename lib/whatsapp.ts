interface WhatsAppMessageParams {
    phone: string;
    plotId: string;
    plotTitle: string;
    price: number;
    location: string;
    language?: 'en' | 'ta';
}

export function generateWhatsAppURL({
    phone,
    plotId,
    plotTitle,
    price,
    location,
    language = 'en',
}: WhatsAppMessageParams): string {
    // Remove any non-digit characters from phone
    const cleanPhone = phone.replace(/\D/g, '');

    // Add country code if not present
    const phoneWithCountryCode = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

    // Format price in lakhs
    const priceInLakhs = (price / 100000).toFixed(2);

    // Create message templates
    const messages = {
        en: `Hi, I'm interested in the plot listed on TNPlots:\n\nPlot ID: ${plotId}\nTitle: ${plotTitle}\nPrice: ₹${priceInLakhs} Lakhs\nLocation: ${location}\n\nCould you share more details?`,
        ta: `வணக்கம், TNPlots இல் கண்ட நிலம் குறித்து மேலும் விவரங்கள் தெரிந்து கொள்ள விரும்புகிறேன்:\n\nID: ${plotId}\nதலைப்பு: ${plotTitle}\nவிலை: ₹${priceInLakhs} லட்சம்\nஇடம்: ${location}\n\nமேலும் விவரங்கள் தரமுடியுமா?`,
    };

    const message = messages[language];
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${phoneWithCountryCode}?text=${encodedMessage}`;
}

export function generateShareWhatsAppURL(plotUrl: string, plotTitle: string): string {
    const message = `Check out this plot on TNPlots: ${plotTitle}\n${plotUrl}`;
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/?text=${encodedMessage}`;
}

export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');

    // Format as: +91 98765 43210
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }

    if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }

    return phone;
}
