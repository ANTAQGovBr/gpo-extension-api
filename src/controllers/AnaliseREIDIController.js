const { extensaoControleDB } = require("../database");
const { getIDControleREIDI } = require("./ControleREIDIController");


module.exports = {
  async read(req, res, next) {
    try {
      const results = await extensaoControleDB("TBAnaliseREIDI");

      res.json(results);
    } catch (error) {}
  },

  async create(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;

      const {IDControleREIDI} = await getIDControleREIDI(NRProcessoPrincipal);
   
      const {
        //IDUsuario,
        DSTituloAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
        IDEstadoAnaliseREIDI,
        NRAnaliseREIDIDocumentoSEI,
        IDAnaliseREIDIDocumentoSEI
      } = req.body;

      await extensaoControleDB("TBAnaliseREIDI").insert({
        IDControleREIDI,
        //IDUsuario,
        DSTituloAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
        IDEstadoAnaliseREIDI,
        NRAnaliseREIDIDocumentoSEI,
        IDAnaliseREIDIDocumentoSEI
      });
      

      res.status(201).json({
        IDControleREIDI,
        //IDUsuario,
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
        DSTituloAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
      } = req.body;

      const IDControleREIDI = await getIDControleREIDI(NRProcessoPrincipal);

      console.log(IDControleREIDI);

      await extensaoControleDB("TBAnaliseREIDI")
        .where( IDControleREIDI )
        .update({
          DSTituloAnaliseREIDI,
          DTInicioAnaliseREIDI,
          DTFimAnaliseREIDI,
        });

      res.status(200).json({
        DSTituloAnaliseREIDI,
        DTInicioAnaliseREIDI,
        DTFimAnaliseREIDI,
      });
    } catch (error) {
      next(error);
    }
  },
};
