// Herramientas client-side para Ploterito - Sistema de Cotizaciones
// Basado en el sistema original que funcionaba correctamente

'use client';

type ToolParams = any;
type ClientToolImplementation = (params: ToolParams) => Promise<string>;

// Estado global de la cotización
interface QuotationData {
  category?: string;
  clientName?: string;
  clientPhone?: string;
  width?: number;
  height?: number;
  quantity?: number;
  blackWhitePages?: number;
  colorPages?: number;
  bindingType?: string;
  material?: string;
  coating?: string;
  timestamp?: string;
}

let currentQuotation: QuotationData = {};

/**
 * Herramienta principal para capturar información de cotización
 * Se ejecuta cada vez que el agente captura nueva información
 */
export const updateOrderTool: ClientToolImplementation = (params: ToolParams) => {
  console.log("[updateOrderTool] Invocado con parámetros:", JSON.stringify(params, null, 2));
  
  return new Promise<string>((resolve) => {
    try {
      if (!params || typeof params !== 'object') {
        console.error("[updateOrderTool] Error: Parámetros inválidos");
        resolve("Error: No se proporcionó información válida");
        return;
      }

      // Actualizar el estado de la cotización con los nuevos datos
      let updated = false;
      const updates: string[] = [];

      // Mapear todos los campos posibles
      const fieldMappings = {
        category: 'Categoría',
        clientName: 'Nombre del cliente',
        clientPhone: 'Teléfono',
        width: 'Ancho',
        height: 'Alto',
        quantity: 'Cantidad',
        blackWhitePages: 'Páginas B/N',
        colorPages: 'Páginas color',
        bindingType: 'Encuadernación',
        material: 'Material',
        coating: 'Laminado'
      };

      // Actualizar cada campo que venga en los parámetros
      Object.keys(fieldMappings).forEach(field => {
        if (params[field] !== undefined && params[field] !== null) {
          const oldValue = currentQuotation[field as keyof QuotationData];
          const newValue = params[field];
          
          if (oldValue !== newValue) {
            currentQuotation[field as keyof QuotationData] = newValue;
            updates.push(`${fieldMappings[field as keyof typeof fieldMappings]}: ${newValue}`);
            updated = true;
          }
        }
      });

      if (updated) {
        currentQuotation.timestamp = new Date().toISOString();
        
        // Guardar en localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('quotationData', JSON.stringify(currentQuotation));
        }

        // Disparar evento para actualizar la UI
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('quotationUpdate', {
            detail: currentQuotation
          });
          window.dispatchEvent(event);
          console.log("[updateOrderTool] Evento quotationUpdate disparado con datos:", currentQuotation);
        }

        const message = `Información actualizada: ${updates.join(', ')}`;
        console.log("[updateOrderTool] Éxito:", message);
        resolve(message);
      } else {
        console.log("[updateOrderTool] No hay cambios que actualizar");
        resolve("Información recibida");
      }

    } catch (error) {
      console.error("[updateOrderTool] Error al procesar la información:", error);
      resolve("Error interno al procesar la información");
    }
  });
};

/**
 * Herramienta para resaltar productos en la interfaz
 */
export const highlightProductTool: ClientToolImplementation = (params: ToolParams) => {
  console.log("[highlightProductTool] Llamada recibida con parámetros:", JSON.stringify(params, null, 2));
  
  return new Promise<string>((resolve) => {
    try {
      if (typeof window === "undefined") {
        console.warn("[highlightProductTool] No estamos en un entorno de navegador");
        resolve("No se puede resaltar el producto en este entorno.");
        return;
      }
      
      let productType = '';
      
      if (typeof params === 'string') {
        productType = params;
      } else if (params && typeof params === 'object') {
        productType = params.productType || params.category || params.type || '';
      }
      
      if (!productType) {
        console.error("[highlightProductTool] Error: Tipo de producto no proporcionado");
        resolve("Error: Tipo de producto no proporcionado");
        return;
      }
      
      console.log(`[highlightProductTool] Resaltando producto: ${productType}`);
      
      // Disparar evento para resaltar en la UI
      const event = new CustomEvent("highlightProduct", {
        detail: { productType }
      });
      
      window.dispatchEvent(event);
      console.log("[highlightProductTool] Evento highlightProduct despachado correctamente");
      
      resolve(`Producto ${productType} resaltado correctamente.`);
      
    } catch (error) {
      console.error("[highlightProductTool] Error al resaltar producto:", error);
      resolve("Error al resaltar el producto.");
    }
  });
};

