import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import { API_URL } from '../constants/config';

const StyledLinearGradient = styled(LinearGradient);

const LoginScreen = ({ navigation }) => {
    // Mode toggles
    const [appRole, setAppRole] = useState('citizen'); // 'citizen' or 'observer'
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [observerRole, setObserverRole] = useState('general'); // 'general' or 'expenditure'
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        username: '', // For observer
        email: '',
        password: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleCitizenSubmit = async () => {
        setLoading(true);
        const endpoint = isLoginMode ? '/api/voter/login' : '/api/voter/signup';
        const url = (API_URL || 'http://localhost:5000') + endpoint;

        try {
            const payload = isLoginMode
                ? { mobile: formData.phone, password: formData.password }
                : { name: formData.fullName, mobile: formData.phone, email: formData.email, password: formData.password };

            const req = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const res = await req.json();

            if (req.ok && res.success) {
                if (!isLoginMode) {
                    Alert.alert("Success", "Registration successful. Please login.");
                    setIsLoginMode(true);
                    setLoading(false);
                    return;
                }

                // Navigate to dashboard automatically on successful login
                navigation.replace('Dashboard', {
                    user: { name: res.user?.name || 'Citizen', ...res.user, appRole: 'citizen' }
                });
            } else {
                Alert.alert("Error", res.error || "Authentication failed");
            }
        } catch (e) {
            Alert.alert("Network Error", "Unable to connect to server.");
        }
        setLoading(false);
    };

    const handleObserverSubmit = async () => {
        setLoading(true);
        const url = (API_URL || 'http://localhost:5000') + '/api/observer/login';

        try {
            const payload = {
                username: formData.username,
                password: formData.password,
                role: observerRole // general or expenditure
            };

            const req = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const res = await req.json();

            if (req.ok && res.success) {
                navigation.replace('Dashboard', {
                    user: {
                        name: res.observer.full_name || res.observer.username,
                        ...res.observer,
                        appRole: 'observer'
                    }
                });
            } else {
                Alert.alert("Error", res.error || "Authentication failed");
            }
        } catch (e) {
            Alert.alert("Network Error", "Unable to connect to server.");
        }
        setLoading(false);
    };

    const handleSubmit = () => {
        // Validation
        if (appRole === 'citizen') {
            if (isLoginMode) {
                if (!formData.phone || !formData.password) return Alert.alert('Error', 'Mobile and Password required');
            } else {
                if (!formData.fullName || !formData.phone || !formData.email || !formData.password)
                    return Alert.alert('Error', 'All fields required');
            }
            handleCitizenSubmit();
        } else {
            if (!formData.username || !formData.password) return Alert.alert('Error', 'Username and Password required');
            handleObserverSubmit();
        }
    };

    const toggleCitizenMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center p-6 bg-slate-50">

                    {/* Role Toggle Tabs */}
                    <View className="flex-row bg-slate-200 rounded-2xl p-1 mb-6 mt-10 shadow-sm border border-slate-300">
                        <TouchableOpacity
                            onPress={() => { setAppRole('citizen'); setIsLoginMode(true); }}
                            className={`flex-1 py-3 items-center rounded-xl ${appRole === 'citizen' ? 'bg-white border border-slate-100' : ''}`}
                        >
                            <Text className={`font-bold ${appRole === 'citizen' ? 'text-blue-600' : 'text-slate-500'}`}>Citizen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setAppRole('observer'); setIsLoginMode(true); }}
                            className={`flex-1 py-3 items-center rounded-xl ${appRole === 'observer' ? 'bg-white border border-slate-100' : ''}`}
                        >
                            <Text className={`font-bold ${appRole === 'observer' ? 'text-orange-600' : 'text-slate-500'}`}>Observer</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                        {/* Header Area */}
                        <StyledLinearGradient
                            colors={appRole === 'citizen' ? ['#2563EB', '#4338ca'] : ['#F97316', '#EA580C']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="p-8 items-center"
                        >
                            <Text className="text-3xl font-bold text-white mb-2">
                                {appRole === 'observer' ? 'Observer Login' : (isLoginMode ? 'Welcome Back' : 'Create Account')}
                            </Text>
                            <Text className="text-white text-center opacity-80">
                                {appRole === 'observer' ? 'Access the secure monitoring tools' : (isLoginMode ? 'Login to continue to the Voter Portal' : 'Register to access voting services')}
                            </Text>
                        </StyledLinearGradient>

                        <View className="p-6">

                            {/* Observer Sub-Role Toggle */}
                            {appRole === 'observer' && (
                                <View className="flex-row gap-2 mb-4 justify-center">
                                    <TouchableOpacity
                                        onPress={() => setObserverRole('general')}
                                        className={`px-4 py-2 border rounded-full ${observerRole === 'general' ? 'bg-orange-100 border-orange-400' : 'border-slate-300 bg-white'}`}
                                    >
                                        <Text className={`text-sm font-bold ${observerRole === 'general' ? 'text-orange-700' : 'text-slate-500'}`}>General</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setObserverRole('expenditure')}
                                        className={`px-4 py-2 border rounded-full ${observerRole === 'expenditure' ? 'bg-orange-100 border-orange-400' : 'border-slate-300 bg-white'}`}
                                    >
                                        <Text className={`text-sm font-bold ${observerRole === 'expenditure' ? 'text-orange-700' : 'text-slate-500'}`}>Expenditure</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* Registration Fields (Citizen Only) */}
                            {appRole === 'citizen' && !isLoginMode && (
                                <>
                                    <View>
                                        <Text className="text-sm font-medium text-slate-700 mb-1">Full Name</Text>
                                        <TextInput
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:border-blue-500"
                                            placeholder="Enter your full name"
                                            value={formData.fullName}
                                            onChangeText={(text) => handleChange('fullName', text)}
                                        />
                                    </View>
                                    <View className="mt-4">
                                        <Text className="text-sm font-medium text-slate-700 mb-1">Email Address</Text>
                                        <TextInput
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:border-blue-500"
                                            placeholder="Enter your email"
                                            keyboardType="email-address"
                                            value={formData.email}
                                            onChangeText={(text) => handleChange('email', text)}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </>
                            )}

                            {/* Identifier Field */}
                            <View className="mt-4">
                                <Text className="text-sm font-medium text-slate-700 mb-1">{appRole === 'citizen' ? 'Mobile Number' : 'Username'}</Text>
                                <TextInput
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:border-blue-500"
                                    placeholder={appRole === 'citizen' ? "Enter 10-digit mobile number" : "e.g. observer1"}
                                    keyboardType={appRole === 'citizen' ? "phone-pad" : "default"}
                                    maxLength={appRole === 'citizen' ? 10 : 50}
                                    value={appRole === 'citizen' ? formData.phone : formData.username}
                                    autoCapitalize="none"
                                    onChangeText={(text) => handleChange(appRole === 'citizen' ? 'phone' : 'username', text)}
                                />
                            </View>

                            <View className="mt-4">
                                <Text className="text-sm font-medium text-slate-700 mb-1">Password</Text>
                                <TextInput
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 focus:border-blue-500"
                                    placeholder="Enter your password"
                                    secureTextEntry
                                    value={formData.password}
                                    onChangeText={(text) => handleChange('password', text)}
                                />
                                {isLoginMode && (
                                    <TouchableOpacity className="mt-2 items-end">
                                        <Text className={`text-sm font-medium ${appRole === 'citizen' ? 'text-blue-600' : 'text-orange-600'}`}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Action Buttons */}
                            <View className="flex-row gap-3 items-center mt-8">
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    className="flex-1 py-4 border border-slate-300 rounded-xl items-center bg-white shadow-sm"
                                >
                                    <Text className="text-slate-700 font-medium text-lg">Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    <StyledLinearGradient
                                        colors={appRole === 'citizen' ? ['#4F46E5', '#3730A3'] : ['#EA580C', '#C2410C']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        className={`py-4 rounded-xl items-center shadow-md ${loading ? 'opacity-70' : ''}`}
                                    >
                                        <Text className="text-white font-bold text-lg">
                                            {loading ? 'Processing...' : (isLoginMode ? 'Login' : 'Register')}
                                        </Text>
                                    </StyledLinearGradient>
                                </TouchableOpacity>
                            </View>

                            {/* Toggle Mode (Citizen Only) */}
                            {appRole === 'citizen' && (
                                <View className="mt-6 flex-row justify-center items-center">
                                    <Text className="text-slate-500">
                                        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                                    </Text>
                                    <TouchableOpacity onPress={toggleCitizenMode}>
                                        <Text className="text-blue-600 font-bold ml-1">
                                            {isLoginMode ? 'Register Here' : 'Login Here'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
