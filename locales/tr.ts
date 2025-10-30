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

    // Modes
    mode_scene: 'Sahne Oluşturma',
    mode_product: 'Ürün Mockup\'ları',

    // Spinner
    spinner_title: 'İsteğiniz işleniyor...',
    spinner_description: 'Bu biraz zaman alabilir. Lütfen bekleyin.',

    // Image Uploader (Scene Mode)
    uploader_title: '1. Ürün Fotoğraf(lar)ınızı Yükleyin',
    uploader_cta_multi: 'Yüklemek için tıklayın veya sürükleyip bırakın',
    uploader_cta_alt: 'resimlerinizi buraya',
    uploader_add_more: 'Daha fazla resim ekle',
    uploader_file_types: 'PNG, JPG, WEBP desteklenmektedir',
    
    // Product Mockup Mode
    product_selector_title: '1. Ürün Seçin',
    product_tshirt: 'Tişört',
    product_mug: 'Kupa',
    product_hoodie: 'Kapüşonlu',
    product_tote_bag: 'Bez Çanta',
    design_uploader_title: '2. Tasarımınızı Yükleyin',
    design_uploader_cta: 'Tasarımınızı yüklemek için tıklayın',
    customize_section_title: '3. Özelleştir',
    color_label: 'Ürün Rengi',
    style_prompt_label: 'Stil (İsteğe Bağlı)',
    style_prompt_placeholder: 'örn: model üzerinde, stüdyo ışıklandırması',

    // Generated Image Grid
    grid_title: 'Oluşturulan Mockup\'lar',
    grid_batch_placeholder_title: 'Oluşturulan mockup\'larınız burada görünecektir.',
    grid_batch_placeholder_description: 'Başlamak için bir resim yükleyin ve bir açıklama girin.',
    download_button: 'İndir',
    save_button: 'Kaydet',
    saved_button: 'Kaydedildi',
    use_in_scene_button: 'Sahnede Kullan',

    // Saved Image Grid
    saved_grid_title: 'Kaydedilen Mockup\'lar',
    saved_grid_placeholder: 'Kaydedilen resimleriniz burada görünecektir. Kaydetmek için oluşturulan bir resimdeki yıldız simgesine tıklayın.',
    remove_button: 'Kaldır',

    // Image Modal
    image_modal_title: 'Oluşturulan Resim Önizlemesi',
    image_modal_close_button: 'Önizlemeyi kapat',

    // Errors
    error_title: 'Bir Hata Oluştu',
    error_no_image_or_prompt: 'Lütfen oluşturmadan önce en az bir resim yükleyin ve bir açıklama girin.',
    error_no_product_or_design: 'Lütfen oluşturmadan önce bir ürün seçin ve bir tasarım yükleyin.',
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
    
    // Aspect Ratio
    aspect_ratio_label: '2. En-Boy Oranını Seçin',
    aspect_ratio_square: 'Kare (1:1)',
    aspect_ratio_landscape: 'Yatay (16:9)',
    aspect_ratio_portrait: 'Dikey (9:16)',
};