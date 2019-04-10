const Box = require('../models/Box');
const File = require('../models/File');

class FileController {

    //console.log(req.file);
    async store(req, res){
        
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        box.files.push(file);

        await box.save();

        // pegando todos os usuários que estão conectados naquela box, com aquele id
        // emit => envia uma informação para os usuários com os dados do arquivo
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }

}

module.exports = new FileController();