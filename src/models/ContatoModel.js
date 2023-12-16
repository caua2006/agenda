const mongoose = require('mongoose')
const validator = require('validator')


const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    createAt: { type: Date , default: Date.now }
    
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null
    }
    static async findById(id){
        if(typeof id !== 'string') return
        const user = await ContatoModel.findById(id)
        return user
    }
    static async findContato(){
        const contato = await ContatoModel.find({}).sort({createAt: -1})
        return contato
    }
    static async delete(id){
        if(typeof id !== 'string') return
        const contato = await ContatoModel.findByIdAndDelete({_id: id})
        return contato
    }
    async register(){
        this.auth()
        if(this.errors.length > 0) return
        this.contato = await ContatoModel.create(this.body)
        
    }
    auth(){
        this.cleanUp()
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        if(!this.body.nome) this.errors.push('Nome é um campo obrigatório')
        if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado: E-mail ou Telefone')
    }

    cleanUp(){
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }

    async edit(id){
        if(typeof id !== 'string') return
        this.auth()
        if(this.errors.length > 0) return
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
        
    }
}

module.exports = Contato;