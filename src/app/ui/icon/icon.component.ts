import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { isUpgradeAvailable, upgrade, upgrades } from '../../utils/upgrade.utils';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { resources } from '../../constants/resources.const';

@Component({
  selector: 'byo-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  imports: [
    CommonModule
  ],
})
export class IconComponent {
  @Input() icon: String = ''; 
}