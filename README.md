# Beauty Orders - Sistema CRUD de Órdenes

Sistema de gestión de órdenes de productos de belleza construido con Next.js, TypeScript y Tailwind CSS. Interfaz minimalista inspirada en Cursor.com y OpenAI.com.

## Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar órdenes
- 🖼️ **Imágenes de Productos**: Productos con imágenes desde Unsplash
- 🎨 **Diseño Minimalista**: Interfaz limpia inspirada en Cursor/OpenAI
- 📱 **Responsive**: Diseño adaptable a diferentes tamaños de pantalla
- 🌙 **Modo Oscuro**: Soporte para tema oscuro
- ⚡ **Next.js 14**: App Router con TypeScript

## Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   ├── orders/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts    # GET, PUT, DELETE por ID
│   │   │   └── route.ts         # GET, POST todas las órdenes
│   │   └── products/
│   │       └── route.ts         # GET productos disponibles
│   ├── orders/
│   │   ├── [id]/
│   │   │   └── edit/
│   │   │       └── page.tsx     # Página de edición
│   │   ├── new/
│   │   │   └── page.tsx         # Página de creación
│   │   └── page.tsx             # Lista de órdenes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Página principal
├── components/
│   ├── Navbar.tsx               # Barra de navegación
│   ├── OrderCard.tsx            # Tarjeta de orden
│   └── OrderForm.tsx            # Formulario de orden
├── lib/
│   └── data.ts                  # Almacenamiento en memoria y productos iniciales
└── types/
    └── index.ts                 # Tipos TypeScript

```

## Uso

### Ver Todas las Órdenes

Navega a `/orders` para ver todas las órdenes existentes. Cada orden muestra:
- Información del cliente
- Productos incluidos con imágenes
- Estado de la orden (Pendiente, Completada, Cancelada)
- Total de la orden
- Botones para editar o eliminar

### Crear Nueva Orden

1. Haz clic en "Nueva Orden" o navega a `/orders/new`
2. Completa la información del cliente (nombre y email)
3. Selecciona productos haciendo clic en ellos
4. Ajusta las cantidades en el panel lateral
5. Selecciona el estado de la orden
6. Haz clic en "Crear" para guardar

### Editar Orden

1. Desde la lista de órdenes, haz clic en "Editar" en cualquier orden
2. Modifica la información necesaria
3. Agrega o elimina productos
4. Actualiza las cantidades si es necesario
5. Haz clic en "Actualizar" para guardar los cambios

### Eliminar Orden

1. Desde la lista de órdenes, haz clic en "Eliminar"
2. Confirma la acción en el diálogo
3. La orden se eliminará permanentemente

## Productos Pre-cargados

El sistema incluye 8 productos de belleza pre-cargados con imágenes de Unsplash:
- Serum Vitamina C
- Crema Hidratante Ácido Hialurónico
- Máscara Facial Arcilla
- Contorno de Ojos Antiedad
- Protector Solar SPF 50
- Exfoliante Facial Suave
- Tónico Facial Equilibrante
- Labial Mate Larga Duración

## Notas Técnicas

- **Almacenamiento**: Los datos se guardan en memoria (se reinician al recargar el servidor)
- **Imágenes**: Se utilizan imágenes de Unsplash para los productos
- **API Routes**: Next.js API Routes para el backend
- **TypeScript**: Todo el código está tipado

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Tecnologías Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React 18** - Biblioteca UI

## Próximos Pasos (Opcional)

Para convertir esto en una aplicación de producción, considera:
- Agregar una base de datos real (PostgreSQL, MongoDB, etc.)
- Implementar autenticación de usuarios
- Agregar validaciones más robustas
- Implementar paginación para listas grandes
- Agregar búsqueda y filtros
- Implementar tests
