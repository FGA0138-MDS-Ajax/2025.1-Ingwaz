import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { getWeatherList, getWeatherDetail } from "../services/api";
import ScreenLayout from "../components/ScreenLayout";

export default function WeatherScreen() {
  const route = useRoute();
  const { propriedadeId } = route.params;

  const [forecastList, setForecastList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [carregandoDetalhe, setCarregandoDetalhe] = useState(false);
  const [erro, setErro] = useState(null);
  const [useCache, setUseCache] = useState(true);

  const fetchWeatherList = useCallback(async () => {
    setCarregandoLista(true);
    setErro(null);
    setSelectedDay(null);
    try {
      const data = await getWeatherList(propriedadeId, useCache);
      if (data && data.daily && data.daily.time) {
        const formattedData = data.daily.time.map((time, index) => ({
          time: time,
          temp_max: data.daily.temperature_2m_max[index],
          temp_min: data.daily.temperature_2m_min[index],
          precipitation: data.daily.precipitation_sum[index],
          windspeed: data.daily.windspeed_10m_max[index],
          units: data.daily_units,
        }));
        setForecastList(formattedData);
      } else {
        setForecastList([]);
        setErro(data.error || "Formato de dados inesperado.");
      }
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregandoLista(false);
    }
  }, [propriedadeId, useCache]);

  useEffect(() => {
    fetchWeatherList();
  }, [fetchWeatherList]);

  const handleSelectDay = async (date) => {
    setCarregandoDetalhe(true);
    setErro(null);
    try {
      // Se o dia já está selecionado, esconde os detalhes
      if (selectedDay && selectedDay.time === date) {
        setSelectedDay(null);
        return;
      }
      const data = await getWeatherDetail(propriedadeId, date);
      if (data && data.daily) {
        setSelectedDay({ ...data.daily, units: data.daily_units });
      } else {
        setErro(data.erro || "Não foi possível carregar os detalhes do dia.");
      }
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregandoDetalhe(false);
    }
  };

  const renderForecastItem = ({ item }) => {
    const date = new Date(item.time + "T00:00:00");
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    const isSelected = selectedDay && selectedDay.time === item.time;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => handleSelectDay(item.time)}
      >
        <Text style={styles.dateText}>{formattedDate}</Text>
        <View>
          <Text style={styles.tempText}>
            <Ionicons name="thermometer-outline" size={16} color="#e63946" />{" "}
            {item.temp_max}° / {item.temp_min}°
          </Text>
          <Text style={styles.precipText}>
            <Ionicons name="water-outline" size={16} color="#0077b6" />{" "}
            {item.precipitation} mm
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.switchContainer}>
          <Text style={styles.cacheLabel}>Usar Cache</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={useCache ? "#2c6e49" : "#f4f3f4"}
            onValueChange={() => setUseCache((previousState) => !previousState)}
            value={useCache}
          />
          <TouchableOpacity onPress={fetchWeatherList} style={styles.refreshButton}>
            <Ionicons name="refresh" size={24} color="#2c6e49" />
          </TouchableOpacity>
        </View>
      </View>

      {selectedDay && (
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>Detalhes de {selectedDay.time}</Text>
          {carregandoDetalhe ? (
            <ActivityIndicator size="small" color="#004d40" />
          ) : (
            <>
              <Text style={styles.detailText}>
                Temp. Máx: {selectedDay.temperature_2m_max}
                {selectedDay.units?.temperature_2m_max}
              </Text>
              <Text style={styles.detailText}>
                Temp. Mín: {selectedDay.temperature_2m_min}
                {selectedDay.units?.temperature_2m_min}
              </Text>
              <Text style={styles.detailText}>
                Precipitação: {selectedDay.precipitation_sum}
                {selectedDay.units?.precipitation_sum}
              </Text>
              <Text style={styles.detailText}>
                Vento: {selectedDay.windspeed_10m_max}
                {selectedDay.units?.windspeed_10m_max}
              </Text>
            </>
          )}
        </View>
      )}
    </>
  );

  return (
    <ScreenLayout hasHeader={true}>
      {carregandoLista ? (
        <ActivityIndicator size="large" color="#2c6e49" style={{ marginTop: 50 }} />
      ) : erro ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>{erro}</Text>
        </View>
      ) : (
        <FlatList
          data={forecastList}
          keyExtractor={(item) => item.time}
          renderItem={renderForecastItem}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={
            !carregandoLista && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyMessage}>Nenhuma previsão encontrada.</Text>
              </View>
            )
          }
        />
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    paddingTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 1,
  },
  cacheLabel: {
    fontSize: 16,
    color: "#333",
  },
  refreshButton: {
    padding: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#2c6e49",
    borderWidth: 2,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c6e49",
  },
  tempText: {
    fontSize: 16,
    color: "#333",
    textAlign: "right",
  },
  precipText: {
    fontSize: 14,
    color: "#555",
    textAlign: "right",
    marginTop: 4,
  },
  detailContainer: {
    backgroundColor: "#e0f2f1",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#004d40",
  },
  detailText: {
    fontSize: 16,
    color: "#00695c",
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyMessage: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 16,
    color: "#888",
  },
});
