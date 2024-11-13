export interface Message {

    text: string;
    isGpt: boolean;
    info?: {
        errors: string[];
        cantidad_errores: number;
        message: string;
    }
}