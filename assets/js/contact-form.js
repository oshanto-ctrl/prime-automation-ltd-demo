document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error states
        resetErrors();
        
        // Get form fields
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const agree = document.getElementById('agree');
        
        // Validation flags
        let isValid = true;
        
        // Validate first name
        if (!firstName.value.trim()) {
            showError('firstName', 'Please enter your first name');
            isValid = false;
        }
        
        // Validate last name
        if (!lastName.value.trim()) {
            showError('lastName', 'Please enter your last name');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError('email', 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            showError('subject', 'Please enter a subject');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError('message', 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        // Validate agreement
        if (!agree.checked) {
            showError('agree', 'You must agree to the terms');
            isValid = false;
        }
        
        // If form is valid, submit it
        if (isValid) {
            // For demo purposes, we'll just show a success message
            // In a real application, you would submit the form data to a server
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear error when user starts typing
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement && !errorElement.classList.contains('hidden')) {
                errorElement.classList.add('hidden');
                this.classList.remove('border-red-500');
            }
        });
    });
    
    // Validate agreement checkbox
    const agreeCheckbox = document.getElementById('agree');
    agreeCheckbox.addEventListener('change', function() {
        const errorElement = document.getElementById('agreeError');
        if (errorElement && !errorElement.classList.contains('hidden') && this.checked) {
            errorElement.classList.add('hidden');
        }
    });
    
    // Function to validate a single field
    function validateField(field) {
        const fieldName = field.id;
        const fieldValue = field.value.trim();
        
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
            case 'subject':
                if (!fieldValue) {
                    showError(fieldName, `Please enter your ${fieldName === 'firstName' ? 'first' : fieldName === 'lastName' ? 'last' : ''} name${fieldName === 'subject' ? ' a subject' : ''}`);
                    return false;
                }
                break;
                
            case 'email':
                if (!fieldValue) {
                    showError(fieldName, 'Please enter your email address');
                    return false;
                } else if (!isValidEmail(fieldValue)) {
                    showError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;
                
            case 'message':
                if (!fieldValue) {
                    showError(fieldName, 'Please enter your message');
                    return false;
                } else if (fieldValue.length < 10) {
                    showError(fieldName, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    // Function to show error for a field
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.add('border-red-500');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
    }
    
    // Function to reset all errors
    function resetErrors() {
        const errorElements = contactForm.querySelectorAll('.text-red-500');
        errorElements.forEach(element => {
            element.classList.add('hidden');
        });
        
        const inputElements = contactForm.querySelectorAll('input, textarea');
        inputElements.forEach(element => {
            element.classList.remove('border-red-500');
        });
        
        // Hide messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to simulate form submission
    function submitForm() {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide form
            contactForm.style.display = 'none';
            
            // Show success message
            successMessage.classList.remove('hidden');
            
            // Reset form after showing success
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.classList.add('hidden');
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 5000);
        }, 1500);
    }
});