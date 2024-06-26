import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isDateFormat', async: false })
export class IsDateFormat implements ValidatorConstraintInterface {
    validate(dateString: string, args: ValidationArguments) {

        try {
            const date = new Date(dateString);

            if (date.getFullYear() > 1850) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'Date is not valid!';
    }
}