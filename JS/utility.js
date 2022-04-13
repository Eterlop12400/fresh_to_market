class Utility {
    constructor() {
    }

    // This static method will be used to validate string input from the user.
    static stringValidation(string) {

        let newString = string;

        // This will remove any numbers or symbols. This will ensure the user can't enter an invalid answer.
        newString = newString.replace(/[^A-Za-z]+/g, '');

        // This if condition will check of the string is blank or null. If so it will return false.
        if (newString === '' || newString === null || newString === false) {

            // This will return false.
            return false;
        }
        // If everything checks out then we will return the string.
        else {

            // If this statement runs it will return the string.
            return string;
        }
    }

    // This static method will be used to validate email input from the user.
    static emailValidation(string)
    {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(string);
    }

    // This static method will be used to validate phone input from the user.
    static phoneValidation(num)
    {
        let validPhoneNum = /^\d{10}$/;
        return !!(num.match(validPhoneNum));
    }
}