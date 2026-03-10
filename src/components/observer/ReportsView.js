import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import API_BASE from '../../constants/config';

const ReportsView = ({ navigation }) => {
    const [exporting, setExporting] = useState(false);
    const [reportType, setReportType] = useState('Arrival Report');
    const [observation, setObservation] = useState('');

    const handleExportLedger = async () => {
        setExporting(true);
        try {
            // In a real mobile app, downloading a zip requires Expo FileSystem / Sharing
            // Here we just simulate the UI action to match the web portal
            setTimeout(() => {
                Alert.alert("Success", "Secure ledger export initiated.");
                setExporting(false);
            }, 1000);
        } catch (err) {
            Alert.alert("Error", "Failed to securely export the ledger.");
            setExporting(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-slate-50">
            <View className="p-6 pt-12 pb-12">
                <TouchableOpacity onPress={() => navigation?.goBack()} className="mb-6">
                    <Text className="text-blue-600 font-bold text-base">← Back</Text>
                </TouchableOpacity>

                {/* Header Area */}
                <View className="mb-8 border-b border-slate-200 pb-5 mt-2">
                    <Text className="text-orange-600 text-3xl font-extrabold tracking-tight">Statutory Reports</Text>
                    <Text className="text-blue-900 text-base mt-2 font-medium">
                        Secure portal for daily dispatches and notices.
                    </Text>
                </View>

                {/* Submission Form Card */}
                <View className="bg-white rounded-3xl shadow-sm border border-slate-100 mb-8 overflow-hidden">
                    {/* Top Decorative Line */}
                    <View className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-orange-600" />

                    <View className="p-6">
                        <View className="border-b border-slate-100 pb-4 mb-5 flex-row items-center">
                            <Text className="text-2xl mr-3">📝</Text>
                            <Text className="text-orange-900 text-xl font-extrabold">Submit Report</Text>
                        </View>

                        <View className="flex-col gap-5">
                            <View>
                                <Text className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-2 ml-1">Report Type</Text>
                                <View className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
                                    <Text className="text-slate-800 font-semibold text-base">Arrival Report</Text>
                                </View>
                            </View>

                            <View>
                                <Text className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-2 ml-1">Observations</Text>
                                <TextInput
                                    className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-medium min-h-[120px]"
                                    multiline={true}
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    placeholder="Enter detailed observations..."
                                    placeholderTextColor="#94a3b8"
                                    value={observation}
                                    onChangeText={setObservation}
                                />
                            </View>

                            <View>
                                <Text className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-2 ml-1">Attachments (Photos/Docs)</Text>
                                <TouchableOpacity className="bg-orange-50 border border-orange-200 border-dashed rounded-2xl px-5 py-5 items-center justify-center">
                                    <Text className="text-orange-600 font-bold">Tap to select file...</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity className="bg-orange-600 rounded-2xl py-4 mt-4 shadow-md shadow-orange-200">
                                <Text className="text-white font-extrabold text-lg text-center tracking-wide">Upload & Submit Securely</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* ECI Notices Card */}
                <View className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-3xl p-6 shadow-sm border border-blue-200 mb-8">
                    <View className="border-b border-blue-200/60 pb-4 mb-5 flex-row items-center">
                        <Text className="text-2xl mr-3">🚨</Text>
                        <Text className="text-blue-900 text-xl font-extrabold">ECI Notice Board</Text>
                    </View>

                    <View className="flex-col gap-4">
                        <View className="bg-white p-5 rounded-2xl border-l-[5px] border-l-red-500 shadow-sm flex-row items-start">
                            <View className="flex-1">
                                <Text className="text-slate-800 font-medium leading-5"><Text className="text-red-600 font-bold">URGENT:</Text> Check all VVPAT seals in Sector 4.</Text>
                                <Text className="text-slate-400 text-xs font-semibold mt-2">2 mins ago</Text>
                            </View>
                        </View>

                        <View className="bg-white p-5 rounded-2xl border-l-[5px] border-l-orange-500 shadow-sm flex-row items-start">
                            <View className="flex-1">
                                <Text className="text-slate-800 font-medium leading-5">Submit 11:00 AM turnout stats immediately.</Text>
                                <Text className="text-slate-400 text-xs font-semibold mt-2">1 hour ago</Text>
                            </View>
                        </View>

                        <View className="bg-white p-5 rounded-2xl border-l-[5px] border-l-green-500 shadow-sm flex-row items-start">
                            <View className="flex-1">
                                <Text className="text-slate-800 font-medium leading-5">Deployment Plan approved for tomorrow.</Text>
                                <Text className="text-slate-400 text-xs font-semibold mt-2">Yesterday</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Auditor Forensic Tools */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6 overflow-hidden relative">
                    <View className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 to-green-600" />

                    <View className="flex-row items-center mb-5 mt-2">
                        <View className="bg-green-100 p-3 rounded-2xl mr-4">
                            <Text className="text-2xl">🛡️</Text>
                        </View>
                        <Text className="text-green-800 text-2xl font-extrabold flex-1">Auditor Forensic Tools</Text>
                    </View>

                    <View className="bg-green-50 p-6 rounded-3xl border border-green-200/50 mt-2">
                        <Text className="text-green-900 text-lg font-bold mb-3 tracking-tight">Secure Data Export (Immutable Ledger)</Text>
                        <Text className="text-green-800/80 leading-6 mb-6 text-sm font-medium">
                            Download the complete public ledger for offline forensic analysis. The export is packaged as a highly-compressed zip archive containing the raw ledger.json and a cryptographic signature.sha256 to mathematically verify data integrity.
                        </Text>

                        <TouchableOpacity
                            className={`rounded-2xl py-4 px-2 flex-row justify-center items-center shadow-md ${exporting ? 'bg-slate-400 shadow-none' : 'bg-green-600 shadow-green-200'}`}
                            onPress={handleExportLedger}
                            disabled={exporting}
                        >
                            {exporting ? (
                                <View className="flex-row items-center justify-center">
                                    <ActivityIndicator color="white" size="small" className="mr-3" />
                                    <Text className="text-white font-bold text-[17px] tracking-wide">Packaging Ledger...</Text>
                                </View>
                            ) : (
                                <Text className="text-white font-bold text-[17px] tracking-wide">⬇️ Download Ledger (.zip)</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};

export default ReportsView;

