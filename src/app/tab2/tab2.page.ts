/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Photo } from '../models/photo.interface';
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public photos: Photo[];
  constructor( public photoService: PhotoService) { }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async loadSaved() {
     // Display the photo by reading into base64 format
    for (const photo of this.photos) {
      // Read each saved photo's data from the Filesystem
      const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
      });
      // Web platform only: Load the photo as base64 data
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }


}
