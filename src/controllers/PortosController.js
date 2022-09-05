const { getCDTrigrama } = require("./ContratoArrendamentoController");

const outorgaDB = require("../database").outorgaDB;

module.exports = {
  async read(req, res, next) {
    try {
      const results = await outorgaDB
        .select("CDBiGrama", "CDTrigrama", "NOPorto")
        .from("TBPorto")
        .where({
          CDBiGrama: "BR",
          TPPORTO: "1",
        });

      res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async PortoByContrato(IDContratoArrendamento) {
    try {
      const {CDTrigrama} = await getCDTrigrama(IDContratoArrendamento)
      const results = await outorgaDB
        .select("CDBiGrama", "CDTrigrama", "NOPorto")
        .from("TBPorto")
        .where({
          CDTriGrama: CDTrigrama,
        })
        .first()

      return results;
    } catch (error) {
      console.log(error);
    }
  },
};
