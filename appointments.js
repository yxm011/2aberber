// Service data mapping
const serviceData = {
    'haircut': { name: 'Haircut', turkish: 'saç kesimi', duration: '40 min' },
    'beard-shaving': { name: 'Beard Shaving', turkish: 'sakal traşı', duration: '15 min' },
    'cut-shave': { name: 'Cut & Shave', turkish: 'saç sakal traşı', duration: '1 hr' },
    'skin-care': { name: 'Skin Care', turkish: 'cilt bakımı - hot towel', duration: '30 min' },
    'wax': { name: 'Wax', turkish: 'ağda', duration: '10 min' },
    'hair-care': { name: 'Hair Care', turkish: 'saç bakımı', duration: '30 min' },
    'home-hotel-service': { name: 'Home or Hotel Special Service', turkish: 'ev veya otel özel hizmeti', duration: '1 hr' },
    'gift-package': { name: 'Special Gift Package', turkish: 'özel hediye paketi', duration: '1 hr 30 min' },
    'premium-combo': { name: 'Haircut Beard Shaving + Skin Care', turkish: 'saç sakal traşı + cilt bakımı', duration: '1 hr 15 min' },
    'keratin-care': { name: 'Keratin Hair Care Regeneration', turkish: 'keratin saç bakımı yenileme', duration: '1 hr 30 min' },
    'hair-color': { name: 'Hair Color', turkish: 'saç boyama', duration: '1 hr' },
    'women-haircut': { name: 'Women Hair Cut', turkish: 'kadın saç kesimi', duration: '30 min' }
};

// Cal.com API configuration
const CAL_API_KEY = 'cal_live_72107e80dcd58b5d2aee2b8a966a77a6';
const CAL_USERNAME = 'ai-barber-3y1bs0';
const CAL_API_BASE = 'https://api.cal.com/v1';

// Update current date and time
function updateDateTime() {
    const now = new Date();
    
    // Format date: "Friday, January 24, 2026"
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', dateOptions);
    document.getElementById('currentDate').textContent = dateString;
    
    // Format time: "14:35:42"
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('currentTime').textContent = timeString;
}

// Get working hours for today
function getWorkingHours() {
    const today = new Date().getDay();
    if (today === 0) { // Sunday
        return 'Closed';
    } else if (today === 6) { // Saturday
        return '10:00 AM - 8:00 PM';
    } else { // Monday-Friday
        return '9:00 AM - 8:00 PM';
    }
}

// Fetch appointments from Cal.com API
async function fetchAppointments() {
    try {
        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const startDate = today.toISOString();
        const endDate = tomorrow.toISOString();
        
        // Fetch bookings from Cal.com API
        const response = await fetch(
            `${CAL_API_BASE}/bookings?apiKey=${CAL_API_KEY}&startTime=${startDate}&endTime=${endDate}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.bookings || [];
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return [];
    }
}

// Get service info from booking responses or URL
function getServiceInfo(booking) {
    // Try to extract service from booking metadata or responses
    let serviceId = null;
    
    // Check if service info is in responses
    if (booking.responses) {
        const serviceResponse = Object.values(booking.responses).find(r => 
            typeof r === 'string' && serviceData[r]
        );
        if (serviceResponse) {
            serviceId = serviceResponse;
        }
    }
    
    // Check if service is in metadata
    if (!serviceId && booking.metadata && booking.metadata.service) {
        serviceId = booking.metadata.service;
    }
    
    // Return service data or default
    return serviceData[serviceId] || { 
        name: 'General Appointment', 
        turkish: 'genel randevu', 
        duration: '30 min' 
    };
}

// Determine appointment status
function getAppointmentStatus(startTime, endTime) {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now >= end) {
        return 'completed';
    } else if (now >= start && now < end) {
        return 'current';
    } else {
        return 'upcoming';
    }
}

// Create appointment card HTML
function createAppointmentCard(booking) {
    const startTime = new Date(booking.startTime);
    const endTime = new Date(booking.endTime);
    const service = getServiceInfo(booking);
    const status = getAppointmentStatus(booking.startTime, booking.endTime);
    
    // Format time
    const timeString = startTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    // Get customer info
    const customerName = booking.attendees && booking.attendees.length > 0 
        ? booking.attendees[0].name 
        : 'Walk-in Customer';
    const customerPhone = booking.attendees && booking.attendees.length > 0 
        ? booking.attendees[0].phoneNumber || ''
        : '';
    
    return `
        <div class="appointment-card ${status}">
            <div class="appointment-time">${timeString}</div>
            <div class="appointment-customer">
                ${customerName}
                ${customerPhone ? `<div class="customer-phone">${customerPhone}</div>` : ''}
            </div>
            <div class="appointment-service">
                ${service.name}
                <div class="service-subtitle">${service.turkish}</div>
            </div>
            <div class="appointment-duration">${service.duration}</div>
            <div class="appointment-status">
                <span class="status-badge ${status}">
                    ${status === 'current' ? '🔴 In Progress' : 
                      status === 'completed' ? '✓ Completed' : 
                      '⏰ Upcoming'}
                </span>
            </div>
        </div>
    `;
}

// Display appointments
function displayAppointments(appointments) {
    const appointmentsList = document.getElementById('appointmentsList');
    const noAppointments = document.getElementById('noAppointments');
    
    // Filter to only show TODAY's appointments
    const today = new Date();
    const todayDateString = today.toDateString();
    
    const todaysAppointments = appointments.filter(booking => {
        const appointmentDate = new Date(booking.startTime);
        return appointmentDate.toDateString() === todayDateString;
    });
    
    if (todaysAppointments.length === 0) {
        appointmentsList.innerHTML = '';
        noAppointments.style.display = 'block';
        updateSummary(0, 0, 0);
        return;
    }
    
    // Sort appointments by start time
    todaysAppointments.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    
    // Create appointment cards
    const appointmentsHTML = todaysAppointments.map(createAppointmentCard).join('');
    appointmentsList.innerHTML = appointmentsHTML;
    noAppointments.style.display = 'none';
    
    // Update summary
    const completed = todaysAppointments.filter(a => getAppointmentStatus(a.startTime, a.endTime) === 'completed').length;
    const current = todaysAppointments.filter(a => getAppointmentStatus(a.startTime, a.endTime) === 'current').length;
    const upcoming = todaysAppointments.filter(a => getAppointmentStatus(a.startTime, a.endTime) === 'upcoming').length;
    
    updateSummary(todaysAppointments.length, completed, upcoming + current);
}

// Update summary counts
function updateSummary(total, completed, upcoming) {
    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('upcomingCount').textContent = upcoming;
}

// Load appointments
async function loadAppointments() {
    const appointments = await fetchAppointments();
    displayAppointments(appointments);
}

// Initialize dashboard
function initDashboard() {
    // Update date/time immediately and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Set working hours
    document.getElementById('workingHours').textContent = getWorkingHours();
    
    // Load appointments
    loadAppointments();
    
    // Refresh appointments every 2 minutes
    setInterval(loadAppointments, 120000);
}

// Start when page loads
document.addEventListener('DOMContentLoaded', initDashboard);
