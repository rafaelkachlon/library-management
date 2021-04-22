
export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
  epubBubbleVersion: string;
  imageBubbleVersion: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface Issue {
  issueDisplayNumber: string;
}

export interface VolumeSery {
  seriesId: string;
  seriesBookType: string;
  orderNumber: number;
  issue: Issue[];
}

export interface SeriesInfo {
  kind: string;
  bookDisplayNumber: string;
  volumeSeries: VolumeSery[];
  shortSeriesBookTitle: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  pageCount?: number;
  averageRating?: number;
  ratingsCount?: number;
  comicsContent?: boolean;
  subtitle: string;
  seriesInfo: SeriesInfo;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

export interface Epub {
  isAvailable: boolean;
  acsTokenLink: string;
}

export interface Pdf {
  isAvailable: boolean;
  acsTokenLink: string;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface Item {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}

export interface BooksResponseModel {
  kind: string;
  totalItems: number;
  items: Item[];
}
