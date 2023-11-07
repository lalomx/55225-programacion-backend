import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// .find().lean()

@Schema({ collection: 'users' })
export class User {
  /// definir las propiedades
  // name
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Prop({ default: Date.now() })
  createdDate: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
