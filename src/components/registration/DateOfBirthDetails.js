import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';

const DateOfBirthDetails = ({ nextStep, prevStep }) => {
    const { formData, updateFormData } = useFormContext();

    const handleNext = () => {
        if (!formData.dob) {
            Alert.alert('Error', 'Please enter your Date of Birth.');
            return;
        }
        if (!formData.dobProofFile) {
            Alert.alert('Error', 'Please upload a document for proof of Date of Birth.');
            return;
        }
        nextStep();
    };

    const handleMockUpload = () => {
        updateFormData({ dobProofFile: { name: 'dob_proof.pdf', base64: 'mock_base64_data' } });
        Alert.alert('Success', 'DOB Document attached successfully (Mocked).');
    };

    return (
        <ECILayout step={7} totalSteps={14} title="G. Date of Birth Details" onClose={prevStep}>
            <View className="gap-4">
                <View>
                    <Text className="text-sm font-bold text-slate-800 mb-2">7(a) Date of Birth *</Text>
                    <TextInput
                        value={formData.dob}
                        onChangeText={(text) => updateFormData({ dob: text })}
                        placeholder="YYYY-MM-DD"
                        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                    />
                </View>

                <View>
                    <Text className="text-sm font-bold text-slate-800 mb-2">7(b) Self-attested copy of age proof *</Text>
                    <View className="gap-4 mb-4">
                        <TouchableOpacity
                            onPress={() => updateFormData({ dobDocumentType: 'proof' })}
                            className="flex-row items-center"
                        >
                            <Text className={`font-medium text-lg ${formData.dobDocumentType === 'proof' ? 'text-blue-600' : 'text-slate-400'}`}>◉</Text>
                            <Text className="text-slate-700 ml-2">Document for proof of Date of Birth</Text>
                        </TouchableOpacity>

                        {formData.dobDocumentType === 'proof' && (
                            <View className="ml-6">
                                <TextInput
                                    value={formData.dobSelectedDoc}
                                    onChangeText={(text) => updateFormData({ dobSelectedDoc: text })}
                                    placeholder="Enter Document Name (e.g. Aadhaar/PAN)"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 bg-white"
                                />
                            </View>
                        )}

                        <TouchableOpacity
                            onPress={() => updateFormData({ dobDocumentType: 'other' })}
                            className="flex-row items-center mt-2"
                        >
                            <Text className={`font-medium text-lg ${formData.dobDocumentType === 'other' ? 'text-blue-600' : 'text-slate-400'}`}>◉</Text>
                            <Text className="text-slate-700 ml-2">Any other Document (Please Specify)</Text>
                        </TouchableOpacity>

                        {formData.dobDocumentType === 'other' && (
                            <View className="ml-6">
                                <TextInput
                                    value={formData.dobOtherDocSpec}
                                    onChangeText={(text) => updateFormData({ dobOtherDocSpec: text })}
                                    placeholder="Specify Document"
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 bg-white"
                                />
                            </View>
                        )}
                    </View>

                    <View className="border-2 border-dashed border-slate-300 rounded-xl p-6 items-center">
                        <TouchableOpacity onPress={handleMockUpload} className="bg-slate-200 px-4 py-2 rounded-lg mb-2">
                            <Text className="font-medium text-slate-700">Choose File</Text>
                        </TouchableOpacity>
                        <Text className="text-slate-500 text-center" numberOfLines={1}>
                            {formData.dobProofFile ? formData.dobProofFile.name : 'No file chosen (PDF, JPG, PNG)'}
                        </Text>
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
export default DateOfBirthDetails;
