import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: [],
})
export class GifCardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if ( !this.gif ) throw new Error("GIF property is required")
  }

  openExternal(link: string) {
    window.open(link, '_blank')
  }
}
