import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';

import './product.dart';
import '../models/mutable_product.dart';
import '../models/http_exception.dart';

class Products with ChangeNotifier {
  static const url = 'https://pk-flutter-shop.firebaseio.com/products.json';

  final String _authToken;

  Products(this._authToken, this._items);

  List<Product> _items = [];

  List<Product> get items {
    return [..._items];
  }

  List<Product> get favoriteItems {
    return _items.where((element) => element.isFavorite == true).toList();
  }

  Product findById(String id) {
    return _items.firstWhere((element) => element.id == id);
  }

  Future<void> fetchAndSetProducts() async {
    try {
      final response = await get('$url?auth=$_authToken');
      final Map<String, dynamic> mapOfProducts = json.decode(response.body);
      final List<Product> loadedProducts = [];
      mapOfProducts.forEach((key, value) {
        loadedProducts.add(Product(
          id: key,
          title: value['title'],
          description: value['description'],
          price: value['price'],
          imageUrl: value['imageUrl'],
          isFavorite: value['isFavorite']
        ));
      });
      _items = loadedProducts;
      notifyListeners();
    } catch (e) {
      throw e;
    }
  }

  Future<void> addProduct(MutableProduct value) async {
    try {
      final response = await post('$url?auth=$_authToken', body: json.encode({
        'title': value.title,
        'description': value.description,
        'imageUrl': value.imageUrl,
        'price': value.price,
        'isFavorite': false,
      }));
      Product product = Product.newFromMutable(
          id: json.decode(response.body)['name'],
          product: value
      );
      _items.insert(0, product);
      notifyListeners();
    } catch (e) {
      print(e);
      throw e;
    }

  }

  Future<void> updateProduct(MutableProduct updatedProduct) async {
    String url = 'https://pk-flutter-shop.firebaseio.com/products/${updatedProduct.id}.json?auth=$_authToken';

    await patch(url, body: json.encode({
      'title': updatedProduct.title,
      'description': updatedProduct.description,
      'price': updatedProduct.price,
      'imageUrl': updatedProduct.imageUrl,
      'isFavorite': updatedProduct.isFavorite
    }));

    final prodIndex = _items.indexWhere((e) => e.id == updatedProduct.id);
    _items[prodIndex] = Product.fromMutable(updatedProduct);
    notifyListeners();
  }

  Future<void> deleteProduct(String id) async {
    String url = 'https://pk-flutter-shop.firebaseio.com/products/$id.json?auth=$_authToken';

    _items.removeWhere((e) => e.id == id);
    notifyListeners();

    final response = await delete(url);

    if (response.statusCode >= 400) {
      throw HttpException('Could not delete product');
    }
  }
}