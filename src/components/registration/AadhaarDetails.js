import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';
import { API_URL } from '../../constants/config';

const RadioCard = ({ label, sublabel, selected, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            flexDirection: 'row', alignItems: 'flex-start',
            padding: 14, borderRadius: 10, borderWidth: 2,
            borderColor: selected ? '#2563eb' : '#e2e8f0',
            backgroundColor: selected ? '#eff6ff' : '#f8fafc',
            marginBottom: 10,
        }}
    >
        <View style={{
            width: 20, height: 20, borderRadius: 10, borderWidth: 2,
            borderColor: selected ? '#2563eb' : '#94a3b8',
            alignItems: 'center', justifyContent: 'center',
            marginRight: 12, marginTop: 1, flexShrink: 0,
        }}>
            {selected && <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: '#2563eb' }} />}
        </View>
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: selected ? '600' : '400', color: selected ? '#1d4ed8' : '#374151' }}>
                {label}
            </Text>
            {sublabel ? <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{sublabel}</Text> : null}
        </View>
    </TouchableOpacity>
);

const AadhaarDetails = ({ nextStep, prevStep, cancelForm }) => {
    const { formData, updateFormData } = useFormContext();
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const handleSendOTP = async () => {
        if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
            Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number.');
            return;
        }

        if (!formData.mobileSelf && !formData.mobileRelativeNumber) {
            Alert.alert('Error', 'Mobile number not found in step 1. Please go back and enter a mobile number.');
            return;
        }

        const targetMobile = formData.mobileSelf ? formData.mobileNumber : formData.mobileRelativeNumber;

        setLoading(true);
        try {
            const url = (API_URL || 'http://localhost:5000') + '/api/aadhaar/generate-otp';
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    aadhaarNumber: formData.aadhaarNumber,
                    mobileNumber: targetMobile
                })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setOtpSent(true);
                Alert.alert('OTP Sent', data.message || 'OTP sent to your registered mobile number.');
            } else {
                Alert.alert('Error', data.error || 'Failed to send OTP.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Network Error', 'Could not connect to the server.');
        }
        setLoading(false);
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length < 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
            return;
        }

        setLoading(true);
        try {
            const url = (API_URL || 'http://localhost:5000') + '/api/aadhaar/verify-otp';
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhaarNumber: formData.aadhaarNumber, otp })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setIsVerified(true);
                Alert.alert('Success', 'Aadhaar Verified Successfully!');
            } else {
                Alert.alert('Error', data.error || 'Invalid OTP.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Network Error', 'Could not connect to the server.');
        }
        setLoading(false);
    };

    const handleNext = () => {
        if (!formData.aadhaarOption) {
            Alert.alert('Error', 'Please select an option.');
            return;
        }
        if (formData.aadhaarOption === 'aadhaar') {
            if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
                Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number.');
                return;
            }
            if (!isVerified) {
                Alert.alert('Verification Required', 'Please verify your Aadhaar with OTP before proceeding.');
                return;
            }
        }
        nextStep();
    };

    return (
        <ECILayout step={5} totalSteps={14} title="E. Aadhaar Details" onClose={cancelForm}>
            <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#1e293b', marginBottom: 4 }}>
                    5. Aadhaar Card <Text style={{ color: '#ef4444' }}>*</Text>
                </Text>
                <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
                    Select one option below
                </Text>

                <RadioCard
                    label="I have an Aadhaar Number"
                    sublabel="You will be asked to enter it below"
                    selected={formData.aadhaarOption === 'aadhaar'}
                    onPress={() => {
                        updateFormData({ aadhaarOption: 'aadhaar' });
                        setIsVerified(false);
                        setOtpSent(false);
                    }}
                />

                {formData.aadhaarOption === 'aadhaar' && (
                    <View style={{ marginBottom: 10, paddingHorizontal: 4 }}>
                        <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>
                            Aadhaar Number <Text style={{ color: '#ef4444' }}>*</Text>
                        </Text>
                        <TextInput
                            value={formData.aadhaarNumber}
                            onChangeText={(text) => {
                                updateFormData({ aadhaarNumber: text.replace(/\D/g, '').slice(0, 12) });
                                setIsVerified(false);
                                setOtpSent(false);
                            }}
                            placeholder="Enter 12-digit Aadhaar Number"
                            keyboardType="number-pad"
                            maxLength={12}
                            editable={!isVerified}
                            style={{
                                borderWidth: 1.5, borderColor: isVerified ? '#16a34a' : '#93c5fd', borderRadius: 8,
                                paddingHorizontal: 14, paddingVertical: 12,
                                backgroundColor: isVerified ? '#f0fdf4' : '#fff', color: '#1e293b',
                                fontSize: 16, letterSpacing: 2, opacity: isVerified ? 0.8 : 1
                            }}
                        />
                        {formData.aadhaarNumber?.length > 0 && !isVerified && (
                            <Text style={{ fontSize: 11, color: formData.aadhaarNumber.length === 12 ? '#16a34a' : '#64748b', marginTop: 4 }}>
                                {formData.aadhaarNumber.length}/12 digits
                            </Text>
                        )}

                        {/* OTP Flow UI */}
                        {!isVerified && formData.aadhaarNumber?.length === 12 && !otpSent && (
                            <TouchableOpacity
                                onPress={handleSendOTP}
                                disabled={loading}
                                style={{ marginTop: 12, backgroundColor: '#2563eb', padding: 12, borderRadius: 8, alignItems: 'center' }}
                            >
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: 'bold' }}>Verify via OTP</Text>}
                            </TouchableOpacity>
                        )}

                        {otpSent && !isVerified && (
                            <View style={{ marginTop: 16 }}>
                                <Text style={{ fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 }}>
                                    Enter OTP <Text style={{ color: '#ef4444' }}>*</Text>
                                </Text>
                                <TextInput
                                    value={otp}
                                    onChangeText={(text) => setOtp(text.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="Enter 6-digit OTP"
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    style={{
                                        borderWidth: 1.5, borderColor: '#93c5fd', borderRadius: 8,
                                        paddingHorizontal: 14, paddingVertical: 12,
                                        backgroundColor: '#fff', color: '#1e293b',
                                        fontSize: 16, letterSpacing: 4, textAlign: 'center'
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={handleVerifyOTP}
                                    disabled={loading || otp.length < 6}
                                    style={{ marginTop: 12, backgroundColor: otp.length === 6 ? '#16a34a' : '#94a3b8', padding: 12, borderRadius: 8, alignItems: 'center' }}
                                >
                                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit OTP</Text>}
                                </TouchableOpacity>
                            </View>
                        )}

                        {isVerified && (
                            <View style={{ marginTop: 12, backgroundColor: '#dcfce7', padding: 10, borderRadius: 8, alignItems: 'center' }}>
                                <Text style={{ color: '#166534', fontWeight: 'bold' }}>✓ Aadhaar Verified Successfully</Text>
                            </View>
                        )}
                    </View>
                )}

                <RadioCard
                    label="I do not have an Aadhaar Number"
                    sublabel="I am not able to furnish my Aadhaar Number because I don't have one"
                    selected={formData.aadhaarOption === 'no_aadhaar'}
                    onPress={() => updateFormData({ aadhaarOption: 'no_aadhaar', aadhaarNumber: '' })}
                />

                <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={prevStep}
                        style={{ borderWidth: 1.5, borderColor: '#2563eb', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
                    >
                        <Text style={{ color: '#2563eb', fontWeight: '700' }}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNext}
                        style={{ backgroundColor: '#2563eb', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '700' }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ECILayout>
    );
};
export default AadhaarDetails;
