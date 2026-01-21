// Service data mapping
const serviceData = {
    'haircut': {
        name: 'Haircut',
        subtitle: 'saç kesimi',
        duration: '40 min',
        price: '600 ₺',
        calDuration: 40
    },
    'beard-shaving': {
        name: 'Beard Shaving',
        subtitle: 'sakal traşı',
        duration: '15 min',
        price: '350 ₺',
        calDuration: 15
    },
    'cut-shave': {
        name: 'Cut & Shave',
        subtitle: 'saç sakal traşı',
        duration: '1 hr',
        price: '900 ₺',
        calDuration: 60
    },
    'skin-care': {
        name: 'Skin Care',
        subtitle: 'cilt bakımı - hot towel',
        duration: '30 min',
        price: '500 ₺',
        calDuration: 30
    },
    'wax': {
        name: 'Wax',
        subtitle: 'ağda',
        duration: '10 min',
        price: '50 ₺',
        calDuration: 10
    },
    'hair-care': {
        name: 'Hair Care',
        subtitle: 'saç bakımı',
        duration: '30 min',
        price: '500 ₺',
        calDuration: 30
    },
    'home-hotel-service': {
        name: 'Home or Hotel Special Service',
        subtitle: 'ev veya otel özel hizmeti',
        duration: '1 hr',
        price: '3,000 ₺',
        calDuration: 60
    },
    'gift-package': {
        name: 'Special Gift Package',
        subtitle: 'özel hediye paketi',
        duration: '1 hr 30 min',
        price: '1,800 ₺',
        calDuration: 90
    },
    'premium-combo': {
        name: 'Haircut Beard Shaving + Skin Care',
        subtitle: 'saç sakal traşı + cilt bakımı',
        duration: '1 hr 15 min',
        price: '1,250 ₺',
        calDuration: 75
    },
    'keratin-care': {
        name: 'Keratin Hair Care Regeneration',
        subtitle: 'keratin saç bakımı yenileme',
        duration: '1 hr 30 min',
        price: '1,000 ₺ / 3,000 ₺',
        calDuration: 90
    },
    'hair-color': {
        name: 'Hair Color',
        subtitle: 'saç boyama',
        duration: '1 hr',
        price: '1,000 ₺ / 2,500 ₺',
        calDuration: 60
    },
    'women-haircut': {
        name: 'Women Hair Cut',
        subtitle: 'kadın saç kesimi',
        duration: '30 min',
        price: '800 ₺',
        calDuration: 30
    }
};

// Get service from URL parameters
function getSelectedService() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    return serviceId ? serviceData[serviceId] : serviceData['haircut']; // Default to haircut
}

// Display selected service information
function displayServiceInfo() {
    const service = getSelectedService();
    
    document.getElementById('serviceName').textContent = service.name;
    document.getElementById('serviceSubtitle').textContent = service.subtitle;
    document.getElementById('serviceDuration').textContent = `⏱ ${service.duration}`;
    document.getElementById('servicePrice').textContent = service.price;
}

// Initialize Cal.com with custom configuration
function initializeCalendar(calUsername, eventType = '30min') {
    const service = getSelectedService();
    
    // Hide placeholder when Cal.com is configured
    const placeholder = document.getElementById('calPlaceholder');
    if (placeholder && calUsername) {
        placeholder.style.display = 'none';
    }
    
    // Cal.com configuration
    Cal("init", {
        origin: "https://app.cal.com"
    });
    
    // Configure Cal.com embed - use your event type link
    Cal("inline", {
        elementOrSelector: "#cal-booking-embed",
        calLink: `${calUsername}/${eventType}`,
        config: {
            layout: "month_view",
            theme: "light",
            hideEventTypeDetails: true, // Hide meeting info (name, duration, video)
            branding: {
                brandColor: "#8B7355" // Match barbershop theme
            }
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayServiceInfo();
    
    // Cal.com API configuration
    const CAL_API_KEY = 'cal_live_e9b0a62e6b14e8598e4f9e73efab2772';
    const calUsername = 'fusion-beat-0zu0fw'; // Your Cal.com username
    
    // Use single event type for all services - 30min slots
    const eventType = '30min';
    
    // Initialize Cal.com
    if (calUsername && CAL_API_KEY) {
        initializeCalendar(calUsername, eventType);
    } else {
        console.log('Cal.com integration ready. Add your Cal.com username to activate live booking.');
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { serviceData, getSelectedService, initializeCalendar };
}
