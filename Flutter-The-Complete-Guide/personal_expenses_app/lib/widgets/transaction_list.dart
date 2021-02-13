import 'package:flutter/material.dart';

import 'list_item.dart';
import '../models/transaction.dart';

class TransactionList extends StatelessWidget {
  final List<Transaction> transactions;
  final Function deleteHandler;

  TransactionList(this.transactions, this.deleteHandler);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.6,
      child: transactions.isEmpty
          ? LayoutBuilder(builder: (ctx, constraints) {
            return Column(
              children: [
                SizedBox(height: 20,),
                Text('No transactions yet...'),
                SizedBox(height: 20,),
                Container(
                    height: constraints.maxHeight * 60,
                    child: Image.asset('assets/images/waiting.png',
                        fit: BoxFit.cover))
              ],
            );
      })
          : ListView.builder(
              itemBuilder: (ctx, idx) {
                return ListItem(transactions[idx], deleteHandler);
              },
              itemCount: transactions.length,
              // children: transactions.map((tx) {
              //   return ListItem(tx);
              // }).toList(),
            ),
    );
  }
}
