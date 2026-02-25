import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';
import SelectDropdown from '../common/SelectDropdown';
import { locationData } from '../../data/locationData';

const Declaration = ({ nextStep, prevStep }) => {
    const { formData, updateFormData } = useFormContext();
    const [currentDate, setCurrentDate] = useState('');

    const states = Object.keys(locationData);
    const districts = formData.declState && locationData[formData.declState]
        ? Object.keys(locationData[formData.declState].districts)
        : [];

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        setCurrentDate(formattedDate);
    }, []);

    const handleNext = () => {
        if (!formData.declVillage || !formData.declState || !formData.declResidenceDate || !formData.declPlace) {
            Alert.alert('Error', 'Please fill all required declaration fields.');
            return;
        }
        nextStep();
    };

    return (
        <ECILayout step={11} totalSteps={14} title="K. Declaration" onClose={prevStep}>
            <View className="gap-4">
                <Text className="text-sm font-medium text-slate-800">I Hereby declare that to the best of my knowledge and belief:</Text>

                <View className="gap-4">
                    <Text className="text-sm text-slate-700">(i) I am a citizen of India and place of my birth is</Text>

                    <View>
                        <Text className="text-sm font-semibold text-slate-700 mb-1">Village/Town *</Text>
                        <TextInput
                            value={formData.declVillage}
                            onChangeText={(text) => updateFormData({ declVillage: text })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                        />
                    </View>

                    <SelectDropdown
                        label="State/UT"
                        value={formData.declState}
                        options={states}
                        onSelect={(state) => updateFormData({ declState: state, declDistrict: '' })}
                        placeholder="Select State"
                        required
                    />

                    <SelectDropdown
                        label="District"
                        value={formData.declDistrict}
                        options={districts}
                        onSelect={(district) => updateFormData({ declDistrict: district })}
                        placeholder="Select District"
                        disabled={!formData.declState}
                        required={false}
                    />
                </View>

                <View className="gap-4 mt-4">
                    <Text className="text-sm text-slate-700">(ii) I am ordinarily a resident at the address mentioned at Section 8(a) since *</Text>
                    <TextInput
                        value={formData.declResidenceDate}
                        onChangeText={(text) => updateFormData({ declResidenceDate: text })}
                        placeholder="MM-YYYY"
                        className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                    />
                </View>

                <View className="gap-4 mt-2">
                    <Text className="text-sm text-slate-600">(iii) I am applying for inclusion in Electoral Roll for the first time and my name is not included in any Assembly/Parliamentary Constituency.</Text>
                    <Text className="text-sm text-slate-600">(iv) I am aware that making the above statement or declaration in relation to this application which is false and which I know or believe to be false or do not believe to be true, is punishable under Section 31 of Representation of the People Act,1950.</Text>
                </View>

                <View className="flex-row gap-4 mt-4">
                    <View className="flex-1">
                        <Text className="text-sm font-semibold text-slate-700 mb-1">Place *</Text>
                        <TextInput
                            value={formData.declPlace}
                            onChangeText={(text) => updateFormData({ declPlace: text })}
                            className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-800 bg-white"
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm font-semibold text-slate-700 mb-1">Date</Text>
                        <TextInput
                            value={currentDate}
                            editable={false}
                            className="w-full border border-slate-300 rounded-lg px-3 py-3 text-slate-500 bg-slate-100"
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
export default Declaration;
