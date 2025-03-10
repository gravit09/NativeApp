import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/api/api";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Something Went Wrong!!</Text>
        ) : (
          <FlatList
            data={movies}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <View className="px-5">
                <Image
                  source={icons.logo}
                  className="w-12 h-10 mt-20 mb-5 mx-auto"
                />
                <SearchBar
                  onPress={() => router.push("/search")}
                  placeholder="search for a movie"
                />
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest Movies
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 5 }}
          />
        )}
      </View>
    </View>
  );
}
