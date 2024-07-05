import { IUser } from '../models/User'; // Importe o tipo IUser do seu modelo de usuário

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Adiciona a propriedade user à interface Request
        }
    }
}
