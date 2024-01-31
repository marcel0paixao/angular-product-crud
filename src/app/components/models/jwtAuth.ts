import { User } from "./User";

export interface JwtAuth {
    access_token: string;
    user: User;
}