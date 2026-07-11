const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const FREE_ACCOUNT_LOCK_THRESHOLD = 50;
// Low account lock only applies from 14:30 onwards (Zambia time)
const LOW_ACCOUNT_LOCK_HOUR = 16;
const LOW_ACCOUNT_LOCK_MINUTE = 0;
const REMOVE_PASSWORD = '1234';
const HEARTBEAT_TIMEOUT_MS = 5 * 60 * 1000; // kept for heartbeat display only
const IN_USE_TIMEOUT_MS = 5 * 60 * 60 * 1000; // 5 hours — max time IN-USE before auto-move to Waiting
const PICKED_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes — if a picked withdraw number hasn't logged out, finalize it anyway

async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS accounts (
            phone TEXT PRIMARY KEY,
            password TEXT NOT NULL,
            status TEXT DEFAULT 'FREE',
            logout_time BIGINT DEFAULT NULL,
            logout_time_str TEXT DEFAULT NULL,
            last_heartbeat BIGINT DEFAULT NULL,
            in_use_since BIGINT DEFAULT NULL,
            tab_id TEXT DEFAULT NULL
        );
    `);
    // Add columns to existing databases that don't have them yet
    await pool.query(`ALTER TABLE accounts ADD COLUMN IF NOT EXISTS in_use_since BIGINT DEFAULT NULL;`);
    await pool.query(`ALTER TABLE accounts ADD COLUMN IF NOT EXISTS tab_id TEXT DEFAULT NULL;`);
    await pool.query(`ALTER TABLE accounts ADD COLUMN IF NOT EXISTS freed_at BIGINT DEFAULT NULL;`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS bad_password_accounts (
            phone TEXT PRIMARY KEY,
            password TEXT,
            reported_at TEXT,
            status TEXT DEFAULT 'BAD_PASSWORD'
        );
    `);
    // Completely separate table for the Available/Withdrawn feature.
    // Deliberately NOT the accounts table, so this can never collide
    // with or overwrite login-pool account statuses.
    await pool.query(`
        CREATE TABLE IF NOT EXISTS withdraw_pool (
            phone TEXT PRIMARY KEY,
            password TEXT DEFAULT NULL,
            status TEXT DEFAULT 'AVAILABLE',
            added_at BIGINT DEFAULT NULL,
            picked_at BIGINT DEFAULT NULL,
            withdrawn_at BIGINT DEFAULT NULL
        );
    `);
    await pool.query(`ALTER TABLE withdraw_pool ADD COLUMN IF NOT EXISTS password TEXT DEFAULT NULL;`);
    await pool.query(`ALTER TABLE withdraw_pool ADD COLUMN IF NOT EXISTS picked_at BIGINT DEFAULT NULL;`);

    const { rowCount } = await pool.query('SELECT 1 FROM accounts LIMIT 1');
    if (rowCount === 0) {
        const phoneList = [
            ["573015909","R54321Z"],
            ["573058843","R54321Z"],
            ["573089372","R54321Z"],
            ["573104642","R54321Z"],
            ["573135488","R54321Z"],
            ["573164297","R54321Z"],
            ["573197599","R54321Z"],
            ["573213942","R54321Z"],
            ["573279568","R54321Z"],
            ["573384775","R54321Z"],
            ["573507265","R54321Z"],
            ["574015146","R54321Z"],
            ["574040623","R54321Z"],
            ["574048581","R54321Z"],
            ["574076004","R54321Z"],
            ["574084945","R54321Z"],
            ["574084951","R54321Z"],
            ["574084958","R54321Z"],
            ["574086452","R54321Z"],
            ["574125189","R54321Z"],
            ["574125193","R54321Z"],
            ["574126252","R54321Z"],
            ["574128995","R54321Z"],
            ["574138274","R54321Z"],
            ["574138365","R54321Z"],
            ["574138373","R54321Z"],
            ["574138374","R54321Z"],
            ["574138376","R54321Z"],
            ["574142225","R54321Z"],
            ["574145023","R54321Z"],
            ["574153024","R54321Z"],
            ["574153026","R54321Z"],
            ["574153027","R54321Z"],
            ["574153031","R54321Z"],
            ["574153032","R54321Z"],
            ["574153033","R54321Z"],
            ["574153091","R54321Z"],
            ["574153093","R54321Z"],
            ["574153094","R54321Z"],
            ["574191028","R54321Z"],
            ["574195196","R54321Z"],
            ["574195197","R54321Z"],
            ["574195203","R54321Z"],
            ["574203225","R54321Z"],
            ["574203229","R54321Z"],
            ["574219728","R54321Z"],
            ["574219730","R54321Z"],
            ["574219767","R54321Z"],
            ["574219769","R54321Z"],
            ["574219771","R54321Z"],
            ["574219772","R54321Z"],
            ["574219774","R54321Z"],
            ["574219788","R54321Z"],
            ["574219794","R54321Z"],
            ["574219908","R54321Z"],
            ["574219916","R54321Z"],
            ["574219917","R54321Z"],
            ["574219985","R54321Z"],
            ["574238034","R54321Z"],
            ["574238038","R54321Z"],
            ["574238215","R54321Z"],
            ["574238217","R54321Z"],
            ["574238235","R54321Z"],
            ["574252030","R54321Z"],
            ["574543169","R54321Z"],
            ["574555649","R54321Z"],
            ["574555680","R54321Z"],
            ["574555706","R54321Z"],
            ["574555717","R54321Z"],
            ["574559302","R54321Z"],
            ["574576605","R54321Z"],
            ["574601393","R54321Z"],
            ["574601471","R54321Z"],
            ["574604172","R54321Z"],
            ["574604173","R54321Z"],
            ["574604175","R54321Z"],
            ["574604316","R54321Z"],
            ["574604322","R54321Z"],
            ["574604324","R54321Z"],
            ["574604327","R54321Z"],
            ["574604329","R54321Z"],
            ["574607021","R54321Z"],
            ["574623447","R54321Z"],
            ["574623467","R54321Z"],
            ["574623472","R54321Z"],
            ["574638147","R54321Z"],
            ["574641470","R54321Z"],
            ["574641473","R54321Z"],
            ["574641535","R54321Z"],
            ["574641548","R54321Z"],
            ["574939915","R54321Z"],
            ["574939931","R54321Z"],
            ["574939958","R54321Z"],
            ["574940262","R54321Z"],
            ["574960430","R54321Z"],
            ["574960432","R54321Z"],
            ["574976516","R54321Z"],
            ["574976553","R54321Z"],
            ["574976632","R54321Z"],
            ["574987388","R54321Z"],
            ["574987392","R54321Z"],
            ["574987395","R54321Z"],
            ["574987396","R54321Z"],
            ["574987406","R54321Z"],
            ["574987407","R54321Z"],
            ["574987408","R54321Z"],
            ["574987429","R54321Z"],
            ["574987438","R54321Z"],
            ["574987469","R54321Z"],
            ["574987540","R54321Z"],
            ["574987708","R54321Z"],
            ["574987758","R54321Z"],
            ["750054275","R54321Z"],
            ["750076052","R54321Z"],
            ["750105130","R54321Z"],
            ["750105475","R54321Z"],
            ["760017804","R54321Z"],
            ["760017807","R54321Z"],
            ["760019171","R54321Z"],
            ["760019369","R54321Z"],
            ["760020871","R54321Z"],
            ["760027462","R54321Z"],
            ["760037274","R54321Z"],
            ["760074987","R54321Z"],
            ["760153104","R54321Z"],
            ["760266305","R54321Z"],
            ["760336086","R54321Z"],
            ["760457548","R54321Z"],
            ["760656809","R54321Z"],
            ["760656973","R54321Z"],
            ["760657328","R54321Z"],
            ["760657394","R54321Z"],
            ["760657486","R54321Z"],
            ["760659173","R54321Z"],
            ["760659860","R54321Z"],
            ["760659969","R54321Z"],
            ["760659984","R54321Z"],
            ["760660487","R54321Z"],
            ["760661497","R54321Z"],
            ["760662239","R54321Z"],
            ["760663884","R54321Z"],
            ["760664269","R54321Z"],
            ["760665272","R54321Z"],
            ["760665924","R54321Z"],
            ["760667192","R54321Z"],
            ["760706164","R54321Z"],
            ["760786373","R54321Z"],
            ["760957176","R54321Z"],
            ["760961571","R54321Z"],
            ["761892845","R54321Z"],
            ["762007347","R54321Z"],
            ["762063486","R54321Z"],
            ["762074840","R54321Z"],
            ["762129809","R54321Z"],
            ["762145187","R54321Z"],
            ["762151365","R54321Z"],
            ["762159016","R54321Z"],
            ["762169977","R54321Z"],
            ["762171584","R54321Z"],
            ["762174681","R54321Z"],
            ["762184757","R54321Z"],
            ["762189866","R54321Z"],
            ["762192284","R54321Z"],
            ["762192490","R54321Z"],
            ["762211416","R54321Z"],
            ["762211968","R54321Z"],
            ["762231722","R54321Z"],
            ["762326391","R54321Z"],
            ["762482882","R54321Z"],
            ["762483133","R54321Z"],
            ["762483160","R54321Z"],
            ["762483161","R54321Z"],
            ["762483226","R54321Z"],
            ["762483440","R54321Z"],
            ["762483842","R54321Z"],
            ["762484350","R54321Z"],
            ["762484481","R54321Z"],
            ["762484506","R54321Z"],
            ["762484535","R54321Z"],
            ["762484544","R54321Z"],
            ["762484670","R54321Z"],
            ["762614792","R54321Z"],
            ["762704788","R54321Z"],
            ["763066527","R54321Z"],
            ["763131867","R54321Z"],
            ["763138332","R54321Z"],
            ["763145338","R54321Z"],
            ["763154094","R54321Z"],
            ["763169829","R54321Z"],
            ["763185516","R54321Z"],
            ["763190212","R54321Z"],
            ["763525617","R54321Z"],
            ["763779085","R54321Z"],
            ["763779123","R54321Z"],
            ["763779197","R54321Z"],
            ["763779408","R54321Z"],
            ["763796091","R54321Z"],
            ["764112407","R54321Z"],
            ["764264631","R54321Z"],
            ["764281301","R54321Z"],
            ["764287793","R54321Z"],
            ["764315103","R54321Z"],
            ["764358907","R54321Z"],
            ["764374600","R54321Z"],
            ["764612871","R54321Z"],
            ["764616802","R54321Z"],
            ["764643223","R54321Z"],
            ["764646883","R54321Z"],
            ["764748154","R54321Z"],
            ["764764653","R54321Z"],
            ["764798266","R54321Z"],
            ["764833767","R54321Z"],
            ["764834244","R54321Z"],
            ["764834484","R54321Z"],
            ["764884784","R54321Z"],
            ["764894585","R54321Z"],
            ["764943156","R54321Z"],
            ["764959540","R54321Z"],
            ["764961915","R54321Z"],
            ["765801758","R54321Z"],
            ["765884396","R54321Z"],
            ["765980678","R54321Z"],
            ["766253523","R54321Z"],
            ["766253993","R54321Z"],
            ["766254071","R54321Z"],
            ["766254179","R54321Z"],
            ["766254374","R54321Z"],
            ["766254407","R54321Z"],
            ["766254434","R54321Z"],
            ["766254492","R54321Z"],
            ["766254520","R54321Z"],
            ["766254552","R54321Z"],
            ["766254865","R54321Z"],
            ["766254916","R54321Z"],
            ["766254928","R54321Z"],
            ["766254960","R54321Z"],
            ["766315565","R54321Z"],
            ["766843595","R54321Z"],
            ["767043412","R54321Z"],
            ["767713636","R54321Z"],
            ["768267124","R54321Z"],
            ["768998482","R54321Z"],
            ["768998782","R54321Z"],
            ["769649561","R54321Z"],
            ["770942244","R54321Z"],
            ["770951404","R54321Z"],
            ["771159984","R54321Z"],
            ["771952763","R54321Z"],
            ["771954658","R54321Z"],
            ["771994157","R54321Z"],
            ["777263261","R54321Z"],
            ["778228223","R54321Z"],
            ["778237631","R54321Z"],
            ["778237633","R54321Z"],
            ["778301584","R54321Z"],
            ["778301604","R54321Z"],
            ["779171390","R54321Z"],
            ["779171438","R54321Z"],
            ["953583621","R54321Z"],
            ["953583623","R54321Z"],
            ["953584706","R54321Z"],
            ["953659386","R54321Z"],
            ["960258667","R54321Z"],
            ["960674231","R54321Z"],
            ["960981870","R54321Z"],
            ["961153918","R54321Z"],
            ["961250238","R54321Z"],
            ["961698321","R54321Z"],
            ["962206748","R54321Z"],
            ["962372176","R54321Z"],
            ["962871032","R54321Z"],
            ["962873158","R54321Z"],
            ["963160727","R54321Z"],
            ["963170043","R54321Z"],
            ["963193039","R54321Z"],
            ["963629888","R54321Z"],
            ["963717220","R54321Z"],
            ["963801205","R54321Z"],
            ["964158220","R54321Z"],
            ["964367610","R54321Z"],
            ["964548395","R54321Z"],
            ["964597345","R54321Z"],
            ["964689702","R54321Z"],
            ["964819491","R54321Z"],
            ["964918640","R54321Z"],
            ["965185421","R54321Z"],
            ["965699297","R54321Z"],
            ["965946856","R54321Z"],
            ["965979179","R54321Z"],
            ["966081954","R54321Z"],
            ["966259852","R54321Z"],
            ["966318836","R54321Z"],
            ["966506432","R54321Z"],
            ["966856823","R54321Z"],
            ["967378691","R54321Z"],
            ["967429152","R54321Z"],
            ["967450294","R54321Z"],
            ["967993144","R54321Z"],
            ["968103661","R54321Z"],
            ["968154969","R54321Z"],
            ["968274817","R54321Z"],
            ["968418911","R54321Z"],
            ["968436080","R54321Z"],
            ["968437139","R54321Z"],
            ["968607946","R54321Z"],
            ["968719065","R54321Z"],
            ["968913044","R54321Z"],
            ["969017761","R54321Z"],
            ["969139218","R54321Z"],
            ["969179357","R54321Z"],
            ["969193788","R54321Z"],
            ["969206113","R54321Z"],
            ["969234824","R54321Z"],
            ["969385082","R54321Z"],
            ["969481098","R54321Z"],
            ["969486004","R54321Z"],
            ["969544410","R54321Z"],
            ["969757291","R54321Z"],
        ];
        const values = [];
        const placeholders = [];
        phoneList.forEach(([phone, password], i) => {
            placeholders.push(`($${i * 2 + 1}, $${i * 2 + 2})`);
            values.push(phone, password);
        });
        await pool.query(
            `INSERT INTO accounts (phone, password) VALUES ${placeholders.join(', ')} ON CONFLICT DO NOTHING`,
            values
        );
        console.log('Accounts seeded into database.');
    }
}

