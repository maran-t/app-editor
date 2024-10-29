import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cursor';


  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  editor: any;

  code: string = '// Remove this comment & start \n';

  ngOnInit() {
    this.loadMonaco();
  }

  loadMonaco() {
    import('monaco-editor').then(monaco => {
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });

      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: this.code,
        // language: 'javascript',
        theme: 'vs',
        padding: { top: 10 },
        // folding: false,
        // wordWrap: 'off',
        // renderLineHighlight: 'none',
        renderLineHighlight: 'all',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        suggestOnTriggerCharacters: true,
        quickSuggestions: {
          other: true,
          comments: true,
          strings: true,
        },
      });

      window.addEventListener('resize', () => {
        this.editor.layout();
      });
    
    this.editor.onKeyDown((e: any) => {
      if (e.ctrlKey && e.keyCode === monaco.KeyCode.KeyF) {
        console.log('Ctrl + F pressed - search disabled'); // Custom behavior
        e.stopPropagation();
      }
    });

    this.editor.onKeyDown((e: any) => {
      if (e.ctrlKey && e.keyCode === monaco.KeyCode.KeyS) {
        console.log('Ctrl + S pressed - save disabled'); // Custom behavior
        e.preventDefault(); // make this alone global, reload save issue ??
      }
    });

    });

    
  }

  // Function to detect language based on file extension
  detectLanguage(filename: string): string {
    const ext = filename.split('.').pop();
    switch (ext) {
      case 'ts':
        return 'typescript';
      case 'js':
        return 'javascript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  }

}
