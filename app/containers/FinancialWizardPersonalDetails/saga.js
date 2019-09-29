import { put, all, takeEvery } from 'redux-saga/effects';
import Compressor from 'compressorjs';
import { ADD_FILE_ACTION } from './constants';
import { addCompressedFileAction } from './actions';

async function compressFile(file) {
  try {
    const result = await new Promise((resolve, reject) => {
      new Compressor(file, {
        success: compressed => {
          resolve(compressed);
        },
        error: reject,
        convertSize: 1200000,
        quality: 0.6,
      });
    });
    return result;
  } catch (e) {
    return file;
  }
}

export function* uploadFile(action) {
  const { key, file } = action.payload;

  let compressedFile = file;
  // compress if more than 1.2MB
  if (file.size > 1200000) {
    compressedFile = yield compressFile(file);
  }
  yield put(addCompressedFileAction(key, compressedFile));
}

// Individual exports for testing
export default function* financialWizardPersonalDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield all([takeEvery(ADD_FILE_ACTION, uploadFile)]);
}
