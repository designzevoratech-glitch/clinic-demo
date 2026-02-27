import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                book: resolve(__dirname, 'book.html'),
                contact: resolve(__dirname, 'contact.html'),
                doctorDetail: resolve(__dirname, 'doctor-detail.html'),
                doctors: resolve(__dirname, 'doctors.html'),
                faq: resolve(__dirname, 'faq.html'),
                gallery: resolve(__dirname, 'gallery.html'),
                reviews: resolve(__dirname, 'reviews.html'),
                serviceDetail: resolve(__dirname, 'service-detail.html'),
                services: resolve(__dirname, 'services.html'),
            },
        },
    },
});
