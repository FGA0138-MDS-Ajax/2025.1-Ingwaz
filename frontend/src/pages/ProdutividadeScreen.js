import React, { useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import ScreenLayout from "../components/ScreenLayout";

const MOCK_PLANTIOS = [
  {
    id: 1,
    cultura: "Soja",
    hectares: 150,
    dataColheita: "2025-09-20T00:00:00Z",
    produtividadeMedia: 62,
  },
  {
    id: 2,
    cultura: "Milho",
    hectares: 80,
    dataColheita: "2025-10-15T00:00:00Z",
    produtividadeMedia: 180,
  },
  {
    id: 3,
    cultura: "Soja",
    hectares: 75,
    dataColheita: "2025-09-25T00:00:00Z",
    produtividadeMedia: 60,
  },
  {
    id: 4,
    cultura: "Café",
    hectares: 25,
    dataColheita: "2025-08-30T00:00:00Z",
    produtividadeMedia: 40,
  },
  {
    id: 5,
    cultura: "Algodão",
    hectares: 120,
    dataColheita: "2025-11-05T00:00:00Z",
    produtividadeMedia: 300,
  },
  {
    id: 6,
    cultura: "Milho",
    hectares: 100,
    dataColheita: "2025-10-22T00:00:00Z",
    produtividadeMedia: 175,
  },
];

const MOCK_COTACOES = {
  Soja: 155.0,
  Milho: 92.5,
  Café: 1350.0,
  Algodão: 120.0,
};

const formatCurrency = (value) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const KpiCard = ({ icon, label, value, isPrimary = false }) => (
  <View style={[styles.kpiCard, isPrimary && styles.kpiCardPrimary]}>
    <Icon name={icon} size={32} color={isPrimary ? colors.white : colors.primary} />
    <Text style={[styles.kpiValue, isPrimary && styles.kpiValuePrimary]}>{value}</Text>
    <Text style={[styles.kpiLabel, isPrimary && styles.kpiLabelPrimary]}>{label}</Text>
  </View>
);

const PlantioCard = ({ plantio, lucro }) => {
  const icons = {
    Soja: "soybean",
    Milho: "corn",
    Café: "coffee",
    Algodão: "cotton",
  };

  return (
    <View style={styles.plantioCard}>
      <View style={styles.plantioIconContainer}>
        <Icon
          name={icons[plantio.cultura] || "barley"}
          size={30}
          color={colors.primary}
        />
      </View>
      <View style={styles.plantioInfo}>
        <Text style={styles.plantioTitle}>{plantio.cultura}</Text>
        <Text
          style={styles.plantioSubtitle}
        >{`${plantio.hectares} ha · Colheita em ${new Date(plantio.dataColheita).toLocaleDateString("pt-BR")}`}</Text>
      </View>
      <View style={styles.plantioLucroContainer}>
        <Text style={styles.plantioLucro}>{formatCurrency(lucro)}</Text>
      </View>
    </View>
  );
};

const ProdutividadeScreen = () => {
  const dadosProcessados = useMemo(() => {
    const totaisPorCultura = MOCK_PLANTIOS.reduce((acc, plantio) => {
      const { cultura, hectares, produtividadeMedia } = plantio;
      const preco = MOCK_COTACOES[cultura] || 0;
      const lucro = hectares * produtividadeMedia * preco;

      if (!acc[cultura]) {
        acc[cultura] = { lucro: 0, hectares: 0 };
      }

      acc[cultura].lucro += lucro;
      acc[cultura].hectares += hectares;
      return acc;
    }, {});

    const chartData = Object.keys(totaisPorCultura).map((cultura) => ({
      value: totaisPorCultura[cultura].lucro,
      label: cultura,
      frontColor: colors.primary,
    }));

    const lucroTotal = Object.values(totaisPorCultura).reduce(
      (sum, cultura) => sum + cultura.lucro,
      0,
    );
    const hectaresTotais = Object.values(totaisPorCultura).reduce(
      (sum, cultura) => sum + cultura.hectares,
      0,
    );

    return { chartData, lucroTotal, hectaresTotais };
  }, []);

  return (
    <ScreenLayout hasHeader={true} isScrollable={true}>
      <View style={styles.kpiRow}>
        <KpiCard
          isPrimary
          icon="finance"
          label="Lucro Bruto Estimado"
          value={formatCurrency(dadosProcessados.lucroTotal)}
        />
      </View>
      <View style={styles.kpiRow}>
        <KpiCard
          icon="image-area"
          label="Área Total Plantada"
          value={`${dadosProcessados.hectaresTotais.toFixed(0)} ha`}
        />
        <KpiCard
          icon="chart-donut"
          label="Culturas Ativas"
          value={dadosProcessados.chartData.length}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Lucro por Cultura</Text>
        <View style={styles.chartWrapper}>
          <BarChart
            data={dadosProcessados.chartData}
            barWidth={35}
            spacing={25}
            yAxisTextStyle={{ color: colors.textSecondary }}
            xAxisLabelTextStyle={{ color: colors.textSecondary, marginTop: 5 }}
            yAxisLabelSuffix="k"
            yAxisThickness={0}
            xAxisThickness={0}
            noOfSections={5}
            isAnimated
            yAxisLabelFormatter={(value) => `${Math.round(value / 1000)}`}
            renderTooltip={(item) => (
              <View style={styles.tooltip}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {formatCurrency(item.value)}
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Detalhes dos Plantios</Text>
        {MOCK_PLANTIOS.map((plantio) => {
          const lucroPlantio =
            plantio.hectares *
            plantio.produtividadeMedia *
            (MOCK_COTACOES[plantio.cultura] || 0);
          return <PlantioCard key={plantio.id} plantio={plantio} lucro={lucroPlantio} />;
        })}
      </View>
    </ScreenLayout>
  );
};

const colors = {
  primary: "#2e5339",
  primaryLight: "#CEEBAF",
  secondary: "#E9C46A",
  background: "#F8F9FA",
  textPrimary: "#264653",
  textSecondary: "#6c757d",
  white: "#FFFFFF",
  border: "#E0E0E0",
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  kpiCardPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginVertical: 4,
  },
  kpiValuePrimary: {
    color: colors.white,
  },
  kpiLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  kpiLabelPrimary: {
    color: colors.white,
    opacity: 0.9,
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 15,
  },
  chartWrapper: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  tooltip: {
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  plantioCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  plantioIconContainer: {
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 50,
    marginRight: 15,
  },
  plantioInfo: {
    flex: 1,
  },
  plantioTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  plantioSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  plantioLucroContainer: {
    marginLeft: 10,
  },
  plantioLucro: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default ProdutividadeScreen;
