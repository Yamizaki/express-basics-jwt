import  UserModel from '../models/user.js';

class usersController {
    constructor(){
        //   Aquí inicializarías el modelo o cualquier otra cosa necesaria
    }

    async createUser(req, res){
        try{
            const userData = req.body;
            console.log(userData);
            const result = await UserModel.create(userData);
            res.status(201).json(result);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }

    async getUsers(req, res){
        try {
            const users = await UserModel.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: `Error al obtener los usuarios ${error}` });
        }
        
    }

    async getUserById(req, res){
        try {
            const userId = req.params.id;
            console.log(userId);
            const user = await UserModel.findById(userId.toString());
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
            const userData = req.body;
            delete userData.id; // Eliminar el id del cuerpo de la solicitud para evitar conflictos
            const result = await UserModel.update(userId, userData);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
    }
    
    async deleteUser(req, res){
        try{
            const userId = req.body.id;
            const result = await UserModel.delete(userId);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
    }    
}

export default new usersController();