
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


//restrict date to mm/yy format

const expiryInput = document.getElementById('expiry');

expiryInput.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, ''); // remove non-digits

    if (value.length === 0) {
        this.value = '';
    } else if (value.length < 3) {
        // Add slash after 2 digits
        this.value = value.length === 2 ? value + '/' : value;
    } else {
        // Format as MM/YY
        this.value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
});


//only enable the order button once all mandatory things are filled out

applyFilter.disabled = false;

