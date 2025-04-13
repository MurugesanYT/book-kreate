
import { BaseExporter, ExportResult } from "./baseExporter";
import { Book, LaTeXExportOptions } from "@/lib/api/types";

export class LaTeXExporter extends BaseExporter<LaTeXExportOptions> {
  export(book: Book): ExportResult {
    try {
      if (!this.validateBook(book)) {
        return this.getDefaultResult('LaTeX');
      }
      
      console.log("Exporting to LaTeX format:", book.title);
      
      // In a real implementation, this would generate the actual LaTeX file
      // using the fontSize as a number, then converting to string with 'pt' suffix
      const fontSizeWithUnit = `${this.options.fontSize}pt`;
      
      // Set up document preamble
      let latexContent = `
\\documentclass{${this.options.documentClass}}
\\usepackage[${this.options.paperSize}]{geometry}
\\usepackage{${this.options.fontPackage !== "default" ? this.options.fontPackage : "lmodern"}}
\\usepackage{setspace}
\\usepackage{titlesec}
${this.options.mathSupport ? "\\usepackage{amsmath}" : ""}
${this.options.twoSided ? "\\usepackage{fancyhdr}\\pagestyle{fancy}" : ""}
${this.options.includeTableOfContents ? "\\usepackage{hyperref}" : ""}

% Font size setting
\\renewcommand{\\normalsize}{\\fontsize{${fontSizeWithUnit}}{${parseInt(String(this.options.fontSize)) * 1.2}pt}\\selectfont}

% Document meta information
\\title{${book.title}}
${book.author ? `\\author{${book.author}}` : "\\author{Anonymous}"}
\\date{\\today}

% Begin document
\\begin{document}

% Title page
\\maketitle

% Table of contents
${this.options.includeTableOfContents ? "\\tableofcontents\\newpage" : ""}

`;

      // Add chapters
      if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach(chapter => {
          latexContent += `
% Chapter: ${chapter.title}
\\chapter{${this.escapeLatexSpecialChars(chapter.title)}}
${this.processLatexContent(chapter.content)}

`;
        });
      } else if (book.content && book.content.length > 0) {
        // If no chapters but content is available
        latexContent += `
% Main content
${book.content.map(content => this.processLatexContent(content)).join('\n\n')}

`;
      }

      // End document
      latexContent += `
\\end{document}
`;
      
      return {
        success: true,
        message: "Book exported to LaTeX successfully!",
        content: latexContent
      };
    } catch (error) {
      console.error("Error exporting to LaTeX:", error);
      return {
        success: false,
        message: `Failed to export to LaTeX: ${(error as Error).message || 'Unknown error'}`
      };
    }
  }

  // Process content for LaTeX compatibility
  private processLatexContent(content: string): string {
    if (!content) return '';
    
    // Replace markdown-style formatting with LaTeX commands
    let processedContent = content
      .replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}')                // Bold
      .replace(/\*(.*?)\*/g, '\\textit{$1}')                    // Italic
      .replace(/__(.*?)__/g, '\\underline{$1}')                 // Underline
      .replace(/```(.*?)```/gs, '\\begin{verbatim}$1\\end{verbatim}') // Code blocks
      .replace(/`(.*?)`/g, '\\texttt{$1}')                      // Inline code
      .replace(/!\[(.*?)\]\((.*?)\)/g, '\\includegraphics{$2}') // Images
      .replace(/\[(.*?)\]\((.*?)\)/g, '\\href{$2}{$1}')         // Links
      .replace(/^# (.*?)$/gm, '\\section{$1}')                  // H1
      .replace(/^## (.*?)$/gm, '\\subsection{$1}')              // H2
      .replace(/^### (.*?)$/gm, '\\subsubsection{$1}')          // H3
      .replace(/^#### (.*?)$/gm, '\\paragraph{$1}')             // H4
      .replace(/^##### (.*?)$/gm, '\\subparagraph{$1}');        // H5

    return this.escapeLatexSpecialChars(processedContent);
  }

  // Escape LaTeX special characters
  private escapeLatexSpecialChars(text: string): string {
    if (!text) return '';
    
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/~/g, '\\textasciitilde{}')
      .replace(/\^/g, '\\textasciicircum{}');
  }
}
