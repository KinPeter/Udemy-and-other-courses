import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/cart_summary.dart';
import '../widgets/cart_list.dart';
import '../providers/cart.dart';

class CartScreen extends StatelessWidget {
  static const routeName = '/cart';

  @override
  Widget build(BuildContext context) {
    // final cart = Provider.of<Cart>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Your Cart'),
      ),
      body: Column(
        children: [
          CartSummary(),
          SizedBox(height: 12,),
          CartList(),
        ],
      ),
    );
  }
}
