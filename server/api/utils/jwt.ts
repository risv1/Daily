import jwt from 'jsonwebtoken'
import { jwtSecret } from '~~/env'

const secret = jwtSecret

export const signJwt = (userId: number) => jwt.sign({ userId }, secret, {
    expiresIn: '1d'
});
export const verifyJwt = (token: string) => jwt.verify(token, secret)
