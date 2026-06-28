type SalesforcePayloadInput = {
  is_armored?: string | boolean | any;
  [key: string]: any;
};

type SalesforcePayloadOutput = {
  is_armored: boolean;
  [key: string]: any;
};

function parseSalesforceSyncPayload(payload: SalesforcePayloadInput): SalesforcePayloadOutput {
  const parsedPayload: SalesforcePayloadOutput = { ...payload } as SalesforcePayloadOutput;

  if (typeof payload.is_armored === 'string') {
    parsedPayload.is_armored = payload.is_armored.toLowerCase() === 'true';
  } else if (typeof payload.is_armored === 'boolean') {
    parsedPayload.is_armored = payload.is_armored;
  } else {
    parsedPayload.is_armored = false;
  }

  return parsedPayload;
}