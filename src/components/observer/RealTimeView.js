import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { API_URL } from '../../constants/config';

const RealTimeView = ({ setView }) => {
    const [stats, setStats] = useState({ totalVotes: 0, breakdown: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const endpoint = (API_URL || 'http://localhost:5000') + '/api/stats/turnout';
                const res = await fetch(endpoint);
                if (res.ok) {
                    const data = await res.json();
                    setStats({
                        totalVotes: data.totalVotes || 0,
                        breakdown: data.breakdown || []
                    });
                }
            } catch (err) {
                console.error("Fetch stats failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <ScrollView className="flex-1 bg-slate-50">
            <View className="p-6">
                <View className="flex-row items-center justify-between mb-6 mt-4">
                    <Text className="text-2xl font-bold text-slate-800">Real-Time Analytics</Text>
                    <TouchableOpacity onPress={() => setView('hub')} className="bg-slate-200 px-4 py-2 rounded-lg">
                        <Text className="font-medium text-slate-700">Back</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View className="items-center justify-center p-10">
                        <ActivityIndicator size="large" color="#16a34a" />
                        <Text className="text-slate-500 mt-4">Connecting to live feed...</Text>
                    </View>
                ) : (
                    <>
                        {/* Live Turnout Counter */}
                        <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-green-500 mb-6">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-lg font-bold text-slate-700">Live Voter Turnout</Text>
                                <View className="bg-red-100 flex-row items-center px-2 py-1 rounded-full border border-red-200">
                                    <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                                    <Text className="text-red-700 font-bold text-xs uppercase">Live</Text>
                                </View>
                            </View>
                            <View className="flex-row items-baseline">
                                <Text className="text-5xl font-extrabold text-slate-900">{stats.totalVotes.toLocaleString()}</Text>
                                <Text className="text-slate-500 ml-2 font-medium">Votes Cast</Text>
                            </View>
                            <View className="h-2 bg-slate-100 rounded-full mt-6 overflow-hidden">
                                <View className="w-[45%] h-full bg-green-500 rounded-full" />
                            </View>
                            <Text className="mt-2 text-xs text-slate-400 font-medium tracking-wide border-t border-slate-100 pt-2 text-right">
                                EST. 45% OF ELIGIBLE VOTERS
                            </Text>
                        </View>

                        {/* Anomaly Alerts */}
                        <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-red-500 mb-6">
                            <Text className="text-lg font-bold text-slate-700 mb-4">Anomaly Detection System</Text>
                            <View className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                                <Text className="font-bold text-red-800 mb-1">⚠️ Suspicious Spike</Text>
                                <Text className="text-red-600 mb-1">Kuppam, Booth 14</Text>
                                <Text className="text-xs text-red-400">120 votes in 5 mins (High Velocity)</Text>
                            </View>
                        </View>

                        {/* Constituency Breakdown */}
                        <View className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                            <View className="p-4 border-b border-slate-100 bg-slate-50">
                                <Text className="text-lg font-bold text-slate-700">Constituency Performance</Text>
                            </View>
                            <View className="p-4">
                                <View className="border-b border-slate-200 pb-2 mb-2 flex-row justify-between flex-wrap">
                                    <View className="flex-[2]"><Text className="font-bold text-slate-500">Constituency</Text></View>
                                    <View className="flex-1 items-end"><Text className="font-bold text-slate-500">Polled</Text></View>
                                    <View className="flex-1 items-end"><Text className="font-bold text-slate-500">Status</Text></View>
                                </View>

                                {stats.breakdown.length > 0 ? (
                                    stats.breakdown.map((item, index) => (
                                        <View key={index} className="flex-row py-3 justify-between flex-wrap border-b border-slate-50">
                                            <View className="flex-[2] justify-center"><Text className="text-slate-700 font-medium">{item.constituency}</Text></View>
                                            <View className="flex-1 justify-center items-end"><Text className="font-bold text-slate-900">{item.count}</Text></View>
                                            <View className="flex-1 justify-center items-end"><Text className="text-green-600 font-medium text-xs">Active</Text></View>
                                        </View>
                                    ))
                                ) : (
                                    <View className="py-6 items-center">
                                        <Text className="text-slate-400">Waiting for polling data...</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </>
                )}
                <View className="h-10" />
            </View>
        </ScrollView>
    );
};

export default RealTimeView;
