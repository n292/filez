import db from "#db/client";

export async function createFolder(name) {
  const sql = `
  INSERT INTO folders (name)
  VALUES ($1)
  RETURNING *
  `;
  const { rows: [folder] } = await db.query(sql, [name]);
  return folder;
}

export async function getFolders() {
  const { rows: folders } = await db.query("SELECT * FROM folders");
  return folders;
}

export async function getFolderIncludingFiles(id) {
  const sql = `
  SELECT
    folders.*,
    COALESCE(json_agg(files) FILTER (WHERE files.id IS NOT NULL), '[]') AS files
  FROM
    folders
    LEFT JOIN files ON files.folder_id = folders.id
  WHERE
    folders.id = $1
  GROUP BY
    folders.id
  `;
  const { rows: [folder] } = await db.query(sql, [id]);
  return folder;
}