import 'package:flutter/material.dart';

class Answer extends StatelessWidget {
  final String text;
  final Function selectHandler;

  Answer(this.text, this.selectHandler);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,

      child: RaisedButton(
        child: Text(text),
        color: Colors.blue,
        textColor: Colors.white,
        onPressed: selectHandler,
      ),
    );
  }

}
