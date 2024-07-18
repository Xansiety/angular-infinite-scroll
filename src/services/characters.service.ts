import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character, CharacterInfo } from '../models';
import { CharacterAdapter } from '../adapters';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';
  private readonly charactersUrl = `${this.baseUrl}/character`;

  constructor(private http: HttpClient) {}

  public getCharacters(): Observable<Character[]> {
    return this.http
      .get<CharacterInfo>(this.charactersUrl)
      .pipe(map((result: CharacterInfo) => CharacterAdapter(result)));
  }

  public getCharacterInformation(url: string): Observable<any> {
    return this.http.get(url);
  }
}