async function getAccounts() {
    const { rows } = await pool.query('SELECT * FROM accounts ORDER BY phone ASC');
    return rows.map(r => ({
        phone: r.phone,
        password: r.password,
        status: r.status,
        logoutTime: r.logout_time ? Number(r.logout_time) : null,
        logoutTimeStr: r.logout_time_str,
        lastHeartbeat: r.last_heartbeat ? Number(r.last_heartbeat) : null,
        inUseSince: r.in_use_since ? Number(r.in_use_since) : null,
        tabId: r.tab_id || null,
        freedAt: r.freed_at ? Number(r.freed_at) : null,
    }));
}

// Single-transaction version of: find old account by tabId → move to
// Waiting 24h → claim a new free account. All three steps happen inside
// one database connection with no round-trips between them, eliminating
// the delay that occurred when they ran as three separate operations.
async function reLoginForTab(tabId, heartbeatNow, logoutTimeStr) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Step 1: find and release the old account held by this tab
        // NOTE: this is an automatic system bump (tab requesting a new
        // account), not a manual logout — deliberately does NOT touch
        // withdraw_pool, per the same rule as updateAccount above.
        if (tabId) {
            const { rows: oldRows } = await client.query(
                `SELECT phone FROM accounts WHERE tab_id = $1 AND status = 'IN-USE' AND logout_time IS NULL LIMIT 1 FOR UPDATE SKIP LOCKED`,
                [tabId]
            );
            if (oldRows.length > 0) {
                await client.query(
                    `UPDATE accounts SET logout_time = $2, logout_time_str = $3, last_heartbeat = NULL, in_use_since = NULL, tab_id = NULL WHERE phone = $1`,
                    [oldRows[0].phone, heartbeatNow, logoutTimeStr + ' (re-login)']
                );
            }
        }

        // Step 2: claim a new free account for this tab
        const { rows: newRows } = await client.query(
            `SELECT phone, password FROM accounts WHERE status = 'FREE' ORDER BY freed_at ASC NULLS LAST LIMIT 1 FOR UPDATE SKIP LOCKED`
        );
        if (newRows.length === 0) {
            await client.query('ROLLBACK');
            return null;
        }
        const { phone, password } = newRows[0];
        await client.query(
            `UPDATE accounts SET status = 'IN-USE', logout_time = NULL, logout_time_str = NULL, last_heartbeat = $2, in_use_since = $2, tab_id = $3 WHERE phone = $1`,
            [phone, heartbeatNow, tabId || null]
        );

        await client.query('COMMIT');
        return { phone, password };
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

