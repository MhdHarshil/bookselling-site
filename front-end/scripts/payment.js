const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Here you can add your payment processing logic
      const cardNumber = document.getElementById('card-number').value;
      const expiryDate = document.getElementById('expiry-date').value;
      const cvv = document.getElementById('cvv').value;

      console.log('Processing payment with:', {
        cardNumber,
        expiryDate,
        cvv
      });

      // Simulate a successful payment
      alert('Payment processed successfully!');
    });