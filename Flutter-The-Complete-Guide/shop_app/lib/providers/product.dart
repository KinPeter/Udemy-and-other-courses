import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/http_exception.dart';
import '../models/mutable_product.dart';

class Product with ChangeNotifier {
  final String id;
  final String title;
  final String description;
  final double price;
  final String imageUrl;
  bool isFavorite;

  Product({
      @required this.id,
      @required this.title,
      @required this.description,
      @required this.price,
      @required this.imageUrl,
      this.isFavorite = false
  });

  Product.fromMutable(MutableProduct product) :
    id = product.id,
    title = product.title,
    description = product.description,
    price = product.price,
    imageUrl = product.imageUrl,
    isFavorite = product.isFavorite;

  Product.newFromMutable({String id, MutableProduct product}) :
    id = id,
    title = product.title,
    description = product.description,
    price = product.price,
    imageUrl = product.imageUrl,
    isFavorite = false;

  Future<void> toggleFavorite() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey('userData')) return;
    final token = json.decode(prefs.getString('userData'))['token'];

    final oldStatus = isFavorite;
    String url = 'https://pk-flutter-shop.firebaseio.com/products/$id.json?auth=$token';

    isFavorite = !isFavorite;
    notifyListeners();

    try {
      final response = await patch(url, body: json.encode({
        'isFavorite': isFavorite
      }));

      if (response.statusCode >= 400) {
        throw HttpException('Could not update favorite status');
      }
    } catch (e) {
      isFavorite = oldStatus;
      notifyListeners();
    }
  }
}
