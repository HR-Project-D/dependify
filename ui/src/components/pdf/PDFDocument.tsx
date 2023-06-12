import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  table: {
    flexGrow: 1,
    margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
});

const PDFDocument = ({ data }: { data: any}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.table}>
        {data.map((row: any, index: any) => (
          <View style={styles.tableRow} key={index}>
            {row.map((cell: any, cellIndex: any) => (
              <Text style={styles.tableCell} key={cellIndex}>
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
