import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';

const GenderDetails = ({ nextStep, prevStep }) => {
    const { formData, updateFormData } = useFormContext();
    const genders = ['Male', 'Female', 'Third Gender'];

    const handleNext = () => {
        if (!formData.gender) {
            Alert.alert('Error', 'Please select your Gender.');
            return;
        }
        nextStep();
    };

    return (
        <ECILayout step={6} totalSteps={14} title="F. Gender" onClose={prevStep}>
            <View className="gap-4">
                <Text className="text-sm font-bold text-slate-800 mb-2">6. Gender</Text>

                <View className="flex-col gap-4">
                    {genders.map((gender) => (
                        <TouchableOpacity
                            key={gender}
                            onPress={() => updateFormData({ gender })}
                            className="flex-row items-center border border-slate-200 rounded-lg p-4 bg-slate-50"
                        >
                            <Text className={`font-medium text-xl mr-3 ${formData.gender === gender ? 'text-blue-600' : 'text-slate-300'}`}>◉</Text>
                            <Text className="text-slate-700 font-medium">{gender}</Text>
                        </TouchableOpacity>
                    ))}
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
export default GenderDetails;
