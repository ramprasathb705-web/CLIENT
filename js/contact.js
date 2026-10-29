/**
 * Accessible Contact Form Controller
 * Strictly compliant with WCAG 2.1 / 2.2 Guidelines:
 * - 3.3.1 Error Identification
 * - 3.3.2 Labels or Instructions
 * - 3.3.3 Error Suggestion
 * - 4.1.3 Status Messages
 */

(function () {
  'use strict';

  const form = document.getElementById('accessible-contact-form');
  if (!form) return;

  const errorSummary = document.getElementById('error-summary');
  const errorSummaryList = document.getElementById('error-summary-list');
  const successMessage = document.getElementById('success-message');

  // Input elements
  const fields = {
    fullName: {
      input: document.getElementById('full-name'),
      error: document.getElementById('full-name-error'),
      group: document.getElementById('group-full-name'),
      validate: function (val) {
        if (!val || !val.trim()) return 'Please enter your full name.';
        if (val.trim().length < 2) return 'Full name must be at least 2 characters.';
        return '';
      }
    },
    email: {
      input: document.getElementById('email-address'),
      error: document.getElementById('email-error'),
      group: document.getElementById('group-email'),
      validate: function (val) {
        if (!val || !val.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Please enter a valid email address (e.g., name@example.com).';
        return '';
      }
    },
    inquiryType: {
      input: document.getElementById('inquiry-type'),
      error: document.getElementById('inquiry-error'),
      group: document.getElementById('group-inquiry'),
      validate: function (val) {
        if (!val || val === '') return 'Please select the primary reason for your inquiry.';
        return '';
      }
    },
    message: {
      input: document.getElementById('message-content'),
      error: document.getElementById('message-error'),
      group: document.getElementById('group-message'),
      validate: function (val) {
        if (!val || !val.trim()) return 'Please enter your project message or inquiry details.';
        if (val.trim().length < 15) return 'Message must be at least 15 characters long.';
        return '';
      }
    },
    consent: {
      input: document.getElementById('privacy-consent'),
      error: document.getElementById('consent-error'),
      group: document.getElementById('group-consent'),
      validate: function () {
        if (!this.input.checked) return 'You must agree to the privacy policy before sending.';
        return '';
      }
    }
  };

  /**
   * Validate a single field
   */
  function validateField(key, isBlurEvent) {
    const field = fields[key];
    if (!field || !field.input) return '';

    const value = field.input.value;
    const errorMessage = field.validate(value);

    if (errorMessage) {
      // If triggered on blur, only display error if user touched it or during full submit
      field.group.classList.add('has-error');
      field.input.setAttribute('aria-invalid', 'true');
      if (field.error) {
        field.error.textContent = errorMessage;
      }
      return { id: field.input.id, message: errorMessage };
    } else {
      field.group.classList.remove('has-error');
      field.input.setAttribute('aria-invalid', 'false');
      if (field.error) {
        field.error.textContent = '';
      }
      return null;
    }
  }

  // Attach live blur & input listeners for instant feedback
  Object.keys(fields).forEach(function (key) {
    const field = fields[key];
    if (!field.input) return;

    field.input.addEventListener('blur', function () {
      validateField(key, true);
    });

    field.input.addEventListener('input', function () {
      if (field.group.classList.contains('has-error')) {
        validateField(key, false);
      }
    });

    if (field.input.type === 'checkbox' || field.input.tagName.toLowerCase() === 'select') {
      field.input.addEventListener('change', function () {
        validateField(key, false);
      });
    }
  });

  /**
   * Handle form submission
   */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset alert statuses
    errorSummary.style.display = 'none';
    errorSummaryList.innerHTML = '';
    successMessage.style.display = 'none';

    const errors = [];

    // Validate all fields
    Object.keys(fields).forEach(function (key) {
      const error = validateField(key, false);
      if (error) {
        errors.push(error);
      }
    });

    if (errors.length > 0) {
      // 1. Build accessible error list
      errors.forEach(function (err) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + err.id;
        link.textContent = err.message;
        
        // When clicked, focus the corresponding input
        link.addEventListener('click', function (ev) {
          ev.preventDefault();
          const targetInput = document.getElementById(err.id);
          if (targetInput) {
            targetInput.focus();
          }
        });

        li.appendChild(link);
        errorSummaryList.appendChild(li);
      });

      // 2. Display summary and shift keyboard focus for screen readers
      errorSummary.style.display = 'block';
      errorSummary.setAttribute('tabindex', '-1');
      errorSummary.focus();
    } else {
      // Simulated successful dispatch
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2 A 10 10 0 0 1 22 12"></path>
          </svg>
          Sending Securely...
        `;
      }

      setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        form.reset();
        // Clear all validation styles
        Object.keys(fields).forEach(function (key) {
          const field = fields[key];
          field.group.classList.remove('has-error');
          field.input.removeAttribute('aria-invalid');
          if (field.error) field.error.textContent = '';
        });

        // Show success alert and announce
        successMessage.style.display = 'block';
        successMessage.setAttribute('tabindex', '-1');
        successMessage.focus();
      }, 700);
    }
  });
})();
