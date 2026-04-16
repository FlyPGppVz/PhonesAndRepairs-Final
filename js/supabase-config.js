/**
 * # ARCHIVO: js/supabase-config.js
 * # PROPÓSITO: Configuración centralizada de Supabase para PhonesAndRepairs.
 * # NOTA: Usa la clave pública (anon key) para operaciones desde el cliente.
 */

const SB_URL = 'https://mjlhbhiraheaeijxeedg.supabase.co';
const SB_KEY = 'sb_publishable_jf2EAm5dueZJY1xAXXNoJA_gn_3MDpn'; // Anon/Public Key

// Inicialización del cliente global
const _supabase = supabase.createClient(SB_URL, SB_KEY);

// Exportar configuración si se usa en módulos (opcional según el setup)
// window._supabase = _supabase;
