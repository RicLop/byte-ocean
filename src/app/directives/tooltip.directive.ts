import { Directive, ElementRef, Input, Renderer2, HostListener, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipTitle: string = '';
  tooltip: HTMLElement | undefined;
  offset = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tooltipTitle'] && this.tooltip) {
      // Se o tooltip já foi exibido, atualize seu conteúdo.
      this.tooltip.innerHTML = this.tooltipTitle;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

  private show() {
    this.tooltip = this.renderer.createElement('span');
    this.tooltip!.innerHTML = this.tooltipTitle;
    this.renderer.appendChild(document.body, this.tooltip);
    this.renderer.addClass(this.tooltip, 'tooltip');
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip!.getBoundingClientRect();
    const top = hostPos.bottom + this.offset;
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

  private hide() {
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = undefined;
  }
}
