
'use client'
import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

// PDF Document Component
// PDF Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
        fontFamily: 'Helvetica'
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#1a365d',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    brand: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a365d',
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 16,
        color: '#4a5568',
        marginTop: 5
    },
    invoiceInfo: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 10,
        color: '#718096',
        marginBottom: 4,
        textTransform: 'uppercase'
    },
    value: {
        fontSize: 12,
        color: '#2d3748',
        fontWeight: 'bold'
    },
    section: {
        marginTop: 30,
        marginBottom: 10
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderColor: '#e2e8f0',
        marginTop: 10
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeader: {
        width: "75%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: '#e2e8f0',
        backgroundColor: '#f7fafc',
        padding: 8
    },
    tableColPriceHeader: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: '#e2e8f0',
        backgroundColor: '#f7fafc',
        padding: 8
    },
    tableCol: {
        width: "75%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: '#e2e8f0',
        padding: 8
    },
    tableColPrice: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: '#e2e8f0',
        padding: 8,
        textAlign: 'right'
    },
    tableCellHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#4a5568'
    },
    tableCell: {
        fontSize: 10,
        color: '#2d3748'
    },
    totalSection: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    totalLabel: {
        fontSize: 12,
        color: '#4a5568',
        marginRight: 20
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a365d'
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 10,
        color: '#a0aec0',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 20
    },
    statusBadge: {
        padding: '4 10',
        backgroundColor: '#c6f6d5',
        borderRadius: 4,
        color: '#22543d',
        fontSize: 10,
        textTransform: 'uppercase',
        alignSelf: 'flex-start'
    }
});


const ReceiptPDF = ({ paymentData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.brand}>IJARMY</Text>
                    <Text style={styles.title}>Official Payment Receipt</Text>
                </View>
                <View style={styles.statusBadge}>
                    <Text>PAID</Text>
                </View>
            </View>

            {/* Info Grid */}
            <View style={styles.invoiceInfo}>
                <View>
                    <Text style={styles.label}>Receipt Number</Text>
                    <Text style={styles.value}>{paymentData?.id || paymentData?.txnId || 'N/A'}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Date Paid</Text>
                    <Text style={styles.value}>
                        {paymentData?.createdAt ? new Date(paymentData.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                    </Text>
                </View>
            </View>

            <View style={styles.invoiceInfo}>
                <View>
                    <Text style={styles.label}>Billed To</Text>
                    <Text style={styles.value}>{paymentData?.payerName || 'Author'}</Text>
                    <Text style={{ fontSize: 10, color: '#4a5568', marginTop: 2 }}>
                        {paymentData?.payerEmail || ''}
                    </Text>
                </View>
            </View>

            {/* Table */}
            <View style={styles.section}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCellHeader}>Description</Text>
                        </View>
                        <View style={styles.tableColPriceHeader}>
                            <Text style={[styles.tableCellHeader, { textAlign: 'right' }]}>Amount</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Paper Processing Charge</Text>
                            <Text style={[styles.tableCell, { color: '#718096', marginTop: 4 }]}>
                                Manuscript: {paymentData?.paper?.title}
                            </Text>
                            <Text style={[styles.tableCell, { color: '#718096', marginTop: 2 }]}>
                                Paper ID: {paymentData?.paperId?.slice(0, 8)}
                            </Text>
                        </View>
                        <View style={styles.tableColPrice}>
                            <Text style={styles.tableCell}>{parseFloat(paymentData?.amount || 0).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Total */}
            <View style={styles.totalSection}>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.totalLabel}>Total Paid:</Text>
                    <Text style={styles.totalValue}>INR {parseFloat(paymentData?.amount || 0).toFixed(2)}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>This is a computer-generated receipt.</Text>
                <Text>IJARMY Research Publisher • contact@ijarmy.com</Text>
            </View>
        </Page>
    </Document>
);

export default ReceiptPDF