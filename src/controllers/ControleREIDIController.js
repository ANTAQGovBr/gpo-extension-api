const ContratoArrendamentoController = require("./ContratoArrendamentoController");
const { extensaoControleDB, arrendamentoV2DB } = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const results = await extensaoControleDB("TBControleREIDI");

      res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async getIDControleREIDI(NRProcessoPrincipal){
    try {
      const result = await extensaoControleDB("TBControleREIDI")
      .select("IDControleREIDI")
      .where( {NRProcessoPrincipal} )
      .first()
      

      return result;
    } catch (error) {
      
    }
  },

  async read(req, res, next) {
    const { NRProcessoPrincipal } = req.params;
    try {
      const results = await extensaoControleDB("TBControleREIDI")
        .where({
          NRProcessoPrincipal,
        })
        .fullOuterJoin("TBAnaliseREIDI", {
          "TBControleREIDI.IDControleREIDI": "TBAnaliseREIDI.IDControleREIDI",
        })
        .fullOuterJoin("TBEstadoAnaliseREIDI", {
          "TBAnaliseREIDI.IDEstadoAnaliseREIDI": "TBEstadoAnaliseREIDI.IDEstadoAnaliseREIDI",
        })
        .fullOuterJoin("TBManifestacaoANTAQ", {
          "TBControleREIDI.IDControleREIDI": "TBManifestacaoANTAQ.IDControleREIDI",
        })
        // .fullOuterJoin("TBEstadoManifestacaoANTAQ", {
        //   "TBManifestacaoANTAQ.IDEstadoManifestacaoANTAQ": "TBEstadoManifestacaoANTAQ.IDEstadoManifestacaoANTAQ",
        // })
        .first();

      // União das chamadas ao banco ArrendamentoV2 e ExtensãoControleGPO
      const mergedResults = {
        ...results,
        ...await ContratoArrendamentoController.read(results.IDContratoArrendamento),
        ...await ContratoArrendamentoController.readCarga(results.IDContratoArrendamento),
      };
      

      res.json(mergedResults);
    } catch (error) {
      next(error);
    }
  },

  async matchRows(req, res, next) {
    try {
      const results = await extensaoControleDB("TBControleREIDI").select(
        "NRProcessoPrincipal"
      );

      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const {
        IDContratoArrendamento,
        NRProcessoPrincipal,
        IDProtocoloSEI,
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,
      } = req.body;

      await extensaoControleDB("TBControleREIDI").insert({
        IDContratoArrendamento,
        NRProcessoPrincipal,
        IDProtocoloSEI,
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,
      });
      

      res.status(201).json({
        IDContratoArrendamento,
        NRProcessoPrincipal,
        IDProtocoloSEI,
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { NRProcessoPrincipal } = req.params;

      const response = await extensaoControleDB("TBControleREIDI")
        .where({ NRProcessoPrincipal })
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
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,
      } = req.body;

      await extensaoControleDB("TBControleREIDI")
        .where({ NRProcessoPrincipal })
        .update({
          DTProtocoloPedido,
          VLInvestimentoProposto,
          DSObservacoesSituacao,
          NRProtocoloMINFRA,
          NRCodigoMINFRA,
        });

      res.status(200).json({
        DTProtocoloPedido,
        VLInvestimentoProposto,
        DSObservacoesSituacao,
        NRProtocoloMINFRA,
        NRCodigoMINFRA,

      });
    } catch (error) {
      next(error);
    }
  },
};