// Find an IN-USE account currently held by a specific tab ID
async function getAccountByTabId(tabId) {
    const { rows } = await pool.query(
        `SELECT * FROM accounts WHERE tab_id = $1 AND status = 'IN-USE' AND logout_time IS NULL LIMIT 1`,
        [tabId]
    );
    if (rows.length === 0) return null;
    const r = rows[0];
    return {
        phone: r.phone,
        password: r.password,
        status: r.status,
        logoutTime: r.logout_time ? Number(r.logout_time) : null,
        logoutTimeStr: r.logout_time_str,
        lastHeartbeat: r.last_heartbeat ? Number(r.last_heartbeat) : null,
        inUseSince: r.in_use_since ? Number(r.in_use_since) : null,
        tabId: r.tab_id || null,
    };
}

async function claimFreeAccount(heartbeatNow, tabId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { rows } = await client.query(`
            SELECT phone, password FROM accounts
            WHERE status = 'FREE'
            ORDER BY freed_at ASC NULLS LAST
            LIMIT 1
            FOR UPDATE SKIP LOCKED
        `);
        if (rows.length === 0) {
            await client.query('ROLLBACK');
            return null;
        }
        const { phone, password } = rows[0];
        await client.query(
            `UPDATE accounts SET status = 'IN-USE', logout_time = NULL, logout_time_str = NULL, last_heartbeat = $2, in_use_since = $2, tab_id = $3 WHERE phone = $1`,
            [phone, heartbeatNow, tabId || null]
        );
        await client.query('COMMIT');
        return { phone, password };
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

async function updateAccount(phone, fields) {
    const map = { logoutTime: 'logout_time', logoutTimeStr: 'logout_time_str', lastHeartbeat: 'last_heartbeat', status: 'status', inUseSince: 'in_use_since', tabId: 'tab_id', freedAt: 'freed_at' };
    const keys = Object.keys(fields);
    const setClauses = keys.map((k, i) => `${map[k]} = $${i + 1}`).join(', ');
    const values = [...keys.map(k => fields[k]), phone];
    await pool.query(`UPDATE accounts SET ${setClauses} WHERE phone = $${values.length}`, values);
    // NOTE: deliberately does NOT touch withdraw_pool here. Automatic/system
    // logouts (19:00 lock, idle timeout, re-login bump) go through this
    // function but must NOT move a picked number to Withdrawn — only an
    // explicit, manual /logout call should do that. See the /logout route.
}

async function addAccount(phone, password) {
    await pool.query(
        `INSERT INTO accounts (phone, password, status) VALUES ($1, $2, 'FREE')`,
        [phone, password]
    );
}

// Adds a phone to BOTH the login pool (accounts, status FREE) and the
// withdraw pool (withdraw_pool, status AVAILABLE) in a single transaction.
// This is what the dashboard's "Add account" box now calls, so every
// account you add is automatically ready to withdraw too.
async function addAccountEverywhere(phone, password) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            `INSERT INTO accounts (phone, password, status) VALUES ($1, $2, 'FREE')`,
            [phone, password]
        );
        await client.query(
            `INSERT INTO withdraw_pool (phone, password, status, added_at) VALUES ($1, $2, 'AVAILABLE', $3) ON CONFLICT (phone) DO NOTHING`,
            [phone, password, Date.now()]
        );
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

