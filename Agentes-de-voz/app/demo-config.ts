import { DemoConfig, ParameterLocation, SelectedTool } from "@/lib/types";

// El system prompt está configurado en el agente ploterito_bot pre-configurado
// ID: 2kQWrTSa.UjdlyJkwWSIa3V6XBo3EcYcL0oHmuzSR

const selectedTools: SelectedTool[] = [
  {
    "temporaryTool": {
      "modelToolName": "updateOrder",
      "description": "Actualiza la información de la cotización con los datos proporcionados por el cliente. Llamar cada vez que se capture nueva información.",
      "dynamicParameters": [
        {
          "name": "category",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Categoría del producto: ENCUADERNADOS, CATALOGO o REIMPRESION",
            "type": "string"
          },
          "required": false
        },
        {
          "name": "clientName",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Nombre completo del cliente",
            "type": "string"
          },
          "required": false
        },
        {
          "name": "clientPhone",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Número de teléfono del cliente",
            "type": "string"
          },
          "required": false
        },
        {
          "name": "width",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Ancho del producto en centímetros",
            "type": "number"
          },
          "required": false
        },
        {
          "name": "height",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Alto del producto en centímetros",
            "type": "number"
          },
          "required": false
        },
        {
          "name": "quantity",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Cantidad de ejemplares a imprimir",
            "type": "number"
          },
          "required": false
        },
        {
          "name": "blackWhitePages",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Número de páginas en blanco y negro",
            "type": "number"
          },
          "required": false
        },
        {
          "name": "colorPages",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Número de páginas a color",
            "type": "number"
          },
          "required": false
        },
        {
          "name": "bindingType",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Tipo de encuadernación: engargolado, hotmelt, engrapado",
            "type": "string"
          },
          "required": false
        },
        {
          "name": "material",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Material de la cubierta o acabados especiales",
            "type": "string"
          },
          "required": false
        },
        {
          "name": "coating",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Tipo de laminado o recubrimiento",
            "type": "string"
          },
          "required": false
        }
      ],
      "client": {}
    }
  },
  {
    "temporaryTool": {
      "modelToolName": "highlightProduct",
      "description": "Resalta un tipo de producto en la interfaz visual sin agregarlo a la cotización.",
      "dynamicParameters": [
        {
          "name": "productType",
          "location": ParameterLocation.BODY,
          "schema": {
            "description": "Tipo de producto a resaltar",
            "type": "string"
          },
          "required": true
        }
      ],
      "client": {}
    }
  },
  {
    "temporaryTool": {
      "modelToolName": "processPayment",
      "description": "Finaliza la cotización y genera el resumen final cuando se tiene toda la información necesaria.",
      "dynamicParameters": [],
      "client": {}
    }
  }
];

export const demoConfig: DemoConfig = {
  title: "Ploterito - Cotizaciones de Imprenta",
  overview: "Sistema de captación de información para cotizaciones de imprenta por voz.",
  callConfig: {
    // Para agente pre-configurado ploterito_bot, NO enviamos systemPrompt, voice, model, temperature
    // Esos están configurados en el agente
    selectedTools: selectedTools,
    medium: { webRtc: {} },
    recordingEnabled: true,
    maxDuration: "1800s"
  }
};

export default demoConfig;