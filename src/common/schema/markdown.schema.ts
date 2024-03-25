import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Markdown {
  @Prop({ type: SchemaTypes.String, required: true })
  fileName: string;

  @Prop({ type: SchemaTypes.String, required: true })
  data: string;
}

export const MarkdownSchema = SchemaFactory.createForClass(Markdown);
export type MarkdownDocument = HydratedDocument<Markdown>;
