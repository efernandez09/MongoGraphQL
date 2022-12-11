import {gql} from 'apollo-server';
import modeloTablones from'../../server/models/modeloTablones'


module.exports.showTablones = async (req, res, next) => {
    
    try {
        const tabs = await modeloTablones.find();
        res.json(tabs);
    } catch (err) {
        next(err);
    }

}

module.exports.deleteTab = async (req, res) => {
    
    const {_id} = req.params;

    try {
        const tabs = await modeloTablones.findByIdAndDelete(_id); 
        return res.status(200).json(`El tablón ${_id} ha sido eliminado.`)
    } catch (error) {
        return res.status(400).json(`El tablón no ha sido eliminado por el error: ${error}`);
    }
}

module.exports.addTab = async (req, res) => {
    
    const {titulo, autor, descripcion} = req.body;

    try {
        const newTab = await modeloTablones.create({titulo, autor, descripcion});
        return res.status(200).json(`El tablón se ha creado correctamente`)
    } catch (error) {
        return res.status(400).json(`El tablón no se ha podido crear por el siguiente error: ${error}.`);
    }
}

