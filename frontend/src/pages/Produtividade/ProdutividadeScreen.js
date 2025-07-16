import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Svg, Text as SvgText } from "react-native-svg";

import ScreenLayout from "../../components/ScreenLayout";
import { CropIcons } from "../../components/CropIcons";
import { getPlantios } from "../Plantio/api";
import { getQuotes } from "../Cotacoes/api";

const formatCurrency = (value) => {
  if (typeof value !== "number") {
    return value;
  }
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const QuestionIcon = () => (
  <Svg height="80" width="80" viewBox="0 0 100 100">
    <SvgText
      x="50"
      y="65"
      fontSize="50"
      fontWeight="bold"
      fill="#2e5339"
      textAnchor="middle"
    >
      ?
    </SvgText>
  </Svg>
);

const ICONS_MAP = {
  soja: CropIcons.soja,
  milho: CropIcons.milho,
  café: CropIcons.cafe,
  algodão: CropIcons.algodao,
  amendoim: CropIcons.amendoim,
  arroz: CropIcons.arroz,
  feijao: CropIcons.feijao,
  girassol: CropIcons.girassol,
  mamona: CropIcons.mamona,
  cereal: CropIcons.cereal,
  sorgo: CropIcons.sorgo,
  canola: CropIcons.canola,
  centeio: CropIcons.centeio,
  cevada: CropIcons.barley,
  aveia: CropIcons.oat,
  triticale: CropIcons.triticale,
};

const KpiCard = ({ icon, label, value, isPrimary = false }) => (
  <View style={[styles.kpiCard, isPrimary && styles.kpiCardPrimary]}>
    <Text style={[styles.kpiValue, isPrimary && styles.kpiValuePrimary]}>{value}</Text>
    <Text style={[styles.kpiLabel, isPrimary && styles.kpiLabelPrimary]}>{label}</Text>
  </View>
);

const PlantioCard = ({ plantio, lucro, IconComponent }) => {
  return (
    <View style={styles.plantioCard}>
      <View style={styles.plantioIconContainer}>
        {IconComponent}
      </View>
      <View style={styles.plantioInfo}>
        <Text style={styles.plantioTitle}>{plantio.cultura}</Text>
        <Text style={styles.plantioSubtitle}>
          {`${parseFloat(plantio.area).toFixed(1)} ha · Colheita em ${new Date(plantio.estimativa_colheita  + "T12:00:00").toLocaleDateString("pt-BR")}`}
        </Text>
      </View>
      <View style={styles.plantioLucroContainer}>
        <Text style={styles.plantioLucro}>{lucro}</Text>
      </View>
    </View>
  );
};

const ProdutividadeScreen = () => {
  const [plantios, setPlantios] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [plantiosData, quotesData] = await Promise.all([
          getPlantios(),
          getQuotes(),
        ]);

        const plantiosComProdutividade = plantiosData.map((p) => ({
          ...p,
          produtividadeMedia: Math.floor(Math.random() * (200 - 40 + 1)) + 40,
        }));

        const quotesMap = quotesData.reduce((acc, quote) => {
          acc[quote.name] = parseFloat(quote.value);
          return acc;
        }, {});

        setPlantios(plantiosComProdutividade);
        setQuotes(quotesMap);
        setError(null);
      } catch (e) {
        setError("Não foi possível carregar os dados.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dadosProcessados = useMemo(() => {
    const totaisPorCultura = plantios.reduce((acc, plantio) => {
      const { cultura, area, produtividadeMedia } = plantio;
      const preco = quotes[cultura];

      if (preco) {
        const lucro = parseFloat(area) * produtividadeMedia * preco;
        if (!acc[cultura]) {
          acc[cultura] = { lucro: 0, hectares: 0 };
        }
        acc[cultura].lucro += lucro;
        acc[cultura].hectares += parseFloat(area);
      } else {
        if (!acc[cultura]) {
          acc[cultura] = { lucro: 0, hectares: 0 };
        }
        acc[cultura].hectares += parseFloat(area);
      }
      return acc;
    }, {});

    const chartData = Object.keys(totaisPorCultura)
      .filter((cultura) => totaisPorCultura[cultura].lucro > 0)
      .map((cultura) => ({
        value: Number(totaisPorCultura[cultura].lucro),
        label: cultura,
        frontColor: colors.primary,
      }));

    const lucroTotal = Object.values(totaisPorCultura).reduce(
      (sum, cultura) => sum + cultura.lucro,
      0,
    );

    const hectaresTotais = plantios.reduce((sum, p) => sum + parseFloat(p.area), 0);

    return { chartData, lucroTotal, hectaresTotais };
  }, [plantios, quotes]);

  if (loading) {
    return (
      <ScreenLayout hasHeader={true}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout hasHeader={true}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout hasHeader={true} isScrollable={true}>
      <View style={styles.container}>
        <View style={styles.kpiRow}>
          <KpiCard
            isPrimary
            label="Lucro Bruto Estimado"
            value={formatCurrency(dadosProcessados.lucroTotal)}
          />
        </View>
        <View style={styles.kpiRow}>
          <KpiCard
            label="Área Total Plantada"
            value={`${dadosProcessados.hectaresTotais.toFixed(1)} ha`}
          />
          <KpiCard
            label="Culturas Ativas"
            value={new Set(plantios.map((p) => p.cultura)).size}
          />
        </View>

        {dadosProcessados.chartData.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Lucro por Cultura</Text>
            <View style={styles.chartWrapper}>
              <BarChart
                data={dadosProcessados.chartData}
                barWidth={35}
                spacing={25}
                yAxisTextStyle={{ color: colors.textSecondary }}
                xAxisLabelTextStyle={{
                  color: colors.textSecondary,
                  marginTop: 5,
                  fontSize: 10,
                }}
                yAxisLabelSuffix="k"
                yAxisLabelWidth={60}
                yAxisThickness={0}
                xAxisThickness={0}
                noOfSections={5}
                isAnimated
                formatYLabel={(value) => (Math.round(value / 1000))}
                overflowTop={30}
                endSpacing={100}
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
        )}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Detalhes dos Plantios</Text>
          {plantios.map((plantio) => {
            const preco = quotes[plantio.cultura];
            const lucro = preco
              ? formatCurrency(
                  parseFloat(plantio.area) * plantio.produtividadeMedia * preco,
                )
              : "?";

            const normalizedCultura = plantio.cultura
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            const IconComponent = ICONS_MAP[normalizedCultura] || <QuestionIcon />;

            return (
              <PlantioCard
                key={plantio.id}
                plantio={plantio}
                lucro={lucro}
                IconComponent={IconComponent}
              />
            );
          })}
        </View>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  container: {
    flex: 1,
  },
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 10,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
  },
  kpiCardPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginVertical: 4,
  },
  kpiValuePrimary: {
    color: colors.white,
  },
  kpiLabel: {
    fontSize: 13,
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
    paddingVertical: 15,
    paddingHorizontal: 5,
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
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
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
