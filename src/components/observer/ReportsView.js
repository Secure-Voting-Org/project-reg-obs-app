import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BASE_URL } from '../../constants/config';

const ReportsView = () => {
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
