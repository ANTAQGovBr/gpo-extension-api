const { extensaoControleDB } = require("../database");

module.exports = {
    async read(req, res, next) {
        try {
            const results = await extensaoControleDB("TBUsuario").select(
                "IDUsuario",
                "NOUsuarioReduzido",
                "STNovaAnalise", 
            )
            .orderBy([{
                column: "STNovaAnalise",
                order: "desc"
            },
            "NOUsuarioReduzido"
            ])
            res.json(results);
        } catch (error) { }
    },

    async readUsuario(IDUsuario) {
        try {
            const results = await extensaoControleDB("TBUsuario").select(
                "NOUsuarioReduzido",
                "STNovaAnalise",
            )
                .where({
                    IDUsuario,
                })
                .first();

            return results;
        }
        catch (error) {
            console.log(error);
        }
    },
};
