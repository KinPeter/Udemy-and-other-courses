import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/transaction.dart';

class ListItem extends StatelessWidget {
  final Transaction tx;
  final Function onDelete;

  ListItem(this.tx, this.onDelete);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 3,
      margin: EdgeInsets.symmetric(
        vertical: 4,
        horizontal: 4,
      ),
      child: ListTile(
        leading: CircleAvatar(
          radius: 32,
          child: Padding(
            padding: EdgeInsets.all(8),
            child: FittedBox(
              child: Text('\$${tx.amount}'),
            ),
          ),
        ),
        title: Text(
          tx.title,
          style: Theme.of(context).textTheme.headline6,
        ),
        subtitle: Text(
          DateFormat.yMMMMd().format(tx.date),
        ),
        trailing: MediaQuery.of(context).size.width > 460
          ? FlatButton.icon(
          icon:  Icon(Icons.delete),
          label: Text('Delete'),
          textColor: Theme.of(context).errorColor,
          onPressed: () => onDelete(tx.id),
        )
        : IconButton(
          icon: Icon(Icons.delete),
          color: Theme.of(context).errorColor,
          onPressed: () => onDelete(tx.id),
        ),
      ),
    );
  }

  // @override
  // Widget build(BuildContext context) {
  //   return Card(
  //     child: Row(
  //       children: [
  //         Container(
  //           margin: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
  //           padding: EdgeInsets.all(12),
  //           decoration: BoxDecoration(
  //               border: Border.all(
  //                   color: Theme.of(context).primaryColorDark, width: 2)),
  //           child: Text(
  //             '\$${tx.amount.toStringAsFixed(2)}',
  //             style: TextStyle(
  //                 fontWeight: FontWeight.bold,
  //                 fontSize: 20,
  //                 color: Theme.of(context).primaryColorDark),
  //           ),
  //         ),
  //         Column(
  //           crossAxisAlignment: CrossAxisAlignment.start,
  //           children: [
  //             Text(
  //               tx.title,
  //               style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
  //             ),
  //             Text(
  //               DateFormat.yMMMMd().format(tx.date),
  //               style: TextStyle(color: Colors.grey),
  //             ),
  //           ],
  //         )
  //       ],
  //     ),
  //   );
  // }
}
