import { Column, Entity, ObjectID, ObjectIdColumn, Unique } from "typeorm"

@Entity()
@Unique(["userId"])
export class WarnProfile {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  userId: string

  @Column({ default: 0 })
  warnings: number
}
