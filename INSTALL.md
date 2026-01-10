# Guía de Instalación para Mac

## Paso 1: Instalar Homebrew

Homebrew es el gestor de paquetes para macOS. Ejecuta este comando en la Terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Durante la instalación, te pedirá tu contraseña de administrador y puede que necesites presionar Enter varias veces.

## Paso 2: Verificar la instalación de Homebrew

```bash
brew --version
```

## Paso 3: Instalar Node.js

Una vez que Homebrew esté instalado, instala Node.js (que incluye npm):

```bash
brew install node
```

Este proceso puede tardar unos minutos.

## Paso 4: Verificar la instalación

Verifica que Node.js y npm se instalaron correctamente:

```bash
node --version
npm --version
```

Deberías ver algo como:
- `node --version`: v20.x.x o similar
- `npm --version`: 10.x.x o similar

## Paso 5: Navegar al directorio del proyecto

Si aún no estás en el directorio del proyecto, navega hasta él:

```bash
cd /Users/samsanta/Desktop/Project
```

## Paso 6: Instalar las dependencias del proyecto

```bash
npm install
```

Este comando instalará todas las dependencias necesarias (Next.js, React, TypeScript, Tailwind CSS, etc.).

## Paso 7: Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Una vez que veas el mensaje "Ready" en la terminal, abre tu navegador y visita:

**http://localhost:3000**

¡Listo! Tu aplicación de Beauty Orders debería estar funcionando.

## Solución de Problemas

### Si encuentras errores de permisos:

```bash
sudo chown -R $(whoami) $(brew --prefix)/*
```

### Si prefieres instalar Node.js sin Homebrew:

1. Visita: https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador .pkg
4. Sigue los pasos 5-7 arriba

### Si ya tienes Node.js pero quieres actualizarlo:

```bash
brew upgrade node
```

### Para detener el servidor de desarrollo:

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

## Comandos Útiles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción (después de build)
- `npm run lint` - Ejecuta el linter para verificar errores de código
