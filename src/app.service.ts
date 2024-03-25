import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import {
  CreateMarkdownResponse,
  GetAllMarkdownResponse,
  GetMarkdownByIdResponse,
} from './app.type';
import {
  errorMessages,
  replaceMessage,
  successMessages,
} from './common/config/messages.config';
import { Markdown } from './common/schema/markdown.schema';
import { CreateMarkdownDto } from './dtos/create-markdown.dto';
import { ParamIdDto } from './dtos/param-id.dto';
import { ResponseHandler } from './utils/response-handler';
import { InjectModel } from '@nestjs/mongoose';
import { CommonMessageResponse } from './common/common.type';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Markdown.name) private readonly markdownModel: Model<Markdown>,
  ) {}

  /**
   * Create a markdown using the provided data.
   * @function createMarkdown - creates a new markdown
   * @param {CreateMarkdownDto} createMarkdownDto - the data for creating the markdown
   * @return {CreateMarkdownResponse} success response with the created markdown
   */
  async createMarkdown(
    createMarkdownDto: CreateMarkdownDto,
  ): CreateMarkdownResponse {
    const markdown = await this.markdownModel.create(createMarkdownDto);

    return ResponseHandler.success(
      replaceMessage(successMessages.DATA_CREATED, 'Markdown'),
      HttpStatus.CREATED,
      markdown,
    );
  }

  /**
   * Description - Get markdown from id
   *
   * @function getMarkdownById - Get markdown from id
   * @param {ParamIdDto} paramIdDto - the id of the markdown
   * @return {GetMarkdownByIdResponse} - success response with the markdown
   */
  async getMarkdownById(paramIdDto: ParamIdDto): GetMarkdownByIdResponse {
    const markdown = await this.markdownModel
      .findById(new Types.ObjectId(paramIdDto.id))
      .lean();

    if (!markdown)
      throw new NotFoundException(
        replaceMessage(errorMessages.NOT_FOUND, 'Markdown'),
      );

    return ResponseHandler.success(
      replaceMessage(successMessages.DATA_FETCHED, 'Markdown'),
      HttpStatus.OK,
      markdown,
    );
  }

  /**
   * Description - Retrieves all markdown documents from the database, sorted by creation date in descending order.
   * @function getAllMarkdown - Retrieves all markdown documents from the database
   * @return {Promise<GetAllMarkdownResponse>} A promise that resolves to a success response containing the fetched markdown documents.
   */
  async getAllMarkdown(): GetAllMarkdownResponse {
    const markdown = await this.markdownModel
      .find(
        {},
        {
          updatedAt: 0,
          __v: 0,
        },
        {
          sort: {
            createdAt: -1,
          },
        },
      )
      .lean();

    return ResponseHandler.success(
      replaceMessage(successMessages.DATA_FETCHED, 'Markdown'),
      HttpStatus.OK,
      markdown,
    );
  }

  /**
   * Description - Delete Markdown from id
   * @function deleteMarkdownById - Delete Markdown from id
   * @param {ParamIdDto} paramIdDto - the id of the markdown
   * @returns {Promise<CommonMessageResponse>} - a promise that resolves to a success response for delete
   */
  async deleteMarkdownById(
    paramIdDto: ParamIdDto,
  ): Promise<CommonMessageResponse> {
    const isMarkdownDeleted = await this.markdownModel.deleteOne({
      _id: new Types.ObjectId(paramIdDto.id),
    });

    if (!isMarkdownDeleted.deletedCount)
      throw new NotFoundException(
        replaceMessage(errorMessages.NOT_FOUND, 'Markdown'),
      );

    return ResponseHandler.success(
      replaceMessage(successMessages.DATA_DELETED, 'Markdown'),
      HttpStatus.OK,
    );
  }
}
