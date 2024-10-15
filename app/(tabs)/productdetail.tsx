import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Product = {
  id: string;
  name: string;
  price: string;
  image: any;
  attributes: { color: string; size: string };
  description: string;
  category: string;
};

const product: Product = {
  id: '1',
  name: 'Giày thể thao nam',
  price: '1.500.000 VND',
  image: require('@/assets/images/2.jpg'), 
  attributes: { color: 'Đen', size: '42' },
  description: 'Giày thể thao nam cao cấp, thích hợp cho hoạt động thể thao và hàng ngày.',
  category: 'Giày thể thao',
};

// Danh sách màu sắc và kích cỡ
const colors = [
  { name: 'Đen', hex: '#000000' },
  { name: 'Trắng', hex: '#FFFFFF' },
  { name: 'Xám', hex: '#808080' },
  { name: 'Đỏ', hex: '#FF0000' },
  { name: 'Xanh dương', hex: '#0000FF' },
  { name: 'Xanh lá', hex: '#008000' },
];

const sizes = ['40', '41', '42', '43', '44'];

const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Giày thể thao nữ',
    price: '1.200.000 VND',
    image: require('@/assets/images/3.jpg'),
    attributes: { color: 'Trắng', size: '38' },
    description: 'Thiết kế trẻ trung năng động dành cho nữ.',
    category: 'Giày thể thao',
  },
  {
    id: '3',
    name: 'Giày chạy bộ',
    price: '1.800.000 VND',
    image: require('@/assets/images/1.jpg'),
    attributes: { color: 'Xám', size: '43' },
    description: 'Giày chạy bộ với đệm êm ái cho hoạt động vận động mạnh.',
    category: 'Giày chạy bộ',
  },
];

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.attributes.color);
  const [selectedSize, setSelectedSize] = useState(product.attributes.size);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    console.log(`Thêm ${quantity} sản phẩm vào giỏ với màu ${selectedColor} và kích cỡ ${selectedSize}`);
  };

  const buyNow = () => {
    console.log(`Mua ngay ${quantity} sản phẩm với màu ${selectedColor} và kích cỡ ${selectedSize}`);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  const renderColorOption = (color: { name: string; hex: string }) => (
    <TouchableOpacity
      style={[
        styles.colorOption,
        { backgroundColor: color.hex, borderWidth: selectedColor === color.name ? 2 : 1, borderColor: selectedColor === color.name ? '#000' : '#ccc' }
      ]}
      onPress={() => setSelectedColor(color.name)}
    />
  );

  const renderSizeOption = (size: string) => (
    <TouchableOpacity
      style={[
        styles.sizeOption,
        { backgroundColor: selectedSize === size ? '#007bff' : '#ccc' }
      ]}
      onPress={() => setSelectedSize(size)}
    >
      <Text style={styles.sizeText}>{size}</Text>
    </TouchableOpacity>
  );

  const renderRelatedProductItem = ({ item }: { item: Product }) => (
    <View style={styles.relatedProductCard}>
      <Image source={item.image} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName}>{item.name}</Text>
      <Text style={styles.relatedProductPrice}>{item.price}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.productImage} />

      <View style={styles.productDetails}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{product.name}</Text>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={24}
              color={isFavorite ? 'red' : '#333'}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>{product.price}</Text>

        <View style={styles.productAttributes}>
          <Text style={styles.attributeText}>Màu sắc:</Text>
          <View style={styles.colorOptionsContainer}>
            {colors.map(color => renderColorOption(color))}
          </View>
          <Text style={styles.attributeText}>Kích thước:</Text>
          <View style={styles.sizeOptionsContainer}>
            {sizes.map(size => renderSizeOption(size))}
          </View>
        </View>

        <View style={styles.productDescription}>
          <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>Đánh giá:</Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }, (_, index) => (
              <FontAwesome
                key={index}
                name={index < rating ? 'star' : 'star-o'}
                size={24}
                color="#FFD700"
              />
            ))}
          </View>
        </View>

        <View style={styles.quantitySection}>
          <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.buttonText}>Thêm vào giỏ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={buyNow}>
            <Text style={styles.buttonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentSection}>
          <Text style={styles.commentTitle}>Bình luận:</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Viết bình luận..."
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
            <Text style={styles.commentButtonText}>Gửi</Text>
          </TouchableOpacity>
          {comments.length > 0 && (
            <View style={styles.commentsList}>
              {comments.map((cmt, index) => (
                <Text key={index} style={styles.commentText}>
                  {cmt}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.relatedProductsSection}>
          <Text style={styles.sectionTitle}>Sản phẩm cùng loại</Text>
          <FlatList
            data={relatedProducts}
            renderItem={renderRelatedProductItem}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  productDetails: {
    padding: 20,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heartIcon: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    color: '#f00',
    marginVertical: 10,
  },
  productAttributes: {
    marginBottom: 20,
  },
  attributeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
  },
  sizeOption: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
  },
  sizeText: {
    fontWeight: 'bold',
  },
  productDescription: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buyNowButton: {
    backgroundColor: '#dc3545',
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  commentSection: {
    marginBottom: 20,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  commentsList: {
    marginTop: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  relatedProductsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  relatedProductCard: {
    width: 120,
    marginRight: 10,
    alignItems: 'center',
  },
  relatedProductImage: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  relatedProductPrice: {
    fontSize: 12,
    color: '#f00',
  },
});

export default ProductDetail;
