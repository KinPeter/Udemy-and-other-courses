import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/cart.dart';
import '../providers/orders.dart';

class CartSummary extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    final cart = Provider.of<Cart>(context);

    return Card(
      margin: EdgeInsets.all(12),
      child: Padding(
        padding: EdgeInsets.all(8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Total:',
              style: TextStyle(
                fontSize: 20,
              ),
            ),
            Spacer(),
            Chip(
              label: Text(
                '\$${cart.totalAmount.toStringAsFixed(2)}',
                style: TextStyle(
                    color: Theme.of(context)
                        .primaryTextTheme
                        .headline6
                        .color),
              ),
              backgroundColor: Theme.of(context).primaryColor,
            ),
            FlatButton(
              child: Text('ORDER NOW'),
              textColor: Theme.of(context).primaryColor,
              onPressed: () {
                Provider.of<Orders>(context, listen: false).addOrder(
                    cart.items.values.toList(),
                    cart.totalAmount
                );
                cart.clearCart();
              },
            ),
          ],
        ),
      ),
    );
  }
}