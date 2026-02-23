/**
 * Async/Await
 *
 * Demonstrates how async/await simplifies Promise-based code.
 * Same simulated APIs as promises-basics.ts, rewritten with async/await.
 */

// ============================================================
// Simulated API helpers (same delay pattern as promises-basics.ts)
// ============================================================

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error(`User mit ID ${id} nicht gefunden`));
        return;
      }
      resolve({ id, name: `User_${id}`, email: `user${id}@example.com` });
    }, 300);
  });
}

function fetchPosts(userId: number): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, userId, title: "Erster Beitrag" },
        { id: 2, userId, title: "Zweiter Beitrag" },
        { id: 3, userId, title: "Dritter Beitrag" },
      ]);
    }, 200);
  });
}

// ============================================================
// 1. Vorher/Nachher: .then()-Kette vs async/await
// ============================================================

// --- .then()-Version (aus promises-basics.ts) ---
function getUserPostsThen(userId: number): void {
  fetchUser(userId)
    .then((user) => {
      console.log("[then] User:", user.name);
      return fetchPosts(user.id);
    })
    .then((posts) => {
      console.log("[then] Posts:", posts.map((p) => p.title).join(", "));
    })
    .catch((err: Error) => {
      console.error("[then] Fehler:", err.message);
    });
}

// --- async/await-Version (gleiche Logik, lesbarer) ---
async function getUserPostsAsync(userId: number): Promise<void> {
  try {
    const user = await fetchUser(userId);
    console.log("[async] User:", user.name);

    const posts = await fetchPosts(user.id);
    console.log("[async] Posts:", posts.map((p) => p.title).join(", "));
  } catch (error) {
    const err = error as Error;
    console.error("[async] Fehler:", err.message);
  }
}

// ============================================================
// 2. Error Handling mit try/catch
// ============================================================

async function safeGetUser(id: number): Promise<User | null> {
  try {
    const user = await fetchUser(id);
    return user;
  } catch (error) {
    const err = error as Error;
    console.error(`Konnte User ${id} nicht laden: ${err.message}`);
    return null;
  }
}

// ============================================================
// 3. Parallele Ausführung mit Promise.all() + await
// ============================================================

// FALSCH: Sequentiell — jeder Call wartet auf den vorherigen
async function loadUsersSequential(): Promise<User[]> {
  console.log("\n--- Sequentiell (langsam) ---");
  const start = Date.now();

  const user1 = await fetchUser(1); // wartet 300ms
  const user2 = await fetchUser(2); // wartet nochmal 300ms
  const user3 = await fetchUser(3); // wartet nochmal 300ms

  console.log(`Dauer: ~${Date.now() - start}ms (3x sequentiell)`);
  return [user1, user2, user3];
}

// RICHTIG: Parallel — alle Calls gleichzeitig starten
async function loadUsersParallel(): Promise<User[]> {
  console.log("\n--- Parallel (schnell) ---");
  const start = Date.now();

  const [user1, user2, user3] = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3),
  ]);

  console.log(`Dauer: ~${Date.now() - start}ms (parallel)`);
  return [user1, user2, user3];
}

// ============================================================
// 4. Async/Await mit Promise.allSettled()
// ============================================================

async function loadUsersRobust(): Promise<void> {
  console.log("\n--- Robust mit allSettled ---");

  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(-1), // wird fehlschlagen
    fetchUser(3),
  ]);

  const successful: User[] = [];
  const failed: string[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      successful.push(result.value);
    } else {
      failed.push(result.reason.message);
    }
  }

  console.log("Erfolgreich:", successful.map((u) => u.name));
  console.log("Fehlgeschlagen:", failed);
}

// ============================================================
// Demo ausführen
// ============================================================

async function main(): Promise<void> {
  console.log("=== Vorher/Nachher Vergleich ===\n");

  getUserPostsThen(1);
  await getUserPostsAsync(2);

  console.log("\n=== Safe Get User ===");
  const user = await safeGetUser(1);
  console.log("Geladener User:", user);

  const missing = await safeGetUser(-1);
  console.log("Fehlender User:", missing);

  console.log("\n=== Sequentiell vs Parallel ===");
  const seqUsers = await loadUsersSequential();
  console.log("Sequentiell geladen:", seqUsers.map((u) => u.name));

  const parUsers = await loadUsersParallel();
  console.log("Parallel geladen:", parUsers.map((u) => u.name));

  await loadUsersRobust();
}

main();

export { fetchUser, fetchPosts };
