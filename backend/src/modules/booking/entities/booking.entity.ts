import { User } from 'src/modules/auth/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from 'src/modules/event/entities/event.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Event, (event) => event.bookings, { onDelete: 'CASCADE' })
  event: Event;
}
