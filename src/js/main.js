window.addEventListener('DOMContentLoaded', () => {
    // Current year
    const year = document.getElementById('year')
    let date = new Date()
    year.innerText = date.getFullYear()

    // ScrollSpy
    const menu = document.querySelector('.navbar-nav')
    let links = menu.querySelectorAll('.nav-link')

	window.addEventListener('scroll', onScroll)

    menu.addEventListener('click', (e) => {
		let link = e.target;

		if (link.classList.contains('nav-link')) {
			e.preventDefault()
            setActiveClass(link)
            scrollToTarget(link.hash)
		}
	});

    function onScroll(){
		let pos = window.pageYOffset;
		for (let i = links.length - 1; i >= 0; i--) {
			let link = links[i];
			let target = document.querySelector(link.hash);
			
			if ((pos + window.innerHeight / 2) > target.offsetTop) {
                setActiveClass(link)				
                break
			}
		}
	}

    function setActiveClass(link) {
        menu.querySelector('.active').classList.remove('active');
        link.classList.add('active');
    }

    function scrollToTarget(id) {
		let target = document.querySelector(id)

		if (target !== null) {
			let pos = target.offsetTop - 64
			window.scrollTo({top: pos, behavior: 'smooth'})
		}
	}
    
    // Contact
    const modal = new bootstrap.Modal(document.getElementById('contactModal'))
    const contactForm = document.getElementById('contactForm')
    const fields = contactForm.querySelectorAll('.form-control')
    const submitBtn = contactForm.querySelector('#submitBtn')

    const patterns = {
        notEmpty: /.+/,
        email: /^.+@.+\..+$/
    }

    contactForm.addEventListener('focusin', e => {
        if (e.target.classList.contains('form-control')) {
            e.target.classList.remove('is-invalid')
            e.target.classList.remove('is-valid')
        }
    })

    contactForm.addEventListener('submit', async e => {
        e.preventDefault()

        submitBtn.disabled = true

        // Validation 
        isValid = true
        fields.forEach(f => {
            let pattern = patterns[f.dataset.valid]
            f.value = f.value.trim()
            
            if( pattern.test( f.value ) ) {
                f.classList.add('is-valid')
            } else {
                f.classList.add('is-invalid')
                isValid = false
            }
        })
        
        submitBtn.disabled = false

        if( isValid ) {
            console.log(isValid)
            modal.hide()
        }
    })
})
