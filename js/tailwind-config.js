/**
 * # ARCHIVO: js/tailwind-config.js
 * # PROPÓSITO GENERAL: Configuración dinámica de estilos de TailwindCSS vía CDN en tiempo de ejecución.
 * # PATRÓN DE DISEÑO: Inyección en objeto global de window (tailwind.config).
 */

// # OBJETO GLOBAL DE TAILWIND
// ¿Qué hace?: Sobrescribe la configuración por defecto de la librería Tailwind.
// ¿Para qué sirve?: Para inyectar la paleta de colores corporativos (Azul Primario) e Integrar modos oscuros
// de manera que las clases (ej: 'bg-primary') se rendericen correctamente sin necesidad de procesadores de Node (NPM).
tailwind.config = {
    // ¿Qué hace?: Habilita el modo oscuro basado en clases CSS manuales ("class") en vez del sistema nativo ("media").
    // ¿Para qué sirve?: Permitir controles precisos (Toggles) de modo claro/oscuro desde la UI.
    darkMode: "class",
    
    // # EXTENSIÓN DE TEMAS
    theme: {
        extend: {
            // # PALETA CORPORATIVA (COLOR SCHEME)
            // ¿Qué hace?: Extiende el diccionario de colores con variables propias del sistema de diseño (Design Tokens).
            // ¿Para qué sirve?: Evitar el uso de colores codificados en crudo (ej: #063183) y fomentar Clean Code mediante semántica funcional (`text-on-primary`, `bg-error`, etc).
            "colors": {
                "tertiary-dim": "#525357",
                "tertiary-fixed": "#f4f3f8",
                "surface-bright": "#f9f9fb",
                "outline-variant": "#acb3b8",
                "tertiary-fixed-dim": "#e6e5ea",
                "on-surface-variant": "var(--on-surface-variant)",
                "inverse-surface": "#0c0e10",
                "surface-container-lowest": "#ffffff",
                "primary-fixed-dim": "#c1d5ff",
                "on-secondary-fixed-variant": "#5c5b5d",
                "on-primary-fixed-variant": "#0059b6",
                "error": "#9f403d",
                "surface-container-highest": "#dde3e9",
                "on-secondary": "#fbf8fa",
                "on-tertiary-fixed": "#49494e",
                "on-surface": "var(--on-surface)",
                "surface-variant": "#dde3e9",
                "tertiary-container": "#f4f3f8",
                "on-error": "#fff7f6",
                "inverse-primary": "#438fff",
                "on-primary": "#f7f7ff",
                "secondary-container": "#e4e2e4",
                "on-tertiary": "#faf8fe",
                "surface-container-low": "#f2f4f6",
                "on-tertiary-fixed-variant": "#65666a",
                "inverse-on-surface": "#9c9d9f",
                "secondary-fixed": "#e4e2e4",
                "on-background": "var(--on-background)",
                "secondary": "#5f5f61",
                "surface": "#f9f9fb",
                // El Identificador Base de la Empresa (C&R)
                "primary": "#063183",
                "surface-tint": "#063183",
                "surface-container-high": "#e4e9ee",
                "surface-container": "#ebeef2",
                "primary-container": "#d7e2ff",
                "tertiary": "#5e5f63",
                "on-secondary-fixed": "#3f3f41",
                "outline": "#757c81",
                "primary-dim": "#002D72",
                "on-primary-fixed": "#002D72",
                "on-primary-container": "#002D72",
                "secondary-fixed-dim": "#d6d3d6",
                "primary-fixed": "#d7e2ff",
                "on-error-container": "#752121",
                "secondary-dim": "#535355",
                "surface-dim": "#d3dbe2",
                "background": "#f9f9fb",
                "on-tertiary-container": "#5b5b60",
                "error-container": "#fe8983",
                "on-secondary-container": "#525154",
                "error-dim": "#4e0309",
                
                // # ESCALAS TONALES
                // Modificadores de sombreado y brillos.
                "blue": {
                    "50": "#f0f4fa",
                    "100": "#dce6f2",
                    "200": "#bdd0e6",
                    "300": "#8eadcf",
                    "400": "#5a82b1",
                    "500": "#063183",
                    "600": "#002D72",
                    "700": "#002155",
                    "800": "#001639",
                    "900": "#000c21",
                    "950": "#000714"
                }
            },
            
            // # REDONDEOS MULTIPLATAFORMA (BORDER-RADIUS)
            // ¿Para qué sirve?: Sobrescribe sistemáticamente esquinas redondas para un look más Apple (Premium & Smooth).
            "borderRadius": {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px" // Usado en botones píldora
            },
            
            // # TIPOGRAFÍAS GLOBALES (GOOGLE FONTS)
            // ¿Para qué sirve?: Normaliza todas las fuentes de título y párrafos a la elegante 'Inter'.
            "fontFamily": {
                "headline": ["Inter", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "label": ["Inter", "sans-serif"]
            }
        },
    },
}