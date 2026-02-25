import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';

const ContactDetails = ({ nextStep, prevStep }) => {
    const { formData, updateFormData } = useFormContext();

    const handleNext = () => {
        if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
            return;
        }
        nextStep();
    };

    return (
        <ECILayout step={4} totalSteps={14} title="D. Contact Details" onClose={prevStep}>
            <View className="gap-4">
                <View>
                    <Text className="text-sm font-bold text-slate-800 mb-2">3. Mobile Number</Text>
                    <View className="flex-row gap-4 mb-2">
                        <TouchableOpacity onPress={() => updateFormData({ mobileSelf: true, mobileRelative: false })}>
                            <Text className={`font-medium ${formData.mobileSelf ? 'text-blue-600' : 'text-slate-500'}`}>◉ Self</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => updateFormData({ mobileSelf: false, mobileRelative: true })}>
                            <Text className={`font-medium ${formData.mobileRelative ? 'text-blue-600' : 'text-slate-500'}`}>◉ Relative</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center border border-slate-300 bg-white rounded-lg px-3">
                        <Text className="text-slate-500 font-bold mr-2">+91 |</Text>
                        <TextInput
                            value={formData.mobileNumber}
                            onChangeText={(text) => updateFormData({ mobileNumber: text })}
                            placeholder="10-digit number"
                            keyboardType="phone-pad"
                            maxLength={10}
                            className="flex-1 py-3 text-slate-800"
                        />
                    </View>
                </View>

                <View>
                    <Text className="text-sm font-bold text-slate-800 mb-2">4. Email ID (Optional)</Text>
                    <View className="flex-row gap-4 mb-2">
                        <TouchableOpacity onPress={() => updateFormData({ emailSelf: true, emailRelative: false })}>
                            <Text className={`font-medium ${formData.emailSelf ? 'text-blue-600' : 'text-slate-500'}`}>◉ Self</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => updateFormData({ emailSelf: false, emailRelative: true })}>
                            <Text className={`font-medium ${formData.emailRelative ? 'text-blue-600' : 'text-slate-500'}`}>◉ Relative</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="border border-slate-300 bg-white rounded-lg px-3">
                        <TextInput
                            value={formData.emailId}
                            onChangeText={(text) => updateFormData({ emailId: text })}
                            placeholder="Enter Email Address"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="flex-1 py-3 text-slate-800"
                        />
                    </View>
                </View>

                <View className="mt-8 flex-row justify-between">
                    <TouchableOpacity onPress={prevStep} className="border border-blue-600 px-6 py-3 rounded-lg">
                        <Text className="text-blue-600 font-bold">Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext} className="bg-blue-600 px-6 py-3 rounded-lg">
                        <Text className="text-white font-bold">Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ECILayout>
    );
};
export default ContactDetails;