// If this phone is currently 'PICKED' in withdraw_pool (i.e. some external
// system claimed it but it hasn't logged out yet), mark it 'WITHDRAWN' now.
// No-op if the phone isn't in withdraw_pool or isn't in 'PICKED' state —
// safe to call on every account logout, regardless of cause.
async function markWithdrawnIfPicked(phone) {
    await pool.query(
        `UPDATE withdraw_pool SET status = 'WITHDRAWN', withdrawn_at = $2 WHERE phone = $1 AND status = 'PICKED'`,
        [phone, Date.now()]
    );
}

// Safety net: any number stuck in 'PICKED' for more than PICKED_TIMEOUT_MS
// (5 min) without its account logging out gets finalized to 'WITHDRAWN'
// anyway. Prevents numbers from being invisibly stuck between Available
// and Withdrawn forever.
async function finalizeStalePickedNumbers() {
    const cutoff = Date.now() - PICKED_TIMEOUT_MS;
    const { rowCount } = await pool.query(
        `UPDATE withdraw_pool SET status = 'WITHDRAWN', withdrawn_at = $1 WHERE status = 'PICKED' AND picked_at IS NOT NULL AND picked_at <= $2`,
        [Date.now(), cutoff]
    );
    return { finalized: rowCount };
}

// Moves every currently-WITHDRAWN number back to AVAILABLE. Used when the
// available pool runs dry, so the withdraw system recycles instead of
// permanently running out.
async function recycleWithdrawnToAvailable() {
    const { rowCount } = await pool.query(
        `UPDATE withdraw_pool SET status = 'AVAILABLE', added_at = $1, picked_at = NULL, withdrawn_at = NULL WHERE status = 'WITHDRAWN'`,
        [Date.now()]
    );
    return { recycled: rowCount };
}