/**
 * Herramienta para procesar la cotización final
 */
export const processPaymentTool: ClientToolImplementation = (params: ToolParams) => {
  console.log("[processPaymentTool] Llamada recibida con parámetros:", JSON.stringify(params, null, 2));
  
  return new Promise<string>((resolve) => {
    try {
      if (typeof window === "undefined") {
        console.warn("[processPaymentTool] No estamos en un entorno de navegador");
        resolve("No se puede procesar la cotización en este entorno.");
        return;
      }
      
      // Verificar que tenemos información suficiente
      const requiredFields = ['category', 'clientName', 'clientPhone'];
      const missingFields = requiredFields.filter(field => !currentQuotation[field as keyof QuotationData]);
      
      if (missingFields.length > 0) {
        const message = `Faltan datos: ${missingFields.join(', ')}`;
        console.log("[processPaymentTool] Datos incompletos:", message);
        resolve(message);
        return;
      }
      
      console.log("[processPaymentTool] Procesando cotización final");
      
      // Crear datos finales de cotización
      const finalQuotation = {
        ...currentQuotation,
        id: `COT-${Date.now()}`,
        status: 'READY',
        timestamp: new Date().toISOString()
      };
      
      // Guardar cotización final
      if (typeof window !== 'undefined') {
        localStorage.setItem('finalQuotation', JSON.stringify(finalQuotation));
      }
      
      // Disparar evento de cotización completada
      const event = new CustomEvent("quotationCompleted", {
        detail: finalQuotation
      });
      
      window.dispatchEvent(event);
      console.log("[processPaymentTool] Evento quotationCompleted despachado correctamente");
      
      resolve("Cotización procesada correctamente. Datos capturados exitosamente.");
      
    } catch (error) {
      console.error("[processPaymentTool] Error al procesar la cotización:", error);
      resolve("Error al procesar la cotización.");
    }
  });
};

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Función para obtener el estado actual de la cotización
 */
export const getCurrentQuotationState = () => {
  return currentQuotation;
};

/**
 * Función para resetear la cotización
 */
export const resetQuotation = () => {
  currentQuotation = {};
  if (typeof window !== 'undefined') {
    localStorage.removeItem('quotationData');
    localStorage.removeItem('finalQuotation');
  }
};

/**
 * Función para cargar cotización desde localStorage
 */
export const loadQuotationFromStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('quotationData');
    if (stored) {
      try {
        currentQuotation = JSON.parse(stored);
        console.log("[loadQuotationFromStorage] Cotización cargada:", currentQuotation);
      } catch (error) {
        console.error("[loadQuotationFromStorage] Error al cargar cotización:", error);
      }
    }
  }
};

// ========================================
// FUNCIONES DE COMPATIBILIDAD
// ========================================

/**
 * Función de compatibilidad para updateOrder
 */
export function updateOrder(params: any) {
  return updateOrderTool(params);
}

/**
 * Función de compatibilidad para highlightProduct
 */
export function highlightProduct(params: any) {
  return highlightProductTool(params);
}

/**
 * Función de compatibilidad para processPayment
 */
export function processPayment(params: any) {
  return processPaymentTool(params);
}

// Exportación por defecto
export default {
  updateOrderTool,
  highlightProductTool,
  processPaymentTool,
  getCurrentQuotationState,
  resetQuotation,
  loadQuotationFromStorage
};