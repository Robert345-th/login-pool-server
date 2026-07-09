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

    const { rowCount } = await pool.query('SELECT 1 FROM accounts LIMIT 1');
    if (rowCount === 0) {
        const phoneList = [
            ["571460072","R54321Z"],
            ["573015909","R54321Z"],
            ["573058843","R54321Z"],
            ["573089372","R54321Z"],
            ["573104642","R54321Z"],
            ["573135488","R54321Z"],
            ["573164297","R54321Z"],
            ["573197599","R54321Z"],
            ["573213942","R54321Z"],
            ["573271807","R54321Z"],
            ["573279568","R54321Z"],
            ["573384775","R54321Z"],
            ["573507265","R54321Z"],
            ["574015146","R54321Z"],
            ["574040623","R54321Z"],
            ["574048581","R54321Z"],
            ["574076004","R54321Z"],
            ["574084944","R54321Z"],
            ["574084945","R54321Z"],
            ["574084951","R54321Z"],
            ["574084958","R54321Z"],
            ["574086452","R54321Z"],
            ["574093035","R54321Z"],
            ["574111341","R54321Z"],
            ["574111345","R54321Z"],
            ["574125189","R54321Z"],
            ["574125193","R54321Z"],
            ["574126252","R54321Z"],
            ["574128995","R54321Z"],
            ["574138274","R54321Z"],
            ["574138365","R54321Z"],
            ["574138371","R54321Z"],
            ["574138373","R54321Z"],
            ["574138374","R54321Z"],
            ["574138376","R54321Z"],
            ["574142225","R54321Z"],
            ["574145023","R54321Z"],
            ["574153024","R54321Z"],
            ["574153025","R54321Z"],
            ["574153026","R54321Z"],
            ["574153027","R54321Z"],
            ["574153031","R54321Z"],
            ["574153032","R54321Z"],
            ["574153033","R54321Z"],
            ["574153091","R54321Z"],
            ["574153093","R54321Z"],
            ["574153094","R54321Z"],
            ["574167658","R54321Z"],
            ["574167662","R54321Z"],
            ["574191028","R54321Z"],
            ["574195196","R54321Z"],
            ["574195197","R54321Z"],
            ["574195202","R54321Z"],
            ["574195203","R54321Z"],
            ["574203225","R54321Z"],
            ["574203227","R54321Z"],
            ["574203229","R54321Z"],
            ["574203235","R54321Z"],
            ["574219118","R54321Z"],
            ["574219727","R54321Z"],
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
            ["574219978","R54321Z"],
            ["574219985","R54321Z"],
            ["574222113","R54321Z"],
            ["574238034","R54321Z"],
            ["574238038","R54321Z"],
            ["574238215","R54321Z"],
            ["574238217","R54321Z"],
            ["574238234","R54321Z"],
            ["574238235","R54321Z"],
            ["574238236","R54321Z"],
            ["574238237","R54321Z"],
            ["574252030","R54321Z"],
            ["574522423","R54321Z"],
            ["574543169","R54321Z"],
            ["574552423","R54321Z"],
            ["574555649","R54321Z"],
            ["574555680","R54321Z"],
            ["574555706","R54321Z"],
            ["574555717","R54321Z"],
            ["574559302","R54321Z"],
            ["574576597","R54321Z"],
            ["574576605","R54321Z"],
            ["574576734","R54321Z"],
            ["574601393","R54321Z"],
            ["574601471","R54321Z"],
            ["574604172","R54321Z"],
            ["574604173","R54321Z"],
            ["574604175","R54321Z"],
            ["574604316","R54321Z"],
            ["574604318","R54321Z"],
            ["574604322","R54321Z"],
            ["574604324","R54321Z"],
            ["574604327","R54321Z"],
            ["574604329","R54321Z"],
            ["574607021","R54321Z"],
            ["574623403","R54321Z"],
            ["574623447","R54321Z"],
            ["574623467","R54321Z"],
            ["574623472","R54321Z"],
            ["574638143","R54321Z"],
            ["574638147","R54321Z"],
            ["574638160","R54321Z"],
            ["574641470","R54321Z"],
            ["574641473","R54321Z"],
            ["574641535","R54321Z"],
            ["574641543","R54321Z"],
            ["574641548","R54321Z"],
            ["574939790","R54321Z"],
            ["574939915","R54321Z"],
            ["574939931","R54321Z"],
            ["574939954","R54321Z"],
            ["574939958","R54321Z"],
            ["574940262","R54321Z"],
            ["574940273","R54321Z"],
            ["574960430","R54321Z"],
            ["574960432","R54321Z"],
            ["574960435","R54321Z"],
            ["574960438","R54321Z"],
            ["574976516","R54321Z"],
            ["574976553","R54321Z"],
            ["574976555","R54321Z"],
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
            ["760008520","R54321Z"],
            ["760017804","R54321Z"],
            ["760017807","R54321Z"],
            ["760019171","R54321Z"],
            ["760019369","R54321Z"],
            ["760020871","R54321Z"],
            ["760027462","R54321Z"],
            ["760027536","R54321Z"],
            ["760037223","R54321Z"],
            ["760037324","R54321Z"],
            ["760074987","R54321Z"],
            ["760160765","R54321Z"],
            ["760177351","R54321Z"],
            ["760195399","R54321Z"],
            ["760266305","R54321Z"],
            ["760457548","R54321Z"],
            ["760656973","R54321Z"],
            ["760657394","R54321Z"],
            ["760657467","R54321Z"],
            ["760657486","R54321Z"],
            ["760657528","R54321Z"],
            ["760657534","R54321Z"],
            ["760657740","R54321Z"],
            ["760657882","R54321Z"],
            ["760657895","R54321Z"],
            ["760658096","R54321Z"],
            ["760658232","R54321Z"],
            ["760659173","R54321Z"],
            ["760659593","R54321Z"],
            ["760659860","R54321Z"],
            ["760659969","R54321Z"],
            ["760659984","R54321Z"],
            ["760660103","R54321Z"],
            ["760660319","R54321Z"],
            ["760660499","R54321Z"],
            ["760661497","R54321Z"],
            ["760662239","R54321Z"],
            ["760662878","R54321Z"],
            ["760663884","R54321Z"],
            ["760664231","R54321Z"],
            ["760664269","R54321Z"],
            ["760664592","R54321Z"],
            ["760665924","R54321Z"],
            ["760667148","R54321Z"],
            ["760667192","R54321Z"],
            ["760667514","R54321Z"],
            ["760674231","R54321Z"],
            ["760706164","R54321Z"],
            ["760786373","R54321Z"],
            ["760925766","R54321Z"],
            ["761796281","R54321Z"],
            ["761892845","R54321Z"],
            ["762007347","R54321Z"],
            ["762063486","R54321Z"],
            ["762074840","R54321Z"],
            ["762129809","R54321Z"],
            ["762141092","R54321Z"],
            ["762145187","R54321Z"],
            ["762151365","R54321Z"],
            ["762161544","R54321Z"],
            ["762169222","R54321Z"],
            ["762169977","R54321Z"],
            ["762171584","R54321Z"],
            ["762174681","R54321Z"],
            ["762178046","R54321Z"],
            ["762184757","R54321Z"],
            ["762189866","R54321Z"],
            ["762192490","R54321Z"],
            ["762195449","R54321Z"],
            ["762211416","R54321Z"],
            ["762231722","R54321Z"],
            ["762252702","R54321Z"],
            ["762326391","R54321Z"],
            ["762482882","R54321Z"],
            ["762482887","R54321Z"],
            ["762483133","R54321Z"],
            ["762483160","R54321Z"],
            ["762483161","R54321Z"],
            ["762483226","R54321Z"],
            ["762483249","R54321Z"],
            ["762483440","R54321Z"],
            ["762483446","R54321Z"],
            ["762483510","R54321Z"],
            ["762483593","R54321Z"],
            ["762483836","R54321Z"],
            ["762483842","R54321Z"],
            ["762483933","R54321Z"],
            ["762484350","R54321Z"],
            ["762484481","R54321Z"],
            ["762484506","R54321Z"],
            ["762484532","R54321Z"],
            ["762484535","R54321Z"],
            ["762484538","R54321Z"],
            ["762484544","R54321Z"],
            ["762484670","R54321Z"],
            ["762578180","R54321Z"],
            ["762680063","R54321Z"],
            ["762689437","R54321Z"],
            ["763066527","R54321Z"],
            ["763131867","R54321Z"],
            ["763138332","R54321Z"],
            ["763145338","R54321Z"],
            ["763147163","R54321Z"],
            ["763154094","R54321Z"],
            ["763169829","R54321Z"],
            ["763185490","R54321Z"],
            ["763185516","R54321Z"],
            ["763190212","R54321Z"],
            ["763190273","R54321Z"],
            ["763194150","R54321Z"],
            ["763207608","R54321Z"],
            ["763233600","R54321Z"],
            ["763434634","R54321Z"],
            ["763525617","R54321Z"],
            ["763677963","R54321Z"],
            ["763779197","R54321Z"],
            ["763796091","R54321Z"],
            ["764112407","R54321Z"],
            ["764264631","R54321Z"],
            ["764281301","R54321Z"],
            ["764287793","R54321Z"],
            ["764315103","R54321Z"],
            ["764353412","R54321Z"],
            ["764358907","R54321Z"],
            ["764374600","R54321Z"],
            ["764464883","R54321Z"],
            ["764612871","R54321Z"],
            ["764616802","R54321Z"],
            ["764641888","R54321Z"],
            ["764643223","R54321Z"],
            ["764646883","R54321Z"],
            ["764647719","R54321Z"],
            ["764748154","R54321Z"],
            ["764764653","R54321Z"],
            ["764798266","R54321Z"],
            ["764834244","R54321Z"],
            ["764834484","R54321Z"],
            ["764884784","R54321Z"],
            ["764884969","R54321Z"],
            ["764893496","R54321Z"],
            ["764894585","R54321Z"],
            ["764943156","R54321Z"],
            ["764952884","R54321Z"],
            ["764959540","R54321Z"],
            ["764961915","R54321Z"],
            ["765014985","R54321Z"],
            ["765541540","R54321Z"],
            ["765650610","R54321Z"],
            ["765801758","R54321Z"],
            ["765884396","R54321Z"],
            ["766254071","R54321Z"],
            ["766254179","R54321Z"],
            ["766254407","R54321Z"],
            ["766254434","R54321Z"],
            ["766254492","R54321Z"],
            ["766254520","R54321Z"],
            ["766254865","R54321Z"],
            ["766254916","R54321Z"],
            ["766254928","R54321Z"],
            ["766254960","R54321Z"],
            ["766315565","R54321Z"],
            ["766371430","R54321Z"],
            ["766843595","R54321Z"],
            ["766962275","R54321Z"],
            ["767043412","R54321Z"],
            ["767069228","R54321Z"],
            ["767713636","R54321Z"],
            ["768267124","R54321Z"],
            ["768286318","R54321Z"],
            ["768355864","R54321Z"],
            ["768659928","R54321Z"],
            ["768998482","R54321Z"],
            ["768998782","R54321Z"],
            ["769193788","R54321Z"],
            ["769649561","R54321Z"],
            ["769716107","R54321Z"],
            ["769754565","R54321Z"],
            ["770105510","R54321Z"],
            ["770942244","R54321Z"],
            ["770951404","R54321Z"],
            ["771159984","R54321Z"],
            ["771952763","R54321Z"],
            ["771954572","R54321Z"],
            ["771954658","R54321Z"],
            ["771956959","R54321Z"],
            ["771994157","R54321Z"],
            ["777263261","R54321Z"],
            ["778220827","R54321Z"],
            ["778227919","R54321Z"],
            ["778228223","R54321Z"],
            ["778237631","R54321Z"],
            ["778237633","R54321Z"],
            ["778301584","R54321Z"],
            ["778301604","R54321Z"],
            ["779171327","R54321Z"],
            ["779171390","R54321Z"],
            ["779171438","R54321Z"],
            ["953583621","R54321Z"],
            ["953583623","R54321Z"],
            ["953584706","R54321Z"],
            ["953658753","R54321Z"],
            ["953659386","R54321Z"],
            ["953690649","R54321Z"],
            ["955216051","R54321Z"],
            ["956207230","R54321Z"],
            ["960258667","R54321Z"],
            ["960293652","R54321Z"],
            ["960674231","R54321Z"],
            ["960981870","R54321Z"],
            ["961153918","R54321Z"],
            ["961250238","R54321Z"],
            ["961341025","R54321Z"],
            ["961698321","R54321Z"],
            ["961883854","R54321Z"],
            ["962068151","R54321Z"],
            ["962206748","R54321Z"],
            ["962372176","R54321Z"],
            ["962386121","R54321Z"],
            ["962584596","R54321Z"],
            ["962871032","R54321Z"],
            ["962873158","R54321Z"],
            ["962878301","R54321Z"],
            ["962946692","R54321Z"],
            ["963121772","R54321Z"],
            ["963160727","R54321Z"],
            ["963170043","R54321Z"],
            ["963191154","R54321Z"],
            ["963193039","R54321Z"],
            ["963528239","R54321Z"],
            ["963544898","R54321Z"],
            ["963609665","R54321Z"],
            ["963629888","R54321Z"],
            ["963694417","R54321Z"],
            ["963708556","R54321Z"],
            ["963717220","R54321Z"],
            ["963801205","R54321Z"],
            ["963841384","R54321Z"],
            ["963876371","R54321Z"],
            ["964158220","R54321Z"],
            ["964216728","R54321Z"],
            ["964218931","R54321Z"],
            ["964305408","R54321Z"],
            ["964367610","R54321Z"],
            ["964548395","R54321Z"],
            ["964548910","R54321Z"],
            ["964577765","R54321Z"],
            ["964597345","R54321Z"],
            ["964689702","R54321Z"],
            ["964819491","R54321Z"],
            ["964834027","R54321Z"],
            ["964918640","R54321Z"],
            ["965185421","R54321Z"],
            ["965563794","R54321Z"],
            ["965606200","R54321Z"],
            ["965650610","R54321Z"],
            ["965699297","R54321Z"],
            ["965946856","R54321Z"],
            ["965979179","R54321Z"],
            ["966081954","R54321Z"],
            ["966135238","R54321Z"],
            ["966318836","R54321Z"],
            ["966506432","R54321Z"],
            ["966652119","R54321Z"],
            ["966856823","R54321Z"],
            ["967112315","R54321Z"],
            ["967429152","R54321Z"],
            ["967450294","R54321Z"],
            ["967554565","R54321Z"],
            ["967758637","R54321Z"],
            ["967993144","R54321Z"],
            ["968019430","R54321Z"],
            ["968047294","R54321Z"],
            ["968103661","R54321Z"],
            ["968154969","R54321Z"],
            ["968249428","R54321Z"],
            ["968274817","R54321Z"],
            ["968305495","R54321Z"],
            ["968418911","R54321Z"],
            ["968436080","R54321Z"],
            ["968437139","R54321Z"],
            ["968527450","R54321Z"],
            ["968607946","R54321Z"],
            ["968755729","R54321Z"],
            ["968912910","R54321Z"],
            ["968913044","R54321Z"],
            ["968919845","R54321Z"],
            ["968990951","R54321Z"],
            ["969017761","R54321Z"],
            ["969024404","R54321Z"],
            ["969058463","R54321Z"],
            ["969179357","R54321Z"],
            ["969193788","R54321Z"],
            ["969308398","R54321Z"],
            ["969385082","R54321Z"],
            ["969481098","R54321Z"],
            ["969486004","R54321Z"],
            ["969526174","R54321Z"],
            ["969544410","R54321Z"],
            ["969597132","R54321Z"],
            ["969729415","R54321Z"],
            ["969757291","R54321Z"],
            ["969980372","R54321Z"],
            ["973823738","R54321Z"],
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
}

async function addAccount(phone, password) {
    await pool.query(
        `INSERT INTO accounts (phone, password, status) VALUES ($1, $2, 'FREE')`,
        [phone, password]
    );
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

module.exports = {
    pool,
    initDB,
    getAccounts,
    getAccountByTabId,
    claimFreeAccount,
    reLoginForTab,
    updateAccount,
    addAccount,
    removeAccount,
    resetAllAccounts,
    getBadPasswordAccounts,
    addBadPasswordAccount,
    removeBadPasswordAccount,
    TWENTY_FOUR_HOURS_MS,
    FREE_ACCOUNT_LOCK_THRESHOLD,
    LOW_ACCOUNT_LOCK_HOUR,
    LOW_ACCOUNT_LOCK_MINUTE,
    REMOVE_PASSWORD,
    HEARTBEAT_TIMEOUT_MS,
    IN_USE_TIMEOUT_MS,
};
