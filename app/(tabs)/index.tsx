import React from 'react';
import { View, Text, Image, TextInput, Pressable , FlatList, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type';

type Product = {
  id: string;
  name: string;
  price: string;
  image: any;
  attributes: { color: string; size: string };
  description: string;
  category: string;
};

type Category = string;

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const categories: Category[] = ['Giày thể thao', 'Giày công sở', 'Giày nam', 'Giày nữ'];
  

  const products: Product[] = [
    {
      id: '1',
      name: 'Sản phẩm 1',
      price: '199000 VND',
      image: require('@/assets/images/1.jpg'),
      attributes: { color: 'Đỏ', size: '42' }, 
      description: 'Mô tả sản phẩm 1',
      category: 'Giày thể thao',
    },
    {
      id: '2',
      name: 'Sản phẩm 2',
      price: '199000 VND',
      image: require('@/assets/images/2.jpg'),
      attributes: { color: 'Xanh', size: '40' },
      description: 'Mô tả sản phẩm 2',
      category: 'Giày công sở',
    },
    {
      id: '3',
      name: 'Sản phẩm 3',
      price: '199000 VND',
      image: require('@/assets/images/3.jpg'),
      attributes: { color: 'Trắng', size: '41' },
      description: 'Mô tả sản phẩm 3',
      category: 'Giày nam',
    },
    {
      id: '4',
      name: 'Sản phẩm 4',
      price: '199000 VND',
      image: require('@/assets/images/4.jpg'),
      attributes: { color: 'Đen', size: '39' },
      description: 'Mô tả sản phẩm 4',
      category: 'Giày nữ',
    },
  ];

  const renderProductItem = ({ item }: { item: Product }) => (
    <Pressable
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })} 
    >
      <Image 
        source={item.image} 
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <Pressable style={styles.heartIcon}>
        <Ionicons name="heart-outline" size={24} color="red" />
      </Pressable>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}> 
      <View style={styles.header}>
        <Image source={require('@/assets/images/21.jpeg')} style={styles.logo} />
        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <Ionicons name="filter" size={24} style={styles.filterIcon} />
      </View>

      <View style={styles.sliderBanner}>
        <Image
          source={require('@/assets/images/banner.jpg')} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.categoriesContainer}>
        <View style={styles.categoryHeader}>
          <Text style={styles.sectionTitle}>Danh mục</Text>
          <Pressable>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </Pressable>
        </View>
        <FlatList
          data={categories}
          horizontal
          renderItem={({ item }: { item: Category }) => (
            <Pressable style={styles.categoryButton}>
              <ImageBackground
                source={require('@/assets/images/background.jpg')} 
                style={styles.categoryBackground}
                imageStyle={{ borderRadius: 8 }} 
              >
                <Text style={styles.categoryText}>{item}</Text>
              </ImageBackground>
            </Pressable>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.productsContainer}>
        <View style={styles.productHeader}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          <Pressable>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </Pressable>
        </View>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  filterIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    padding: 8,
  },
  sliderBanner: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productsContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007BFF',
  },
  categoryButton: {
    marginRight: 10,
    borderRadius: 8,
  },
  categoryBackground: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  productCard: {
    flexDirection: 'row', 
    backgroundColor: '#f8f8f8',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center', 
    position: 'relative',
  },
  productImage: {
    width: 50,  
    height: 50, 
    marginRight: 20, 
  },
  productInfo: {
    flex: 1,  
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  cartIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  heartIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default Home;
