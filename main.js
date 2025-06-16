import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDdr0fxnYpfeG2b6GlTQ_-4TqpmGk2uvOk",
  authDomain: "insan-cemerlang-80713.firebaseapp.com",
  projectId: "insan-cemerlang-80713",
  storageBucket: "insan-cemerlang-80713.appspot.com",
  messagingSenderId: "1016858047753",
  appId: "1:1016858047753:web:0534dda2085c2adab68fd8",
  measurementId: "G-E7G0K9XTCD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection reference
const absensiCollection = collection(db, "absensi");

// Function to get all attendance records
export async function ambilDaftarAbsensi() {
  try {
    const q = query(absensiCollection, orderBy("tanggal", "desc"), orderBy("nama"));
    const querySnapshot = await getDocs(q);
    
    const attendanceList = [];
    querySnapshot.forEach((doc) => {
      attendanceList.push({
        id: doc.id,
        tanggal: doc.data().tanggal,
        nis: doc.data().nis,
        nama: doc.data().nama,
        alamat: doc.data().alamat,
        notlpn: doc.data().notlpn,
        kelas: doc.data().kelas,
        keterangan: doc.data().keterangan
      });
    });
    
    return attendanceList;
  } catch (error) {
    console.error("Error getting attendance data: ", error);
    return [];
  }
}

// Function to get single attendance record by ID
export async function ambilAbsensiById(id) {
  try {
    const docRef = doc(db, "absensi", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting attendance record: ", error);
    return null;
  }
}

// Function to add new attendance record
export async function tambahAbsensi(data) {
  try {
    const docRef = await addDoc(absensiCollection, {
      tanggal: data.tanggal,
      nis: data.nis,
      nama: data.nama,
      alamat: data.alamat,
      notlpn: data.notlpn,
      kelas: data.kelas,
      keterangan: data.keterangan,
      createdAt: new Date().toISOString()
    });
    
    console.log("Attendance record added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding attendance record: ", error);
    throw error;
  }
}

// Function to update attendance record
export async function ubahAbsensi(data)
