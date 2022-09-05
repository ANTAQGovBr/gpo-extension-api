const { extensaoControleDB } = require("../database");
const { getIDControleREIDI } = require("./ControleREIDIController");


module.exports = {
  async read(IDControleREIDI, next) {
    try {
      const results = await extensaoControleDB("TBAnaliseREIDI")
      .where({IDControleREIDI})
      .first();

      return results;
    } catch (error) {next(error)}
  },

  async create(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;

      const {IDControleREIDI} = await getIDControleREIDI(NRProcessoPrincipal);
   
      const {
        IDUsuario,
        DSTituloAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
        IDEstadoAnaliseREIDI,
        NRAnaliseREIDIDocumentoSEI,
        IDAnaliseREIDIDocumentoSEI
      } = req.body;

      await extensaoControleDB("TBAnaliseREIDI").insert({
        IDControleREIDI,
        IDUsuario,
        DSTituloAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
        IDEstadoAnaliseREIDI,
        NRAnaliseREIDIDocumentoSEI,
        IDAnaliseREIDIDocumentoSEI
      });
      

      res.status(201).json({
        IDControleREIDI,
        IDUsuario,
        DSTituloAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
        IDEstadoAnaliseREIDI,
        NRAnaliseREIDIDocumentoSEI,
        IDAnaliseREIDIDocumentoSEI
      });
    } catch (error) {
      next(error);
    }
  },
  
  async delete(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;

      const IDControleREIDI = await getIDControleREIDI(NRProcessoPrincipal);
      
      const response = await extensaoControleDB("TBAnaliseREIDI")
        .where( IDControleREIDI )
        .del("*");

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;
      const {
        IDUsuario,
        DSTituloAnaliseREIDI,
        IDEstadoAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
      } = req.body;

      const IDControleREIDI = await getIDControleREIDI(NRProcessoPrincipal);

      await extensaoControleDB("TBAnaliseREIDI")
        .where( IDControleREIDI )
        .update({
          IDUsuario,
          DSTituloAnaliseREIDI,
          IDEstadoAnaliseREIDI,
          DTInicioAnaliseREIDI,
          DTFimAnaliseREIDI,
        });

      res.status(200).json({
        IDUsuario,
        DSTituloAnaliseREIDI,
        IDEstadoAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
      });
    } catch (error) {
      next(error);
    }
  },
};
