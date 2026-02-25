import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { API_URL } from '../../constants/config';

const LedgerView = ({ setView }) => {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLedger = async () => {
            try {
                const endpoint = (API_URL || 'http://localhost:5000') + '/api/public-ledger';
                const res = await fetch(endpoint);
                if (res.ok) {
                    const data = await res.json();
                    setBlocks(data);
                }
            } catch (err) {
                console.error("Fetch ledger failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLedger();
        const interval = setInterval(fetchLedger, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 bg-slate-50">
            <View className="p-6 pb-2">
                <View className="flex-row items-center justify-between mb-4 mt-4">
                    <Text className="text-2xl font-bold text-slate-800">Public Ledger</Text>
                    <TouchableOpacity onPress={() => setView('hub')} className="bg-slate-200 px-4 py-2 rounded-lg">
                        <Text className="font-medium text-slate-700">Back</Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-green-100 flex-row items-center border border-green-200 self-start px-3 py-1 rounded-lg mb-6 shadow-sm">
                    <Text className="text-green-800 font-bold text-xs mr-2">🔒 Blockchain Integrity:</Text>
                    <Text className="text-green-700 font-bold text-xs uppercase tracking-wide">Verified</Text>
                </View>
            </View>

            {loading ? (
                <View className="flex-1 items-center justify-center p-10">
                    <ActivityIndicator size="large" color="#f97316" />
                    <Text className="text-slate-500 mt-4">Syncing with nodes...</Text>
                </View>
            ) : (
                <ScrollView className="flex-1 px-6">
                    <View className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
                        {/* Table Header */}
                        <View className="bg-slate-50 flex-row p-4 border-b border-slate-200 items-center justify-between">
                            <Text className="font-bold text-slate-500 flex-1">Block Data</Text>
                            <Text className="font-bold text-slate-500 text-right w-24">Hash Info</Text>
                        </View>

                        {/* Table Body */}
                        {blocks.length === 0 ? (
                            <View className="p-8 items-center">
                                <Text className="text-slate-400">No blocks mined yet.</Text>
                            </View>
                        ) : (
                            blocks.map((block, idx) => (
                                <View key={idx} className="p-4 border-b border-slate-100 flex-row justify-between items-start">
                                    <View className="flex-1 mr-4">
                                        <View className="flex-row items-center mb-1">
                                            <Text className="font-bold text-slate-800 text-lg mr-2">#{blocks.length - idx}</Text>
                                            <View className="bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                                                <Text className="text-blue-700 text-[10px] uppercase font-bold">{block.constituency}</Text>
                                            </View>
                                        </View>
                                        <Text className="text-slate-500 text-xs mb-2">
                                            {new Date(block.timestamp).toLocaleTimeString()}
                                        </Text>
                                    </View>

                                    <View className="w-32 items-end">
                                        <Text className="text-xs text-slate-400 font-mono mb-1">
                                            Prev: {block.prev_hash ? block.prev_hash.substring(0, 10) + '...' : 'GENESIS'}
                                        </Text>
                                        <Text className="text-xs text-orange-600 font-mono font-bold" numberOfLines={1}>
                                            {block.transaction_hash ? block.transaction_hash.substring(0, 14) + '...' : 'N/A'}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default LedgerView;
