import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Word } from '../../word/entities/word.entity';
import { Deck } from '../../deck/entities/deck.entity';
import { CommonEntity } from '../../_shared/entities/common.entity';

@ObjectType()
@Entity('DeckWords')
export class DeckWord extends CommonEntity {
  @Field()
  @Column()
  starred: boolean;

  @Field()
  @Column()
  order: number;

  @Field((type) => Word)
  @ManyToOne(() => Word, (word) => word.deckWords)
  word: Word;

  @Field((type) => Int)
  @Column('integer')
  wordId: number;

  @Field((type) => Deck)
  @ManyToOne(() => Deck, (deck) => deck.deckWords)
  deck: Deck;

  @Field((type) => Int)
  @Column('integer')
  deckId: number;
}