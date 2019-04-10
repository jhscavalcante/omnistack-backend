const multer = require('multer');
const path = require('path'); // módulo padrão do node
// path resolve os caminhos dos diretórios (windows x linux... ) de forma automática
const crypto = require('crypto');
// crypto => serve para gerar hash's e conjunto de caracteres únicos 

module.exports = {
    
    // __dirname (caminho do diretório multer.js )
    // 1 caminho - estou na pasta config e quero voltar para a pasta src
    // 2 caminho - estou na pasta src e quero retornar para a pasta raiz (backend) 
    // 3 - pasta tmp é onde irei jogar os arquivos
    // resumindo: toda vez que for realizado um upload via Multer ele vai jogar na pasta tmp

    //cb => callback
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({        
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        }
    })
    
};