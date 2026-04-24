/**
 * Fix Supabase permissions for Payload CMS
 * 
 * This script:
 * 1. Disables RLS on all tables in the 'payload' schema
 * 2. Grants full permissions to the roles used by Payload CMS
 * 3. Grants usage on all sequences
 * 
 * Run with: node scripts/fix-supabase-permissions.js
 */

const { Client } = require('pg');

// Use DIRECT_URL (port 5432, no pgbouncer) for DDL operations
const connectionString = 'postgres://postgres:6omgc0yPSyUV5ScT@db.xdlqzwrhbtltmqxdrwrs.supabase.co:5432/postgres';

async function fixPermissions() {
  const client = new Client({ 
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // 1. Check if payload schema exists
    const schemaCheck = await client.query(`
      SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'payload';
    `);
    
    if (schemaCheck.rows.length === 0) {
      console.log('❌ Schema "payload" does not exist yet. Run the app first to create it.');
      return;
    }
    console.log('✅ Schema "payload" exists\n');

    // 2. List all tables in payload schema
    const tables = await client.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'payload';
    `);
    console.log(`📋 Found ${tables.rows.length} tables in payload schema:`);
    tables.rows.forEach(r => console.log(`   - ${r.tablename}`));
    console.log('');

    // 3. Check current RLS status
    console.log('🔍 Checking RLS status...');
    const rlsCheck = await client.query(`
      SELECT relname, relrowsecurity 
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'payload' AND c.relkind = 'r';
    `);
    
    const rlsEnabled = rlsCheck.rows.filter(r => r.relrowsecurity);
    if (rlsEnabled.length > 0) {
      console.log(`⚠️  RLS is ENABLED on ${rlsEnabled.length} table(s):`);
      rlsEnabled.forEach(r => console.log(`   - ${r.relname}`));
    } else {
      console.log('   RLS is disabled on all tables');
    }
    console.log('');

    // 4. Disable RLS on ALL payload tables
    console.log('🔧 Disabling RLS on all payload tables...');
    for (const row of tables.rows) {
      await client.query(`ALTER TABLE payload."${row.tablename}" DISABLE ROW LEVEL SECURITY;`);
      console.log(`   ✅ Disabled RLS on payload."${row.tablename}"`);
    }
    console.log('');

    // 5. Grant full permissions on the payload schema
    console.log('🔧 Granting permissions on payload schema...');
    
    // Grant usage on schema
    await client.query(`GRANT USAGE ON SCHEMA payload TO postgres, anon, authenticated, service_role;`);
    console.log('   ✅ Granted USAGE on schema payload');

    // Grant all on all tables
    await client.query(`GRANT ALL ON ALL TABLES IN SCHEMA payload TO postgres, anon, authenticated, service_role;`);
    console.log('   ✅ Granted ALL on all tables');

    // Grant all on all sequences
    await client.query(`GRANT ALL ON ALL SEQUENCES IN SCHEMA payload TO postgres, anon, authenticated, service_role;`);
    console.log('   ✅ Granted ALL on all sequences');

    // Set default privileges for future tables
    await client.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA payload GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;`);
    await client.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA payload GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;`);
    console.log('   ✅ Set default privileges for future tables/sequences');
    console.log('');

    // 6. Verify the fix
    console.log('🔍 Verifying fix...');
    const verifyRls = await client.query(`
      SELECT relname, relrowsecurity 
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'payload' AND c.relkind = 'r' AND c.relrowsecurity = true;
    `);
    
    if (verifyRls.rows.length === 0) {
      console.log('   ✅ All RLS disabled successfully!');
    } else {
      console.log(`   ⚠️  ${verifyRls.rows.length} table(s) still have RLS enabled`);
    }

    // 7. Also check and fix the public schema media table if it exists
    const publicMediaCheck = await client.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE '%media%';
    `);
    if (publicMediaCheck.rows.length > 0) {
      console.log('\n🔧 Fixing public schema media tables...');
      for (const row of publicMediaCheck.rows) {
        await client.query(`ALTER TABLE public."${row.tablename}" DISABLE ROW LEVEL SECURITY;`);
        console.log(`   ✅ Disabled RLS on public."${row.tablename}"`);
      }
    }

    console.log('\n🎉 All permissions fixed! You should now be able to update content and upload images.');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
  } finally {
    await client.end();
  }
}

fixPermissions();
