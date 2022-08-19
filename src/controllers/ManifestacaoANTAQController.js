const { extensaoControleDB } = require("../database");
const { getIDControleREIDI } = require("./ControleREIDIController");

module.exports = {
  async read(req, res, next) {
    try {
      const results = await extensaoControleDB("TBManifestacaoANTAQ");

      res.json(results);
    } catch (error) {}
  },

  async create(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;

      const { IDControleREIDI } = await getIDControleREIDI(NRProcessoPrincipal);

      const {
        //IDManifestacaoANTAQ,
        DTManifestacaoANTAQ,
        IDEstadoManifestacaoANTAQ,
        DSTituloManifestacaoANTAQ,
        NRManifestacaoANTAQDocumentoSEI,
        IDManifestacaoANTAQDocumentoSEI,
      } = req.body;

      await extensaoControleDB("TBManifestacaoANTAQ").insert({
        IDControleREIDI,
        //IDManifestacaoANTAQ,
        DTManifestacaoANTAQ,
        IDEstadoManifestacaoANTAQ, //Radio Button
        DSTituloManifestacaoANTAQ,
        NRManifestacaoANTAQDocumentoSEI,
        IDManifestacaoANTAQDocumentoSEI,
      });

      res.status(201).json({
        IDControleREIDI,
        //IDManifestacaoANTAQ,
        DTManifestacaoANTAQ,
        IDEstadoManifestacaoANTAQ, //Radio Button
        DSTituloManifestacaoANTAQ,
        NRManifestacaoANTAQDocumentoSEI,
        IDManifestacaoANTAQDocumentoSEI,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;

      const IDControleREIDI = await getIDControleREIDI(NRProcessoPrincipal);

      const response = await extensaoControleDB("TBManifestacaoANTAQ")
        .where(IDControleREIDI)
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
        DTManifestacaoANTAQ,
        DSTituloManifestacaoANTAQ,
        IDEstadoManifestacaoANTAQ,
        NRManifestacaoANTAQDocumentoSEI,
        IDManifestacaoANTAQDocumentoSEI,
      } = req.body;

      const IDControleREIDI = await getIDControleREIDI(NRProcessoPrincipal);

      console.log(IDControleREIDI);

      await extensaoControleDB("TBManifestacaoANTAQ")
        .where(IDControleREIDI)
        .update({
          DTManifestacaoANTAQ,
          DSTituloManifestacaoANTAQ,
          IDEstadoManifestacaoANTAQ,
          NRManifestacaoANTAQDocumentoSEI,
          IDManifestacaoANTAQDocumentoSEI,
        });

      res.status(200).json({
        DTManifestacaoANTAQ,
        DSTituloManifestacaoANTAQ,
        IDEstadoManifestacaoANTAQ,
        NRManifestacaoANTAQDocumentoSEI,
        IDManifestacaoANTAQDocumentoSEI,
      });
    } catch (error) {
      next(error);
    }
  },
};
