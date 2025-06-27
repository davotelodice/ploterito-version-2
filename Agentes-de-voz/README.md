# Ploterito Version 2 - Sistema Multiagente de Imprenta 🎯

## Descripción
Sistema multiagente inteligente para automatización de procesos de imprenta, desarrollado con Next.js 14, TypeScript y arquitectura basada en agentes especializados con integración de voz mediante Ultravox AI.

## Características Principales
- 🤖 **Agente Principal**: Coordinación central del sistema
- 📋 **Agente de Cotizaciones**: Cálculo automático de precios por voz
- 📞 **Agente de Llamadas**: Gestión de comunicaciones de voz en tiempo real
- 🎨 **Agente de Diseño**: Asistencia en trabajos creativos
- 📊 **Sistema de Captura Inteligente**: Análisis automático de conversaciones
- 🔄 **Integración Ultravox**: Sistema de voz AI avanzado

## Stack Tecnológico
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **IA de Voz**: Ultravox AI + Sistema de agentes personalizados
- **Cliente de Audio**: WebRTC + UltravoxSession
- **Herramientas**: Client-side tools para captura automática
- **Estilos**: CSS personalizado con animaciones

## Estructura del Proyecto

```
Agentes-de-voz/
├── app/                          # Aplicación Next.js 14
│   ├── api/                      # API Routes
│   │   └── ultravox/            # Endpoint de integración con Ultravox
│   ├── components/              # Componentes React
│   │   ├── BorderedImage.tsx    # Componente de imagen con borde
│   │   ├── CallStatus.tsx       # Estado de llamada de voz
│   │   ├── DebugMessages.tsx    # Mensajes de debug
│   │   ├── MicToggleButton.tsx  # Control de micrófono
│   │   ├── QuotationStatus.tsx  # Estado de cotización
│   │   └── ui/                  # Componentes UI
│   │       └── Toggle.tsx       # Switch toggle
│   ├── globals.css              # Estilos globales con animaciones
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página principal con interface de voz
├── lib/                         # Lógica de negocio
│   ├── callFunctions.ts         # Funciones de manejo de llamadas
│   ├── clientTools.ts           # Herramientas del lado del cliente
│   └── types.ts                 # Tipos TypeScript
├── public/                      # Recursos estáticos
│   └── confetti.js             # Efectos de confetti
├── demo-config.ts              # Configuración del demo
├── next.config.mjs             # Configuración Next.js
├── package.json                # Dependencias
├── tailwind.config.ts          # Configuración Tailwind
└── tsconfig.json               # Configuración TypeScript
```

## Instalación y Configuración

### 1. Instalación de Dependencias
```bash
cd Agentes-de-voz
npm install
```

### 2. Variables de Entorno
Crea un archivo `.env.local` basado en `.env.example`:

```env
# Configuración de Ultravox AI
ULTRAVOX_API_KEY=tu_api_key_aqui

# Configuración del entorno
NODE_ENV=development
```

### 3. Ejecución en Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Funcionalidades del Sistema

### 🎤 **Sistema de Voz Inteligente**
- **Captura Automática**: El sistema escucha y extrae información de cotización automáticamente
- **Análisis en Tiempo Real**: Procesamiento de conversaciones para identificar:
  - Categoría de producto (Encuadernados, Catálogo, Reimpresión)
  - Datos del cliente (nombre, teléfono)
  - Especificaciones técnicas (dimensiones, cantidad, páginas)
  - Material y acabados

### 📊 **Sistema de Cotización Inteligente**
- **Progreso Visual**: Barra de progreso que muestra el avance de la cotización
- **Captura Contextual**: Identifica automáticamente qué información falta
- **Validación en Tiempo Real**: Verifica datos completos antes de generar cotización

### 🔧 **Herramientas del Cliente**
- `updateOrderTool`: Captura y actualiza información de cotización
- `highlightProductTool`: Resalta productos en la interfaz
- `processPaymentTool`: Procesa cotización final

### 🎨 **Interfaz de Usuario**
- **Diseño Responsivo**: Adaptable a móviles y desktop
- **Navegación por Pestañas**: Chat de cotización y catálogo de servicios
- **Animaciones Fluidas**: Efectos CSS personalizados
- **Estados Visuales**: Indicadores de estado de llamada y progreso

## Servicios de Imprenta

### 📚 **Productos Encuadernados**
- Agendas, libretas, libros, catálogos, revistas, menús
- Opciones de encuadernación:
  - Engargolado (4-400 páginas)
  - Hotmelt (32-400 páginas)  
  - Engrapado (4-32 páginas)

### 💼 **Productos de Catálogo**
- Tarjetas de visita, stickers, flyers
- Múltiples materiales y acabados
- Impresión a color y blanco/negro

### 🔄 **Reimpresión**
- Repetir trabajos anteriores
- Con cambios de diseño o material

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Inicio en producción
npm run start

# Linting
npm run lint

# Instalación completa (raíz + aplicación)
npm run install-all
```

## Arquitectura del Sistema

### **Flujo de Cotización por Voz**
1. **Inicio de Sesión**: Usuario inicia conversación con agente de voz
2. **Captura Automática**: Sistema escucha y extrae información relevante
3. **Procesamiento**: Herramientas client-side procesan datos en tiempo real
4. **Actualización Visual**: Interface se actualiza mostrando progreso
5. **Completado**: Cotización lista para generar PDF

### **Componentes Clave**
- **UltravoxSession**: Maneja la sesión de voz WebRTC
- **ClientTools**: Herramientas especializadas para captura de datos
- **QuotationStatus**: Componente de estado con progreso visual
- **CallFunctions**: Gestión de ciclo de vida de llamadas

## Desarrollo y Extensiones

### **Agregar Nuevas Herramientas**
1. Crear función en `clientTools.ts`
2. Registrar en `callFunctions.ts`
3. Configurar en `demo-config.ts`

### **Personalizar Estilos**
- Modificar variables CSS en `globals.css`
- Actualizar configuración Tailwind en `tailwind.config.ts`

### **Integrar Nuevos Servicios**
- Extender `ServicesInfo` component
- Actualizar tipos en `types.ts`
- Modificar lógica de análisis en `clientTools.ts`

## Tecnologías Utilizadas

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos utility-first
- **Ultravox Client**: SDK para integración de voz AI
- **Lucide React**: Iconos modernos
- **Canvas Confetti**: Efectos visuales

## Autor
David Telodice - [GitHub](https://github.com/davotelodice)

## Licencia
MIT License

---

**Ploterito Version 2** - Revolucionando la industria de impresión con IA y tecnología de voz avanzada 🚀