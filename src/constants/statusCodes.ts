let statusCodes: {
  OK: number;
  CREATED: number;
  ACCEPTED: number;

  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  UNPROCESSABLE_ENTITY: number;

  INTERNAL_SERVER_ERROR: number;
} = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,

  INTERNAL_SERVER_ERROR: 500,
};

export default statusCodes;
