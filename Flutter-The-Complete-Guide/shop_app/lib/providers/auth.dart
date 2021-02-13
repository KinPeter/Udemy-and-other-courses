import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shop_app/models/http_exception.dart';

// TODO: create a .env file in root with a key MYSHOP_API_KEY

class Auth with ChangeNotifier {
  String _token;
  DateTime _expiry;
  String _userId;
  Timer _authTimer;

  String get token {
    if (_expiry != null && _expiry.isAfter(DateTime.now()) && _token != null) {
      return _token;
    }
    return null;
  }

  bool get isAuth {
    return token != null;
  }

  Future<void> _authenticate(
      String email, String password, String urlSegment) async {
    String url =
        'https://identitytoolkit.googleapis.com/v1/accounts:$urlSegment?key=${DotEnv().env['MYSHOP_API_KEY']}';

    try {
      final rawResponse = await post(url,
          body: json.encode({
            'email': email,
            'password': password,
            'returnSecureToken': true
          }));

      final res = json.decode(rawResponse.body);

      if (res['error'] != null) {
        throw HttpException('Authentication error, ${res['error']['message']}');
      }

      _token = res['idToken'];
      _userId = res['localId'];
      _expiry =
          DateTime.now().add(Duration(seconds: int.parse(res['expiresIn'])));

      _autoLogout();
      notifyListeners();
      _storeData();
    } catch (e) {
      throw e;
    }
  }

  Future<void> signUp(String email, String password) async {
    return _authenticate(email, password, 'signUp');
  }

  Future<void> login(String email, String password) async {
    return _authenticate(email, password, 'signInWithPassword');
  }
  
  Future<bool> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey('userData')) return false;

    final userData = json.decode(
        prefs.getString('userData')
    ) as Map<String, Object>;

    final expiry = DateTime.parse(userData['expiry']);
    if (expiry.isBefore(DateTime.now())) return false;

    _token = userData['token'];
    _userId = userData['userId'];
    _expiry = expiry;
    notifyListeners();
    _autoLogout();
    return true;
  }

  Future<void> logOut() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove('userData');
    // prefs.clear();

    _token = null;
    _userId = null;
    _expiry = null;
    if (_authTimer != null) {
      _authTimer.cancel();
      _authTimer = null;
    }
    notifyListeners();
  }

  void _autoLogout() {
    final timeToExpiry = _expiry.difference(DateTime.now()).inSeconds;
    if (_authTimer != null) {
      _authTimer.cancel();
    }
    _authTimer = Timer(Duration(seconds: timeToExpiry), logOut);
  }

  Future<void> _storeData() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = json.encode({
      'token': _token,
      'userId': _userId,
      'expiry': _expiry.toIso8601String()
    });
    prefs.setString('userData', userData);
  }
}
