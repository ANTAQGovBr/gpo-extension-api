const { arrendamentoV2DB, corporativoDB } = require("../database");

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

  async getCDTrigrama(IDContratoArrendamento) {
    try {
      const result = await arrendamentoV2DB
        .select("CDTrigrama")
        .from("TBContratoArrendamento")
        .where({
          IDContratoArrendamento
        })
        .first();

      return result;
    } catch (error) {
      console.log(error);
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
        "MMObjeto",
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
        "IDNaturezaCarga",
        "NOGrupoMercadoria",
      )
        .where({
          IDContratoArrendamento
        })
        .first();
        
        // Agregacao do atributo do Perfil de Carga 
      const resultsCarga = {
        ...results,
        ...await this.readPerfilCarga(results.IDNaturezaCarga)
      }
      return resultsCarga; 
    } catch (error) {
      console.log(error);
    }
  },

  async readPerfilCarga(IDTipoAcondicionamento) {
    try {
      const resultsPerfilCarga = await corporativoDB("TBTipoAcondicionamento").select(
        "DSTipoAcondicionamento",

      )
        .where({
          IDTipoAcondicionamento
        })
        .first();
      return resultsPerfilCarga;

    } catch (error) {
      console.log(error);
    }
  },
};
