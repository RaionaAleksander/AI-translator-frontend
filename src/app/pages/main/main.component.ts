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

  isDropdownOpen: boolean = false;
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

  get leftLanguages() {
    const half = Math.ceil(this.languages.length / 2);
    return this.languages.slice(0, half);
  }

  get rightLanguages() {
    const half = Math.ceil(this.languages.length / 2);
    return this.languages.slice(half);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.isDropdownOpen = false;
  }


  canTranslate(): boolean {
    return !!this.inputText.trim() && this.selectedLanguage !== 'Select Language';
  }

  constructor(private translateService: TranslateService) { }
  
  translateText() {
    if (!this.inputText.trim() || this.selectedLanguage === 'Select Language') return;

    this.outputText = '';

    this.translateService.translateText(this.inputText, this.selectedLanguage)
      .subscribe({
        next: (res) => this.outputText = res.translatedText,
        error: (err) => {
          console.error('Translation error:', err);
          this.outputText = 'Error: Translation failed';
        }
    });
  }



  copyOutputText() {
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

  


  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownPanel') dropdownPanel!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInsideButton = this.dropdownButton?.nativeElement.contains(event.target);
    const clickedInsidePanel = this.dropdownPanel?.nativeElement.contains(event.target);

    if (clickedInsideButton || clickedInsidePanel) {
      return
    };

    if (!clickedInsidePanel) {
      this.isDropdownOpen = false;
    }
  }
}
