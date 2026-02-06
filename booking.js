// Service data mapping
const serviceData = {
    'haircut': {
        name: 'Haircut',
        subtitle: 'saç kesimi',
        duration: '40 min',
        price: '600 ₺',
        calDuration: 40,
        calEventType: 'haircut'
    },
    'beard-shaving': {
        name: 'Beard Shaving',
        subtitle: 'sakal traşı',
        duration: '15 min',
        price: '350 ₺',
        calDuration: 15,
        calEventType: 'beard-shave'
    },
    'cut-shave': {
        name: 'Cut & Shave',
        subtitle: 'saç sakal traşı',
        duration: '1 hr',
        price: '900 ₺',
        calDuration: 60,
        calEventType: 'cut-and-shave'
    },
    'skin-care': {
        name: 'Skin Care',
        subtitle: 'cilt bakımı - hot towel',
        duration: '30 min',
        price: '500 ₺',
        calDuration: 30,
        calEventType: 'skin-care'
    },
    'wax': {
        name: 'Wax',
        subtitle: 'ağda',
        duration: '10 min',
        price: '50 ₺',
        calDuration: 10,
        calEventType: 'wax'
    },
    'hair-care': {
        name: 'Hair Care',
        subtitle: 'saç bakımı',
        duration: '30 min',
        price: '500 ₺',
        calDuration: 30,
        calEventType: 'haircare'
    },
    'home-hotel-service': {
        name: 'Home or Hotel Special Service',
        subtitle: 'ev veya otel özel hizmeti',
        duration: '1 hr',
        price: '3,000 ₺',
        calDuration: 60,
        calEventType: 'haircut'
    },
    'gift-package': {
        name: 'Special Gift Package',
        subtitle: 'özel hediye paketi',
        duration: '1 hr 30 min',
        price: '1,800 ₺',
        calDuration: 90,
        calEventType: 'haircut'
    },
    'premium-combo': {
        name: 'Haircut Beard Shaving + Skin Care',
        subtitle: 'saç sakal traşı + cilt bakımı',
        duration: '1 hr 15 min',
        price: '1,250 ₺',
        calDuration: 75,
        calEventType: 'haircut-skin-care-beard-shave'
    },
    'keratin-care': {
        name: 'Keratin Hair Care Regeneration',
        subtitle: 'keratin saç bakımı yenileme',
        duration: '1 hr 30 min',
        price: '1,000 ₺ / 3,000 ₺',
        calDuration: 90,
        calEventType: 'haircare'
    },
    'hair-color': {
        name: 'Hair Color',
        subtitle: 'saç boyama',
        duration: '1 hr',
        price: '1,000 ₺ / 2,500 ₺',
        calDuration: 60,
        calEventType: 'haircut'
    },
    'women-haircut': {
        name: 'Women Hair Cut',
        subtitle: 'kadın saç kesimi',
        duration: '30 min',
        price: '800 ₺',
        calDuration: 30,
        calEventType: 'haircut'
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
function initializeCalendar(calUsername, service) {
    // Hide placeholder when Cal.com is configured
    const placeholder = document.getElementById('calPlaceholder');
    if (placeholder && calUsername) {
        placeholder.style.display = 'none';
    }
    
    // Get the correct event type for this service
    const eventType = service.calEventType || 'haircut';
    
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
    const CAL_API_KEY = 'cal_live_72107e80dcd58b5d2aee2b8a966a77a6';
    const calUsername = 'ai-barber-3y1bs0'; // Your Cal.com username
    
    // Get the selected service to use its event type
    const service = getSelectedService();
    
    // Initialize Cal.com
    if (calUsername && CAL_API_KEY) {
        initializeCalendar(calUsername, service);
    } else {
        console.log('Cal.com integration ready. Add your Cal.com username to activate live booking.');
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { serviceData, getSelectedService, initializeCalendar };
}
