export const en = {
    // App
    app_title: 'AI Mockup Generator',
    prompt_label: 'Mockup Description',
    prompt_placeholder: 'e.g., A product photo of the uploaded image on a wooden table, with a plant in the background.',
    generate_button: 'Generate Mockups',
    generate_button_loading: 'Generating...',
    suggest_button: 'Suggest Ideas',
    suggest_button_loading: 'Thinking...',
    
    // Main Page
    create_mockup_title: 'Create Your Mock-up',

    // Modes
    mode_scene: 'Scene Generation',
    mode_product: 'Product Mockups',

    // Spinner
    spinner_title: 'Processing your request...',
    spinner_description: 'This may take a moment. Please wait.',
    
    // --- Scene Mode ---
    // Image Uploader (Scene Mode)
    uploader_title: '1. Upload Your Product Photo(s)',
    uploader_cta_multi: 'Click to upload or drag and drop',
    uploader_cta_alt: 'your images here',
    uploader_add_more: 'Add more images',
    uploader_file_types: 'PNG, JPG, WEBP supported',
     // Prompt
    scene_prompt_title: '2. Describe the Scene',
    // Aspect Ratio
    aspect_ratio_label: '3. Select Aspect Ratio',
    aspect_ratio_square: 'Square (1:1)',
    aspect_ratio_landscape: 'Landscape (16:9)',
    aspect_ratio_portrait: 'Portrait (9:16)',

    // --- Product Mockup Mode ---
    step_1_title: '1. Upload Your Design',
    design_uploader_title: '1. Upload Your Design',
    design_uploader_cta_title: 'Drag & drop your file here, or browse.',
    design_uploader_cta_subtitle: 'Supports: PNG, JPG, SVG. Max size: 10MB.',
    design_uploader_cta_button: 'Upload File',
    step_2_title: '2. Choose a Product',
    step_2_subtitle: 'Select a template to apply your design to.',
    search_products_placeholder: 'Search products...',
    all_categories_option: 'All Categories',
    step_3_title: '3. Customize',
    color_label: 'Product Color',
    style_selector_title: 'Style Presets',
    style_preset_studio: 'Studio',
    style_preset_lifestyle: 'Lifestyle',
    style_preset_outdoor: 'Outdoor',
    style_preset_flatlay: 'Flat Lay',
    style_prompt_label: 'Style Details (Optional)',
    style_prompt_placeholder: 'e.g., worn by a model, dramatic lighting',
    
    // Generated Image Grid
    grid_title: 'Generated Mockups',
    grid_batch_placeholder_title: 'Your generated mockups will appear here.',
    grid_batch_placeholder_description: 'Complete the steps on the left to get started.',
    download_button: 'Download',
    save_button: 'Save',
    saved_button: 'Saved',
    use_in_scene_button: 'Use in Scene',
    
    // Saved Image Grid
    saved_grid_title: 'Saved Mockups',
    download_all_button: 'Download All Saved',
    saved_grid_placeholder: 'Your saved images will appear here. Click the star icon on a generated image to save it.',
    remove_button: 'Remove',
    
    // Image Modal
    image_modal_title: 'Generated Image Preview',
    image_modal_close_button: 'Close preview',
    
    // Errors
    error_title: 'An Error Occurred',
    error_no_image_or_prompt: 'Please upload at least one image and provide a prompt before generating.',
    error_no_product_or_design: 'Please select a product and upload a logo or design before generating.',
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

    // Gallery Page (Old)
    nav_generate: 'Generate',
    nav_gallery: 'Gallery',
    nav_account: 'Account',
    generate_new_mockup_button: 'Generate New Mockup',
    gallery_title: 'My Gallery',
    gallery_subtitle: 'Browse, manage, and download your AI-generated mockups.',
    select_multiple_button: 'Select Multiple',
    search_mockups_label: 'Search Mockups',
    search_mockups_placeholder: "e.g., 'T-shirt'",
    filter_by_label: 'Filter by',
    project_filter_label: 'Project',
    all_projects_option: 'All Projects',
    date_filter_label: 'Date Range',
    sort_by_label: 'Sort by',
    sort_newest: 'Newest',
    sort_oldest: 'Oldest',
    sort_name_az: 'Name (A-Z)',
    share_button: 'Share',
    edit_button: 'Edit',
    delete_button: 'Delete',
    favorite_button: 'Favorite',
    unfavorite_button: 'Unfavorite',
    
    // App Header
    nav_create_new: 'Create New',
    upgrade_button: 'Upgrade',

    // Dashboard / Account Page
    dashboard_title: 'My Creations',
    dashboard_nav_creations: 'My Creations',
    dashboard_nav_profile: 'Profile',
    dashboard_nav_settings: 'Settings',
    dashboard_nav_logout: 'Log Out',
    dashboard_generate_new_button: 'Generate New Mock-up',
    dashboard_search_placeholder: 'Search my creations...',
    dashboard_filter_all: 'All',
    dashboard_filter_by_product: 'By Product',
    dashboard_filter_by_date: 'By Date',
    dashboard_card_created: 'Created',
    dashboard_view_button: 'View',
    dashboard_empty_title: 'No Creations Yet',
    dashboard_empty_subtitle: "You haven't generated any mock-ups. Click the button below to get started and bring your designs to life!",
    dashboard_empty_button: 'Generate Your First Mock-up',
};

export type Translations = typeof en;