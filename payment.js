
//restrict input to number in card number, adding space every 4 digit
const cNumber = document.getElementById('number');

cNumber.addEventListener('input', function () {
    let num = cNumber.value.replace(/\D/g, ''); // Remove non-digits

    // Limit to 16 digits max
    num = num.substring(0, 16);

    // Add spaces after every 4 digits
    let formatted = '';
    for (let i = 0; i < num.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatted += ' ';
        }
        formatted += num[i];
    }

    cNumber.value = formatted;
});

//restrict input to number in cvv
const cvvInput = document.getElementById('cvv');

cvvInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').substring(0, 3);
});

