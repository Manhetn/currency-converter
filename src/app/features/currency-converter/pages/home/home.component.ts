import { Component } from '@angular/core';
import { ConverterComponent } from '../../components/converter/converter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ConverterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
