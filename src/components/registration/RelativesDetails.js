import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';

const RelativesDetails = ({ nextStep, prevStep }) => {
    const { formData, updateFormData } = useFormContext();
    const relations = ['Father', 'Mother', 'Husband', 'Wife', 'Legal Guardian'];

    const handleNext = () => {
        if (!formData.relationType) {
            Alert.alert('Error', 'Please select a relation type.');
            return;
        }
        if (!formData.relativeName) {
            Alert.alert('Error', 'Please enter relative name.');
            return;
        }
        nextStep();
    };

    return (
        <ECILayout step={3} totalSteps={14} title="C. Name and Surname of any one Relative" onClose={prevStep}>
            <View className="gap-4">
                <Text className="text-sm font-bold text-slate-800 mb-2">2(a) Relative Type</Text>
                <View className="flex-row flex-wrap gap-2 mb-4">
                    {relations.map((type) => (
                        <TouchableOpacity
                            key={type}
                            onPress={() => updateFormData({ relationType: type })}
                            className={`px-4 py-2 rounded-full border ${formData.relationType === type ? 'bg-blue-100 border-blue-600' : 'bg-slate-50 border-slate-300'}`}
                        >
                            <Text className={formData.relationType === type ? 'text-blue-700 font-bold' : 'text-slate-600'}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-1">Relative Name *</Text>
                    <TextInput
                        value={formData.relativeName}
                        onChangeText={(text) => updateFormData({ relativeName: text })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                    />
                </View>
                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-1">Relative Surname (if any)</Text>
                    <TextInput
                        value={formData.relativeSurname}
                        onChangeText={(text) => updateFormData({ relativeSurname: text })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                    />
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
export default RelativesDetails;