async function removeAccount(phone) {
    await pool.query('DELETE FROM accounts WHERE phone = $1', [phone]);
}

async function resetAllAccounts() {
    await pool.query(`UPDATE accounts SET status = 'FREE', logout_time = NULL, logout_time_str = NULL, last_heartbeat = NULL, in_use_since = NULL, tab_id = NULL, freed_at = NULL`);
}

async function getBadPasswordAccounts() {
    const { rows } = await pool.query('SELECT * FROM bad_password_accounts');
    return rows.map(r => ({ phone: r.phone, password: r.password, reportedAt: r.reported_at, status: r.status }));
}

async function addBadPasswordAccount(phone, password, reportedAt) {
    await pool.query(
        `INSERT INTO bad_password_accounts (phone, password, reported_at) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
        [phone, password, reportedAt]
    );
}

async function removeBadPasswordAccount(phone) {
    await pool.query('DELETE FROM bad_password_accounts WHERE phone = $1', [phone]);
}

// ---- Withdraw pool: fully separate from `accounts`, cannot ever touch login accounts ----

async function getWithdrawPool() {
    const { rows } = await pool.query('SELECT * FROM withdraw_pool ORDER BY phone ASC');
    return rows.map(r => ({
        phone: r.phone,
        password: r.password || null,
        status: r.status,
        addedAt: r.added_at ? Number(r.added_at) : null,
        pickedAt: r.picked_at ? Number(r.picked_at) : null,
        withdrawnAt: r.withdrawn_at ? Number(r.withdrawn_at) : null,
    }));
}

// Bulk-insert plain phone numbers into withdraw_pool with status 'AVAILABLE'.
// Duplicates (phone already in this table) are left untouched, not overwritten.
async function bulkAddWithdrawNumbers(phones) {
    if (!phones || phones.length === 0) return { inserted: 0 };
    const now = Date.now();
    const values = [];
    const placeholders = [];
    phones.forEach((phone, i) => {
        placeholders.push(`($${i * 2 + 1}, 'AVAILABLE', $${i * 2 + 2})`);
        values.push(phone, now);
    });
    const { rowCount } = await pool.query(
        `INSERT INTO withdraw_pool (phone, status, added_at) VALUES ${placeholders.join(', ')} ON CONFLICT (phone) DO NOTHING`,
        values
    );
    return { inserted: rowCount };
}

async function removeWithdrawNumber(phone) {
    await pool.query('DELETE FROM withdraw_pool WHERE phone = $1', [phone]);
}

module.exports = {
    pool,
    initDB,
    getAccounts,
    getAccountByTabId,
    claimFreeAccount,
    reLoginForTab,
    updateAccount,
    addAccount,
    addAccountEverywhere,
    removeAccount,
    resetAllAccounts,
    getBadPasswordAccounts,
    addBadPasswordAccount,
    removeBadPasswordAccount,
    getWithdrawPool,
    bulkAddWithdrawNumbers,
    removeWithdrawNumber,
    markWithdrawnIfPicked,
    recycleWithdrawnToAvailable,
    finalizeStalePickedNumbers,
    TWENTY_FOUR_HOURS_MS,
    FREE_ACCOUNT_LOCK_THRESHOLD,
    LOW_ACCOUNT_LOCK_HOUR,
    LOW_ACCOUNT_LOCK_MINUTE,
    REMOVE_PASSWORD,
    HEARTBEAT_TIMEOUT_MS,
    IN_USE_TIMEOUT_MS,
    PICKED_TIMEOUT_MS,
};
