export class APIResponse {
    status: number;
    message: string;
    value: object;
    constructor(status: number, message: string, value: object) {
        this.status = status;
        this.value = value;
        this.message = message;
    }
}