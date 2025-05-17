import { Category } from 'src/modules/category/entities/category.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  venue: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.events, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.events)
  tags: Tag[];

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
