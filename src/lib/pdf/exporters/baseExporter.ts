
import { Book } from "@/lib/api/types";

export interface ExportResult {
  success: boolean;
  message: string;
  content?: string;
}

export interface BaseExporterOptions {
  fontFamily?: string;
  fontSize?: number;
  colorScheme?: string;
}

export abstract class BaseExporter<T extends BaseExporterOptions> {
  constructor(protected options: T) {}
  
  abstract export(book: Book): ExportResult;
  
  protected validateBook(book: Book): boolean {
    if (!book || !book.title) {
      return false;
    }
    return true;
  }
  
  protected getDefaultResult(format: string): ExportResult {
    return {
      success: false,
      message: `Failed to export to ${format}: Invalid book data`
    };
  }
}
