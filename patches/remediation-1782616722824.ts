interface RawSalesforceSyncPayload {
  // Other properties relevant to the Salesforce sync
  // For example:
  // Id: string;
  // Name: string;
  // AccountId: string;
  is_armored?: string | boolean | null; // This field is problematic: can be string "true" or boolean
}

interface ProcessedSalesforceSyncPayload {
  // Other properties relevant to the Salesforce sync
  // For example:
  // Id: string;
  // Name: string;
  // AccountId: string;
  is_armored: boolean; // This field MUST be a boolean
}

/**
 * Transforms a raw Salesforce sync payload, ensuring the 'is_armored' field is correctly typed as a boolean.
 *
 * This function addresses the "Type mismatch: Expected boolean for is_armored, received string 'true'" error
 * by converting string representations of booleans (e.g., "true", "false") into actual boolean types.
 *
 * @param rawPayload The incoming payload object, potentially containing 'is_armored' as a string.
 * @returns A processed payload object with 'is_armored' guaranteed to be a boolean.
 */
function processSalesforceSyncPayload(rawPayload: RawSalesforceSyncPayload): ProcessedSalesforceSyncPayload {
  const { is_armored, ...rest } = rawPayload;

  let processedIsArmored: boolean;

  if (typeof is_armored === 'string') {
    // Explicitly convert string "true" (case-insensitive) to boolean true.
    // All other string values will result in false.
    processedIsArmored = is_armored.toLowerCase() === 'true';
  } else {
    // If it's already a boolean, or null/undefined,
    // use Boolean() to coerce it (e.g., null -> false, undefined -> false, true -> true).
    processedIsArmored = Boolean(is_armored);
  }

  return {
    ...rest,
    is_armored: processedIsArmored,
  } as ProcessedSalesforceSyncPayload; // Cast to ensure the return type matches the interface.
}

// Example usage (not part of the raw fix, for demonstration only):
/*
// Scenario 1: Incoming string "true"
const rawData1: RawSalesforceSyncPayload = {
  // ... other data
  is_armored: "true",
};
const processedData1 = processSalesforceSyncPayload(rawData1);
console.log(processedData1.is_armored, typeof processedData1.is_armored); // true, "boolean"

// Scenario 2: Incoming string "false"
const rawData2: RawSalesforceSyncPayload = {
  // ... other data
  is_armored: "false",
};
const processedData2 = processSalesforceSyncPayload(rawData2);
console.log(processedData2.is_armored, typeof processedData2.is_armored); // false, "boolean"

// Scenario 3: Incoming actual boolean true
const rawData3: RawSalesforceSyncPayload = {
  // ... other data
  is_armored: true,
};
const processedData3 = processSalesforceSyncPayload(rawData3);
console.log(processedData3.is_armored, typeof processedData3.is_armored); // true, "boolean"

// Scenario 4: Incoming null
const rawData4: RawSalesforceSyncPayload = {
  // ... other data
  is_armored: null,
};
const processedData4 = processSalesforceSyncPayload(rawData4);
console.log(processedData4.is_armored, typeof processedData4.is_armored); // false, "boolean"

// Scenario 5: is_armored field is missing
const rawData5: RawSalesforceSyncPayload = {
  // ... other data
  // is_armored: undefined (or simply omitted)
};
const processedData5 = processSalesforceSyncPayload(rawData5);
console.log(processedData5.is_armored, typeof processedData5.is_armored); // false, "boolean"
*/