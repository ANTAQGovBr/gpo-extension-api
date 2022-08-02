const { extensaoControleDB } = require("../database");
const { getIDControleREIDI } = require("./ControleREIDIController");


module.exports = {
  async read(req, res, next) {
    try {
      const results = await extensaoControleDB("TBAnaliseREIDI");

      res.json(results);
    } catch (error) {}
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
