import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type Product = {
  id: string;
  name: string;
  price: string;
};

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Product 1', price: '10000' },
    { id: '2', name: 'Product 2', price: '20000' },
    { id: '3', name: 'Product 3', price: '30000' },
  ]);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    '1': 1,
    '2': 1,
    '3': 1,
  });

  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: boolean }>({});

  const handleIncrease = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id: string) => {
    setQuantities((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      }
      return prev;
    });
  };

  const handleRemove = (id: string) => {
    setProducts((prev) => prev.filter(product => product.id !== id));
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const handleCheckboxChange = (id: string, newValue: boolean) => {
    setSelectedProducts((prev) => ({ ...prev, [id]: newValue }));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      if (selectedProducts[product.id]) {
        return total + parseInt(product.price) * quantities[product.id];
      }
      return total;
    }, 0);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => handleCheckboxChange(item.id, !selectedProducts[item.id])}>
        <Text style={styles.check}>{selectedProducts[item.id] ? '☑' : '☐'}</Text>
      </TouchableOpacity>
      <Image 
        source={require('@/assets/images/1.jpg')} 
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleRemove(item.id)}>
            <Text style={styles.removeButton}>X</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>{item.price} đ</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
      />
      
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng cộng: {calculateTotal()} đ</Text>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  check: {
    fontSize: 16,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#f5a623',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    textAlign: 'left', 
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 4,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
