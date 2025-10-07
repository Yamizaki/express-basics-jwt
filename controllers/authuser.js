import  AuthUserModel from '../models/authuser.js';
import {generateToken} from '../helpers/jwt_generator.js';
class authUsersController {
    constructor(){
        //   Aquí inicializarías el modelo o cualquier otra cosa necesaria
    }

    async createUser(req, res){
        try{
            // first we going to try to find a user with the same email
            const {email, username, password} = req.body;
            const newUser = await AuthUserModel.findOne({email});
            
            if (newUser){
                return res.status(400).json({ error: 'El usuario ya existe' });
            }
            const hashedPassword = await AuthUserModel.hashPassword(password);
            const authUserData = { email, username, password: hashedPassword };
            console.log(authUserData);
            const createdUser = await AuthUserModel.create(authUserData);
            res.status(201).json(createdUser);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }

    async loginUser(req, res){
        const {username, password} = req.body;
        try{
            const user = await AuthUserModel.findOne({username});
            if (!user){
                return res.status(400).json({ error: 'Credenciales Inválidas' });
            }
            const isPasswordValid = await AuthUserModel.comparePassword(password, user.password);
            if (!isPasswordValid){
                return res.status(400).json({ error: 'Credenciales Inválidas' });
            }
            const token = generateToken({ id: user._id, username: user.username });
            const response = {  "message": "login was successful",
                                token};
            res.status(200).json(response);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }

    async getUsers(req, res){
        try {
            const users = await AuthUserModel.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: `Error al obtener los usuarios ${error}` });
        }
        
    }

    async getUserById(req, res){
        try {
            const userId = req.params.id;
            console.log(userId);
            const user = await AuthUserModel.findById(userId.toString());
            console.log(user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error("error" + error);
            res.status(500).json({ error: `Error al obtener el usuario ${error}` });
        }
    }

    async updateUser(req, res){
        try{
            const userId = req.body.id;
            const authUserData = req.body;
            delete authUserData.id; // Eliminar el id del cuerpo de la solicitud para evitar conflictos
            const result = await AuthUserModel.update(userId, authUserData);
            res.status(200).json(result);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    }
    
    async deleteUser(req, res){
        try{
            const userId = req.body.id;
            const result = await AuthUserModel.delete(userId);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    }    
}

export default new authUsersController();