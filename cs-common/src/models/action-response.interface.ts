import { ActionResponseType } from '../enums/action-response-type.enum';
import { ErrorMessage } from './error-message.interface';

export interface ActionResponse<T>
{
    data: T;
    flag: ActionResponseType;
    errors: ErrorMessage[];
}