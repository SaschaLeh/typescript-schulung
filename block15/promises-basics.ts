/**
 * Promises Basics
 *
 * Demonstrates how to create, chain, and combine Promises in TypeScript.
 */

// ============================================================
// 1. Creating a Promise manually
// ============================================================

// A Promise wraps an asynchronous operation.
// The executor receives resolve (success) and reject (failure).
function fetchGreeting(name: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (name.trim().length === 0) {
        reject(new Error("Name darf nicht leer sein"));
      } else {
        resolve(`Hallo, ${name}!`);
      }
    }, 500);
  });
}

// ============================================================
// 2. Chaining with .then() / .catch() / .finally()
// ============================================================

// Each .then() returns a new Promise, so calls can be chained.
fetchGreeting("TypeScript")
  .then((message) => {
    console.log("Greeting:", message);
    return message.toUpperCase();
  })
  .then((upper) => {
    console.log("Uppercase:", upper);
  })
  .catch((error: Error) => {
    console.error("Fehler:", error.message);
  })
  .finally(() => {
    console.log("Promise abgeschlossen (finally)\n");
  });

// ============================================================
// 3. Simulated API calls
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
      ]);
    }, 200);
  });
}

// Chaining dependent calls: User laden, dann Posts laden
fetchUser(1)
  .then((user) => {
    console.log("User gefunden:", user.name);
    return fetchPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts.map((p) => p.title).join(", "));
  })
  .catch((err: Error) => {
    console.error("API-Fehler:", err.message);
  });

// ============================================================
// 4. Promise.all() — alle parallel, alle müssen erfolgreich sein
// ============================================================

const userPromises = [fetchUser(1), fetchUser(2), fetchUser(3)];

Promise.all(userPromises)
  .then((users) => {
    console.log(
      "\nPromise.all — Alle User:",
      users.map((u) => u.name)
    );
  })
  .catch((err: Error) => {
    console.error("Mindestens ein Request fehlgeschlagen:", err.message);
  });

// ============================================================
// 5. Promise.race() — das schnellste Ergebnis gewinnt
// ============================================================

function delayedValue<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

Promise.race([
  delayedValue("langsam", 500),
  delayedValue("schnell", 100),
  delayedValue("mittel", 300),
]).then((winner) => {
  console.log("\nPromise.race — Gewinner:", winner); // "schnell"
});

// ============================================================
// 6. Promise.allSettled() — alle abwarten, egal ob Erfolg oder Fehler
// ============================================================

Promise.allSettled([
  fetchUser(1),
  fetchUser(-1), // wird rejecten
  fetchUser(3),
]).then((results) => {
  console.log("\nPromise.allSettled — Ergebnisse:");
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`  [${index}] Erfolgreich: ${result.value.name}`);
    } else {
      console.log(`  [${index}] Fehlgeschlagen: ${result.reason.message}`);
    }
  });
});

export { User, Post, fetchUser, fetchPosts, delayedValue };
