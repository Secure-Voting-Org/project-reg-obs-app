import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ReportsView = ({ setView }) => (
    <View className="flex-1 bg-white p-4 justify-center items-center">
        <Text className="text-2xl font-bold mb-4">Reports & Logs</Text>
        <Text className="text-slate-500 text-center mb-8">Statutory reports will appear here.</Text>
        <TouchableOpacity onPress={() => setView('hub')} className="bg-slate-200 px-4 py-2 rounded-lg">
            <Text>Back to Hub</Text>
        </TouchableOpacity>
    </View>
);

export default ReportsView;
