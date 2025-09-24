import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Sign up function
export const signUpUser = async (email, password, userData) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save additional user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: userData.name,
      phone: userData.phone,
      location: userData.location,
      userType: userData.userType,
      // Store user-type specific data
      ...(userData.userType === 'citizen' && {
        emergencyContact: userData.emergencyContact,
        medicalInfo: userData.medicalInfo
      }),
      ...(userData.userType === 'authority' && {
        department: userData.department,
        designation: userData.designation,
        employeeId: userData.employeeId,
        jurisdiction: userData.jurisdiction
      }),
      ...(userData.userType === 'volunteer' && {
        skills: userData.skills,
        availability: userData.availability,
        experience: userData.experience
      }),
      ...(userData.userType === 'ngo' && {
        organizationName: userData.organizationName,
        registrationNumber: userData.registrationNumber,
        organizationType: userData.organizationType,
        workAreas: userData.workAreas
      }),
      createdAt: new Date().toISOString(),
      isActive: true
    });
    
    return {
      uid: user.uid,
      email: user.email,
      ...userData
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      return {
        uid: user.uid,
        email: user.email,
        ...userDoc.data()
      };
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get current user data
export const getCurrentUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Auth state observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};