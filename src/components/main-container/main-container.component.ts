import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Character } from '../../models';
import { CharactersService } from '../../services';
import { CharacterCardComponent } from './components';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [AsyncPipe, CharacterCardComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  private charactersService = inject(CharactersService);

  public characters$: Observable<Character[]> = this.charactersService.getCharacters();

  public characterInfo: Record<string, Character> = {};

  async makeApiCall(url: string): Promise<void> {
    // firstValueFrom -> hey rxjs, give me the first value from this observable and then complete it, I don't care about the rest
    // unsubscribe is not needed because firstValueFrom will complete the observable
    let character = await firstValueFrom(this.charactersService.getCharacterInformation(url));
    this.characterInfo[character.id] = character;
  }
}
