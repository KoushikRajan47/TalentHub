import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const signupBtn = document.getElementById("signup-btn");
const signinBtn = document.getElementById("signin-btn");
const logoutBtn = document.getElementById("logout-btn");
const saveProfileBtn = document.getElementById("save-profile");

const authSection = document.getElementById("auth-section");
const profileSection = document.getElementById("profile-section");
const browseSection = document.getElementById("browse-section");
const talentList = document.getElementById("talent-list");

signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
  } catch (error) {
    alert(error.message);
  }
});

signinBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in successfully!");
  } catch (error) {
    alert(error.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  alert("Logged out successfully!");
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    browseSection.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    loadTalents();
  } else {
    authSection.classList.remove("hidden");
    profileSection.classList.add("hidden");
    browseSection.classList.add("hidden");
    logoutBtn.classList.add("hidden");
  }
});

if (saveProfileBtn) {
  saveProfileBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const skill = document.getElementById("skill").value.trim();
    const bio = document.getElementById("bio").value.trim();

    if (!name || !skill || !bio) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await addDoc(collection(db, "talents"), { name, skill, bio });
      alert("Profile saved successfully!");
      loadTalents();
    } catch (error) {
      alert(error.message);
    }
  });
}

async function loadTalents() {
  talentList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "talents"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className =
      "bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1";
    card.innerHTML = `
      <h3 class="text-xl font-semibold text-blue-800">${data.name}</h3>
      <p class="text-gray-600 font-medium mb-2">${data.skill}</p>
      <p class="text-gray-700">${data.bio}</p>
    `;
    talentList.appendChild(card);
  });
}
