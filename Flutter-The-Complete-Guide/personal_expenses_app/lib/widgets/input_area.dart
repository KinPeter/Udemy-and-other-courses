import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class InputArea extends StatefulWidget {
  final Function addHandler;

  InputArea(this.addHandler);

  @override
  _InputAreaState createState() => _InputAreaState();
}

class _InputAreaState extends State<InputArea> {
  final _titleController = TextEditingController();
  final _amountController = TextEditingController();
  DateTime _selectedDate;

  void _submitData() {
    final title = _titleController.text;
    final amount = double.parse(_amountController.text);

    if (title.isEmpty || amount <= 0 || _selectedDate == null) return;

    widget.addHandler(title, amount, _selectedDate);

    Navigator.of(context).pop();
  }

  void _presentDatePicker() {
    showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(DateTime.now().year),
      lastDate: DateTime.now(),
    ).then(_setDate);
  }

  void _setDate(DateTime pickedDate) {
    if (pickedDate == null) return;
    setState(() {
      _selectedDate = pickedDate;
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Card(
        child: Container(
          padding: EdgeInsets.only(
            top: 12,
            left: 12,
            right: 12,
            bottom: MediaQuery.of(context).viewInsets.bottom + 12
          ),
          child: Column(
            children: [
              TextField(
                decoration: InputDecoration(labelText: 'Title'),
                controller: _titleController,
                onSubmitted: (_) => _submitData(),
              ),
              TextField(
                decoration: InputDecoration(labelText: 'Amount'),
                controller: _amountController,
                keyboardType: TextInputType.number,
                onSubmitted: (_) => _submitData(),
              ),
              Container(
                height: 60,
                child: Row(
                  children: [
                    Expanded(
                      child: Text(_selectedDate == null
                          ? 'No date chosen'
                          : 'Picked date: ${DateFormat.yMMMMd().format(_selectedDate)}'),
                    ),
                    FlatButton(
                        onPressed: _presentDatePicker,
                        textColor: Theme.of(context).accentColor,
                        child: Text(
                          'Choose date',
                          style: TextStyle(),
                        ))
                  ],
                ),
              ),
              Container(
                alignment: Alignment.centerRight,
                child: FlatButton(
                  onPressed: _submitData,
                  child: Text('Add transaction'),
                  textColor: Theme.of(context).primaryColorDark,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
