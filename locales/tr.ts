import { Translations } from './en';

export const tr: Translations = {
    // App
    app_title: 'Yapay Zeka Mockup Oluşturucu',
    prompt_label: 'Mockup Açıklaması',
    prompt_placeholder: 'Örn: Yüklenen ürün fotoğrafı ahşap bir masanın üzerinde, arkada bir bitki ile.',
    generate_button: 'Mockup Oluştur',
    generate_button_loading: 'Oluşturuluyor...',
    suggest_button: 'Fikir Öner',
    suggest_button_loading: 'Düşünülüyor...',
    
    // Main Page
    create_mockup_title: 'Mockup\'ını Oluştur',

    // Modes
    mode_scene: 'Sahne Oluşturma',
    mode_product: 'Ürün Mockup\'ları',

    // Spinner
    spinner_title: 'İsteğiniz işleniyor...',
    spinner_description: 'Bu biraz zaman alabilir. Lütfen bekleyin.',
    
    // --- Scene Mode ---
    // Image Uploader (Scene Mode)
    uploader_title: '1. Ürün Fotoğraf(lar)ınızı Yükleyin',
    uploader_cta_multi: 'Yüklemek için tıklayın veya sürükleyip bırakın',
    uploader_cta_alt: 'resimlerinizi buraya',
    uploader_add_more: 'Daha fazla resim ekle',
    uploader_file_types: 'PNG, JPG, WEBP desteklenmektedir',
    // Prompt
    scene_prompt_title: '2. Sahneyi Tanımlayın',
    // Aspect Ratio
    aspect_ratio_label: '3. En-Boy Oranını Seçin',
    aspect_ratio_square: 'Kare (1:1)',
    aspect_ratio_landscape: 'Yatay (16:9)',
    aspect_ratio_portrait: 'Dikey (9:16)',

    // --- Product Mockup Mode ---
    step_1_title: '1. Tasarımınızı Yükleyin',
    design_uploader_title: '1. Tasarımınızı Yükleyin',
    design_uploader_cta_title: 'Dosyanızı buraya sürükleyip bırakın veya gözatın.',
    design_uploader_cta_subtitle: 'Desteklenenler: PNG, JPG, SVG. Maks boyut: 10MB.',
    design_uploader_cta_button: 'Dosya Yükle',
    step_2_title: '2. Bir Ürün Seçin',
    step_2_subtitle: 'Tasarımınızı uygulamak için bir şablon seçin.',
    search_products_placeholder: 'Ürünleri ara...',
    all_categories_option: 'Tüm Kategoriler',
    step_3_title: '3. Özelleştir',
    color_label: 'Ürün Rengi',
    style_selector_title: 'Stil Önayarları',
    style_preset_studio: 'Stüdyo',
    style_preset_lifestyle: 'Yaşam Tarzı',
    style_preset_outdoor: 'Dış Mekan',
    style_preset_flatlay: 'Düz Çekim',
    style_prompt_label: 'Stil Detayları (İsteğe Bağlı)',
    style_prompt_placeholder: 'örn: model üzerinde, dramatik ışıklandırma',
    
    // Generated Image Grid
    grid_title: 'Oluşturulan Mockup\'lar',
    grid_batch_placeholder_title: 'Oluşturulan mockup\'larınız burada görünecektir.',
    grid_batch_placeholder_description: 'Başlamak için soldaki adımları tamamlayın.',
    download_button: 'İndir',
    save_button: 'Kaydet',
    saved_button: 'Kaydedildi',
    use_in_scene_button: 'Sahnede Kullan',

    // Saved Image Grid
    saved_grid_title: 'Kaydedilen Mockup\'lar',
    download_all_button: 'Tümünü İndir',
    saved_grid_placeholder: 'Kaydedilen resimleriniz burada görünecektir. Kaydetmek için oluşturulan bir resimdeki yıldız simgesine tıklayın.',
    remove_button: 'Kaldır',

    // Image Modal
    image_modal_title: 'Oluşturulan Resim Önizlemesi',
    image_modal_close_button: 'Önizlemeyi kapat',

    // Errors
    error_title: 'Bir Hata Oluştu',
    error_no_image_or_prompt: 'Lütfen oluşturmadan önce en az bir resim yükleyin ve bir açıklama girin.',
    error_no_product_or_design: 'Lütfen oluşturmadan önce bir ürün seçin ve bir logo veya tasarım yükleyin.',
    error_no_image_for_suggestions: 'Öneri almak için lütfen önce bir resim yükleyin.',
    error_suggestions_failed: 'Üzgünüz, şu anda öneri oluşturamadık. Lütfen tekrar deneyin.',
    error_unknown: 'Bilinmeyen bir hata oluştu. Lütfen daha fazla ayrıntı için konsolu kontrol edin.',

    // Progress Text
    progress_text_generating: '"{fileName}" için oluşturuluyor ({current}/{total})...',

    // Prompt Suggestions
    prompt_suggestion_base: 'Yüklenen resme dayanarak 4 farklı ve yaratıcı mockup sahnesi açıklaması sağlayın. Açıklamalar kısa ve ilham verici olmalıdır. Örneğin: "Buharı tüten bir fincan kahvenin yanında temiz bir mermer tezgah üzerinde." veya "Bulanık bir şehir sokağı arka planına karşı bir elde tutuluyor."',
    
    // Project Manager
    project_manager_title: 'Projeler',
    create_project_button: 'Yeni Proje Oluştur',
    delete_project_button: 'Projeyi Sil',
    new_project_default_name: 'Yeni Proje',
    default_project_name: 'İlk Projem',
    loading_project: 'Proje yükleniyor...',

    // Brand Kit
    brand_kit_title: 'Marka Kiti',
    logo_label: 'Marka Logosu (Filigran için)',
    logo_upload_cta: 'Logo Yükle',
    logo_replace_cta: 'Logoyu Değiştir',
    use_watermark_label: 'Oluşturulan resimlere filigran ekle',
    colors_label: 'Marka Renkleri',
    add_color_placeholder: 'Hex renk kodu ekle (örn: #4F46E5)',
    add_color_button: 'Ekle',
    copy_color_tooltip: 'Panoya kopyala',

    // Prompt Templates
    prompt_templates_title: 'Şablonlarım',
    save_prompt_button: 'Mevcut prompt\'u şablon olarak kaydet',
    no_templates_placeholder: 'Henüz kaydedilmiş şablon yok.',
    
    // Gallery Page (Old)
    nav_generate: 'Oluştur',
    nav_gallery: 'Galeri',
    nav_account: 'Hesap',
    generate_new_mockup_button: 'Yeni Mockup Oluştur',
    gallery_title: 'Galerim',
    gallery_subtitle: 'Yapay zeka tarafından oluşturulan mockup\'larınıza göz atın, yönetin ve indirin.',
    select_multiple_button: 'Çoklu Seçim',
    search_mockups_label: 'Mockup Ara',
    search_mockups_placeholder: "örn: 'Tişört'",
    filter_by_label: 'Filtrele',
    project_filter_label: 'Proje',
    all_projects_option: 'Tüm Projeler',
    date_filter_label: 'Tarih Aralığı',
    sort_by_label: 'Sırala',
    sort_newest: 'En Yeni',
    sort_oldest: 'En Eski',
    sort_name_az: 'İsim (A-Z)',
    share_button: 'Paylaş',
    edit_button: 'Düzenle',
    delete_button: 'Sil',
    favorite_button: 'Favorilere Ekle',
    unfavorite_button: 'Favorilerden Kaldır',
    
    // App Header
    nav_create_new: 'Yeni Oluştur',
    upgrade_button: 'Yükselt',

    // Dashboard / Account Page
    dashboard_title: 'Çalışmalarım',
    dashboard_nav_creations: 'Çalışmalarım',
    dashboard_nav_profile: 'Profil',
    dashboard_nav_settings: 'Ayarlar',
    dashboard_nav_logout: 'Çıkış Yap',
    dashboard_generate_new_button: 'Yeni Mock-up Oluştur',
    dashboard_search_placeholder: 'Çalışmalarımda ara...',
    dashboard_filter_all: 'Tümü',
    dashboard_filter_by_product: 'Ürüne Göre',
    dashboard_filter_by_date: 'Tarihe Göre',
    dashboard_card_created: 'Oluşturuldu',
    dashboard_view_button: 'Görüntüle',
    dashboard_empty_title: 'Henüz Çalışma Yok',
    dashboard_empty_subtitle: 'Henüz bir mock-up oluşturmadınız. Başlamak ve tasarımlarınızı hayata geçirmek için aşağıdaki düğmeye tıklayın!',
    dashboard_empty_button: 'İlk Mock-up\'ını Oluştur',
};