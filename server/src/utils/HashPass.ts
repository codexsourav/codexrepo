import bcrypt from 'bcryptjs'

export const hashPass = (pass: string): string => {
    return bcrypt.hashSync(pass, 10);
}

export const validateHashPass = (hash: string, pass: string): boolean => {
    return bcrypt.compareSync(pass, hash);
}

