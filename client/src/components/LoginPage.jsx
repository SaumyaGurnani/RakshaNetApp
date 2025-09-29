import React, { useState } from "react";
import { Globe, Shield, Building2, Users, Eye, EyeOff } from "lucide-react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config"; // Adjust path as needed

export default function LoginPage({ onLogin }) {
  const [isHindi, setIsHindi] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
    location: '',
    // Citizen specific
    emergencyContact: '',
    medicalInfo: '',
    // Authority specific
    department: '',
    designation: '',
    employeeId: '',
    jurisdiction: '',
    /* // Volunteer specific - Commented out
    skills: '',
    availability: '',
    experience: '',
    */
    /* // NGO specific - Commented out
    organizationName: '',
    registrationNumber: '',
    organizationType: '',
    workAreas: ''
    */
  });

  const content = {
    english: {
      title: "RakshaNet",
      subtitle: "National Disaster Management System",
      loginTitle: "Login / Sign Up",
      signupTitle: "Register for New Account",
      userTypes: {
        citizen: "Citizen",
        authority: "Authority",
        // volunteer: "Volunteer",
        // ngo: "NGO"
      },
      fields: {
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        name: "Name",
        phone: "Contact Number",
        address: "Address",
        location: "Location (State, District, City)",
        emergencyContact: "Emergency Contact",
        medicalInfo: "Medical Information",
        department: "Department",
        designation: "Designation",
        employeeId: "Employee ID",
        jurisdiction: "Jurisdiction Area",
      },
      buttons: {
        login: "Login",
        signup: "Register",
        socialLogin: "Sign in with Google",
        forgotPassword: "Forgot Password?",
        termsAndConditions: "Terms and Conditions"
      },
      placeholders: {
        email: "Enter your email",
        password: "Enter your password",
        confirmPassword: "Confirm your password",
        name: "Enter your full name",
        phone: "Enter your contact number",
        address: "Enter your address",
        location: "State, District, City",
        emergencyContact: "Emergency contact number",
        medicalInfo: "Any medical conditions",
        department: "Your department",
        designation: "Your designation",
        employeeId: "Your employee ID",
        jurisdiction: "Your jurisdiction area",
      },
      characterCount: "characters remaining",
      errors: {
        passwordMismatch: "Passwords don't match",
        requiredFields: "Please fill all required fields",
        loginError: "Invalid email or password",
        registrationError: "Registration failed",
        googleSignInError: "Google Sign-In failed. Please try again."
      }
    },
    hindi: {
      title: "रक्षाNet",
      subtitle: "राष्ट्रीय आपदा प्रबंधन प्रणाली",
      loginTitle: "लॉगिन / साइन अप",
      signupTitle: "नए खाते लिए पंजीकरण करें",
      userTypes: {
        citizen: "नागरिक / Citizen",
        authority: "प्राधिकरण / Authority",
        // volunteer: "स्वयंसेवक / Volunteer",
        // ngo: "गैरसरकारी संगठन / NGO"
      },
      fields: {
        email: "ईमेल",
        password: "पासवर्ड",
        confirmPassword: "पासवर्ड की पुष्टि करें",
        name: "नाम",
        phone: "संपर्क Contact Number",
        address: "पता",
        location: "स्थान (राज्य, जिला, शहर)",
        emergencyContact: "आपातकालीन संपर्क",
        medicalInfo: "चिकित्सा जानकारी",
        department: "विभाग",
        designation: "पदनाम",
        employeeId: "कर्मचारी ID",
        jurisdiction: "क्षेत्राधिकार क्षेत्र",
      },
      buttons: {
        login: "लॉगिन",
        signup: "पंजीकरण करें",
        socialLogin: "Google से साइन इन करें",
        forgotPassword: "पासवर्ड भूल गए?",
        termsAndConditions: "नियम और शर्तें संदेश"
      },
      placeholders: {
        email: "अपना ईमेल दर्ज करें",
        password: "अपना पासवर्ड दर्ज करें",
        confirmPassword: "पासवर्ड की पुष्टि करें",
        name: "अपना पूरा नाम दर्ज करें",
        phone: "अपना संपर्क नंबर दर्ज करें",
        address: "अपना पता दर्ज करें",
        location: "राज्य, जिला, शहर",
        emergencyContact: "आपातकालीन संपर्क नंबर",
        medicalInfo: "कोई चिकित्सा स्थिति",
        department: "आपका विभाग",
        designation: "आपका पदनाम",
        employeeId: "आपकी कर्मचारी ID",
        jurisdiction: "आपका क्षेत्राधिकार क्षेत्र",
      },
      characterCount: "अक्षर शेष",
      errors: {
        passwordMismatch: "पासवर्ड मेल नहीं खाते",
        requiredFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
        loginError: "ईमेल या पासवर्ड गलत है",
        registrationError: "पंजीकरण असफल",
        googleSignInError: "Google साइन-इन विफल रहा। कृपया पुनः प्रयास करें।"
      }
    }
  };

  const current = isHindi ? content.hindi : content.english;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Firebase Login Handler
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError(current.errors.requiredFields);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      let userData;
      if (userDoc.exists()) {
        userData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          ...userDoc.data()
        };
      } else {
        // Fallback if user exists in Auth but not Firestore
        userData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.email,
          userType: 'citizen' 
        };
      }

      onLogin(userData);
      
    } catch (err) {
      console.error("Login error:", err);
      setError(current.errors.loginError);
    } finally {
      setLoading(false);
    }
  };

  // Firebase Registration Handler
  const handleRegister = async () => {
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError(current.errors.passwordMismatch);
      setLoading(false);
      return;
    }

    if (!formData.email || !formData.password || !formData.name) {
      setError(current.errors.requiredFields);
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        location: formData.location,
        userType: userType,
        createdAt: new Date().toISOString(),
        isActive: true,
        photoURL: '',
        ...(userType === 'citizen' && {
          emergencyContact: formData.emergencyContact,
          medicalInfo: formData.medicalInfo
        }),
        ...(userType === 'authority' && {
          department: formData.department,
          designation: formData.designation,
          employeeId: formData.employeeId,
          jurisdiction: formData.jurisdiction
        }),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      onLogin(userData);

    } catch (err) {
      console.error("Registration error:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError(current.errors.registrationError + ': ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Firebase Google Social Login Handler
  const handleSocialLogin = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        let userData;

        if (userDoc.exists()) {
            // User already exists, just log them in
            userData = {
                uid: user.uid,
                ...userDoc.data()
            };
        } else {
            // New user, create a document for them in Firestore
            userData = {
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                phone: user.phoneNumber || '',
                address: '',
                location: '',
                userType: 'citizen', // Default to 'citizen' for social sign-ups
                createdAt: new Date().toISOString(),
                isActive: true,
            };
            await setDoc(userDocRef, userData);
        }
        
        onLogin(userData);

    } catch (err) {
        console.error("Google Sign-In error:", err);
        setError(current.errors.googleSignInError);
    } finally {
        setLoading(false);
    }
  };


  const handleSubmit = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const getUserTypeIcon = (type) => {
    switch(type) {
      case 'citizen': return <Users className="h-5 w-5" />;
      case 'authority': return <Building2 className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  const getUserTypeColor = (type) => {
    switch(type) {
      case 'citizen': return 'bg-blue-600 hover:bg-blue-700';
      case 'authority': return 'bg-green-700 hover:bg-green-800';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  const renderUserTypeSpecificFields = () => {
    switch(userType) {
      case 'citizen':
        return (
          <>
            <input
              type="tel"
              placeholder={current.placeholders.emergencyContact}
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="relative">
              <textarea
                placeholder={current.placeholders.medicalInfo}
                value={formData.medicalInfo}
                onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                maxLength={600}
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {600 - formData.medicalInfo.length} {current.characterCount}
              </div>
            </div>
          </>
        );
      case 'authority':
        return (
          <>
            <input
              type="text"
              placeholder={current.placeholders.department}
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder={current.placeholders.designation}
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder={current.placeholders.employeeId}
              value={formData.employeeId}
              onChange={(e) => handleInputChange('employeeId', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder={current.placeholders.jurisdiction}
              value={formData.jurisdiction}
              onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <img src="/indian-emblem.png" alt="Indian Emblem" className="h-16" onError={(e) => e.target.style.display = 'none'} />
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 bg-orange-500"></div>
              <div className="w-8 h-1 bg-white border border-gray-300"></div>
              <div className="w-6 h-1 bg-green-600"></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold flex items-center gap-4">
              <img src="/government-logo.png" alt="Government Logo" className="h-12" onError={(e) => e.target.style.display = 'none'} />
              <div className="flex items-center gap-2">
                <span className="text-orange-600">रक्षानेत</span>
                <span className="text-gray-600">-</span>
                <span className="text-blue-700">RakshaNet</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHindi(!isHindi)}
              className="flex items-center gap-2 px-3 py-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 transition-colors"
            >
              <Globe className="h-4 w-4" />
              {isHindi ? "English" : "हिंदी"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded shadow-lg w-full max-w-5xl flex overflow-hidden border border-gray-200">
          {/* Left Side - Login */}
          <div className="w-1/2 p-8 border-r border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {current.loginTitle}
            </h2>

            <div className="space-y-3 mb-6">
              {Object.entries(current.userTypes).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setUserType(key)}
                  className={`w-full flex items-center gap-3 p-4 rounded text-white font-medium transition-all ${getUserTypeColor(key)}`}
                >
                  {getUserTypeIcon(key)}
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder={current.placeholders.email}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={current.placeholders.password}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="text-right">
                <button className="text-sm text-blue-700 hover:text-blue-800 hover:underline">
                  {current.buttons.forgotPassword}
                </button>
              </div>

              <button
                onClick={() => {
                  setIsLogin(true);
                  handleSubmit();
                }}
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded transition-colors disabled:opacity-50"
              >
                {loading && isLogin ? (isHindi ? "लॉग इन हो रहा है..." : "Logging in...") : current.buttons.login}
              </button>

              <button 
                onClick={handleSocialLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-3 px-4 rounded transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {loading ? (isHindi ? "प्रतीक्षा करें..." : "Please wait...") : current.buttons.socialLogin}
              </button>
            </div>
          </div>

          {/* Right Side - Registration */}
          <div className="w-1/2 bg-gray-50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {current.signupTitle}
            </h2>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isHindi ? "उपयोगकर्ता प्रकार चुनें" : "Select User Type"}
                </label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Object.entries(current.userTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                placeholder={current.placeholders.name}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="tel"
                placeholder={current.placeholders.phone}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="text"
                placeholder={current.placeholders.location}
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="email"
                placeholder={current.placeholders.email}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={current.placeholders.password}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-12"
                />
                                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={current.placeholders.confirmPassword}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {renderUserTypeSpecificFields()}

              <button
                onClick={() => {
                  setIsLogin(false);
                  handleSubmit();
                }}
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded transition-colors disabled:opacity-50"
              >
                {loading && !isLogin ? (isHindi ? "पंजीकरण हो रहा है..." : "Registering...") : current.buttons.signup}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}