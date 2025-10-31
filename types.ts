export interface UploadedImage {
  base64: string;
  name: string;
  type: string;
  previewUrl: string;
}

export interface BatchResult {
  source: UploadedImage;
  generated: string[];
}

export interface PromptTemplate {
  id: string;
  text: string;
}

export interface BrandKit {
  logo: string | null; // base64
  useWatermark: boolean;
  colors: string[]; // hex codes
}

export interface Project {
  id: string;
  name: string;
  uploadedImages: UploadedImage[];
  prompt: string;
  aspectRatio: '1:1' | '16:9' | '9:16';
  savedImages: string[];
  suggestedPrompts: string[];
}

export type AppMode = 'scene' | 'product';

export type ProductCategory = 'Apparel' | 'Home Goods' | 'Print' | 'Tech';

export interface ProductTemplate {
  id: string;
  name: string;
  category: ProductCategory;
  imageUrl: string;
}
