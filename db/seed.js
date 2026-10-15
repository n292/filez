import db from "#db/client";
import { createFolder } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folders = ["Documents", "Pictures", "Music"];
  const filesByFolder = {
    Documents: ["resume.pdf", "notes.txt", "budget.xlsx", "report.docx", "todo.md"],
    Pictures: ["beach.jpg", "family.png", "logo.svg", "sunset.jpg", "selfie.heic"],
    Music: ["song1.mp3", "song2.mp3", "podcast.m4a", "demo.wav", "playlist.m3u"],
  };

  for (const folderName of folders) {
    const folder = await createFolder(folderName);
    const names = filesByFolder[folderName];
    for (let i = 0; i < names.length; i++) {
      await createFile({
        name: names[i],
        size: (i + 1) * 1024,
        folder_id: folder.id,
      });
    }
  }
}