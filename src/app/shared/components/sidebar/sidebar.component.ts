import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SideBarComponent {
  constructor(private gifsService: GifsService) {}

  get tagsHistory() {
    return this.gifsService.tagsHistory;
  }

  get noTagsLoaded(): boolean {
    return this.gifsService.tagsHistory.length === 0;
  }

  research(item: string) {
    this.gifsService.searchTag(item)
  }

  delete(item: string) {
    this.gifsService.deleteTag(item)
  }
}
