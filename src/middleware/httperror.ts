/*Even though for this simple api there are no other forms of errors like validation or database
errors, for practice this is a cleaner standard of defining classes of errors rather than combining
error.ts and httperror.ts files for this project specifically. Best to keep those skills sharp */

//The class description and builder for http errors
export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
