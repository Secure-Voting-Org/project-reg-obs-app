import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

const DisabilityDetails = ({ nextStep, prevStep }) => {
    const { formData, updateFormData } = useFormContext();

    const handleCategoryChange = (key) => {
        updateFormData({
            disabilityCategories: {
                ...formData.disabilityCategories,
                [key]: !formData.disabilityCategories[key]
            }
        });
    };

    const handleNext = () => {
        const selectedCategories = Object.keys(formData.disabilityCategories).filter(key => formData.disabilityCategories[key]);
        let disabilityString = selectedCategories.join(', ');
        if (formData.disabilityCategories.other && formData.disabilityOtherSpec) {
            disabilityString += ` (Other: ${formData.disabilityOtherSpec})`;
        }
        updateFormData({ disability: disabilityString });
        nextStep();
    };

    const handleFileUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const asset = result.assets[0];
                let base64Data = '';

                if (Platform.OS === 'web') {
                    const response = await fetch(asset.uri);
                    const blob = await response.blob();
                    base64Data = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                        reader.readAsDataURL(blob);
                    });
                } else {
                    const base64 = await FileSystem.readAsStringAsync(asset.uri, { encoding: 'base64' });
                    base64Data = `data:${asset.mimeType};base64,${base64}`;
                }

                updateFormData({ disabilityFile: { name: asset.name, base64: base64Data } });
            }
        } catch (error) {
            console.error("File upload error:", error);
            Alert.alert('Error', 'Failed to pick document.');
        }
    };

    return (
        <ECILayout step={9} totalSteps={14} title="I. Disability Details (Optional)" onClose={prevStep}>
            <View className="gap-4">
                <Text className="text-sm font-bold text-slate-800 mb-2">9. Category</Text>

                <View className="flex-row flex-wrap gap-4 mb-4">
                    {['locomotive', 'visual', 'deafDumb'].map((key) => (
                        <TouchableOpacity
                            key={key}
                            onPress={() => handleCategoryChange(key)}
                            className="flex-row items-center"
                        >
                            <Text className={`font-medium text-lg mr-2 ${formData.disabilityCategories[key] ? 'text-blue-600' : 'text-slate-300'}`}>☑</Text>
                            <Text className="text-slate-700 font-medium capitalize">{key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => handleCategoryChange('other')} className="flex-row items-center mr-2">
                        <Text className={`font-medium text-lg mr-2 ${formData.disabilityCategories.other ? 'text-blue-600' : 'text-slate-300'}`}>☑</Text>
                        <Text className="text-slate-700 font-bold">Other</Text>
                    </TouchableOpacity>
                    {formData.disabilityCategories.other && (
                        <TextInput
                            value={formData.disabilityOtherSpec}
                            onChangeText={(text) => updateFormData({ disabilityOtherSpec: text })}
                            placeholder="Specify Other"
                            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 bg-white"
                        />
                    )}
                </View>

                <View>
                    <Text className="text-sm font-semibold text-slate-700 mb-1">Percentage of disability (%)</Text>
                    <TextInput
                        value={formData.disabilityPercentage}
                        onChangeText={(text) => updateFormData({ disabilityPercentage: text })}
                        placeholder="e.g. 40"
                        keyboardType="numeric"
                        className="w-24 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 bg-white"
                    />
                </View>

                <View className="mt-4">
                    <Text className="text-sm font-bold text-slate-800 mb-2">Certificate Attached?</Text>
                    <View className="flex-row gap-4 mb-4">
                        <TouchableOpacity onPress={() => updateFormData({ disabilityCertificateAttached: 'yes' })} className="flex-row items-center">
                            <Text className={`font-medium text-lg mr-2 ${formData.disabilityCertificateAttached === 'yes' ? 'text-blue-600' : 'text-slate-300'}`}>◉</Text>
                            <Text className="text-slate-700">Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => updateFormData({ disabilityCertificateAttached: 'no', disabilityFile: null })} className="flex-row items-center">
                            <Text className={`font-medium text-lg mr-2 ${formData.disabilityCertificateAttached === 'no' ? 'text-blue-600' : 'text-slate-300'}`}>◉</Text>
                            <Text className="text-slate-700">No</Text>
                        </TouchableOpacity>
                    </View>

                    {formData.disabilityCertificateAttached === 'yes' && (
                        <View className="border-2 border-dashed border-slate-300 rounded-xl p-4 items-center">
                            <TouchableOpacity onPress={handleFileUpload} className="bg-slate-200 px-4 py-2 rounded-lg mb-2">
                                <Text className="font-medium text-slate-700">Choose Certificate File</Text>
                            </TouchableOpacity>
                            <Text className="text-slate-500 text-center text-xs" numberOfLines={1}>
                                {formData.disabilityFile ? formData.disabilityFile.name : 'No file chosen (PDF, JPG, PNG)'}
                            </Text>
                        </View>
                    )}
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
export default DisabilityDetails;
