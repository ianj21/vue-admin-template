export function sendSuccess (data, { msg = 'ok' } = {}) {
  return {
    code: 0,
    data,
    msg,
    success: true,
  };
}

export function sendFail (data, { msg = 'fail' } = {}) {
  return {
    code: 400,
    data,
    msg,
    success: false,
  };
}