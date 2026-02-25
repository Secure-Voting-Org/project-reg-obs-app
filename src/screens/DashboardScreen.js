import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import DashboardHub from '../components/observer/DashboardHub';

const StyledLinearGradient = styled(LinearGradient);
import RealTimeView from '../components/observer/RealTimeView';
import LedgerView from '../components/observer/LedgerView';
import ReportsView from '../components/observer/ReportsView';
import VoteVerification from '../components/observer/VoteVerification';

const DashboardScreen = ({ route, navigation }) => {
    // Expected: { user: { name: '...', appRole: 'citizen' | 'observer', ... } }
    const { user } = route.params || { user: { name: 'User Profile', appRole: 'citizen' } };
    const appRole = user?.appRole || 'citizen';

    // View state: 'menu' (default portal), 'hub', 'realtime', 'ledger', 'reports', 'verify'
    const [view, setView] = useState('menu');

    // Portal Menu View
    if (view === 'menu') {
        return (
            <SafeAreaView className="flex-1 bg-slate-50">
                <ScrollView contentContainerStyle={{ padding: 24 }}>
                    <View>
                        {/* Header Area */}
                        <View className="mb-8 mt-4">
                            <Text className="text-3xl font-bold text-slate-800">
                                Welcome, {user?.name || 'User'}
                            </Text>
                            <Text className="text-slate-500 mt-1">
                                {appRole === 'observer'
                                    ? 'Select an observer module below to monitor elections.'
                                    : 'Select a portal service below to continue.'}
                            </Text>
                            {appRole === 'observer' && (
                                <View className="mt-2 bg-orange-100 self-start px-3 py-1 rounded-full border border-orange-200">
                                    <Text className="text-orange-800 text-xs font-bold uppercase">{user?.role || 'General'} Observer</Text>
                                </View>
                            )}
                        </View>

                        {/* Citizen: Voter Services Section */}
                        {appRole === 'citizen' && (
                            <>
                                <Text className="text-lg font-bold text-slate-700 mb-4 px-1">Voter Services</Text>
                                <View className="gap-4 mb-8">
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Register')}
                                        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex-row items-center justify-between"
                                    >
                                        <View className="flex-1">
                                            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-4">
                                                <Text className="text-2xl">📝</Text>
                                            </View>
                                            <Text className="text-xl font-bold text-slate-800 mb-1">New Registration</Text>
                                            <Text className="text-slate-500 text-sm">Enroll as a new voter or update demographics</Text>
                                        </View>
                                        <Text className="text-slate-300 text-3xl ml-4">→</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('TrackStatus')}
                                        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex-row items-center justify-between"
                                    >
                                        <View className="flex-1">
                                            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-4">
                                                <Text className="text-2xl">🔍</Text>
                                            </View>
                                            <Text className="text-xl font-bold text-slate-800 mb-1">Track Status</Text>
                                            <Text className="text-slate-500 text-sm">Check the approval status of your application</Text>
                                        </View>
                                        <Text className="text-slate-300 text-3xl ml-4">→</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {/* Observer Tools Section */}
                        {appRole === 'observer' && (
                            <>
                                <Text className="text-lg font-bold text-slate-700 mb-4 px-1">Observer Tools</Text>
                                <View className="gap-4 mb-8">
                                    <TouchableOpacity
                                        onPress={() => setView('hub')}
                                    >
                                        <StyledLinearGradient
                                            colors={['#F97316', '#EA580C']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            className="rounded-2xl shadow-md p-6 flex-row items-center justify-between"
                                        >
                                            <View className="flex-1">
                                                <View className="w-12 h-12 rounded-full items-center justify-center mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                                                    <Text className="text-2xl">📊</Text>
                                                </View>
                                                <Text className="text-xl font-bold text-white mb-1">Observer Dashboard</Text>
                                                <Text className="text-orange-100 text-sm">Access analytics, ledgers, and polling reports</Text>
                                            </View>
                                            <Text className="text-3xl ml-4" style={{ color: 'rgba(255,255,255,0.5)' }}>→</Text>
                                        </StyledLinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {/* Logout */}
                        <TouchableOpacity
                            onPress={() => navigation.replace('Login')}
                            className="mt-6 p-4 items-center bg-white border border-red-100 rounded-xl"
                        >
                            <Text className="text-red-500 font-bold">Logout</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Observer Views Route handling
    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            {view === 'hub' && <DashboardHub setView={setView} observer={user} />}
            {view === 'realtime' && <RealTimeView setView={setView} />}
            {view === 'ledger' && <LedgerView setView={setView} />}
            {view === 'reports' && <ReportsView setView={setView} />}
            {view === 'verify' && <VoteVerification setView={setView} />}
        </SafeAreaView>
    );
};

export default DashboardScreen;
