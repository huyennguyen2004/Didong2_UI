import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';

export default function TabTwoScreen() {
  const item = 'Danh mục mẫu'; // Ví dụ dữ liệu cho Text

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/banner.jpg')} 
        style={styles.categoryBackground}
        imageStyle={{ borderRadius: 8 }} 
      >
        <Text style={styles.categoryText}>{item}</Text>
      </ImageBackground>

      {/* Tiêu đề chính */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Khám phá</ThemedText>
      </ThemedView>

      {/* Fashion Section */}
      <ThemedView style={[styles.sectionContainer, styles.fashionSection]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="shirt" size={24} color="#000" />
          <ThemedText style={styles.blackText} type="title">Thời trang</ThemedText>
        </View>
        <ThemedText style={styles.blackText}>Khám phá các xu hướng thời trang mới nhất.</ThemedText>
      </ThemedView>

      {/* Articles Section */}
      <ThemedView style={[styles.sectionContainer, styles.articlesSection]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="newspaper" size={24} color="#000" />
          <ThemedText style={styles.blackText} type="title">Bài viết</ThemedText>
        </View>
        <ThemedText style={styles.blackText}>Đọc các bài viết thú vị và hữu ích.</ThemedText>
      </ThemedView>

      {/* Vouchers Section */}
      <ThemedView style={[styles.sectionContainer, styles.vouchersSection]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="card" size={24} color="#000" />
          <ThemedText style={styles.blackText} type="title">Voucher</ThemedText>
        </View>
        <ThemedText style={styles.blackText}>Nắm bắt các ưu đãi và voucher hấp dẫn.</ThemedText>
      </ThemedView>

      {/* Top Purchased Section */}
      <ThemedView style={[styles.sectionContainer, styles.topPurchasedSection]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="star" size={24} color="#000" />
          <ThemedText style={styles.blackText} type="title">Top Mua Nhiều Nhất</ThemedText>
        </View>
        <ThemedText style={styles.blackText}>Xem các sản phẩm được yêu thích nhất.</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Màu nền cho toàn bộ màn hình
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sectionContainer: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBackground: {
    height: 200,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  blackText: {
    color: '#000', // Màu chữ đen
  },
  fashionSection: {
    backgroundColor: '#ffebee', // Màu nền cho Thời trang
  },
  articlesSection: {
    backgroundColor: '#e3f2fd', // Màu nền cho Bài viết
  },
  vouchersSection: {
    backgroundColor: '#e8f5e9', // Màu nền cho Voucher
  },
  topPurchasedSection: {
    backgroundColor: '#fff3e0', // Màu nền cho Top Mua Nhiều Nhất
  },
});
