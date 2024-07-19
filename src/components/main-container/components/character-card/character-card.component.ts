import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, EffectRef, input, InputSignal, OnDestroy, output, OutputEmitterRef } from '@angular/core';
import { Character } from '../../../../models';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [NgOptimizedImage, JsonPipe],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent implements OnDestroy {
  public character: InputSignal<Character> = input.required<Character>();
  public characterInfo: InputSignal<Character | undefined> = input<Character>();
  public loaded: OutputEmitterRef<string> = output<string>();
  //   private injector: Injector = inject(Injector);

  private effectRef: EffectRef | undefined;

  constructor() {
    this.effectRef = effect(() => {
      const character = this.character();
      if (!character) {
        return;
      }
      this.loaded.emit(character.url);
    });
  }

  // implements and effect outside of the constructor
  //   public characterEffect: EffectRef = effect(
  //     () => {
  //       const character = this.character();
  //       if (!character) {
  //         return;
  //       }
  //       console.log('Character:', character);
  //       this.loaded.emit(character.url);
  //     },
  //     { injector: this.injector }
  //   );

  ngOnDestroy(): void {
    if (this.effectRef) {
      console.log('Destroying effect');
      this.effectRef.destroy();
    }
  }
}
