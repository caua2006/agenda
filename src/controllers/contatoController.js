const Contato = require('../models/ContatoModel')

exports.index = function (req,res){
    res.render('contato',{contato:{}})
}
exports.register = async function (req,res){
    try {
        const contato = new Contato(req.body)
        await contato.register()

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(function(){
                return res.redirect('/contato')
            })
            return
        }
        req.flash('success', "Usuário cadastrado com sucesso!")
        req.session.save(function(){
            return res.redirect(`/contato/${contato.contato._id}`)
        })
    } catch (error) {
        console.log(error)
        return res.render('404')
    }
}

exports.updateIndex = async function(req,res){
    if(!req.params.id) return res.render('404')
    const contato = await Contato.findById(req.params.id)

    if(!contato) return res.render('404')

    res.render('contato',{contato})
}
exports.edit = async function(req,res){
    try {
        if(!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(function(){
                return res.redirect(`/contato/${req.params.id}`)
            })
            return
        }
        req.flash('success', "Usuário atualizado com sucesso!")
        req.session.save(function(){
            return res.redirect(`/contato/${contato.contato._id}`)
        })
    } catch (error) {
        console.log(error)
        res.render('404')
    }
}
exports.delete = async (req,res)=>{
    if(!req.params.id) return res.render('404')
    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render('404')
    
    req.flash('success', "Usuário atualizado com sucesso!")
    req.session.save(function(){
        return res.redirect(`back`)
    })

}