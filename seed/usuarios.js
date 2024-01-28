import bcrypt from 'bcrypt';

const usuarios = [
    {
        nombre:'Nicolas',
        email:'coronelnico5@gmail.com',
        confirmado:1,
        password: bcrypt.hashSync('password', 10)
    }
]

export default usuarios;