const form = document.getElementById('contact-form');
const feedback = document.getElementById('contact-feedback');
const submitButton = document.getElementById('contact-submit');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Please fill in all fields before sending.';
      feedback.classList.add('text-red-400');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    feedback.textContent = '';
    feedback.classList.remove('text-red-400');
    feedback.classList.remove('text-green-400');

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send inquiry.');
      }

      feedback.textContent = data.message || 'Your inquiry has been sent successfully.';
      feedback.classList.add('text-green-400');
      form.reset();
    } catch (error) {
      feedback.textContent = error.message || 'Failed to send inquiry. Please try again later.';
      feedback.classList.add('text-red-400');
      console.error('Contact form error:', error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Inquiry';
    }
  });
}
