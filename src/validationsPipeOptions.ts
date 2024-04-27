import { ValidationError, ValidatorOptions } from "class-validator";

export interface ValidatonPipeOptions extends ValidatorOptions{
    transform?: boolean;
    disableErrorMessages?: boolean;
    exceptionFactory?: (erros: ValidationError[]) => any;
}