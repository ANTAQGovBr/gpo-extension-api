const { arrendamentoV2DB } = require("../database");

module.exports = {
  async listByPorto(req, res, next) {
    const { CDTrigrama } = req.params;

    try {
      const results = await arrendamentoV2DB
        .select("IDContratoArrendamento", "CDContrato")
        .from("TBContratoArrendamento")
        .where({
          CDTrigrama,
          NRVersao: 1,
        });

      res.json(results);
    } catch (error) {
      next(error);
    }
  },
  async read(IDContratoArrendamento) {
    try {
      const results = await arrendamentoV2DB("TBContratoArrendamento").select(
        "CDTrigrama",
        "IDContratoArrendamento",
        "IDContratoArrendamentoPai",
        "CDContrato",
        "NRVersao",
        "NRCnpj",
        "NOTipoOutorga",
        "NOFantasiaEmpresa",
        "NRCNPJInstalacao",
        "NOInstalacao",
      ).where({
        IDContratoArrendamento,
      })
        .first();
      return results;
    } catch (error) {
      console.log(error);
    }
  },

  async readCarga(IDContratoArrendamento) {
    try {
      const results = await arrendamentoV2DB("TBClassificaoSubclassificaoCarga").select(
        //"IDTipoAcondicionamento",
        "IDClassificaoSubclassificaoCarga",
        "IDClassificaoSubclassificaoCargaPai",
        "IDGrupoMercadoria",
        "NOGrupoMercadoria",
      )
      .where({
        IDContratoArrendamento
      })
      .first();
      return results;
    } catch (error) {
      console.log(error);
    }
  },
};
