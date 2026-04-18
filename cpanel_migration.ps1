# ==========================================================
# SCRIPT DE MIGRACIÓN: CellphonesAndRepairs
# ==========================================================

$PROJECT_NAME = 'CellphonesAndRepairs'
$DEST_PATH = 'C:\Users\Flypg\Desktop\Nuevo_tema\phones-and-repairs-nextjs\cpanel_deploy'
$BUILD_SOURCE = '.\out'

Write-Host "--- Iniciando Migración de $PROJECT_NAME ---" -ForegroundColor Cyan

# 1. Validación y Limpieza de la carpeta cpanel_deploy
if (Test-Path $DEST_PATH) {
    Write-Host 'Limpiando carpeta de destino...' -ForegroundColor Yellow
    Remove-Item -Recurse -Force "$DEST_PATH\*"
} else {
    Write-Host 'Creando carpeta cpanel_deploy...' -ForegroundColor Green
    New-Item -ItemType Directory -Path $DEST_PATH
}

# 2. Compilación del Stack Moderno (Saltado por ser redundante en este test)
# Write-Host 'Ejecutando Build de producción...' -ForegroundColor Cyan
# npm run build

# 3. Transferencia de archivos Frontend
if (Test-Path $BUILD_SOURCE) {
    Write-Host 'Copiando archivos estáticos a la ruta final...' -ForegroundColor Green
    Copy-Item -Recurse -Filter * "$BUILD_SOURCE\*" -Destination $DEST_PATH
} else {
    Write-Error 'Error: No se encontró la carpeta de compilación /out.'
    exit
}

# 4. Copia del Backend PHP
Write-Host 'Copiando Backend PHP a /api...' -ForegroundColor Cyan
if (Test-Path '.\backend_php\api') {
    New-Item -ItemType Directory -Path "$DEST_PATH\api" -Force
    Copy-Item -Recurse -Filter * '.\backend_php\api\*' -Destination "$DEST_PATH\api"
} else {
    Write-Warning 'No se encontró la carpeta backend_php/api. Asegúrate de que el backend esté listo.'
}

# 5. Inyección del archivo de configuración para Apache (.htaccess)
Write-Host 'Generando archivo .htaccess para cPanel...' -ForegroundColor Cyan
$htaccessLines = @(
  '<IfModule mod_rewrite.c>',
  '  RewriteEngine On',
  '  RewriteBase /',
  '',
  '  # Redirigir todas las peticiones que NO sean archivos reales a index.html',
  '  # Excepto las llamadas a /api/ que son manejadas por PHP',
  '  RewriteCond %{REQUEST_URI} !^/api/',
  '  RewriteCond %{REQUEST_FILENAME} !-f',
  '  RewriteCond %{REQUEST_FILENAME} !-d',
  '  RewriteRule ^(.*)$ index.html [L,QSA]',
  '</IfModule>',
  '',
  '# Seguridad adicional para el cliente',
  'Options -Indexes'
)
$htaccessContent = $htaccessLines -join [System.Environment]::NewLine
$htaccessContent | Out-File -FilePath "$DEST_PATH\.htaccess" -Encoding ASCII

Write-Host '--- MIGRACIÓN COMPLETADA CON ÉXITO ---' -ForegroundColor Green
Write-Host 'Instrucciones Finales:' -ForegroundColor Yellow
Write-Host "1. Sube el contenido de $DEST_PATH a tu public_html en cPanel."
Write-Host '2. Configura tu base de datos MySQL en cPanel.'
Write-Host '3. Importa el archivo backend_php/schema.sql a tu base de datos.'
Write-Host '4. Edita el archivo api/config.php en el servidor con tus credenciales de MySQL.'
Write-Host "Ruta del paquete: $DEST_PATH"
