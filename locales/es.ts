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

    // Modes
    mode_scene: 'Generación de Escenas',
    mode_product: 'Maquetas de Productos',

    // Spinner
    spinner_title: 'Procesando tu solicitud...',
    spinner_description: 'Esto puede tardar un momento. Por favor, espera.',

    // Image Uploader (Scene Mode)
    uploader_title: '1. Sube tu(s) Foto(s) de Producto',
    uploader_cta_multi: 'Haz clic para subir o arrastra y suelta',
    uploader_cta_alt: 'tus imágenes aquí',
    uploader_add_more: 'Añadir más imágenes',
    uploader_file_types: 'Soporta PNG, JPG, WEBP',

    // Product Mockup Mode
    product_selector_title: '1. Selecciona un Producto',
    product_tshirt: 'Camiseta',
    product_mug: 'Taza',
    product_hoodie: 'Sudadera',
    product_tote_bag: 'Bolsa de Tela',
    design_uploader_title: '2. Sube tu Diseño',
    design_uploader_cta: 'Haz clic para subir tu diseño',
    customize_section_title: '3. Personalizar',
    color_label: 'Color del Producto',
    style_prompt_label: 'Estilo (Opcional)',
    style_prompt_placeholder: 'ej: usado por un modelo, luz de estudio',

    // Generated Image Grid
    grid_title: 'Maquetas Generadas',
    grid_batch_placeholder_title: 'Tus maquetas generadas aparecerán aquí.',
    grid_batch_placeholder_description: 'Sube una imagen e introduce una descripción para empezar.',
    download_button: 'Descargar',
    save_button: 'Guardar',
    saved_button: 'Guardado',
    use_in_scene_button: 'Usar en Escena',

    // Saved Image Grid
    saved_grid_title: 'Maquetas Guardadas',
    saved_grid_placeholder: 'Tus imágenes guardadas aparecerán aquí. Haz clic en el icono de estrella en una imagen generada para guardarla.',
    remove_button: 'Eliminar',

    // Image Modal
    image_modal_title: 'Vista Previa de Imagen Generada',
    image_modal_close_button: 'Cerrar vista previa',

    // Errors
    error_title: 'Ocurrió un Error',
    error_no_image_or_prompt: 'Por favor, sube al menos una imagen y proporciona una descripción antes de generar.',
    error_no_product_or_design: 'Por favor, selecciona un producto y sube un diseño antes de generar.',
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

    // Aspect Ratio
    aspect_ratio_label: '2. Seleccionar Relación de Aspecto',
    aspect_ratio_square: 'Cuadrado (1:1)',
    aspect_ratio_landscape: 'Horizontal (16:9)',
    aspect_ratio_portrait: 'Vertical (9:16)',
};