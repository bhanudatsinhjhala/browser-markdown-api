import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreateMarkdownResponse,
  GetAllMarkdownResponse,
  GetMarkdownByIdResponse,
} from './app.type';
import { successMessages } from './common/config/messages.config';
import { Markdown } from './common/schema/markdown.schema';
import { CreateMarkdownDto } from './dtos/create-markdown.dto';
import { ParamIdDto } from './dtos/param-id.dto';
import { ResponseHandler } from './utils/response-handler';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Markdown.name) private readonly markdownModel: Model<Markdown>,
  ) {}

  /**
   * Create a markdown using the provided data.
   * @function {createMarkdown} - creates a new markdown
   * @param {CreateMarkdownDto} createMarkdownDto - the data for creating the markdown
   * @return {CreateMarkdownResponse} success response with the created markdown
   */
  async createMarkdown(
    createMarkdownDto: CreateMarkdownDto,
  ): CreateMarkdownResponse {
    const markdown = await this.markdownModel.create(createMarkdownDto);

    return ResponseHandler.success(
      successMessages.DATA_CREATED,
      HttpStatus.CREATED,
      markdown,
    );
  }

  /**
   * Description - Get markdown from id
   *
   * @function {getMarkdownById} - Get markdown from id
   * @param {ParamIdDto} paramIdDto - the id of the markdown
   * @return {GetMarkdownByIdResponse} - success response with the markdown
   */
  async getMarkdownById(paramIdDto: ParamIdDto): GetMarkdownByIdResponse {
    const markdown = await this.markdownModel.findById(paramIdDto).lean();
    return ResponseHandler.success(
      successMessages.DATA_FETCHED,
      HttpStatus.OK,
      markdown,
    );
  }

  /**
   * Description - Retrieves all markdown documents from the database, sorted by creation date in descending order.
   * @function {getAllMarkdown} - Retrieves all markdown documents from the database
   * @return {Promise<GetAllMarkdownResponse>} A promise that resolves to a success response containing the fetched markdown documents.
   */
  async getAllMarkdown(): GetAllMarkdownResponse {
    const markdown = await this.markdownModel
      .find(
        {},
        {
          sort: {
            createdAt: -1,
          },
        },
      )
      .lean();

    return ResponseHandler.success(
      successMessages.DATA_FETCHED,
      HttpStatus.OK,
      markdown,
    );
  }
}
