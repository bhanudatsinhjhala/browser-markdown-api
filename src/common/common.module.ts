import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Markdown, MarkdownSchema } from './schema/markdown.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Markdown.name, schema: MarkdownSchema },
    ]),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
