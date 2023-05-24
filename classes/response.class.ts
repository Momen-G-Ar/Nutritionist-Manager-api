export class APIResponse {
    status: number;
    message: string;
    value: object;
    constructor(status: number, message: string, value: object) {
        this.status = status;
        this.message = message;
        this.value = value;
    }
}