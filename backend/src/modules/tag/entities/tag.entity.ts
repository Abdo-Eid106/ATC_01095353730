import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from 'src/modules/event/entities/event.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Event, (event) => event.tags)
  @JoinTable()
  events: Event[];
}
