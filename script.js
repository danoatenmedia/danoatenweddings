// Contact Form Handling (Web3Forms)
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    const submitButton = contactForm.querySelector('.submit-button');
    const submitButtonText = contactForm.querySelector('.submit-button-text');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const weddingDate = document.getElementById('weddingDate').value;
        const venue = document.getElementById('venue').value.trim();
        const message = document.getElementById('message').value.trim();

        if (submitButton) submitButton.disabled = true;
        if (submitButtonText) submitButtonText.textContent = 'Sending...';
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '32ddc994-ccfb-449d-b4ee-030cc0a2051e',
                    subject: `Wedding Enquiry — ${firstName} ${lastName}`,
                    from_name: 'Dan Oaten Weddings Website',
                    name: `${firstName} ${lastName}`,
                    email,
                    phone,
                    wedding_date: weddingDate,
                    venue,
                    message,
                    botcheck: ''
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (formStatus) {
                    formStatus.textContent = 'Thank you! Your message has been sent. I\'ll get back to you within 24 hours.';
                    formStatus.className = 'form-status form-status-success';
                }
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            if (formStatus) {
                const detail = error.message ? ` (${error.message})` : '';
                formStatus.textContent = `Sorry, something went wrong${detail}. Please email danoatenmedia@gmail.com directly.`;
                formStatus.className = 'form-status form-status-error';
            }
        } finally {
            if (submitButton) submitButton.disabled = false;
            if (submitButtonText) submitButtonText.textContent = 'Send Message';
        }
    });
});
