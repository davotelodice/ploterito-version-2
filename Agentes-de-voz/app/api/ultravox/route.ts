import { NextRequest, NextResponse } from 'next/server';

interface CallConfig {
  model?: string;
  voice?: string;
  temperature?: number;
  selectedTools?: any[];
  medium?: {
    webRtc?: Record<string, never>;
  };
  recordingEnabled?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const callConfig: CallConfig = await request.json();
    
    const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY;
    if (!ULTRAVOX_API_KEY) {
      return NextResponse.json(
        { error: 'ULTRAVOX_API_KEY no está configurada' },
        { status: 500 }
      );
    }

    // ID del agente ploterito_bot pre-configurado
    const AGENT_ID = '38999faa-d2da-4168-a5c6-2ce1b709c413';

    console.log('Creando llamada con agente ploterito_bot pre-configurado:', AGENT_ID);

    // CONFIGURACIÓN ORIGINAL: Solo usar el agente pre-configurado
    // Para agentes pre-configurados, SOLO podemos enviar: medium, recordingEnabled
    const requestBody = {
      medium: callConfig.medium || { webRtc: {} },
      recordingEnabled: callConfig.recordingEnabled || true
    };

    console.log('Request body para llamada híbrida:', JSON.stringify(requestBody, null, 2));

    // Crear llamada usando el endpoint del agente PERO con herramientas adicionales
    const response = await fetch(`https://api.ultravox.ai/api/agents/${AGENT_ID}/calls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ULTRAVOX_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Ultravox API:', errorText);
      return NextResponse.json(
        { error: `Error de Ultravox API: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('Llamada creada exitosamente:', {
      callId: result.callId,
      agentId: AGENT_ID,
      joinUrl: result.joinUrl
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error en POST /api/ultravox:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}