import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/transaction.dart';
import 'chart_bar.dart';

class DailySum {
  String day;
  double amount;

  DailySum(this.day, this.amount);
}

class Chart extends StatelessWidget {
  final List<Transaction> recentTransactions;

  Chart(this.recentTransactions);

  List<DailySum> get groupedTransactionValues {
    return List.generate(7, (index) {
      final weekday = DateTime.now().subtract(Duration(days: index));
      String day = DateFormat.E().format(weekday);
      double sum = 0.0;
      recentTransactions.forEach((e) {
        if (e.date.day == weekday.day &&
            e.date.month == weekday.month &&
            e.date.year == weekday.year) {
          sum += e.amount;
        }
      });

      return DailySum(day, sum);
    }).reversed.toList();
  }

  double get totalSpending {
    return groupedTransactionValues.fold(0.0, (sum, item) {
      return sum + item.amount;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Card(
        elevation: 6,
        margin: EdgeInsets.all(16),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              ...groupedTransactionValues.map((e) {
                return Flexible(
                  fit: FlexFit.tight,
                  child: ChartBar(e.day, e.amount,
                      totalSpending == 0.0 ? 0.0 : e.amount / totalSpending),
                );
              }).toList(),
            ],
          ),
        ),
      ),
    );
  }
}
