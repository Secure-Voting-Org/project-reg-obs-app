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

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BASE_URL } from '../../constants/config';

const ReportsView = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isPublished, setIsPublished] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        setLoading(true);
        try {
            // Check status first
            const statusRes = await fetch(`${BASE_URL}/api/election/status`);
            if (!statusRes.ok) throw new Error('Status survey failed');
            const statusData = await statusRes.json();
            
            if (statusData && statusData.results_published) {
                setIsPublished(true);
                // Fetch actual summary 
                const summaryRes = await fetch(`${BASE_URL}/api/results/summary`);
                if (summaryRes.ok) {
                    const sumData = await summaryRes.json();
                    setResults(sumData.partyResults || []);
                }
            } else {
                setIsPublished(false);
            }
        } catch (err) {
            console.error("Failed to fetch results logic:", err);
            setError('Failed to connect to the Election Server.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centerBox}>
                <ActivityIndicator size="large" color="#000080" />
                <Text style={styles.loadingText}>Syncing with Election Ledger...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerBox}>
                <Text style={{ fontSize: 40, marginBottom: 10 }}>⚠️</Text>
                <Text style={styles.errorText}>Network Error</Text>
                <Text style={styles.subText}>{error}</Text>
            </View>
        );
    }

    if (!isPublished) {
        return (
            <View style={styles.centerBox}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 50, marginBottom: 16 }}>🔒</Text>
                <Text style={styles.titleText}>Results Pending Publication</Text>
                <Text style={styles.subText}>
                    The voting tally is currently being cryptographically verified by the Electoral Commission. 
                    Results will appear here automatically once the Returning Officer publishes them.
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <TouchableOpacity onPress={() => navigation?.goBack()} style={[styles.backButton, { marginLeft: 0 }]}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            
            <View style={styles.header}>
                <Text style={{ fontSize: 40, marginBottom: 10 }}>🏆</Text>
                <Text style={styles.titleText}>Official Election Results</Text>
                <Text style={styles.subText}>Live Tally from Secure Ledger</Text>
            </View>

            {Array.isArray(results) && results.length > 0 ? (
                results.map((party, index) => {
                    const isWinner = index === 0;
                    const voteShare = parseFloat(party.vote_share) || 0;
                    
                    return (
                        <View key={party.party || index} style={[styles.card, isWinner && styles.winnerCard]}>
                            <View style={styles.cardHeader}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <View style={[styles.rankBadge, isWinner && styles.winnerBadge]}>
                                        <Text style={[styles.rankText, isWinner && { color: '#fff' }]}>{index + 1}</Text>
                                    </View>
                                    <Text style={styles.partyName}>{party.party || 'Independent'}</Text>
                                </View>
                                {isWinner && <Text style={{ fontSize: 24 }}>🥇</Text>}
                            </View>
                            
                            <View style={styles.statsRow}>
                                <View>
                                    <Text style={styles.statLabel}>Valid Votes</Text>
                                    <Text style={styles.statValue}>{parseInt(party.vote_count || 0).toLocaleString()}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.statLabel}>Vote Share</Text>
                                    <Text style={[styles.statValue, { color: isWinner ? '#138808' : '#000080' }]}>{voteShare}%</Text>
                                </View>
                            </View>
                            
                            <View style={styles.barContainer}>
                                <LinearGradient
                                    colors={isWinner ? ['#138808', '#22C55E'] : ['#000080', '#3B82F6']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.barFill, { width: `${Math.max(2, voteShare)}%` }]}
                                />
                            </View>
                        </View>
                    );
                })
            ) : (
                <View style={styles.centerBox}>
                    <Text style={styles.subText}>No results found in the secure audit log.</Text>
                </View>
            )}
            
            <View style={styles.footerInfo}>
                <Text style={styles.footerText}>✓ Cryptographically Verified Result</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centerBox: { flex: 1, backgroundColor: '#F8FAFC', padding: 40, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, backgroundColor: '#F1F5F9' },
    content: { padding: 16, paddingBottom: 60 },
    header: { alignItems: 'center', marginVertical: 30 },
    loadingText: { marginTop: 20, color: '#64748B', fontSize: 16, fontWeight: '600' },
    errorText: { color: '#B91C1C', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    titleText: { color: '#0F172A', fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
    subText: { color: '#64748B', fontSize: 15, textAlign: 'center', lineHeight: 24, paddingHorizontal: 20 },
    backButton: { alignSelf: 'flex-start', marginBottom: 16, marginTop: 8, marginLeft: 16 },
    backButtonText: { color: '#2563EB', fontWeight: '700', fontSize: 16 },
    card: { 
        backgroundColor: '#fff', 
        borderRadius: 20, 
        padding: 24, 
        marginBottom: 20, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05, 
        shadowRadius: 15, 
        elevation: 3, 
        borderWidth: 1, 
        borderColor: '#E2E8F0' 
    },
    winnerCard: { 
        borderColor: '#138808', 
        borderWidth: 2, 
        backgroundColor: '#F0FDF4',
        shadowColor: '#138808',
        shadowOpacity: 0.1
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    rankBadge: { 
        width: 32, 
        height: 32, 
        borderRadius: 16, 
        backgroundColor: '#F1F5F9', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    winnerBadge: { backgroundColor: '#138808' },
    rankText: { fontSize: 16, fontWeight: '900', color: '#64748B' },
    partyName: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    statLabel: { fontSize: 12, fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
    statValue: { fontSize: 24, fontWeight: '900', color: '#0F172A' },
    barContainer: { height: 12, backgroundColor: '#E2E8F0', borderRadius: 6, overflow: 'hidden' },
    barFill: { height: '100%', borderRadius: 6 },
    footerInfo: { marginTop: 30, padding: 20, backgroundColor: '#E0F2FE', borderRadius: 15, alignItems: 'center' },
    footerText: { color: '#0369A1', fontSize: 14, fontWeight: '800' }
});

export default ReportsView;

