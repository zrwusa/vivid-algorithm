export interface BunnyProtocol<P = any> {
    http: {
        code: number,
        message?: string,
        description: string,
    },
    bizLogic: {
        code: string,
        message: string,
        payload?: P,
    },
    error?: {
        code?: string,
        message?: string,
        stack?: string,
    }
    bunnyData?: any,
}
