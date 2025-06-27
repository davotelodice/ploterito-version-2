# Ploterito Version 2 - Sistema Multiagente de Imprenta 🎯

## Descripción
Sistema multiagente inteligente para automatización de procesos de imprenta, desarrollado con Next.js 14, TypeScript y arquitectura basada en agentes especializados.

## Características Principales
- 🤖 **Agente Principal**: Coordinación central del sistema
- 📋 **Agente de Cotizaciones**: Cálculo automático de precios
- 📞 **Agente de Llamadas**: Gestión de comunicaciones
- 🎨 **Agente de Diseño**: Asistencia en trabajos creativos
- 📊 **Sistema RAG**: Base de conocimiento especializada
- 🔄 **Integración Supabase**: Base de datos y autenticación

## Stack Tecnológico
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Supabase + Edge Functions
- **Base de Datos**: PostgreSQL (Supabase)
- **IA**: OpenAI API + RAG personalizado
- **Herramientas**: MCP (Model Context Protocol)

## Estructura del Proyecto
```
ploterito-version-2/
├── Agentes-de-voz/          # Aplicación Next.js principal
├── package.json             # Scripts del proyecto raíz
└── README.md               # Documentación principal
```

## Estado Actual
✅ **Fase 1**: Análisis y planificación completada  
✅ **Fase 2**: Arquitectura de agentes definida  
✅ **Fase 3**: Especificaciones técnicas listas  
✅ **Fase 4**: Configuración base completada  
🔄 **Fase 5**: Implementación en progreso

## Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o pnpm
- API Key de Ultravox AI

### Pasos de Instalación

```bash
# Clonar repositorio
git clone https://github.com/davotelodice/ploterito-version-2.git
cd ploterito-version-2

# Instalar dependencias de la aplicación principal
cd Agentes-de-voz
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales:
# ULTRAVOX_API_KEY=tu_api_key_aquí

# Ejecutar en desarrollo
npm run dev
```

## Configuración MCP
El proyecto utiliza Model Context Protocol para integración con diferentes servicios:

```bash
# Activar GitHub MCP
/home/david/.cursor/switch-mcp.sh github

# Activar Supabase MCP  
/home/david/.cursor/switch-mcp.sh supabase

# Usar ambos (experimental)
/home/david/.cursor/switch-mcp.sh both
```

## Características de la Aplicación

### Agente Conversacional
- **Interfaz bilingüe**: Español e inglés
- **Voz a texto y texto a voz**: Powered by Ultravox AI
- **Herramientas personalizadas**: Integración con acciones específicas

### Sistema de Pedidos
- **Menú interactivo visual**: Productos categorizados
- **Pedidos por voz**: Interacción natural con el agente
- **Proceso simplificado**: Sin formularios complejos

### Tecnologías Integradas
- **Next.js 14**: Framework React con App Router
- **Tailwind CSS**: Estilizado moderno y responsive
- **TypeScript**: Tipado estático para mayor robustez
- **Ultravox AI**: Capacidades de voz avanzadas

## Contribución
Este es un proyecto de desarrollo activo. Las contribuciones son bienvenidas:

1. Fork del repositorio
2. Crear una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia
MIT License

## Contacto
- **Desarrollador**: David Telodice
- **GitHub**: [@davotelodice](https://github.com/davotelodice)

---
**Desarrollado con ❤️ para automatizar procesos de imprenta**