# 2ABERBER Barbershop Website

A modern, responsive website redesign for 2ABERBER Barbershop in Istanbul, featuring a mobile-first design approach with smooth animations and professional aesthetics.

## Features

- **Fully Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Modern UI/UX**: Clean, elegant design inspired by premium barbershop aesthetics
- **Smooth Animations**: Scroll-triggered fade-in effects and parallax hero section
- **Mobile-First Approach**: Prioritizes mobile experience with hamburger menu navigation
- **Interactive Elements**: Hover effects, smooth scrolling, and form validation
- **Performance Optimized**: Lightweight code with efficient CSS and JavaScript

## Sections

1. **Hero Section**: Eye-catching landing with call-to-action buttons
2. **About Section**: Story and heritage of the barbershop with feature highlights
3. **Services Section**: Detailed service offerings with pricing in multiple currencies
4. **Barbers Section**: Meet the team with professional profiles
5. **Gallery Section**: Visual showcase of work and atmosphere
6. **CTA Section**: Prominent booking call-to-action
7. **Contact Section**: Contact information and message form
8. **Footer**: Copyright and branding

## Technology Stack

- **HTML5**: Semantic markup for better SEO and accessibility
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **JavaScript (Vanilla)**: No dependencies, pure JavaScript for interactions
- **Google Fonts**: Playfair Display (headings) and Lato (body text)

## Design Features

### Color Palette
- Primary: `#8B7355` (Warm Brown)
- Secondary: `#6B5B4A` (Dark Brown)
- Accent: `#D4AF37` (Gold)
- Background: `#F5F1ED` (Light Beige)

### Typography
- Headings: Playfair Display (Serif)
- Body: Lato (Sans-serif)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 968px
- Desktop: > 968px

## Getting Started

### Installation

1. Clone or download the project files
2. Ensure all three files are in the same directory:
   - `index.html`
   - `styles.css`
   - `script.js`

### Running the Website

Simply open `index.html` in any modern web browser:

```bash
# Using default browser
open index.html

# Or using a specific browser
chrome index.html
firefox index.html
safari index.html
```

### Using a Local Server (Recommended)

For better performance and testing, use a local server:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (with http-server):**
```bash
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## Customization

### Updating Content

1. **Business Information**: Edit the contact details in the Contact section of `index.html`
2. **Services & Pricing**: Modify service cards in the Services section
3. **Team Members**: Update barber profiles in the Barbers section
4. **Colors**: Change CSS variables in `:root` selector in `styles.css`

### Adding Real Images

Replace the SVG placeholders with actual images:

1. Create an `images` folder in the project directory
2. Add your images (recommended: JPG/PNG format, optimized for web)
3. Update the image placeholders in `index.html`:

```html
<!-- Replace SVG with: -->
<img src="images/your-image.jpg" alt="Description">
```

### Connecting the Contact Form

The form currently logs to console. To connect to a backend:

1. Add a form action attribute
2. Use a service like Formspree, EmailJS, or your own backend
3. Update the JavaScript in `script.js` to handle actual form submission

Example with Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization Tips

1. **Compress Images**: Use tools like TinyPNG or ImageOptim
2. **Minify CSS/JS**: Use online minifiers before production
3. **Enable Caching**: Configure server caching headers
4. **Use CDN**: Host static assets on a CDN for faster loading

## Future Enhancements

- [ ] Add online booking system integration
- [ ] Implement image lightbox for gallery
- [ ] Add customer testimonials section
- [ ] Integrate Google Maps for location
- [ ] Add social media feed integration
- [ ] Implement multi-language support (Turkish/English)
- [ ] Add blog/news section
- [ ] Create admin panel for content management

## Mobile Optimization

The website is built with a mobile-first approach:

- Touch-friendly navigation with hamburger menu
- Optimized font sizes for readability on small screens
- Responsive images that scale appropriately
- Fast loading times with minimal dependencies
- Smooth scrolling and animations optimized for mobile

## Contact Information

**2ABERBER Barbershop**
- Address: Altin Bilezik Sokak No: 2/A, 34433 Beyoglu/Istanbul, Turkey
- Phone: +90 532 397 7073
- Email: agca1980@gmail.com

**Hours:**
- Monday - Saturday: 9:00 AM - 8:00 PM
- Sunday: 12:00 PM - 6:00 PM

## License

This website design is created for 2ABERBER Barbershop. All rights reserved.

## Credits

- Design inspired by modern barbershop aesthetics
- Fonts: Google Fonts (Playfair Display, Lato)
- Icons: Unicode emoji characters (can be replaced with Font Awesome or custom icons)

---

**Built with ❤️ for 2ABERBER Barbershop**
