// 💎 Aruna Elite JavaScript V6 - Premium Indian Hub

document.addEventListener('DOMContentLoaded', () => {

    // 1. Enhanced Luxury Navigation (Glassmorphism & Scroll)
    const navbar = document.getElementById('topNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. High-End Scroll Reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. FAQ Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('i');

            // Toggle current
            const isVisible = content.style.display === 'block';
            content.style.display = isVisible ? 'none' : 'block';
            if (icon) icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';

            // Close others
            accordionItems.forEach(other => {
                if (other !== item) {
                    other.querySelector('.accordion-content').style.display = 'none';
                    const otherIcon = other.querySelector('i');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });
        });
    });

    // 4. Aruna Faculty Mapping (V6 India)
    const specialtySelect = document.getElementById('specialtySelect');
    const doctorSelect = document.getElementById('doctorSelect');

    const arunaFaculty = {
        cardio: [
            { id: 'arul', name: 'Dr. Arul Karthik', qualification: 'MBBS, MD (Gold Medal)' }
        ],
        neuro: [
            { id: 'meena', name: 'Dr. Meenakshi Iyer', qualification: 'MCh Neurosurgery, FRCS' }
        ],
        ortho: [
            { id: 'vignesh', name: 'Dr. Vignesh Kumar', qualification: 'MS, MCh Orthopaedics' }
        ],
        skin: [
            { id: 'vignesh', name: 'Dr. Vignesh Kumar', qualification: 'Senior Aesthetic Lead' }
        ],
        general: [
            { id: 'arul', name: 'Dr. Arul Karthik', qualification: 'Senior Consultant' }
        ]
    };

    if (specialtySelect && doctorSelect) {
        specialtySelect.addEventListener('change', (e) => {
            const doctors = arunaFaculty[e.target.value] || [];
            doctorSelect.innerHTML = '<option value="" disabled selected>Select Specialist Faculty</option>';
            doctorSelect.disabled = false;
            doctors.forEach(doc => {
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = `${doc.name} (${doc.qualification})`;
                doctorSelect.appendChild(option);
            });
        });
    }

    // 5. Unified Form Success Handling
    const fullAppForm = document.getElementById('appointmentForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    if (fullAppForm) {
        fullAppForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (successModal) successModal.style.display = 'flex';
            fullAppForm.reset();
        });
    }

    if (closeModal) {
        closeModal.onclick = () => {
            successModal.style.display = 'none';
        };
    }

    // 6. Deep-Link Param Handling
    const urlParams = new URLSearchParams(window.location.search);
    const sId = urlParams.get('service');
    const dId = urlParams.get('doctor');

    if (sId && specialtySelect) {
        specialtySelect.value = sId;
        specialtySelect.dispatchEvent(new Event('change'));
    }
});
