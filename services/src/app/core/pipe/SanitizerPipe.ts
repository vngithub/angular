import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';
/**
 * It would allow to sanitize URL
 */
@Pipe({ name: 'sanitize' })
export class SanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitize(url);
  }
  sanitize(url: string):SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 