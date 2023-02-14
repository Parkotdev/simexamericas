interface Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documentMode?: any;
}

interface Navigator {
  msSaveBlob?: (blob: Blob, defaultName?: string) => boolean;
}
