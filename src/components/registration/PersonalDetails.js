import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';

const PersonalDetails = ({ nextStep, prevStep }) => {
    const { formData, updateFormData } = useFormContext();

    const handleNext = () => {
        if (!formData.firstName) {
            Alert.alert('Error', 'Please enter your First Name.');
            return;
        }
        if (!formData.image) {
            Alert.alert('Error', 'Please upload your photograph.');
            return;
        }
        nextStep();
    };

    const handleMockUpload = () => {
        updateFormData({ image: { name: 'profile_photo.jpg', base64: 'mock_base64_data' } });
        Alert.alert('Success', 'Photo attached successfully (Mocked).');
    };

    return (
        <ECILayout step={2} totalSteps={14} title="B. Personal Details" onClose={prevStep}>
            <View className="gap-4">
                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-1">First Name followed by Middle Name *</Text>
                    <TextInput
                        value={formData.firstName}
                        onChangeText={(text) => updateFormData({ firstName: text })}
                        placeholder="e.g. Rahul Kumar"
                        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                    />
                </View>
                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-1">Surname (if any)</Text>
                    <TextInput
                        value={formData.surname}
                        onChangeText={(text) => updateFormData({ surname: text })}
                        placeholder="e.g. Sharma"
                        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                    />
                </View>

                <View className="mt-4">
                    <Text className="text-sm font-semibold text-slate-700 mb-2">Upload Photograph *</Text>
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={handleMockUpload} className="bg-slate-200 px-4 py-2 rounded-lg border border-slate-300">
                            <Text className="text-slate-700 font-medium">Choose File</Text>
                        </TouchableOpacity>
                        <Text className="ml-3 text-slate-600 flex-1" numberOfLines={1}>
                            {formData.image ? formData.image.name : 'No file chosen'}
                        </Text>
                    </View>
                    <Text className="text-xs text-slate-500 mt-2">Document size max 2MB, .jpg, .jpeg</Text>
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
export default PersonalDetails;
