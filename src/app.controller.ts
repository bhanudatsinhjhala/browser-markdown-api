import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMarkdownDto } from './dtos/create-markdown.dto';
import {
  CreateMarkdownResponse,
  GetAllMarkdownResponse,
  GetMarkdownByIdResponse,
} from './app.type';
import { ParamIdDto } from './dtos/param-id.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Creates a markdown using the provided CreateMarkdownDto.
   * @function {createMarkdown} - Creates a new markdown.
   * @param {CreateMarkdownDto} createMarkdownDto - The data for creating the markdown.
   * @return {CreateMarkdownResponse} success response with the created markdown
   */
  @Post()
  createMarkdown(
    @Body() createMarkdownDto: CreateMarkdownDto,
  ): CreateMarkdownResponse {
    return this.appService.createMarkdown(createMarkdownDto);
  }

  /**
   * Description - Get markdown from id
   *
   * @function {getMarkdownById} - Get markdown from id
   * @param {ParamIdDto} paramIdDto - the id of the markdown
   * @return {GetMarkdownByIdResponse} - success response with the markdown
   */
  @Get()
  getMarkdownById(@Param() paramIdDto: ParamIdDto): GetMarkdownByIdResponse {
    return this.appService.getMarkdownById(paramIdDto);
  }

  /**
   * Description - Retrieves all markdown documents from the database, sorted by creation date in descending order.
   * @function {getAllMarkdown} - Retrieves all markdown documents from the database
   * @return {GetAllMarkdownResponse} A promise that resolves to a success response containing the fetched markdown documents.
   */
  @Get()
  getAllMarkdown(): GetAllMarkdownResponse {
    return this.appService.getAllMarkdown();
  }
}
