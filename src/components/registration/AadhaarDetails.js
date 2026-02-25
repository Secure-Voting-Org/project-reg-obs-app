import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';

const AadhaarDetails = ({ nextStep, prevStep }) => {
    const { formData, updateFormData } = useFormContext();

    const handleNext = () => {
        if (formData.aadhaarOption === 'aadhaar') {
            if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
                Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number.');
                return;
            }
        }
        nextStep();
    };

    return (
        <ECILayout step={5} totalSteps={14} title="E. Aadhaar Details" onClose={prevStep}>
            <View className="gap-4">
                <View>
                    <Text className="text-sm font-bold text-slate-800 mb-4">5. Aadhaar Details</Text>

                    <TouchableOpacity
                        onPress={() => updateFormData({ aadhaarOption: 'aadhaar' })}
                        className="flex-row items-center mb-2"
                    >
                        <Text className={`font-medium text-lg ${formData.aadhaarOption === 'aadhaar' ? 'text-blue-600' : 'text-slate-400'}`}>◉</Text>
                        <Text className="text-slate-700 ml-2">I have an Aadhaar Number</Text>
                    </TouchableOpacity>

                    {formData.aadhaarOption === 'aadhaar' && (
                        <View className="ml-6 mb-4">
                            <TextInput
                                value={formData.aadhaarNumber}
                                onChangeText={(text) => updateFormData({ aadhaarNumber: text.replace(/\D/g, '').slice(0, 12) })}
                                placeholder="Enter 12-digit Aadhaar Number"
                                keyboardType="number-pad"
                                maxLength={12}
                                className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                            />
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => updateFormData({ aadhaarOption: 'no_aadhaar', aadhaarNumber: '' })}
                        className="flex-row items-start mb-2 pr-6"
                    >
                        <Text className={`font-medium text-lg mt-[-2px] ${formData.aadhaarOption === 'no_aadhaar' ? 'text-blue-600' : 'text-slate-400'}`}>◉</Text>
                        <Text className="text-slate-700 ml-2 leading-5">I am not able to furnish my Aadhaar Number because I don't have an Aadhaar Number.</Text>
                    </TouchableOpacity>
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
export default AadhaarDetails;
