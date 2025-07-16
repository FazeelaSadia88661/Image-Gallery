// File: ImageGalleryScript.js
// This script handles the functionality of the image gallery, including lightbox display and filtering.
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('#lightboxImg');
        const prevBtn = document.querySelector('#prevBtn');
        const nextBtn = document.querySelector('#nextBtn');
        const closeBtn = document.querySelector('#closeBtn');
        const filterButtons = document.querySelectorAll('.filter-btn');
        let currentIndex = 0;
        let filteredItems = Array.from(galleryItems);

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = filteredItems.indexOf(item);
                showLightbox();
            });
        });

        function showLightbox() {
            lightboxImg.src = filteredItems[currentIndex].querySelector('img').src;
            lightboxImg.alt = filteredItems[currentIndex].querySelector('img').alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
            showLightbox();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % filteredItems.length;
            showLightbox();
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;
                filteredItems = category === 'all' 
                    ? Array.from(galleryItems)
                    : Array.from(galleryItems).filter(item => item.dataset.category === category);

                galleryItems.forEach(item => {
                    item.style.display = filteredItems.includes(item) ? 'block' : 'none';
                });

                currentIndex = 0;
            });
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowLeft') prevBtn.click();
                else if (e.key === 'ArrowRight') nextBtn.click();
                else if (e.key === 'Escape') closeBtn.click();
            }
        });
    