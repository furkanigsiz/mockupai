export const en = {
    // App
    app_title: 'AI Mockup Generator',
    prompt_label: 'Mockup Description',
    prompt_placeholder: 'e.g., A product photo of the uploaded image on a wooden table, with a plant in the background.',
    generate_button: 'Generate Mockups',
    generate_button_loading: 'Generating...',
    suggest_button: 'Suggest Ideas',
    suggest_button_loading: 'Thinking...',
    
    // Modes
    mode_scene: 'Scene Generation',
    mode_product: 'Product Mockups',

    // Spinner
    spinner_title: 'Processing your request...',
    spinner_description: 'This may take a moment. Please wait.',
    
    // Image Uploader (Scene Mode)
    uploader_title: '1. Upload Your Product Photo(s)',
    uploader_cta_multi: 'Click to upload or drag and drop',
    uploader_cta_alt: 'your images here',
    uploader_add_more: 'Add more images',
    uploader_file_types: 'PNG, JPG, WEBP supported',

    // Product Mockup Mode
    product_selector_title: '1. Select Product',
    product_tshirt: 'T-Shirt',
    product_mug: 'Mug',
    product_hoodie: 'Hoodie',
    product_tote_bag: 'Tote Bag',
    design_uploader_title: '2. Upload Design',
    design_uploader_cta: 'Click to upload your design',
    customize_section_title: '3. Customize',
    color_label: 'Product Color',
    style_prompt_label: 'Style (Optional)',
    style_prompt_placeholder: 'e.g., worn by a model, studio lighting',
    
    // Generated Image Grid
    grid_title: 'Generated Mockups',
    grid_batch_placeholder_title: 'Your generated mockups will appear here.',
    grid_batch_placeholder_description: 'Upload an image and enter a prompt to get started.',
    download_button: 'Download',
    save_button: 'Save',
    saved_button: 'Saved',
    use_in_scene_button: 'Use in Scene',
    
    // Saved Image Grid
    saved_grid_title: 'Saved Mockups',
    saved_grid_placeholder: 'Your saved images will appear here. Click the star icon on a generated image to save it.',
    remove_button: 'Remove',
    
    // Image Modal
    image_modal_title: 'Generated Image Preview',
    image_modal_close_button: 'Close preview',
    
    // Errors
    error_title: 'An Error Occurred',
    error_no_image_or_prompt: 'Please upload at least one image and provide a prompt before generating.',
    error_no_product_or_design: 'Please select a product and upload a design before generating.',
    error_no_image_for_suggestions: 'Please upload an image first to get suggestions.',
    error_suggestions_failed: 'Sorry, we couldn\'t generate suggestions at this time. Please try again.',
    error_unknown: 'An unknown error occurred. Please check the console for more details.',

    // Progress Text
    progress_text_generating: 'Generating for "{fileName}" ({current}/{total})...',

    // Prompt Suggestions
    prompt_suggestion_base: 'Based on the uploaded image, provide 4 diverse and creative mockup scene descriptions. The descriptions should be brief and inspiring. For example: "On a clean marble countertop next to a steaming cup of coffee." or "Held in a hand against a blurred city street background."',

    // Project Manager
    project_manager_title: 'Projects',
    create_project_button: 'Create New Project',
    delete_project_button: 'Delete Project',
    new_project_default_name: 'New Project',
    default_project_name: 'My First Project',
    loading_project: 'Loading project...',

    // Brand Kit
    brand_kit_title: 'Brand Kit',
    logo_label: 'Brand Logo (for Watermark)',
    logo_upload_cta: 'Upload Logo',
    logo_replace_cta: 'Replace Logo',
    use_watermark_label: 'Apply watermark to generated images',
    colors_label: 'Brand Colors',
    add_color_placeholder: 'Add hex color (e.g. #4F46E5)',
    add_color_button: 'Add',
    copy_color_tooltip: 'Copy to clipboard',

    // Prompt Templates
    prompt_templates_title: 'My Templates',
    save_prompt_button: 'Save current prompt as template',
    no_templates_placeholder: 'No saved templates yet.',

    // Aspect Ratio
    aspect_ratio_label: '2. Select Aspect Ratio',
    aspect_ratio_square: 'Square (1:1)',
    aspect_ratio_landscape: 'Landscape (16:9)',
    aspect_ratio_portrait: 'Portrait (9:16)',
};

export type Translations = typeof en;