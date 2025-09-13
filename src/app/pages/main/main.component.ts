import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '../../services/translate.service';  

@Component({
  selector: 'app-main.component',
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,
})

export class MainComponent {
  inputText: string = '';
  outputText: string = '';
  selectedLanguage: string = 'Select Language';
  errorMessage: string = '';

  isDropdownOpen: boolean = false;
  showErrorNotification: boolean= false;
  showCopyNotification: boolean = false;
  isHiding: boolean = false;

  languages: string[] = [
    'Arabic', 'Bulgarian', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Czech',
    'Danish', 'Dutch', 'English', 'Estonian', 'Finnish', 'French', 'German',
    'Greek', 'Hebrew', 'Hindi', 'Hungarian', 'Indonesian', 'Italian', 'Japanese',
    'Korean', 'Latvian', 'Lithuanian', 'Malay', 'Norwegian', 'Polish', 'Portuguese',
    'Romanian', 'Russian', 'Serbian', 'Slovak', 'Slovenian', 'Spanish', 'Swedish',
    'Tagalog', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'
  ].sort((a, b) => a.localeCompare(b));

  get leftLanguages(): string[] {
    const half = Math.ceil(this.languages.length / 2);
    return this.languages.slice(0, half);
  }

  get rightLanguages(): string[] {
    const half = Math.ceil(this.languages.length / 2);
    return this.languages.slice(half);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.isDropdownOpen = false;
  }


  canTranslate(): boolean {
    return !!this.inputText.trim() && this.selectedLanguage !== 'Select Language';
  }

  constructor(private translateService: TranslateService) { }
  
  translateText(): void {
    if (!this.inputText.trim() || this.selectedLanguage === 'Select Language') return;

    this.outputText = '';

    console.log(`Translating to ${this.selectedLanguage}: ${this.inputText}`);

    this.translateService.translateText(this.inputText, this.selectedLanguage)
      .subscribe({
        next: (res) => {
        if (res.translatedText === 'No translation needed.') {
          this.displayErrorNotification('🗙 No translation needed.');
          console.log('No translation needed.');
          this.outputText = '';
        } else {
          this.outputText = res.translatedText;
        }
      },
      error: (err) => {
        console.error('Translation error:', err);
        this.displayErrorNotification('⚠ Translation failed. Please try again.');
        console.log(err);
        this.outputText = '';
      }
    });
  }

  displayErrorNotification(message: string): void {
    this.errorMessage = message;
    this.showErrorNotification = true;

    setTimeout(() => {
      this.showErrorNotification = false;
      this.errorMessage = '';
    }, 3000);
  }


  /* Copy to Clipboard with Notification */

  copyOutputText(): void {
    if (!this.outputText.trim()) return;

    navigator.clipboard.writeText(this.outputText)
    .then(() => {
      this.showCopyNotification = true;

      setTimeout(() => {
        this.showCopyNotification = false;
      }, 1000);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  /* Sync Textarea Heights */

  @ViewChild('inputArea') inputArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('outputArea') outputArea!: ElementRef<HTMLTextAreaElement>;

  private resizeListener: () => void = () => this.syncHeights();

  ngAfterViewInit(): void {
    this.syncHeights();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  onInputChange(event: Event): void {
    this.inputText = (event.target as HTMLTextAreaElement).value;
    this.syncHeights();
  }

  syncHeights(): void {
    const inputEl = this.inputArea.nativeElement;
    const outputEl = this.outputArea.nativeElement;

    inputEl.style.height = 'auto';
    outputEl.style.height = 'auto';

    const maxHeight = Math.max(inputEl.scrollHeight, outputEl.scrollHeight);

    inputEl.style.height = maxHeight + 'px';
    outputEl.style.height = maxHeight + 'px';
  }


  /* Close Dropdown on Outside Click */

  @ViewChild('dropdownButton') dropdownButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('dropdownPanel') dropdownPanel!: ElementRef<HTMLDivElement>;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as Node;

    const clickedInsideButton = this.dropdownButton?.nativeElement.contains(target);
    const clickedInsidePanel = this.dropdownPanel?.nativeElement.contains(target);

    if (clickedInsideButton || clickedInsidePanel) {
      return
    };

    if (!clickedInsidePanel) {
      this.isDropdownOpen = false;
    }
  }
}
