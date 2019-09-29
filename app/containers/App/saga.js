import { call } from 'redux-saga/effects';
import { api, tenant } from 'environments';
import request from 'utils/request';

export function* uploadFiles(authToken, files) {
  const endpoint = `${api.host}/api/file`;

  const formData = new FormData();
  // formData.append('file', files);
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    formData.append('file', file, file.name);
  }
  const requestOpt = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'X-TENANT-ID': tenant['360f'].id,
    },
    body: formData,
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    return response.data;
  } catch (err) {
    return [];
  }
}

export default function* appSaga() {
  // Put global saga here
}
