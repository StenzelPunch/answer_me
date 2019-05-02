/* eslint-disable no-useless-escape */
class RegInput {
    constructor(
        value,
        title,
        type,
        id,
        placeholder,
        isValid,
        invalidFeedback,
        pattern
    ) {
        this.value = value;
        this.title = title;
        this.type = type;
        (this.class = {
            "form-control": true,
            "is-invalid": false,
            "is-valid": false
        }),
            (this.id = id);
        this.placeholder = placeholder;
        this.isValid = isValid;
        this.invalidFeedback = invalidFeedback;
        this.pattern = new RegExp(pattern);
    }
    validate() {
        const test = this.pattern.test(this.value);
        if (test) {
            this.isValid = true;
            this.class["is-valid"] = true;
            this.class["is-invalid"] = false;
        } else if (!test) {
            this.isValid = false;
            this.class["is-valid"] = false;
            this.class["is-invalid"] = true;
        }
    }
}

export default {
    firstName: new RegInput(
        null,
        "Имя",
        "text",
        "first-name",
        "Введите имя",
        false,
        "Введите имя на русском или украинском языке",
        /^[А-Яа-яёЁЇїІіЄєҐґ]{2,100}/
    ),
    lastName: new RegInput(
        null,
        "Фамилия",
        "text",
        "last-name",
        "Введите фамилию",
        false,
        "Введите фамилию на русском или украинском языке",
        /^[А-Яа-яёЁЇїІіЄєҐґ]{2,100}/
    ),
    email: new RegInput(
        null,
        "Адрес электронной почты",
        "email",
        "reg-email",
        "example@mail.com",
        false,
        "Введите существующий адрес электорнной почты",
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
    password: new RegInput(
        null,
        "Пароль",
        "password",
        "reg-password",
        "Введите пароль",
        false,
        "Пароль должен быть длинее 5 символов и не содержать специальных символов",
        /[0-9a-zA-Z]{6,30}/
    )
};
