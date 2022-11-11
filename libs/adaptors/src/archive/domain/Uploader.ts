export interface Uploader {
  upload(file: any): Promise<UploaderResponse>;
}

export type UploaderResponse = {
  remote_id: string;
  url: string;
};
