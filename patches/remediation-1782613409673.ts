interface IncomingFaasSyncPayload {
  is_armored?: string | boolean | any;
  [key: string]: any;
}

interface CorrectedFaasSyncPayload {
  is_armored: boolean;
  [key: string]: any;
}

function correctFaasSyncPayload(payload: IncomingFaasSyncPayload): CorrectedFaasSyncPayload {
  let correctedIsArmored: boolean;

  if (typeof payload.is_armored === 'string') {
    correctedIsArmored = payload.is_armored.toLowerCase() === 'true';
  } else if (typeof payload.is_armored === 'boolean') {
    correctedIsArmored = payload.is_armored;
  } else {
    correctedIsArmored = Boolean(payload.is_armored);
  }

  return {
    ...payload,
    is_armored: correctedIsArmored,
  };
}