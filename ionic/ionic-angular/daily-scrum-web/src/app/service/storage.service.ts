import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private appStorage: Storage | null = null;

  constructor(private storage: Storage) {
    this.initialize();
  }

  async initialize() {
    const storage = await this.storage.create();
    this.appStorage = storage;
  }

  public async setToStorage(key: string, value: any) {
    await this.appStorage?.set(key, value);
  }

  public async getFromStorage(key: string) {
    const getValue = await this.appStorage?.get(key);

    return getValue;
  }
}
