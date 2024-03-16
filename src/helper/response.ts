import { StatusCodes, getReasonPhrase } from "http-status-codes";

type createResponseParam = {
  statusCode: StatusCodes;
  message: string;
  data?: any;
  error_message?: string;
  error?: any;
  count?: number;
  limit?: number;
  offset?: number;
};

export const createResponse = ({
  statusCode,
  message,
  error,
  count,
  data,
  error_message,
  limit,
  offset,
}: createResponseParam) => {
  let format = {
    response: {
      http_status: statusCode,
      http_message: getReasonPhrase(statusCode),
      message,
      data: data ?? null,
      error_message: error_message ?? "",
      error: error ?? null,
    },
    meta: {
      offset: offset ?? null,
      limit: limit ?? null,
      count: count ?? 0,
    },
  };

  return format;
};
