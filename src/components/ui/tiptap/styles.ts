export const tiptapStyles = `
  .ProseMirror {
    outline: none;
    min-height: 200px;
  }
  
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  
  .ProseMirror table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
  }
  
  .ProseMirror table td,
  .ProseMirror table th {
    border: 2px solid #ced4da;
    box-sizing: border-box;
    min-width: 1em;
    padding: 3px 5px;
    position: relative;
    vertical-align: top;
  }
  
  .ProseMirror table th {
    background-color: #f1f3f4;
    font-weight: bold;
  }
  
  .ProseMirror table .selectedCell:after {
    background: rgba(200, 200, 255, 0.4);
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }
  
  .ProseMirror table .column-resize-handle {
    background-color: #adf;
    bottom: -2px;
    position: absolute;
    right: -2px;
    pointer-events: none;
    top: 0;
    width: 4px;
  }
  
  .ProseMirror table p {
    margin: 0;
  }
  
  .ProseMirror blockquote {
    border-left: 4px solid #3b82f6;
    background-color: #eff6ff;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin: 1rem 0;
    color: #374151;
    border-radius: 0.25rem;
  }
  
  .ProseMirror pre {
    background-color: #111827;
    color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1rem 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
    overflow-x: auto;
    border: 1px solid #374151;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .ProseMirror code {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
  }
  
  .ProseMirror pre code {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
  
  .ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.25;
  }
  
  .ProseMirror h1 { font-size: 2rem; }
  .ProseMirror h2 { font-size: 1.5rem; }
  .ProseMirror h3 { font-size: 1.25rem; }
  .ProseMirror h4 { font-size: 1.125rem; }
  .ProseMirror h5 { font-size: 1rem; }
  .ProseMirror h6 { font-size: 0.875rem; }
  
  .ProseMirror p {
    margin-bottom: 1rem;
    line-height: 1.75;
  }
  
  .ProseMirror ul, .ProseMirror ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    list-style-position: outside;
  }
  
  .ProseMirror ul {
    list-style-type: disc;
  }
  
  .ProseMirror ol {
    list-style-type: decimal;
  }
  
  .ProseMirror li {
    margin-bottom: 0.25rem;
    display: list-item;
  }
  
  .ProseMirror img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .ProseMirror a {
    color: #3b82f6;
    text-decoration: underline;
  }
  
  .ProseMirror a:hover {
    color: #2563eb;
  }
`;

export const tiptapPreviewStyles = `
  .ProseMirror {
    outline: none;
    max-width: 100%;
  }
  
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  
  .ProseMirror table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
  }
  
  .ProseMirror table td,
  .ProseMirror table th {
    border: 2px solid #ced4da;
    box-sizing: border-box;
    min-width: 1em;
    padding: 3px 5px;
    position: relative;
    vertical-align: top;
  }
  
  .ProseMirror table th {
    background-color: #f1f3f4;
    font-weight: bold;
  }
  
  .ProseMirror table .selectedCell:after {
    background: rgba(200, 200, 255, 0.4);
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }
  
  .ProseMirror table .column-resize-handle {
    background-color: #adf;
    bottom: -2px;
    position: absolute;
    right: -2px;
    pointer-events: none;
    top: 0;
    width: 4px;
  }
  
  .ProseMirror table p {
    margin: 0;
  }
  
  .ProseMirror blockquote {
    border-left: 4px solid #3b82f6;
    background-color: #eff6ff;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin: 1rem 0;
    color: #374151;
    border-radius: 0.25rem;
  }
  
  .ProseMirror pre {
    background-color: #111827;
    color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1rem 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
    overflow-x: auto;
    border: 1px solid #374151;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .ProseMirror code {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
  }
  
  .ProseMirror pre code {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
  
  .ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.25;
  }
  
  .ProseMirror h1 { font-size: 2rem; }
  .ProseMirror h2 { font-size: 1.5rem; }
  .ProseMirror h3 { font-size: 1.25rem; }
  .ProseMirror h4 { font-size: 1.125rem; }
  .ProseMirror h5 { font-size: 1rem; }
  .ProseMirror h6 { font-size: 0.875rem; }
  
  .ProseMirror p {
    margin-bottom: 1rem;
    line-height: 1.75;
  }
  
  .ProseMirror ul, .ProseMirror ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  
  .ProseMirror li {
    margin-bottom: 0.25rem;
  }
  
  .ProseMirror table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  .ProseMirror th, .ProseMirror td {
    border: 1px solid #d1d5db;
    padding: 0.5rem;
    text-align: left;
  }
  
  .ProseMirror th {
    background-color: #f9fafb;
    font-weight: 600;
  }
  
  .ProseMirror img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .ProseMirror a {
    color: #3b82f6;
    text-decoration: underline;
  }
  
  .ProseMirror a:hover {
    color: #2563eb;
  }
`; 