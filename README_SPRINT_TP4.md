# PRODUCT-IO — Guía de Objetivos (En Criollo) 🇦🇷

¡Buenas! Armé este documento para explicarte de forma súper simple, clara y sin rodeos técnicos ("en criollo") qué estamos haciendo en este proyecto, qué metimos en este sprint (el TP4) y hasta dónde tenemos que llegar exactamente para dar el objetivo por cumplido.

---

## 🎯 ¿Qué es PRODUCT-IO en pocas palabras?
Es un sistema web para controlar los **costos de producción** y la **trazabilidad** (el caminito de los insumos) de una papelera real: **"Papelera K&A"**. 
La idea es que los operarios y administradores de la fábrica puedan registrar qué se produce, cuánto cuesta y qué materiales se usaron, para dejar de llevar todo en papeles o planillas de Excel desordenadas.

---

## 🏁 ¿Hasta dónde tenemos que llegar en este Sprint (TP4)?
El objetivo del **Sprint TP4** es tener el **núcleo administrativo** y la **identidad visual** del sistema funcionando de punta a punta. Esto incluye:

1. **Acceso Seguro (Login)**: Que puedas iniciar sesión con usuario y contraseña (ej: `admin`/`admin`).
2. **Selección de Fábrica (Onboarding)**: Como la empresa tiene varias plantas, antes de entrar al panel tenés que elegir en cuál vas a trabajar hoy (ej: *Fábrica Norte* o *Fábrica Sur*).
3. **Panel Principal (Dashboard)**: Una pantalla de bienvenida con gráficos reales del rendimiento de las máquinas, alertas y un resumen rápido.
4. **Catálogo de Clientes (Gestión de Clientes)**: Una base de datos donde puedas registrar, editar o borrar a los clientes de la papelera (los que compran las servilletas, bolsas, etc.).
5. **Catálogo de Productos (Gestión de Productos - SKUs)**: La lista de las cosas que la papelera fabrica (ej: *Servilletas Doble Hoja*, *Bolsas Kraft*, *Vasos de Polipapel*), con su gramaje, color y familia de producto.

---

## 🛠️ ¿Qué acabamos de terminar y qué funciona hoy?
Hoy tenés el **100% de la funcionalidad del TP4 completada**. Si entrás localmente a probar, esto es lo que ya hace el sistema:

*   **Pantalla de Login**: Anda perfecto y te valida contra la base de datos.
*   **Pantalla de Selección de Fábrica**: Se ve hermosa con el diseño premium de Figma. Detecta qué rol tenés (si sos *Administrador* o *Operario de Línea*) y te muestra el cartelito correspondiente.
*   **Dashboard interactivo**: Ya no es una tabla fea. Ahora tiene los indicadores de Figma y un **gráfico de barras real (usando Chart.js)** que muestra las unidades producidas y el costo total en pesos de cada línea.
*   **Gestión de Clientes**: Podés dar de alta nuevos clientes, editarlos o borrarlos. Todo se guarda en la base de datos local y se actualiza al instante en la pantalla sin recargar la página.
*   **Gestión de Productos**: Podés cargar los productos que fabrica la papelera. Cada uno se muestra con un color distinto según su tipo (azul para servilletas, naranja para bolsitas, verde para troquelados, etc.) y podés crearlos, editarlos o darlos de baja.

---

## 🚀 ¿Qué vendrá en los próximos Sprints (El futuro del proyecto)?
Para que sepas hacia dónde va el software completo más adelante (TP5 en adelante):
*   **Registro de Producción**: Una pantalla para que el operario diga: *"Hoy abro el lote de producción X y voy a fabricar 10.000 servilletas"*.
*   **Cierre de Lote y Costeo**: Cuando se termina de fabricar, el sistema le pedirá al operario que cargue qué insumos usó (ej: *"Usé 2 bobinas de papel y 5 kilos de pegamento"*). El sistema calculará automáticamente **cuánto costó fabricar cada servilleta** sumando los materiales.
*   **Trazabilidad**: Poder buscar un lote viejo y ver la "receta" exacta de cómo se hizo y qué materiales se usaron (por si un cliente se queja de que una tanda salió fallada).

---

## 💡 ¿Cómo probarlo ahora mismo?
Entrá a **[http://localhost:8000/pages/login.php](http://localhost:8000/pages/login.php)** e iniciá sesión con:
*   **Usuario**: `admin` | **Contraseña**: `admin`
*   **Usuario**: `demo` | **Contraseña**: `demo`

*Nota: Si ingresás con un SKU repetido o dejás un campo obligatorio en blanco al crear un producto, ahora te va a saltar una alerta roja flotante abajo a la derecha avisándote exactamente qué pasó (antes esa alerta no se dibujaba en la pantalla).*
