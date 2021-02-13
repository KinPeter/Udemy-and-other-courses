import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'widgets/input_area.dart';
import 'widgets/chart.dart';
import 'models/transaction.dart';
import 'widgets/transaction_list.dart';

void main() {
  // Disable landscape mode
  // WidgetsFlutterBinding.ensureInitialized();
  // SystemChrome.setPreferredOrientations([
  //   DeviceOrientation.portraitUp,
  //   DeviceOrientation.portraitDown
  // ]);
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Personal expenses',
      theme: ThemeData(
        primarySwatch: Colors.lime,
        accentColor: Colors.deepOrangeAccent,
        fontFamily: 'Quicksand',
        textTheme: ThemeData.light().textTheme.copyWith(
            headline6: TextStyle(
                fontFamily: 'OpenSans',
                fontSize: 18,
                fontWeight: FontWeight.bold)),
        appBarTheme: AppBarTheme(
          textTheme: ThemeData.light().textTheme.copyWith(
              headline6: TextStyle(
                  fontFamily: 'OpenSans',
                  fontSize: 20,
                  fontWeight: FontWeight.bold)),
        ),
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List<Transaction> _transactions = [
    Transaction(title: 'New shoes', amount: 69.99, date: DateTime.now()),
    Transaction(title: 'Weekly groceries', amount: 16.53, date: DateTime.now()),
    Transaction(title: 'New shoes', amount: 69.99, date: DateTime.now()),
    Transaction(title: 'Weekly groceries', amount: 16.53, date: DateTime.now()),
    Transaction(title: 'New shoes', amount: 69.99, date: DateTime.now()),
    Transaction(title: 'Weekly groceries', amount: 16.53, date: DateTime.now()),
  ];

  List<Transaction> get _recentTransactions {
    DateTime oneWeekAgo = DateTime.now().subtract(Duration(days: 7));
    return _transactions.where((e) {
      return e.date.isAfter(oneWeekAgo);
    }).toList();
  }

  bool _showChart = false;

  void _toggleChart(bool val) {
    setState(() {
      _showChart = val;
    });
  }

  void _addNewTransaction(String title, double amount, DateTime date) {
    final newTx = Transaction(title: title, amount: amount, date: date);
    setState(() {
      _transactions.add(newTx);
    });
  }

  void _startAddNewTransaction(BuildContext ctx) {
    showModalBottomSheet(
        context: ctx,
        builder: (builderCtx) {
          return GestureDetector(
              onTap: () {},
              behavior: HitTestBehavior.opaque,
              child: InputArea(_addNewTransaction));
        });
  }

  void _deleteTransaction(String id) {
    setState(() {
      _transactions.removeWhere((element) => id == element.id);
    });
  }

  @override
  Widget build(BuildContext context) {
    final isLandscape = MediaQuery.of(context).orientation == Orientation.landscape;

    final appBar = AppBar(title: Text('Personal expenses'), actions: [
      IconButton(
          icon: Icon(Icons.add),
          onPressed: () => _startAddNewTransaction(context))
    ]);

    final transactionList = Container(
      height: (MediaQuery.of(context).size.height -
          appBar.preferredSize.height -
          MediaQuery.of(context).padding.top) *
          0.75,
      child: TransactionList(
          _transactions.reversed.toList(), _deleteTransaction),
    );

    return Scaffold(
      appBar: appBar,
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            if (isLandscape) Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Show chart'),
                Switch(value: _showChart, onChanged: (val) => _toggleChart(val)),
              ],
            ),
            if (!isLandscape) Container(
              height: (MediaQuery.of(context).size.height -
                  appBar.preferredSize.height -
                  MediaQuery.of(context).padding.top) *
                  0.25,
              child: Chart(_recentTransactions),
            ),
            if (!isLandscape) transactionList,
            if (isLandscape) _showChart
            ? Container(
              height: (MediaQuery.of(context).size.height -
                      appBar.preferredSize.height -
                      MediaQuery.of(context).padding.top) *
                  0.7,
              child: Chart(_recentTransactions),
            )
            : transactionList,
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () => _startAddNewTransaction(context),
      ),
    );
  }
}
