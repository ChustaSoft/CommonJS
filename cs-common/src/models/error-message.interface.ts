import { ErrorType } from '../enums/error-type.enum';

export interface ErrorMessage
{
    type: ErrorType;
    text: string;
    property: string;
}