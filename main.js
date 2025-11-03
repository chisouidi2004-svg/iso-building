document.addEventListener('DOMContentLoaded', function () {
	// menu toggle using class on header
	(function(){
		const btn = document.querySelector('.menu-toggle');
		const header = document.querySelector('header');
		const nav = document.querySelector('nav');
		if(!btn || !header || !nav) return;
		btn.addEventListener('click', ()=> {
			const open = header.classList.toggle('nav-open');
			btn.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
	})();

	// reveal animation for projects (staggered) + lightbox
	(function(){
		const projects = Array.from(document.querySelectorAll('.project'));
		if(!projects.length) return;

		// IntersectionObserver to reveal with stagger
		const io = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if(entry.isIntersecting){
					const el = entry.target;
					const idx = Number(el.dataset.index) || 0;
					// set CSS delay variable for stagger effect
					el.style.setProperty('--delay', (idx * 80) + 'ms');
					el.classList.add('is-visible');
					obs.unobserve(el);
				}
			});
		}, {threshold: 0.12});

		projects.forEach(p => io.observe(p));

		// lightbox
		const lightbox = document.getElementById('lightbox');
		const lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
		const lightboxCaption = lightbox && lightbox.querySelector('.lightbox-caption');
		const closeBtn = lightbox && lightbox.querySelector('.lightbox-close');

		projects.forEach(p => {
			p.addEventListener('click', () => {
				const img = p.querySelector('img');
				if(!img || !lightbox) return;
				lightboxImg.src = img.src;
				lightboxImg.alt = img.alt || '';
				lightboxCaption.textContent = p.querySelector('figcaption')?.textContent || '';
				lightbox.setAttribute('aria-hidden', 'false');
				lightbox.focus();
			});
		});

		const closeLightbox = () => {
			if(!lightbox) return;
			lightbox.setAttribute('aria-hidden', 'true');
			lightboxImg.src = '';
			lightboxCaption.textContent = '';
		};
		if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
		// close on background click
		if(lightbox) lightbox.addEventListener('click', (e) => {
			if(e.target === lightbox) closeLightbox();
		});
		// close on ESC
		document.addEventListener('keydown', (e) => {
			if(e.key === 'Escape') closeLightbox();
		});
	})();
});
