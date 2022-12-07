import { MysqlError } from 'mysql'

interface ErrorResponse {
  error: string;
}

export function createMySQLErrorResponse(error: MysqlError): ErrorResponse {
  return {
    error: error.message
  }
}
