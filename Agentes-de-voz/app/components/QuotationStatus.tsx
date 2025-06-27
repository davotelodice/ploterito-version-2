'use client';

import React, { useState, useEffect } from 'react';
// Iconos removidos según solicitud del usuario

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

interface FinalQuotation extends QuotationData {
  id?: string;
  status?: string;
}

const QuotationStatus = () => {
  console.log('🔍 [DIAGNÓSTICO-2] ✅ QuotationStatus se está renderizando');
  
  const [quotationData, setQuotationData] = useState<QuotationData>({});
  const [finalQuotation, setFinalQuotation] = useState<FinalQuotation | null>(null);
  const [progress, setProgress] = useState(0);

  // Calcular progreso basado en campos completados
  const calculateProgress = (data: QuotationData) => {
    const requiredFields = ['category', 'clientName', 'clientPhone', 'width', 'height', 'quantity'];
    const completedFields = requiredFields.filter(field => data[field as keyof QuotationData]);
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  useEffect(() => {
    // Escuchar eventos de actualización de cotización
    const handleQuotationUpdate = (event: CustomEvent) => {
      console.log('🔍 [DIAGNÓSTICO-3] ✅ Evento quotationUpdate recibido:', event.detail);
      const newData = event.detail as QuotationData;
      console.log('🔍 [DIAGNÓSTICO-3] Datos anteriores:', quotationData);
      console.log('🔍 [DIAGNÓSTICO-3] Datos nuevos:', newData);
      setQuotationData(newData);
      const newProgress = calculateProgress(newData);
      console.log('🔍 [DIAGNÓSTICO-3] Progreso calculado:', newProgress);
      setProgress(newProgress);
    };

    // Escuchar eventos de cotización completada
    const handleQuotationCompleted = (event: CustomEvent) => {
      console.log('[QuotationStatus] Evento quotationCompleted recibido:', event.detail);
      setFinalQuotation(event.detail as FinalQuotation);
    };

    // Cargar datos existentes del localStorage
    const loadExistingData = () => {
      const stored = localStorage.getItem('quotationData');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setQuotationData(data);
          setProgress(calculateProgress(data));
        } catch (error) {
          console.error('Error cargando datos existentes:', error);
        }
      }

      const finalStored = localStorage.getItem('finalQuotation');
      if (finalStored) {
        try {
          setFinalQuotation(JSON.parse(finalStored));
        } catch (error) {
          console.error('Error cargando cotización final:', error);
        }
      }
    };

    // Registrar event listeners
    window.addEventListener('quotationUpdate', handleQuotationUpdate as EventListener);
    window.addEventListener('quotationCompleted', handleQuotationCompleted as EventListener);

    // Cargar datos existentes
    loadExistingData();

    // Cleanup
    return () => {
      window.removeEventListener('quotationUpdate', handleQuotationUpdate as EventListener);
      window.removeEventListener('quotationCompleted', handleQuotationCompleted as EventListener);
    };
  }, []);

  // Resetear cotización
  const resetQuotation = () => {
    setQuotationData({});
    setFinalQuotation(null);
    setProgress(0);
    localStorage.removeItem('quotationData');
    localStorage.removeItem('finalQuotation');
  };

  // Generar PDF (simulado)
  const generatePDF = () => {
    if (finalQuotation) {
      console.log('Generando PDF para cotización:', finalQuotation.id);
      alert(`PDF generado para cotización ${finalQuotation.id}`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Estado de Cotización</h3>
        {Object.keys(quotationData).length > 0 && (
          <button
            onClick={resetQuotation}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progreso</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Información capturada */}
      <div className="space-y-3">
        {quotationData.category && (
          <div className="flex justify-between">
            <span className="text-gray-600">Categoría:</span>
            <span className="font-medium text-blue-600">{quotationData.category}</span>
          </div>
        )}

        {quotationData.clientName && (
          <div className="flex justify-between">
            <span className="text-gray-600">Cliente:</span>
            <span className="font-medium">{quotationData.clientName}</span>
          </div>
        )}

        {quotationData.clientPhone && (
          <div className="flex justify-between">
            <span className="text-gray-600">Teléfono:</span>
            <span className="font-medium">{quotationData.clientPhone}</span>
          </div>
        )}

        {(quotationData.width || quotationData.height) && (
          <div className="flex justify-between">
            <span className="text-gray-600">Dimensiones:</span>
            <span className="font-medium">
              {quotationData.width}cm x {quotationData.height}cm
            </span>
          </div>
        )}

        {quotationData.quantity && (
          <div className="flex justify-between">
            <span className="text-gray-600">Cantidad:</span>
            <span className="font-medium">{quotationData.quantity} ejemplares</span>
          </div>
        )}

        {quotationData.blackWhitePages && (
          <div className="flex justify-between">
            <span className="text-gray-600">Páginas B/N:</span>
            <span className="font-medium">{quotationData.blackWhitePages}</span>
          </div>
        )}

        {quotationData.colorPages && (
          <div className="flex justify-between">
            <span className="text-gray-600">Páginas Color:</span>
            <span className="font-medium">{quotationData.colorPages}</span>
          </div>
        )}

        {quotationData.bindingType && (
          <div className="flex justify-between">
            <span className="text-gray-600">Encuadernación:</span>
            <span className="font-medium">{quotationData.bindingType}</span>
          </div>
        )}

        {quotationData.material && (
          <div className="flex justify-between">
            <span className="text-gray-600">Material:</span>
            <span className="font-medium">{quotationData.material}</span>
          </div>
        )}

        {quotationData.coating && (
          <div className="flex justify-between">
            <span className="text-gray-600">Laminado:</span>
            <span className="font-medium">{quotationData.coating}</span>
          </div>
        )}
      </div>

      {/* Estado de cotización final */}
      {finalQuotation && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-green-800">Cotización Lista</h4>
              <p className="text-sm text-green-600">ID: {finalQuotation.id}</p>
            </div>
            <button
              onClick={generatePDF}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors"
            >
              Generar PDF
            </button>
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay datos */}
      {Object.keys(quotationData).length === 0 && !finalQuotation && (
        <div className="text-center text-gray-500 py-8">
          <p>Inicie una conversación para capturar información de cotización</p>
          <p className="text-sm mt-2">El asistente capturará automáticamente los datos</p>
        </div>
      )}
    </div>
  );
};

export default QuotationStatus;