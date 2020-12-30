import { Storage } from "aws-amplify";

export async function s3Upload(projectName, file) {
  const filename = `${projectName}-${file.name}`;

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}