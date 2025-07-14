import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { getCropCalendar } from "./api";
import ScreenLayout from "../../components/ScreenLayout";

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const ActivityTimeline = ({ plantios, colheitas, plantios_colheitas }) => {
  const monthPercentage = 100 / 12;

  const renderActivityBars = (monthArray, style) => {
    if (!monthArray || monthArray.length === 0) return null;

    const ranges = [];
    let currentRange = [];

    monthArray
      .sort((a, b) => a - b)
      .forEach((month, index) => {
        if (index === 0) {
          currentRange.push(month);
        } else {
          const prevMonth = monthArray[index - 1];
          if (month === prevMonth + 1) {
            currentRange.push(month);
          } else {
            ranges.push(currentRange);
            currentRange = [month];
          }
        }
      });
    ranges.push(currentRange);

    return ranges.map((range, index) => {
      const startMonthIndex = range[0] - 1;
      const barWidth = range.length * monthPercentage;
      const barLeft = startMonthIndex * monthPercentage;

      return (
        <View
          key={index}
          style={[styles.bar, style, { width: `${barWidth}%`, left: `${barLeft}%` }]}
        />
      );
    });
  };

  return (
    <View style={styles.activityBarContainer}>
      {renderActivityBars(plantios, styles.plantio)}
      {renderActivityBars(colheitas, styles.colheita)}
      {renderActivityBars(plantios_colheitas, styles.plantioColheita)}
    </View>
  );
};

const RegionCalendarCard = ({ region }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.stateColumn} />
        <View style={styles.timelineColumn}>
          <View style={styles.seasonsContainer}>
            <View style={styles.season}>
              <Text style={styles.seasonIcon}>☀️</Text>
              <Text style={styles.seasonText}>Verão</Text>
            </View>
            <View style={styles.season}>
              <Text style={styles.seasonIcon}>🍂</Text>
              <Text style={styles.seasonText}>Outono</Text>
            </View>
            <View style={styles.season}>
              <Text style={styles.seasonIcon}>❄️</Text>
              <Text style={styles.seasonText}>Inverno</Text>
            </View>
            <View style={styles.season}>
              <Text style={styles.seasonIcon}>🌸</Text>
              <Text style={styles.seasonText}>Primavera</Text>
            </View>
          </View>
          <View style={styles.timelineMonths}>
            {months.map((month) => (
              <Text key={month} style={styles.monthText}>
                {month}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.cardBody}>
        {region.states.map((state) => (
          <View key={state.name} style={styles.stateRow}>
            <View style={styles.stateColumn}>
              <Text style={styles.stateNameText}>{state.name}</Text>
            </View>
            <View style={styles.timelineColumn}>
              <ActivityTimeline
                plantios={state.plantios}
                colheitas={state.colheitas}
                plantios_colheitas={state.plantios_colheitas}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function App() {
  const navigation = useNavigation();

  const route = useRoute();

  const { cropSlug } = route.params;

  const [cropData, setCropData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cropSlug) {
      setError("Nenhuma cultura foi selecionada.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setCropData(null);

      try {
        const data = await getCropCalendar(cropSlug);

        if (data) {
          setCropData(data);
        } else {
          throw new Error("Não foi possível carregar os dados do calendário.");
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cropSlug]);

  useLayoutEffect(() => {
    if (cropData) {
      navigation.setOptions({
        headerRight: () => <Text style={styles.subHeader}>{cropData.name}</Text>,
      });
    } else {
      navigation.setOptions({ headerRight: null });
    }
  }, [navigation, cropData]);

  if (loading) {
    return (
      <ScreenLayout>
        <ActivityIndicator size="large" color="#16a34a" />
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout isScrollable={true} hasHeader={true}>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, styles.plantio]} />
          <Text style={styles.legendText}>Plantio</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, styles.colheita]} />
          <Text style={styles.legendText}>Colheita</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColorBox, styles.plantioColheita]} />
          <Text style={styles.legendText}>Plantio/Colheita</Text>
        </View>
      </View>

      {cropData &&
        cropData.regions.map((region) => (
          <View key={region.name} style={styles.regionSection}>
            <Text style={styles.regionTitle}>{region.name}</Text>
            <RegionCalendarCard region={region} />
          </View>
        ))}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 12,
    borderRadius: 6,
    position: "absolute",
  },
  plantio: { backgroundColor: "#3b82f6" },
  colheita: { backgroundColor: "#f97316" },
  plantioColheita: { backgroundColor: "#16a34a" },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
  },

  subHeader: { fontSize: 16, fontWeight: "400", color: "#555" },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    gap: 20,
  },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendColorBox: { width: 14, height: 14, borderRadius: 4, marginRight: 8 },
  legendText: { fontSize: 14, color: "#52525b" },
  regionSection: { marginBottom: 24 },
  regionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#18181b",
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    paddingTop: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  cardBody: { paddingVertical: 8 },
  stateColumn: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  timelineColumn: { flex: 1, paddingRight: 8 },
  seasonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  season: { alignItems: "center", flex: 1 },
  seasonIcon: { fontSize: 24 },
  seasonText: { fontSize: 12, color: "#71717a", marginTop: 4 },
  timelineMonths: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
  monthText: {
    fontSize: 12,
    color: "#a1a1aa",
    width: `${100 / 12}%`,
    textAlign: "center",
  },
  stateRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  stateNameText: { fontSize: 14, fontWeight: "500", color: "#52525b" },
  activityBarContainer: {
    height: 12,
    width: "100%",
    backgroundColor: "#e4e4e7",
    borderRadius: 6,
    position: "relative",
  },
});
