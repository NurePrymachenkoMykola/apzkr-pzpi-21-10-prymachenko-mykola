import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, isString} from 'class-validator';

@ValidatorConstraint({ name: 'textField', async: false})
export class TextField implements ValidatorConstraintInterface {
    isString = true;
    isLonger = false;
    isShorter = false;
    validate(text: any, args: ValidationArguments) {
        if (!text && args.constraints[2]) {
            return true;
        }
        console.log(typeof text, args.property);
        if (typeof text !== 'string') {
            this.isString = false;
            return false
        } else if (text.length < args.constraints[0]) {
            this.isShorter = true;
            return false;
        } else if (text.length > args.constraints[1]) {
            this.isLonger = true;
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        const property = args.property.charAt(0).toUpperCase() + args.property.slice(1);
        if (!this.isString) {
            this.resetToDefault();
            return `${property} must be a string!`;
        } else {
            const message = `${property} cannot be ${this.isLonger ? 'longer' : 'shorter'} than ${this.isLonger ? args.constraints[1] : args.constraints[0]} symbols`;
            this.resetToDefault();
            return message;
        }
    }

    resetToDefault() {
        this.isLonger = false;
        this.isShorter = false;
        this.isString = true;
    }
}