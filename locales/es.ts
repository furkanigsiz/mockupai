import { Translations } from './en';

export const es: Translations = {
    // App
    app_title: 'Generador de Maquetas con IA',
    prompt_label: 'Descripción de la Maqueta',
    prompt_placeholder: 'Ej: Una foto de producto de la imagen subida sobre una mesa de madera, con una planta al fondo.',
    generate_button: 'Generar Maquetas',
    generate_button_loading: 'Generando...',
    suggest_button: 'Sugerir Ideas',
    suggest_button_loading: 'Pensando...',
    
    // Main Page
    create_mockup_title: 'Crea Tu Maqueta',

    // Modes
    mode_scene: 'Generación de Escenas',
    mode_product: 'Maquetas de Productos',

    // Spinner
    spinner_title: 'Procesando tu solicitud...',
    spinner_description: 'Esto puede tardar un momento. Por favor, espera.',

    // --- Scene Mode ---
    // Image Uploader (Scene Mode)
    uploader_title: '1. Sube tu(s) Foto(s) de Producto',
    uploader_cta_multi: 'Haz clic para subir o arrastra y suelta',
    uploader_cta_alt: 'tus imágenes aquí',
    uploader_add_more: 'Añadir más imágenes',
    uploader_file_types: 'Soporta PNG, JPG, WEBP',
    // Prompt
    scene_prompt_title: '2. Describe la Escena',
    // Aspect Ratio
    aspect_ratio_label: '3. Seleccionar Relación de Aspecto',
    aspect_ratio_square: 'Cuadrado (1:1)',
    aspect_ratio_landscape: 'Horizontal (16:9)',
    aspect_ratio_portrait: 'Vertical (9:16)',

    // --- Product Mockup Mode ---
    step_1_title: '1. Sube tu Diseño',
    design_uploader_title: '1. Sube tu Diseño',
    design_uploader_cta_title: 'Arrastra y suelta tu archivo aquí, o búscalo.',
    design_uploader_cta_subtitle: 'Soporta: PNG, JPG, SVG. Tamaño máx: 10MB.',
    design_uploader_cta_button: 'Subir Archivo',
    step_2_title: '2. Elige un Producto',
    step_2_subtitle: 'Selecciona una plantilla para aplicar tu diseño.',
    search_products_placeholder: 'Buscar productos...',
    all_categories_option: 'Todas las Categorías',
    step_3_title: '3. Personalizar',
    color_label: 'Color del Producto',
    style_selector_title: 'Estilos Predefinidos',
    style_preset_studio: 'Estudio',
    style_preset_lifestyle: 'Estilo de Vida',
    style_preset_outdoor: 'Exterior',
    style_preset_flatlay: 'Plano Cenital',
    style_prompt_label: 'Detalles de Estilo (Opcional)',
    style_prompt_placeholder: 'ej: usado por un modelo, luz dramática',

    // Generated Image Grid
    grid_title: 'Maquetas Generadas',
    grid_batch_placeholder_title: 'Tus maquetas generadas aparecerán aquí.',
    grid_batch_placeholder_description: 'Completa los pasos a la izquierda para empezar.',
    download_button: 'Descargar',
    save_button: 'Guardar',
    saved_button: 'Guardado',
    use_in_scene_button: 'Usar en Escena',

    // Saved Image Grid
    saved_grid_title: 'Maquetas Guardadas',
    download_all_button: 'Descargar Todas',
    saved_grid_placeholder: 'Tus imágenes guardadas aparecerán aquí. Haz clic en el icono de estrella en una imagen generada para guardarla.',
    remove_button: 'Eliminar',

    // Image Modal
    image_modal_title: 'Vista Previa de Imagen Generada',
    image_modal_close_button: 'Cerrar vista previa',

    // Errors
    error_title: 'Ocurrió un Error',
    error_no_image_or_prompt: 'Por favor, sube al menos una imagen y proporciona una descripción antes de generar.',
    error_no_product_or_design: 'Por favor, selecciona un producto y sube un logo o diseño antes de generar.',
    error_no_image_for_suggestions: 'Por favor, sube primero una imagen para obtener sugerencias.',
    error_suggestions_failed: 'Lo sentimos, no pudimos generar sugerencias en este momento. Por favor, inténtalo de nuevo.',
    error_unknown: 'Ocurrió un error desconocido. Por favor, revisa la consola para más detalles.',

    // Progress Text
    progress_text_generating: 'Generando para "{fileName}" ({current}/{total})...',

    // Prompt Suggestions
    prompt_suggestion_base: 'Basado en la imagen subida, proporciona 4 descripciones de escenas de maqueta diversas y creativas. Las descripciones deben ser breves e inspiradoras. Por ejemplo: "Sobre una encimera de mármol limpia junto a una taza de café humeante." o "Sostenido en una mano con un fondo de calle de ciudad borroso."',
    
    // Project Manager
    project_manager_title: 'Proyectos',
    create_project_button: 'Crear Nuevo Proyecto',
    delete_project_button: 'Eliminar Proyecto',
    new_project_default_name: 'Nuevo Proyecto',
    default_project_name: 'Mi Primer Proyecto',
    loading_project: 'Cargando proyecto...',

    // Brand Kit
    brand_kit_title: 'Kit de Marca',
    logo_label: 'Logo de Marca (para Marca de Agua)',
    logo_upload_cta: 'Subir Logo',
    logo_replace_cta: 'Reemplazar Logo',
    use_watermark_label: 'Aplicar marca de agua a las imágenes generadas',
    colors_label: 'Colores de Marca',
    add_color_placeholder: 'Añadir color hex (ej: #4F46E5)',
    add_color_button: 'Añadir',
    copy_color_tooltip: 'Copiar al portapapeles',

    // Prompt Templates
    prompt_templates_title: 'Mis Plantillas',
    save_prompt_button: 'Guardar prompt actual como plantilla',
    no_templates_placeholder: 'Aún no hay plantillas guardadas.',
    
    // Gallery Page (Old)
    nav_generate: 'Generar',
    nav_gallery: 'Galería',
    nav_account: 'Cuenta',
    generate_new_mockup_button: 'Generar Nueva Maqueta',
    gallery_title: 'Mi Galería',
    gallery_subtitle: 'Explora, gestiona y descarga tus maquetas generadas por IA.',
    select_multiple_button: 'Selección Múltiple',
    search_mockups_label: 'Buscar Maquetas',
    search_mockups_placeholder: "ej: 'Camiseta'",
    filter_by_label: 'Filtrar por',
    project_filter_label: 'Proyecto',
    all_projects_option: 'Todos los Proyectos',
    date_filter_label: 'Rango de Fechas',
    sort_by_label: 'Ordenar por',
    sort_newest: 'Más Recientes',
    sort_oldest: 'Más Antiguos',
    sort_name_az: 'Nombre (A-Z)',
    share_button: 'Compartir',
    edit_button: 'Editar',
    delete_button: 'Eliminar',
    favorite_button: 'Favorito',
    unfavorite_button: 'Quitar de Favoritos',
    
    // App Header
    nav_create_new: 'Crear Nuevo',
    upgrade_button: 'Actualizar',

    // Dashboard / Account Page
    dashboard_title: 'Mis Creaciones',
    dashboard_nav_creations: 'Mis Creaciones',
    dashboard_nav_profile: 'Perfil',
    dashboard_nav_settings: 'Ajustes',
    dashboard_nav_logout: 'Cerrar Sesión',
    dashboard_generate_new_button: 'Generar Nueva Maqueta',
    dashboard_search_placeholder: 'Buscar mis creaciones...',
    dashboard_filter_all: 'Todo',
    dashboard_filter_by_product: 'Por Producto',
    dashboard_filter_by_date: 'Por Fecha',
    dashboard_card_created: 'Creado',
    dashboard_view_button: 'Ver',
    dashboard_empty_title: 'Aún No Hay Creaciones',
    dashboard_empty_subtitle: 'No has generado ninguna maqueta. ¡Haz clic en el botón de abajo para empezar y dar vida a tus diseños!',
    dashboard_empty_button: 'Genera Tu Primera Maqueta',
};