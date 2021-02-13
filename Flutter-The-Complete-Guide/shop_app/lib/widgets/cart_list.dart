import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/cart.dart';
import './cart_list_item.dart';

class CartList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cart = Provider.of<Cart>(context);

    return Expanded(
      child: ListView.builder(
        itemCount: cart.items.length,
        itemBuilder: (ctx, i) => CartListItem(
          cart.items.values.toList()[i].id,
          cart.items.keys.toList()[i],
          cart.items.values.toList()[i].price,
          cart.items.values.toList()[i].quantity,
          cart.items.values.toList()[i].title
        ),
      ),
    );
  }
}
