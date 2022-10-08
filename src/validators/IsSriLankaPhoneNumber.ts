import {
  ValidationArguments,
  ValidationOptions,
  buildMessage,
  registerDecorator,
} from 'class-validator';

import { parsePhoneNumber } from 'libphonenumber-js';

const defaultCountry = 'LK'; // Sri Lanka
const validCountries = new Set([defaultCountry]);

export function IsSriLankaPhoneNumber(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsSriLankaPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          // the property name that holds the country code
          // const [countryCodeField] = args.constraints;

          // // the value of the country code on the target object
          // const countryCode = (args.object as any)[countryCodeField];

          const parsed = parsePhoneNumber(value, defaultCountry);
          if (!parsed) return false;
          if (!validCountries.has(parsed.country)) return false;

          return true;
        },
        // specify custom error message
        defaultMessage: buildMessage(
          (eachPrefix) =>
            `${eachPrefix} $property must be a valid phone number in Sri Lanka`,
          validationOptions,
        ),
      },
    });
  };
}
