import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const bgs = ["#A5BBFF", "#DDBeFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image:
      "https://images.freeimages.com/images/large-previews/cf7/sunset-in-paris-1447018.jpg",
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image:
      "https://images.freeimages.com/images/large-previews/305/and-the-sun-goes-down-1641853.jpg",
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image:
      "https://images.freeimages.com/images/large-previews/501/st-thomas-margaritaville-1642021.jpg",
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image:
      "https://images.freeimages.com/images/large-previews/5e8/tropical-1641925.jpg",
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        flexDirection: "row",
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              opacity,
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, idx) => idx * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    ></Animated.View>
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        top: -height * 0.6,
        left: -height * 0.3,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 96,
        position: "absolute",
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    ></Animated.View>
  );
};

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              padding: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 0.7,
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={{
                  width: width / 2,
                  height: width / 2,
                  resizeMode: "contain",
                }}
              />
            </View>
            <View style={{ flex: 0.3 }}>
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: 28,
                  marginBottom: 10,
                  color: "#fff",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: "300",
                  color: "#fff",
                }}
              >
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
