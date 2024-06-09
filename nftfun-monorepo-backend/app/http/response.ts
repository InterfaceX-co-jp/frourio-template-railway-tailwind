export const returnSuccess = <T>(val: T) => ({
  status: 200 as const,
  body: val,
});

export const returnGetError = (e: unknown) => {
  return { status: 404 as const, body: e };
};

export const returnPatchError = (e: unknown) => {
  return { status: 403 as const, body: e };
};

export const returnPostError = <T>(e: unknown) => {
  return { status: 403 as const, body: e as T };
};

export const returnPutError = (e: unknown) => {
  // TODO: log error
  return { status: 500 as const, body: e };
};
