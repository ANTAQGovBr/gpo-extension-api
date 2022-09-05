const ContratoArrendamentoController = require("./ContratoArrendamentoController");
const { extensaoControleDB, arrendamentoV2DB,  } = require("../database");
const PortosController = require("./PortosController");
const UsuarioController = require("./UsuarioController");
const ControleREIDIController = require("./ControleREIDIController");
const AnaliseREIDIController = require("./AnaliseREIDIController");
const ManifestacaoANTAQController = require("./ManifestacaoANTAQController");
const EstadoManifestacaoANTAQController = require("./EstadoManifestacaoANTAQController");
const EstadoAnaliseREIDIController = require("./EstadoAnaliseREIDIController");

module.exports = {
    async read(req, res, next) {
        const { NRProcessoPrincipal } = req.params;
        try {
          const controleREIDIProperties = {
            ...await ControleREIDIController.read(NRProcessoPrincipal),
          };
          const analiseREIDIProperties = {
            ...await AnaliseREIDIController.read(controleREIDIProperties.IDControleREIDI),
          }
          const estadoAnaliseREIDIProperties = {
            ...await EstadoAnaliseREIDIController.read(analiseREIDIProperties.IDEstadoAnaliseREIDI)
          }
          const manifestacaoANTAQProperties = {
            ...await ManifestacaoANTAQController.read(controleREIDIProperties.IDControleREIDI)
          }
          const estadoManifestacaoANTAQProperties = {
            ...await EstadoManifestacaoANTAQController.read(manifestacaoANTAQProperties.IDEstadoManifestacaoANTAQ)
          }
          const usuarioProperties = {
            ...await UsuarioController.readUsuario(analiseREIDIProperties.IDUsuario)
          }


          const processProperties = {
            ...await controleREIDIProperties,
            ...await analiseREIDIProperties,
            ...await usuarioProperties,
            ...await estadoAnaliseREIDIProperties,
            ...await manifestacaoANTAQProperties,
            ...await estadoManifestacaoANTAQProperties,
            ...await ContratoArrendamentoController.read(controleREIDIProperties.IDContratoArrendamento),
            ...await ContratoArrendamentoController.readCarga(controleREIDIProperties.IDContratoArrendamento),
            ...await PortosController.PortoByContrato(controleREIDIProperties.IDContratoArrendamento),
          }

          res.json(processProperties);
        } catch (error) {
          next(error);
        }
      },
}