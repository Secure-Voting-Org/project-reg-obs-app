import React from 'react';
import { View, Text } from 'react-native';

const ReportsView = () => (
    <View className="flex-1 bg-white p-6 justify-center items-center">
        <Text className="text-5xl mb-4">📝</Text>
        <Text className="text-2xl font-bold text-slate-800 mb-3">Reports & Logs</Text>
        <Text className="text-slate-500 text-center leading-6">
            Statutory reports, incident logs, and observer summaries will appear here once available from the Electoral Management System.
        </Text>
    </View>
);

export default ReportsView;
