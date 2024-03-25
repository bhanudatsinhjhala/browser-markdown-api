import { CommonResponse } from './common/common.type';
import { Markdown } from './common/schema/markdown.schema';

export type CreateMarkdownResponse = Promise<CommonResponse<Markdown>>;
export type GetMarkdownByIdResponse = Promise<CommonResponse<Markdown>>;
export type GetAllMarkdownResponse = Promise<CommonResponse<Markdown[]>>;
