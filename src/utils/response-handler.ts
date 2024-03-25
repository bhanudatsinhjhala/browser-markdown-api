import { CommonResponse } from '../common/common.type';

/**
 * Description -Response Handler Utility Function
 */
export class ResponseHandler {
  /**
   * Description - Handler for Success Response
   * @param data
   * @param message
   * @param statusCode
   * @returns
   */
  public static success<T>(
    message: string | string[],
    statusCode: number,
    data: T | [] = [],
  ): CommonResponse<T> {
    return {
      status: true,
      statusCode,
      message,
      data,
      error: [],
    };
  }

  /**
   * Description - Handler for Error Response
   * @param error
   * @param message
   * @param statusCode
   * @returns
   */
  public static error<T>(
    message: string | string[],
    statusCode: number,
    error: T | [] = [],
  ): CommonResponse<T> {
    return {
      status: false,
      statusCode,
      message,
      data: [],
      error,
    };
  }
}
