const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres.bznatjpmsapialqfjmoh:Exliding@11@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres'
});
client.connect().then(() => {
  return client.query("ALTER TABLE portfolios DROP COLUMN IF EXISTS image; ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS image_id integer;");
}).then(() => {
  console.log("Database updated");
  client.end();
}).catch(err => {
  console.error("Error:", err);
  client.end();
});
