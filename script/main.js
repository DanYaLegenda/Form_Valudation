

document.addEventListener("DOMContentLoaded", name.maskPhone());










function validation(form) {

    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error');
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLable = document.createElement('label');
        
        parent.classList.add('error')
        errorLable.classList.add('error-label');

        errorLable.textContent = text;
    
        parent.append(errorLable);
    }

    let result = true;
    

    form.querySelectorAll('input').forEach(input => {
        
        removeError(input);

        // name and surname
        if (input.dataset.required != "false" && input.dataset.name == "true") {
            if (input.value == "") {
                result = false;  
                createError(input,  "Пустое поле")
            }
            else if (input.value.length > 20) {
                result = false;
                createError(input, "Превышен размер в 20 символов")
            }
            else if (!(/^[a-zа-яё]{1,20}$/i.test(input.value)) && input.value.length > 0) {
                result = false;
                createError(input, "Недопустимый символ")
            }
        }

        // email
        if (input.dataset.email == "true") {
            if (!(/^[a-z]+@[a-z]{2,5}\.[a-z]{2,3}$/i.test(input.value)))
            {
                if (input.value == "") {
                    result = false;
                    createError(input, "Это обязательное поле!")
                }
                else {
                    result = false;
                    createError(input, "Некорректный email!")
                }
            }
        }

        // phone
        if (input.dataset.phone == "true") {
            if (!(/^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/.test(input.value)))
            {
                if (input.value == "") {
                    result = false;
                    createError(input, "Это обязательное поле!");
                }
                else {
                    result = false;
                    createError(input, "Неккоректный ввоД!");
                }
            }
        }
    });

    form.querySelectorAll("textarea").forEach(input => {
        if (!(/^[ё0-9а-яa-z\s]{1,250}$/i.test(textarea.value))) {
            if (textarea.value == "") {
                result = false;
                createError(input, "Это обязательное поле")
            }
            else if (textarea.length > 250){
                result = false;
                createError(input, "Превышен максимальный размер в 250 символов")
            } else {
                result = false;
                createError(input, "недопустимый символ")
            }
        }
    })

    return result;
}


document.getElementById('add_form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (validation(this)) {
        alert('Форма прошла проверку!');
    } else {
        alert('форма не прошла проверку!')
    }

})






function maskPhone() {

    let phone_numbers = document.querySelectorAll('input[data-phone]');

    let getInputValue = function(input) {
        return input.value.replace(/\D/g, "");
    }

    let onPhoneInput = function(event) {
        let input = event.target;
        let input_value = getInputValue(input);
        let formated_input_value = "";

        if (!input_value) {
            return input.value = "";
        }
        formated_input_value = "+375";

        if (input_value.length > 1) {
            formated_input_value += "(" + input_value.substring(3, 5);
        }   
        if (input_value.length >= 6) {
            formated_input_value += ")" + input_value.substring(5,8);
        }
        if (input_value.length >= 9) {
            formated_input_value += "-" + input_value.substring(8, 10);
        }
        if (input_value.length >= 11) {
            formated_input_value += "-" + input_value.substring(10, 12)
        }
        input.value = formated_input_value;
        console.log(input_value)
    }

    for (let i = 0; i < phone_numbers.length; i++) {
        let input = phone_numbers[i];
        input.addEventListener("input", onPhoneInput);
    }
}
