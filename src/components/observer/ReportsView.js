import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ReportsView = ({ navigation }) => (
    <View className="flex-1 bg-white p-6">
        <TouchableOpacity onPress={() => navigation?.goBack()} className="mb-4 mt-4">
            <Text className="text-blue-600 font-semibold text-base">← Back</Text>
        </TouchableOpacity>
        <View className="flex-1 justify-center items-center">
            <Text className="text-5xl mb-4">📝</Text>
            <Text className="text-2xl font-bold text-slate-800 mb-3">Reports & Logs</Text>
            <Text className="text-slate-500 text-center leading-6">
                Statutory reports, incident logs, and observer summaries will appear here once available from the Electoral Management System.
            </Text>
        </View>
    </View>
);

export default ReportsView;

