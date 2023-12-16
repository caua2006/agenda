const Contato = require("../models/ContatoModel")
async function renderHome(req,res){
    const contatos = await Contato.findContato();
    res.render('index', {contatos})
}

module.exports = renderHome
