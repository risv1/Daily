import bcrypt from 'bcrypt'

const genRandomSalt = () => {
    return bcrypt.genSaltSync(10)
}

export const hashPassword = async (password: string) => {
    const salt = genRandomSalt()
    return bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}
